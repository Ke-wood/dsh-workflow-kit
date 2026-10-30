# mods/ —— 可装载的绘图方案

这个目录是 `sci-figure-kit` 的扩展点。装一个 mod，路由表就多一行，
AI 下次遇到对应需求就会用它。用法像装游戏 mod：**声明 + 装载**，不写命令。

装载、卸载、体检都走同一个入口：

```bash
python scripts/mod.py list          # 已装了什么
python scripts/mod.py available     # 目录里还有什么可选
python scripts/mod.py install <id>  # 装载（先出计划，加 --yes 才动手）
```

## 目录里各是什么

| 路径 | 内容 | 进 zip？ |
|---|---|---|
| `_catalog.json` | 已知 mod 目录（含只登记未装载的候选） | 是 |
| `_template/` | 新建 mod 的模板 | 是 |
| `<id>/mod.json` | 声明（type / env / 来源 / 路由行） | 是 |
| `<id>/docs.md` | 手写的用途段 + `verify --write-docs` 生成的实测 API 段 | 是 |
| `<id>/templates/` | 起步脚本，**工作台画廊用它**（契约见下） | 是 |

拉下来的**第三方代码不在这里** —— 在 `D:/app/envs/_mods/<id>/src/`，
和 `envs.json` 一样是机器本地资产，不进 zip（理由见根目录 `README.md`）。

## 挂一个 GitHub 上的新绘图方案

```bash
# 1. 探测。只读 GitHub/PyPI/CRAN 的 API，绝不 clone，不改你机器
python scripts/mod.py add https://github.com/owner/repo
#    -> 生成 mods/<id>/mod.json 草稿，打印探测到的 type/env 与依据

# 2. 看它探测得对不对（尤其当它标了 requires_review）
python scripts/mod.py show <id>

# 3. 人工补 routes（关键！不填路由行，AI 不会知道什么时候该用它），
#    然后装载
python scripts/mod.py install <id> --dry-run   # 先看要执行什么
python scripts/mod.py install <id> --yes       # 真装
```

### 探测规则（`add` 用的信号）

按优先级，全部只读 API：

| 信号 | 判定 |
|---|---|
| 根目录有 `DESCRIPTION` | R 包；再去 CRAN 查 —— 有 → `rpkg`，无 → `rgh` |
| `pyproject.toml` / `setup.py` | Python 包；再去 PyPI 查**项目地址是否指向本仓库** —— 是 → `pypkg`，否则 `pysrc` |
| 任意位置有 `*.mplstyle` | `mplstyle` |
| 有 `*.R` 且无 `DESCRIPTION` | `rstyle` |
| 根目录有 `SKILL.md` | 那是独立 skill，不是 mod（带 `examples/` 则建议 `snippets`） |
| 什么都没有 | 判不出来 → `type: null` + `requires_review` |

**判不出来时它不会猜。** `requires_review: true` 的 mod，`install` 一律硬拒绝，
必须人工确认 type/env 后才能装。这是自动探测能安全存在的前提。

### 七种 type

| type | 装进哪 | 说明 |
|---|---|---|
| `pypkg` | figkit / omicverse | PyPI 上的包 |
| `pysrc` | figkit / omicverse | 只在 GitHub 上的 Python 包（源码安装） |
| `rpkg` | R 库 | CRAN / Bioconductor |
| `rgh` | R 库 | 只在 GitHub 上的 R 包 |
| `mplstyle` | 不装 | matplotlib 样式文件，只登记路径 |
| `rstyle` | 不装 | R 主题脚本，`source()` 加载（等于执行代码，装载时会警告） |
| `snippets` | 不装 | 代码模板库，AI 读模板改写 |

### 用途：`purpose`（plot / analysis / both）

`type` 说的是**怎么装**，`purpose` 说的是**装来干什么**，两者正交：

| purpose | 用途 | 进哪张路由表 |
|---|---|---|
| `plot`（缺省） | 配色、主题、图型库、脚本模板 | 绘图 mod |
| `analysis` | 差异表达、富集、统计检验、轨迹/通讯等**只产分析结果**的方法 | 分析 mod |
| `both` | 一体化库（既分析又出图） | 在**单条 route** 上标 `both` 才两张表都进 |

**mod 级写 `both` 不等于每行都进两张表** —— 那会让绘图行污染分析表。
混合型 mod 的做法是逐条标：绘图行标 `plot`（或不标），分析行标 `analysis`，
两者都算的行标 `both`。
`routes[]` 里的单条路由也可以带 `"purpose"` 覆盖 mod 级取值 —— 一个
「既能分析又能画图」的库，可以把 DE 那条写 `analysis`、绘图那条写 `plot`。
`mod.py routes` 会据此生成两张表；`mod.py list` / `available` 也会显示用途列。

**分析类 mod 的交付物不是图，是结果**：结果表（TSV/CSV）、统计量（JSON）
与一份人读的摘要。挂这类 mod 时，它的 `docs.md` 要写清输出什么文件、
字段是什么、怎么复核数值 —— 与绘图 mod 写「图长什么样」同等重要。

## 起步脚本（`<id>/templates/`）：工作台的画廊用它

`templates[]` 这个字段过去**只声明、没人读** —— `ggpubfigs` 甚至声明了
`templates/theme-demo.R`，而那个文件从没被拉下来过。现在绘图工作台是它的
第一个消费者：画廊里点开一个 mod，落下来的就是这里的起步脚本。

### 怎么落盘

`mod.py install` 会把你**声明在 `templates[]` 里**的路径，从拉下来的源码拷进
`<skill>/mods/<id>/<同一相对路径>`。三条规则：

1. 源里没有那个文件 → 跳过（多半是你手写的模板，本来就该在 skill 树里）。
2. 磁盘上已有、且哈希等于上次我们写下去的那个 → 覆盖（上游更新能落下来）。
3. 磁盘上已有、但哈希对不上（用户改过），或**根本没有记录**（手写的）→ 保留，
   绝不动它。想重新采用上游版本，把文件删掉再装一次即可。

### 头部契约（`figwork:` front-matter）

用注释写，**所有键都可选** —— 没有 front-matter 的模板照样能跑：

```
# figwork: name=画廊里显示的标题
# figwork: data=data.csv        # 默认：项目目录里任意 data.*
# figwork: backend=r            # 默认按扩展名（.R -> R，.py -> Python）
# figwork: env=figkit           # Python 脚本用哪个环境
# figwork: size=nature1         # 或 89x60mm，或 width=89mm height=60mm
# figwork: dpi=300
# figwork: out=out.png
# figwork: cjk=off              # 关掉「有中文却没设字体」那条检查
# figwork: u2212=allow          # 放行字面量 U+2212（一般不该放行）
```

内置尺寸预设：`nature1`(89×60) `nature2`(183×60) `science1`(55×60)
`science2`(175×60) `cell1`(85×60) `cell2`(178×60)，单位 mm。

### 写模板时别踩的四条

1. **必须能独立手跑。** 默认值写在脚本里，不要让它只能靠工作台启动。
2. **尺寸要与 front-matter 一致。** 声明 `size=nature1` 就得
   `ggsave(width = 89, ..., units = "mm")`。对不上渲染器会在尺寸闸门报 FAIL ——
   那道闸门查的就是这个一致性。Python 侧**不要用 `bbox_inches="tight"`**，
   它会把图裁窄，产物就不是精确栏宽了。
3. **中文必须显式设字体**，脚本里**任何地方**（含注释）都不要写出 U+2212
   那个减号字符 —— 渲染器对脚本做的是文本扫描，不区分代码与注释。
4. **R 的 `read.csv` 要加 `check.names = FALSE`**，否则表头被改写，脚本里每处
   列名引用都会静默失配。

两个现成的例子：`sci-figure/templates/` 是读 `data.csv` 的起步脚本，
`ggpubfigs/templates/theme-demo.R` 是自带示例数据、开箱即出图的演示。

## 安全边界（改 mod.py 时别拆掉）

mod 系统的价值一半在「装得上」，一半在**不能乱来**。三道闸：

1. **mod 永不提供命令。** `mod.json` 只能从闭集里声明 `type` 与 `env`，
   命令由 `mod.py` 拼绝对路径。所以一个恶意 mod.json 没法夹带 `curl | bash`。
2. **参数另有白名单。** 光闭集不够 —— `pip install --target=C:/x` 是一条合法
   命令配一个恶意参数。`id` / `spec` / `ref` / R 包名各自有白名单，
   挡住路径穿越、pip 选项注入、R 源码逃逸。改这些规则前先跑：
   ```bash
   python scripts/check_mod_guard.py     # 81 条边界用例
   ```
3. **装完必查隔离。** `verify` 会确认包真的落在 `D:/app/...` 下，
   而不是渗进用户的全局环境。

还有一道运行期闸：装载结束会自动重跑 `check_envs.py`，
因为 mod 可能把 figkit 的 `matplotlib==3.10.8` 顶上去、弄坏 cnsplots。

## 卸载

```bash
python scripts/mod.py remove <id> --yes          # 卸包、删代码，保留清单
python scripts/mod.py remove <id> --yes --purge  # 连清单一起删
```

卸载**不带依赖**，免得连带卸掉 cnsplots 依赖的包；本 skill 的核心 R 包拒绝卸载。
