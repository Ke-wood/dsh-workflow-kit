# 三套环境：路径、装法、修复

本文件记录**本机实测**的路径与结论。所有路径都验证过，不是照计划抄的。

## 路径注册表

真机配置写在 **`D:/app/envs/envs.json`**（机器本地，**不进分享 zip**）。
解析顺序：`$SCI_FIG_ENVS` → `D:/app/envs/envs.json` → `check_envs.py` 内置默认值。
第三层保证 json 被删也能开箱工作。

| 项 | 实测值 |
|---|---|
| conda | `D:/app/ana/Scripts/conda.exe`（26.1.1） |
| figkit python | `D:/app/envs/figkit/Scripts/python.exe`（Python 3.14.5，venv） |
| omicverse python | `D:/app/envs/omicverse/python.exe`（Python 3.13.15，conda prefix） |
| R 解释器 | `D:/app/R/bin/Rscript.exe` |
| R 库路径 | `D:/app/R/library` |
| R 版本 | 4.6.1 (2026-06-24 ucrt)，**CRAN 官方安装器装的** |
| R 需要激活 | **否** —— 直调即可 |

---

## R 的调用方式

```bash
D:/app/R/bin/Rscript.exe "<脚本.R>"
```

**不需要激活，不需要 `conda run`。** 官方 CRAN 安装的 R 工具链自洽，`Rscript.exe` 直接可用。

### 两条约束

**1. `-e` 只放单行。** 多行 R 代码写成 `.R` 文件再传文件名。多行塞进 `-e` 会被 shell 与 R 的引号处理吃掉。

**2. 装包必须带 `lib=`。** 否则可能落到 `C:\Users\klklk\AppData\Local\R\win-library`——那是本项目的禁止污染点。自检脚本的「R 库隔离」探针会检查这一点。

---

## ⚠️ 为什么不用 conda 装 R（重要历史教训，别再试）

**结论：conda-forge 的 R 在 Windows 上不可靠，本项目的 R 环境必须用官方 CRAN 安装器。**

### 证据链

**第一步**：conda 建 R 4.5.3 环境（268 包），实测加载 Seurat 报：

```
Mingw-w64 runtime failure:
32 bit pseudo relocation at 00007FFD... out of range, targeting 00007FFC..., ...
```

**第二步**：穷举 153 个带编译代码的包，逐个加载。单独测时全部通过，但**三个一起加载**（ComplexHeatmap + Seurat + SCpubr）崩溃；进一步测发现**同一命令连跑 6 次全部失败**，而 20 分钟前同样的命令却是通过的——**结果随内存布局抖动**。

**第三步**：定位根因。conda-forge 的 R 4.5.3 win-64 环境里**同时装了两套 mingw 工具链**：

```
m2w64-sysroot_win-64            12.0.0.r4.gg4f2fc60ca    ← 旧，基于 MSVCRT
mingw-w64-ucrt-x86_64-crt-git   12.0.0.r4.gg4f2fc60ca    ← 新，基于 UCRT
```

R 4.5 本身是 UCRT 构建。落在错误一侧的 `.dll` 一加载就触发伪重定位溢出。

**第四步**：试图用 CRAN 二进制覆盖 15 个可疑包。覆盖后**更糟**——因为 `Library/bin/libstdc++-6.dll`（conda 的 mingw 运行时，30 MB）与 CRAN 二进制期望的 Rtools45 运行时是两套不同的 mingw 构建，**混用等于引入第二重冲突**。

### 教训

- conda R + CRAN 二进制 = **两套 mingw 运行时冲突**，比纯 conda 还糟
- conda R + 纯 conda 包 = conda 自己的 Seurat 构建就是坏的
- **两条路都不通，所以换官方 R**

### 顺带排除的两个错误做法

**不要用「手工补 PATH + 直调 Rscript」的捷径。** 我试过：

```bash
# 不要这样做！
env PATH="/d/app/R/Library/bin:/d/app/R/Lib/R/bin:..." Rscript.exe script.R
```

它能跑，但会产生**随机的假崩溃**——同一批包两次扫描的崩溃名单互相矛盾（一次 15 个，另一次 16 个），而这些包用官方方式测全部正常。这批 DLL 的 mingw 伪重定位错误依赖内存布局，PATH 拼得不完整就随机触发。

**教训**：R 的加载测试一律以实际调用方式为准，不要用直调做批量体检，否则会追着假阳性跑很久。

### 另外两个装 R 时踩的坑

**conda 的所有命令都必须带 `--override-channels`。** `D:\app\ana\.condarc` 里是 `channels: [defaults]`，不覆盖会让 `pkgs/r` 里那个很老的 R 参与求解（还要求 win-64 上不存在的 `m2w64-openblas`），并且要过 Anaconda ToS 门槛。

```bash
conda create ... --override-channels -c conda-forge -c bioconda
```

**ComplexHeatmap 在 conda 上装不了。** bioconda 的 Bioconductor **基础设施**包没有 win-64 构建：

| 包 | 可用平台 |
|---|---|
| `bioconductor-iranges` | osx-64 / linux-64 / linux-aarch64 / osx-arm64 —— **无 win-64** |
| `bioconductor-s4vectors` | 同上 |
| `bioconductor-genomicranges` | 同上 |

`bioconductor-complexheatmap` 本身是 noarch（能装），但依赖链上这些编译包 bioconda 不为 Windows 构建，求解必然失败。

改官方 R 后，ComplexHeatmap 直接从 Bioconductor 的 Windows 二进制装（**无需编译器**）：

```r
BiocManager::install("ComplexHeatmap", lib = "D:/app/R/library",
                     ask = FALSE, update = FALSE)
```

---

## 重装脚本

若环境损坏需要重建，按顺序跑（每个脚本都幂等，可安全重跑）：

| 脚本 | 作用 | 耗时 |
|---|---|---|
| `scripts/install_figkit.sh` | 建 figkit venv 装 Python 图库 | ~3 分钟 |
| `scripts/install_r.sh` | 下载并静默安装官方 R 到 `D:\app\R`，装全部 R 包 | 15–25 分钟 |
| `scripts/install_omicverse.sh` | conda 建 omicverse 环境 | 10–30 分钟 |
| `scripts/install_all.sh` | 依次跑上面三个 | — |

装完跑 `python scripts/check_envs.py` 体检。

`install_r.sh` 里的静默安装命令：

```bash
R-4.6.1-win.exe /VERYSILENT /DIR="D:\app\R" /NORESTART /SUPPRESSMSGBOXES
```

实测无需 UAC 提权，也不阻塞。

---

## mod 的安装落点

mod 是用户后挂进来的绘图方案。它们的装法同样被钉死在隔离环境里 ——
命令由 `scripts/mod.py` 按 `(type, env)` 拼出来，mod 自己**不能**提供命令。

| type | 规范命令 | 落到哪 |
|---|---|---|
| `pypkg` | `<env>/python.exe -m pip install <spec>` | `D:/app/envs/figkit` 或 `omicverse` |
| `pysrc` | 先拉源码到 `D:/app/envs/_mods/<id>/src`，再 `pip install <那个目录>` | 同上 |
| `rpkg` | `install.packages("<pkg>", lib="D:/app/R/library")` | `D:/app/R/library` |
| `rgh` | 先拉源码，再 `remotes::install_local(<那个目录>, lib="D:/app/R/library")` | 同上 |
| `mplstyle` / `rstyle` / `snippets` | 只拉源码，不装包 | `D:/app/envs/_mods/<id>/src` |

**机器本地资产（不进分享 zip）**：

- `D:/app/envs/_mods/_state.json` —— 实装状态与溯源（SHA / license / 时间）
- `D:/app/envs/_mods/<id>/src/` —— 拉下来的第三方代码
- `D:/app/envs/_mods_tmp/` —— 临时文件（与上面同理，不用 Git Bash 的 `/tmp`）

mod 的**声明**（`mod.json` / `docs.md`）在 skill 目录里，是可分享的。

---

## 磁盘占用（实测量级）

| 环境 | 位置 | 量级 |
|---|---|---|
| figkit | `D:/app/envs/figkit` | ~0.7 GB |
| R | `D:/app/R` | ~1.5–2 GB |
| omicverse | `D:/app/envs/omicverse` | ~2.5–4 GB |

---

## 一个通用环境坑

**Git Bash 的 `/tmp` 对 Windows 原生程序不可见。** `conda ... > /tmp/x.json` 之后 Python 会说文件不存在——Git Bash 的 `/tmp` 是 MSYS 虚拟目录，`conda.exe` / `python.exe` 是原生 Windows 程序，看不到。

临时文件一律用双方都能看见的路径，如 `D:/app/envs/_tmp.json`。
