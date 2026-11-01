# Skill 路由表

> **先查表，再加载**。不要凭印象挑，也不要一次全加载。
> skill 正文一旦加载就进历史、不可撤回——这是最贵的操作。

---

## 一、方法论（工作遇到障碍时自己取用）

| 遇到什么 | 加载 | 说明 |
|---|---|---|
| 接手不熟的项目、要摸清结构 | `baseline-survey` | 产出 `survey/{structure,baseline,hotspots,risks}`，只回摘要 |
| 多个互不依赖的任务 / bug | `dispatching-parallel-agents` | 2+ 独立任务才并行派；子代理不继承你的上下文 |
| 需要按计划逐任务执行 | `subagent-driven-development` | 每任务 fresh 执行者 + 任务级审查；进度写 ledger |
| 需求明确但步骤多 | `writing-plans` | 先写计划再动手 |
| 换会话继续执行计划 | `executing-plans` | 带检查点 |
| 遇到报错 / 测试失败 / 行为异常 | `systematic-debugging` | 先定位再改，别猜 |
| **即将声称"完成/修好/通过"** | `verification-before-completion` | **强制**，没有命令输出就不算完成 |

### 什么时候**不要**加载（否决列）

这一列比"什么时候加载"更省事——它能直接挡掉错误的加载。

| 看似该用 | 其实不该用 | 理由 |
|---|---|---|
| `writing-plans` | 任务小到一次工具调用能完成 | 写计划的开销大于收益 |
| `dispatching-parallel-agents` | 只有一个子任务，或任务之间有先后依赖 | 并行派会来回，还破坏顺序 |
| `subagent-driven-development` | 你打算自己做完全程 | 它是给"每任务派执行者"的场景用的 |
| `baseline-survey` | 你已经完全掌握项目结构 | 重复调研是纯浪费 |
| `systematic-debugging` | 你已经知道根因，只差动手 | 它用于定位，不用于实现 |
| `verification-before-completion` | 还没有任何产出可以验证 | 先做事，不是先声明 |

---

## 二、内置（随 dsh 安装，删不掉）

| 场景 | 加载 |
|---|---|
| Word / Excel / PPT / PDF 操作 | `office` → 再按需 `office-docx` / `office-xlsx` / `office-pptx` / `office-export-pdf` |
| 写/改 DSH 插件、bundle、preset | `cordis-plugin-development`（必要时配 `cordis-composition-reference`、`editing-cordis-compositions`） |
| 设计工具定义 / 技能结构 | `agent-experience` |
| Windows 沙箱权限异常 | `diagnose-windows-sandbox-acl` |

---

## 三、领域能力（不在本包内）

写作、绘图、文献检索这类**领域能力**不随本包分发。按需单独安装，装好后在**任务书里点名**：

```
本任务用 sci-figure-kit 画火山图
```

**本包不假设你装了哪些领域 skill。** 判断依据：用户发起、结果给用户看的 → 领域能力；
你自己干活需要的 → 本表第一节。

### 安装领域 skill 的两个坑

| 坑 | 现象 | 解法 |
|---|---|---|
| **目录名含中文** | 被**静默跳过**，不报错、不提示 | 改成 `^[a-z0-9]+(?:-[a-z0-9]+)*$`，并同步 `SKILL.md` 的 `name` 字段 |
| **正文超过 8192 字节** | 加载时**静默截断**（保留头 4096 + 尾 1024），中间内容丢失 | 拆成薄索引 + `references/`，正文控制在 8192 以内 |

> 第二条是本包自己踩过的坑：`systematic-debugging` 原本 9465 字节，
> 拆成 4174 字节索引 + `references/four-phases.md` 后才不再被截断。

---

## 四、加载纪律

1. **不加载就不占上下文** —— 先判断是否真的需要，别习惯性加载
2. **一次只加载需要的那个**，不要批量预载
3. **先看"不要加载"那一列** —— 否决比匹配更省事
4. **加载后按它的规则执行**，不要只读不用
5. **完成前必过** `verification-before-completion`

---

## 五、常见组合链路

| 场景 | 链路 |
|---|---|
| 接手不熟项目做深化 | `baseline-survey` → `writing-plans` → `subagent-driven-development` → `verification-before-completion` |
| 修复杂 bug | `systematic-debugging` → `verification-before-completion` |
| 多个独立模块同时改 | `dispatching-parallel-agents` → `verification-before-completion` |
