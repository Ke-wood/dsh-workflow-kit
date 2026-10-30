# Skill 路由表

> **L5 skill 路由层**：解决两个问题——① 目录税（skill 越装越多，每请求都占上下文）② 选错/不知道有。
> 用法：**先查这张表，再决定加载哪个 skill**。不要凭印象挑，也不要一次全加载。
>
> 位置建议：`~/.dsh/AGENTS.md` 引用本文件，或直接并入 AGENTS.md（表体 ~40 行）。

---

## 一、按任务信号路由

| 你要做的事 | 用哪个 skill | 关键触发词 | 何时不用 |
|---|---|---|---|
| **文献检索 / 找论文** | `nature-academic-search` | 查文献、找文献、PubMed、arXiv | 只查 1 篇已知 DOI |
| **建立检索策略**（系统综述级） | `lit-search-strategy` | 帮我搜文献、关键词搜不到、系统综述检索 | 随手搜几个词 |
| **读一篇论文 / 精读** | `paper-reader` 或 `lit-deep-reading` | 读论文、读一下、分析文献 | 只看摘要 |
| **中英文对照全文翻译** | `nature-reader` | 翻译论文、对照、全文翻译 | 只需结论 |
| **建文献笔记系统** | `lit-deep-reading` | 文献笔记、怎么读、值不值得深读 | 一次性阅读 |
| **写文献综述** | `lit-review-writing` | 帮我写综述、综述怎么写、被说成堆砌 | 只需罗列引用 |
| **给正文加引用** | `nature-citation` | 加引用、找支持文献、CNS 引用 | 已有完整参考文献 |
| **写论文正文** | `nature-writing` | 写引言、写摘要、写方法、投稿材料 | 只改一两句 |
| **润色 / 改写英文** | `nature-polishing` | 润色、改写、翻译成英文、proofread | 重写结构（用 writing） |
| **画图 / 期刊配图** | `sci-figure-kit` | 画图、出图、火山图、热图、UMAP | 只要数据表 |
| **并行多个独立任务** | `dispatching-parallel-agents` | 多个独立、并行、无依赖 | 任务强耦合 |
| **按计划执行多任务** | `subagent-driven-development` | 执行计划、多任务、逐任务 | 单任务 |
| **写实施计划** | `writing-plans` | 写计划、方案、拆解 | 已有计划 |
| **在另一会话执行计划** | `executing-plans` | 换会话执行、review 检查点 | 同会话（用 subagent-driven） |
| **调试 bug / 测试失败** | `systematic-debugging` | 报错、失败、不工作、异常 | 已知一行修复 |
| **声称完成之前** | `verification-before-completion` | 完成、修好、通过、可以提交 | — **强制** |
| **做 Office 文档** | `office` → `office-docx`/`office-xlsx`/`office-pptx` | Word、Excel、PPT、docx | 纯文本 |
| **转 PDF** | `office-export-pdf` | 转 PDF、导出 PDF | — |
| **渲染文档看图** | `office-render` | 渲染、看看排版 | — |

## 二、组合路由（常见链路）

| 场景 | 链路 |
|---|---|
| **从零写一篇综述** | `lit-search-strategy` → `nature-academic-search` → `paper-reader` → `lit-review-writing` → `nature-polishing` |
| **给已有草稿加引用并润色** | `nature-citation` → `nature-polishing` |
| **已有实验数据要出图发论文** | `sci-figure-kit` → `nature-writing` → `nature-polishing` |
| **接手一个已有项目做深入** | `dispatching-parallel-agents`（并行调研）→ `writing-plans` → `subagent-driven-development` |
| **修一个复杂 bug** | `systematic-debugging` → `verification-before-completion` |

## 三、硬规则

1. **加载前先查表**：不确定时读本表，不要猜。
2. **一次只加载需要的**：skill 正文加载后**不可撤回**，会一直占上下文。
3. **单 skill ≤ 8192 字符**才不被 pruner 裁剪；超长的走 `references/`（如 `subagent-driven-development`）。
4. **声称完成前必查** `verification-before-completion`——这条无例外。
5. **同一概念只留一个 skill**：中英文重复的（如 `paper-reader` vs `lit-deep-reading`）按语言/深度选一个。

## 四、目录税控制

当前已装 skill 数量会影响每请求成本（描述 ≤500 字符/条自动注入）。

| 建议 | 说明 |
|---|---|
| 保持在 **20–25 个以内** | 超过则考虑卸载低频项 |
| 低频 skill 移出 `~/.dsh/skills/` | 需要时再装回 |
| 用 preset 分层 | research 档装文献类；figure 档装绘图类；避免全装 |

> 本表本身就是"薄索引"的体现：**表常驻（~40 行），skill 正文按需加载**。
