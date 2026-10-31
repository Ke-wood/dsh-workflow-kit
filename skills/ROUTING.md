# Skill 路由表

> **先查表，再加载**。不要凭印象挑，也不要一次全加载。
> skill 正文一旦加载就进历史、不可撤回——这是最贵的操作。

---

## 一、可用 skill（AI 层，共 7 个方法论 + 内置）

### 方法论（工作中遇到障碍时自己取用）

| 遇到什么 | 加载 | 说明 |
|---|---|---|
| 接手不熟的项目、要摸清结构 | `baseline-survey` | 产出 `survey/{structure,baseline,hotspots,risks}`，只回摘要 |
| 多个互不依赖的任务 / bug | `dispatching-parallel-agents` | 2+ 独立任务才并行派；子代理不继承你的上下文 |
| 需要按计划逐任务执行 | `subagent-driven-development` | 每任务 fresh 执行者 + 任务级审查；进度写 ledger |
| 需求明确但步骤多 | `writing-plans` | 先写计划再动手 |
| 换会话继续执行计划 | `executing-plans` | 带检查点 |
| 遇到报错 / 测试失败 / 行为异常 | `systematic-debugging` | 先定位再改，别猜 |
| **即将声称"完成/修好/通过"** | `verification-before-completion` | **强制**，没有命令输出就不算完成 |

### 内置（随 dsh 安装，删不掉）

| 场景 | 加载 |
|---|---|
| Word / Excel / PPT / PDF 操作 | `office` → 再按需 `office-docx` / `office-xlsx` / `office-pptx` / `office-export-pdf` |
| 写/改 DSH 插件、bundle、preset | `cordis-plugin-development`（必要时配 `cordis-composition-reference`、`editing-cordis-compositions`） |
| 设计工具定义 / 技能结构 | `agent-experience` |
| Windows 沙箱权限异常 | `diagnose-windows-sandbox-acl` |

---

## 二、不在本表里的能力（手动层）

写作、绘图、文献检索这类**领域能力**不在 AI 层，位于：

```
~/.dsh/skills-manual/
```

**你看不到它们的描述，所以不要主动去找或假装会用。**

当用户明确点名时（例如「用 nature-writing 写引言」），才去 `read` 对应路径：

```
read ~/.dsh/skills-manual/nature-writing/SKILL.md
```

完整清单与路径见 `~/.dsh/LOCAL-CAPABILITIES.md`。

**判断依据**：用户发起、结果给用户看的 → 手动层；你自己干活需要的 → AI 层。

---

## 三、加载纪律

1. **不加载就不占上下文** —— 先判断是否真的需要，别习惯性加载
2. **一次只加载需要的那个**，不要批量预载
3. **加载后按它的规则执行**，不要只读不用
4. **完成前必过** `verification-before-completion`
5. **手动层的 skill 不要猜**——没被点名就不要假设自己知道内容
