# dsh-workflow-kit

> **让 AI 代理真正"会干活"，而不只是"会安排"。**
> DeepSeek Harness 的协作方法论套件：5 个代理预设 + 7 个方法论 skill + 子代理协作基础设施。

[![GitHub](https://img.shields.io/badge/GitHub-Ke--wood%2Fdsh--workflow--kit-blue?logo=github)](https://github.com/Ke-wood/dsh-workflow-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 它是什么

**主力方向：工程编码与多代理协作。**

本套件不提供任何具体领域的知识（不教你怎么画图、怎么写论文、怎么检索文献）。
它提供的是**代理怎么工作**这件事本身：

- 什么时候该自己干，什么时候该派出去
- 怎么判断"做完了"是真的做完了
- 怎么让多个代理协作而不互相拖累
- 怎么让上下文保持干净，不越用越糊涂

**目标：自我审查 + 上下文洁净。**

| 目标 | 含义 |
|---|---|
| **自我审查** | 每个"完成"都能被证伪，不靠代理自己说"我做好了" |
| **上下文洁净** | 判据常驻但极短，知识按需加载，细节不回流 |

---

## 用了会怎样

### 如果你用默认预设

| 现象 | 根因 |
|---|---|
| 改了代码说"应该可以了"，但没跑 | persona 没有"能跑才算完成"这条硬判据 |
| 修好 A 结果 B 坏了 | 改签名前没查调用方 |
| 顺手重构了无关代码，diff 三百行 | 没有"最小改动"约束 |
| 长任务里自己单线程硬扛，上下文爆掉 | 没有委派判断，或者判断太宽导致无效委派 |
| 派了子代理，回一句"已完成"，你也不知道对不对 | 子代理只能回自然语言，没有证据契约 |
| 换会话/压缩后忘了做到哪 | 进度只在上下文里，没落到文件 |

### 装了本套件之后

| 变化 | 机制 |
|---|---|
| **声称完成必须附命令输出** | `verification-before-completion` 铁律：没当场跑过不许说通过 |
| **改代码前先查调用方** | `code` 档判据第 3 条 |
| **一次只做一件事，分开验证** | `code` 档判据第 6 条 |
| **长任务自动拆解分发** | `delegation` 档 + `subagent-driven-development` |
| **子代理只回三行证据** | 改了什么 / 凭什么说对 / 最不确定的一点 |
| **进度写 ledger 文件，不怕压缩** | `subagent-driven-development` 的恢复机制 |
| **能看见子代理在干什么** | Agent Teams 的 Web 任务板与队友导航 |
| **上下文增长变慢** | 判据极短 + 细节走文件指针 |

---

## 原理

### 一、判据常驻，规则不常驻

传统做法是往 system prompt 里堆规则：写 200 行操作手册教代理"该怎么做"。
问题是——**规则改变流程，判据改变否决**。

> **驳回力测试**：把一条知识从代理脑子里删掉。
> 如果它仍能否决同样多的错误产出 → 这条是杂质，该外置。
> 如果它丧失了某种否决能力 → 必须常驻。

按这个标准，绝大多数"操作步骤"都该外置。真正需要常驻的只有：
**验收判据、失败模式、钩子表、通道纪律、红线**——合计不超过 60 行。

### 二、上下文分层

| 层 | 装什么 | 量级 | 加载时机 |
|---|---|---|---|
| **L0 常驻** | 判据 · 失败模式 · 钩子表 · 通道纪律 | ≤60 行 | 每轮都在 |
| **L1 路径知识** | 岔路口集合、决策点 | 5–10 行 | 需要时 `read` |
| **L2 执行细节** | 命令、语法、参数 | 0 | 全部交给子代理 |
| **L3 产物与证据** | 日志、diff、报告 | 只留指针 | 按路径取 |
 
**关键**：L2 可以完全外包，L1 不能。
因为"接收报告的带宽由接收方的知识决定"——不懂路径就消费不了路径级报告，
只能要求"说简单点"，于是永远不懂。这是唯一会**越外包越糟**的一层。

### 三、跨层只走文件，不走对话

对话里的每一句话都会在后续所有轮次重复计费。所以：

```
子代理 → 写 report.json / 产物文件
      → 回三行摘要（改了什么 / 凭什么说对 / 最不确定的一点）
主代理 → 只读判决，不读过程
```

主代理需要细节时，按路径 `read` 或 `grep`，而不是让子代理转述。

### 四、判定塌缩成默认动作

"该不该派子代理"如果写成规则，每次都要检索匹配权衡，本身就是上下文成本。所以塌缩成默认动作：

| 情况 | 动作 |
|---|---|
| 两分钟内自己看清的 | 自己做 |
| 明显多文件并行、互不依赖 | 派 |
| 中间地带 | **默认自己做第一步**（做完性质自然暴露，判定变成已知事实） |

一条硬边界：**探索可以委派，交付必须可验收。**
直接禁止最典型的退化动作——"我不懂，所以我派出去"。

---

## 主要内容

### 五个预设

在 GUI 的模式/预设选择里切换，切换即换 persona 与工具面。

| preset | 什么时候用 | 核心判据 |
|---|---|---|
| **`code`** | **改代码、修 bug、重构、写脚本**（主力） | 能跑才算完成 · 最小改动 · 先查调用方 · 先复现再修 · 不猜 API · 一次一件事 |
| `research` | 接手已有项目、要摸清结构再深化 | 先摸基线再谈深化 · 细节留指针 |
| `figure` | 出图、数据可视化 | 图先有数据再有风格 · 可复现 · 中文验字形 |
| `writer` | 写论文、润色、加引用 | 每个论断有出处 · 润色不改事实 · 术语一致 |
| `delegation` | 长任务、大型工程、多线程推进 | 强委派 · 子代理沟通 · 子代理复用（用完不丢） |

> `code` 是主力档——本包自带的方法论 skill 全是工程向的，它的钩子表能满配。

### 七个 skill

**协作流程（来自 [superpowers](https://github.com/obra/superpowers)，MIT）**

| skill | 作用 |
|---|---|
| `dispatching-parallel-agents` | 2+ 个互不依赖的任务才并行派，子代理不继承父上下文 |
| `subagent-driven-development` | 每任务 fresh 执行者 + 任务级审查 + 终审；进度写 ledger |
| `verification-before-completion` | 没当场跑过验证，不许说"通过" |
| `writing-plans` | 多步骤任务先写计划 |
| `executing-plans` | 在独立会话执行计划，带检查点 |
| `systematic-debugging` | 遇 bug/测试失败先系统化定位，别急着改 |

**自建**

| skill | 作用 |
|---|---|
| `baseline-survey` | 摸清既有项目基线，产出 `survey/{structure,baseline,hotspots,risks}` |

> 另有 `kit-selftest` —— 自包含探针，用于验证包内 skill 是否被正确加载。

### 子代理协作基础设施

随包启用 DSH 官方的 Agent Teams 三件套：

| 组件 | 提供 |
|---|---|
| `dsh-experimental-agent-team` | Host：名册 + 直接 peer messaging + 共享任务 DAG |
| `dsh-experimental-tool-agent-team` | 模型侧团队工具（`spawn_teammate` / `send_message` / `team_task_*`） |
| `dsh-experimental-client-ui-agent-team` | Web 任务板 + teammate 导航 |

配合 `delegation` 档使用：子代理可以互相沟通、任务状态可视、用完的队友保留能力可复用。

---

## 什么时候该用

### 强烈建议用

- **改存量代码**：需要"改完真跑一遍"和"别扩大 diff"
- **修 bug**：需要先复现再修，而不是猜
- **接手不熟的项目**：先用 `baseline-survey` 摸清基线
- **长任务**：多步骤、要迭代、上下文会爆
- **多线程推进**：几个互不依赖的模块要同时做
- **不想被"已完成"糊弄**：需要证据而不是断言

### 不必用

- 一次性问答、查资料
- 纯文本整理，不涉及执行验证
- 任务小到一次工具调用就能完成

---

## 安装

```bash
git clone git@github.com:Ke-wood/dsh-workflow-kit.git ~/dsh-workflow-kit
```

在 DSH 里执行 `plugin_manager`，`action: install_bundle`，`target` 填该目录绝对路径。

skills 会由 `index.js` 自动注册（`ctx.skills.registerProvider()` 扫描包内 `skills/`），
**无需手动复制或改配置**。

### 验证

```bash
# 在 DSH 里
/skill kit-selftest
```

能加载即说明包内 skill provider 生效（该 skill 只存在于包内，不在 `~/.dsh/skills`）。

---

## 快速上手

1. **选档**：GUI 模式选择里选 `code`
2. **让代理先看**：让它跑 `baseline-survey` 摸清项目（首次接触时）
3. **声明完成时要求证据**：它会自动走 `verification-before-completion`
4. **长任务切 `delegation`**：它会把活拆开、派出去、收证据回来
5. **看进度**：侧边栏 Fleet 视图 / 任务板

建议在 `~/.dsh/AGENTS.md` 加一行，让 skill 路由生效：

```markdown
- 选 skill / 不确定用哪个 → 读 <kit>/skills/ROUTING.md
```

---

## 配合使用的领域包

本包只管方法论。具体领域能力按项目另行安装，装好后预设的钩子表会自动识别。

| 领域 | 项目 |
|---|---|
| 科研绘图（figkit / R / omicverse，15+ 绘图 mod） | [sci-figure-kit](https://github.com/Ke-wood/sci-figure-kit) |
| 中文文献综述全链路 | literature-review-skill |
| Nature 系写作 / 润色 / 引用 / 精读 | nature-skills |
| 每日论文抓取与笔记 | dailypaper-skills |

```bash
# 装到用户 skill 目录即可
cp -r <项目>/skills/* ~/.dsh/skills/
```

> 注意：skill 目录名须匹配 `^[a-z0-9]+(?:-[a-z0-9]+)*$`。中文名会被**静默跳过**，
> 需改为英文名并同步 `SKILL.md` 的 `name` 字段。

---

## 设计原则

1. **判据常驻，规则外置** —— 能被删掉还不影响否决力的，都是杂质。
2. **能写成断言的绝不亲审，写不成断言的绝不委托**。
3. **探索可委派，交付必须可验收**。
4. **格式成本落在信息产生方** —— 子代理写结构化产物，主代理只读判决。
5. **可执行验证优于模型自省** —— 测试 / diff / schema 校验 > "我检查过了"。
6. **不重复造轮子** —— 先用已有 skill 和工具。

---

## 已知限制

| 限制 | 说明 |
|---|---|
| **浏览器工具无法按预设裁剪** | 34 个 `dsh_browser_*` 来自 profile 级 bundle，preset 管不到；`ctx.tools.restrict()` 要求 `agent.ctx` 作用域，preset 插件调用会抛错 |
| **4 个超长 skill 会被裁剪** | 超过 8192 字符的 skill 正文会被 pruner 截断（保留头 4096 + 尾 1024），需要时拆分为索引 + `references/` |
| **skill 正文加载后不可撤回** | 一旦加载即进历史，只能靠 compaction 折叠 |
| **compaction 压不动 system / tools** | 只压历史，不是"重置成空" |

---

## 结构

```
dsh-workflow-kit/
├── package.json            dsh.bundle.patch 声明
├── index.js                自注册 skill provider（无硬编码路径）
├── cordis.patch.yml        5 个预设 + Agent Teams 三件套
├── skills/                 7 个方法论 skill + ROUTING.md
├── licenses/               第三方许可全文
├── LICENSE                 MIT
└── THIRD-PARTY-NOTICES.md  来源与修改说明
```

整包 **36 个文件 / 268 KB**。

## 许可

原创部分 MIT（`LICENSE`）；`skills/` 下第三方 skill 沿用原许可，
详见 [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md)。
