---
name: lit-review-writing
description: 把文献笔记组织成批判性综合的文献综述，而非堆砌式 summary。适用于学位论文综述章（博/硕）、期刊独立综述文章、论文引言中的 mini 综述、系统综述/范围综述的 discussion 部分。当用户说"帮我写文献综述"、"综述怎么写"、"我的综述被说成堆砌"、"引言里的综述部分怎么组织"时触发。基于 Cooper 1988 分类学、Boote & Beile 2005 12 条、Webster & Watson 2002 概念中心法、Torraco 2005/2016 综合矩阵、Grant & Booth 2009 综述类型学、Belcher 2019、Swales CARS、PRISMA 2020。
---

# 文献综述写作

把一堆论文笔记整合成批判性综合，不是"A 说...B 说...C 说..."的流水账。

## 触发

激活：
- "帮我写文献综述"
- "综述怎么写 / 怎么组织"
- "这堆论文读完了怎么整合"
- "导师说我的综述是堆砌"
- "论文引言里的综述部分怎么写"

不激活（路由）：
- 还没读够论文 → `文献检索` + `文献精读`
- 只是引用格式问题 → 用 Zotero / EndNote 直接处理，不需走本 skill
- 找 gap 但综述未写 → 先过本 skill

## 先决：你在写哪种综述

**不同类型综述写法完全不同**。先分类再动笔。

| 场景 | 类型 | 长度 | 质量基线 |
|------|-----|------|---------|
| 博士学位论文综述章 | Narrative | 40-80 页 | Boote & Beile 12 条 ≥ 18/24 |
| 硕士学位论文综述章 | Narrative | 15-30 页 | Boote & Beile ≥ 15/24 |
| 期刊独立综述文章 | Integrative | 15-30 页 | Torraco 6 维度 |
| 系统综述论文 | Systematic | PRISMA 规格 | PRISMA 2020 27/27 |
| 范围综述 | Scoping | PRISMA-ScR | Arksey 5 步 |
| 论文引言中的 mini | CARS | 1-3 页 | Swales CARS 三 Move |

完整决策树 + 5 种类型的大纲 → `references/review-outline-5types.md`

## 工作流（默认：学位论文 Narrative）

### Step 1｜概念提取

读完每篇论文后**不记"这篇讲了什么"，记"这篇回答了哪些概念"**。

- 操作：填 `assets/concept-matrix-fillable.md`（行=论文，列=概念）
- 方法论：见 `references/concept-matrix.md`（Webster & Watson 2002）
- **前提：** 论文笔记已做完 → 若未，先走 `文献精读` skill

### Step 2｜按概念分组

把概念矩阵的**列**聚成 3-7 个主题组。

- AI 辅助：`references/prompt-cluster-by-concept.md`
- Webster & Watson 核心警告：**按概念，不按作者**。否则退化为堆砌

### Step 3｜每组做批判性综合

**不是** "A 说 X，B 说 Y"（堆砌）。**要答**：
- 一致在哪 / 分歧为何（方法？样本？时代？）
- 哪些结论已建立，哪些仍争议
- 方法学演变
- 适用边界

- AI 辅助：`references/prompt-critical-synthesis.md`
- 方法论：Torraco 综合矩阵见 `references/synthesis-matrix.md`

### Step 4｜指出 gap

综述目的不是展示读书量，是为你的 RQ 铺路。

- 六类 gap 对照：见 `references/gap-types.md`
- AI 辅助：`references/prompt-identify-gap.md`

**硬要求：** gap 必须逐条对应你的 RQ。综述结尾能让读者猜到 RQ = 合格。

### Step 5｜章节组织

5 种综述类型各有结构模板 → `references/review-outline-5types.md`

### Step 6｜Boote & Beile 12 项自检

- 评分：`assets/boote-beile-scorecard.md`
- 详解：`references/boote-beile-12.md`
- 硬门槛：博士综述章 ≥ 18/24，硕士 ≥ 15/24

## 常见雷区

1. **堆砌式综述（最大病）** — 每段以作者名开头 → 按概念重写
2. **没批判只归纳** — 每段至少一处方法学评价 / 结果冲突 / 边界质疑
3. **综述与 RQ 脱节** — 综述章与第 3 章看起来像两篇论文
4. **长度失控** — 博士 <30 页 或 >120 页 都是警告
5. **引用只有近 5 年** — 缺奠基文献 = 没读够
6. **中文论文不引中文文献** — 中文学位论文应 30-40% 中文

每条雷区的详解 + 修复方法 → `references/critical-pitfalls.md`（含于 Belcher 2019 章 + Webster & Watson 经典论述）

## 中英文综述差异

| 维度 | 英文习惯 | 中文常见 |
|------|---------|---------|
| 组织 | 按概念 | 按时间/学派 |
| 批判 | 强调 critique | 常只归纳 |
| 长度 | 15-30 页 | 30-80 页 |
| 理论框架 | 独立章 | 混在综述里 |

**建议：** 中文学位论文综述章用"主题大框架 + 时间子内容"混合组织，比纯时间序好。

## AI 边界

**AI 可做：**
- 概念提取、矩阵填充、批判综合初稿、语言润色
- 引用格式转换、遗漏文献提示

**必须人做：**
- 概念分组判断（需要对领域的理解）
- Gap 的意义判断（需要研究洞察）
- 批判的深度（AI 保守，人要加锋芒）
- 与自己 RQ 的衔接

**铁律：** AI 产出的段落逐句核对引用，避免张冠李戴。

## 何时读 references/

| 需求 | 读哪个 |
|------|-------|
| 5 种综述大纲决定用哪种 | `references/review-outline-5types.md` |
| 概念矩阵方法论详解 | `references/concept-matrix.md` |
| 综合矩阵（进阶） | `references/synthesis-matrix.md` |
| CARS 引言/结尾论证 | `references/cars-intro.md` |
| Boote & Beile 12 条详解 | `references/boote-beile-12.md` |
| AI 聚类提示词 | `references/prompt-cluster-by-concept.md` |
| AI 批判综合提示词 | `references/prompt-critical-synthesis.md` |
| AI 找 gap 提示词 | `references/prompt-identify-gap.md` |
| 20 条理论文献 APA 引用 | `references/theory.md` |

## 何时用 assets/

| 需求 | 用哪个 |
|------|-------|
| 填概念矩阵 | `assets/concept-matrix-fillable.md` |
| 12 项自评打分 | `assets/boote-beile-scorecard.md` |

## 下游

综述写完 →
- 写学位论文里的 Lit Review 章 → `文献综述章节`
- 引用规范整理 / 融入论文结构 / 模拟评审 → 见完整科研写作 SOP（本套件外）
