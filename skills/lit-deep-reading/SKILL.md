---
name: lit-deep-reading
description: 帮用户高效阅读学术论文并建立可复用的笔记系统。根据阅读深度需求选择 Keshav 三遍法（快筛/扫读/精读），按论文类型（实证/综述/理论/方法学）采用不同读法，建立 Cornell / Zettelkasten 笔记系统。当用户说"这篇论文怎么读"、"帮我做文献笔记"、"怎么快速判断这篇值不值得深读"、"怎么建文献笔记系统"时触发。基于 Keshav 2007 三遍法、Luhmann Zettelkasten / Ahrens 2017 智能笔记、Pauk Cornell 笔记、Robinson SQ3R。
---

# 文献精读

学术论文不是小说——读法不对会读死人。按深度 + 类型 + 笔记系统三维度科学地读。

## 触发

激活：
- "这篇论文怎么读"
- "帮我做文献笔记"
- "快速判断这篇值不值得深读"
- "怎么建文献笔记系统"
- "论文读了忘，怎么办"

不激活：
- 还没找到论文 → `文献检索`
- 论文下不到 → `文献获取`
- 读完一堆要整合 → `文献综述写作`

## 工作流

### Step 1｜判断该读多深（Keshav 三遍法）

不是每篇论文都该精读。**先用 10-15 分钟判断**。

- **第一遍（5-10 min）:** 读标题 / 摘要 / 章节标题 / 结论 / 参考文献前几条
  - 目的：决定"值不值得读"
  - 产出：5 个 C（Category / Context / Correctness / Contributions / Clarity）的初判
- **第二遍（约 1 hr）:** 略过证明和公式细节，抓主要论点、图表、方法骨架
  - 目的：能向别人概述这篇论文在做什么
- **第三遍（4-5 hr）:** 深读，模拟作者重新实现 / 质疑细节
  - 目的：完全吸收，能评价方法学

Keshav 2007 详解 → `references/three-pass.md`

### Step 2｜按论文类型选读法

不同类型论文的阅读策略不同：

| 类型 | 重点读 | 重点质疑 |
|------|-------|---------|
| 实证研究 | 方法 + 结果 | 样本 / 测量 / 统计 / 替代解释 |
| 综述 | RQ + 组织逻辑 + 结论 | 覆盖完整度 / 批判深度 |
| 理论 | 核心概念 + 命题关系 | 逻辑一致性 / 可操作化 |
| 方法学 | 方法细节 + 验证 | 适用条件 / 局限 |

详见 `references/paper-type-reading.md`。

### Step 3｜做笔记（选笔记系统）

**三选一**：

- **线性笔记 — Cornell** — 学位论文前期集中读，结构化笔记
- **线性笔记 — SQ3R** — 针对单篇深度阅读
- **网状笔记 — Zettelkasten** — 长期研究生涯知识积累

选择建议见 `references/cornell-sq3r.md` 和 `references/zettelkasten.md`。

**模板：**
- Cornell: `assets/cornell-template.md`
- Zettelkasten 原子卡: `assets/zettel-atom.md`
- 三遍法速读卡: `assets/three-pass-card.md`

### Step 4｜批判性评价

读完不只是理解作者说什么，还要判断**说得对不对**。

批判性评价清单（按实证 / 综述 / 理论 分叉）→ `references/critical-appraisal.md`

### Step 5｜整合到文献综述

读 10-50 篇后，用 `assets/critical-appraisal-checklist.md` 统一评价，进入 `文献综述写作` skill。

## 雷区

1. **一上来就第三遍精读** — 浪费时间，可能这篇根本不值得深读
2. **做笔记只记"作者说了什么"** — 退化为摘抄，没有自己的理解和评价
3. **高亮但不做笔记** — 看起来读了，其实没真读
4. **所有论文一个方法读** — 实证和综述必须用不同读法
5. **每篇独立读不做连接** — Zettelkasten 的核心是**建立论文之间的关联**

## Cornell vs Zettelkasten 决策

```
你是？
├── 学位论文冲刺期（6 个月内交稿）
│   └── Cornell（结构化 + 快速检索）
├── 博士生 / 研究员（长期积累）
│   └── Zettelkasten（长期知识网络）
├── 本科 / 硕士（1-2 年内）
│   └── Cornell + 少量 Zettel 核心笔记
└── 读单篇要马上用
    └── 三遍法速读卡（快速产出）
```

## AI 辅助边界

**AI 能做：**
- 读论文 PDF 生成**三遍法**初版笔记
- 对比两篇论文的差异点
- 提取关键引用和方法参数
- 翻译术语、转换表格

**AI 不能做：**
- **判断论文质量**（需要你的领域知识）
- **判断与你 RQ 的相关性**（AI 不知道你的研究方向）
- **建立笔记网络**（Zettelkasten 的连接是人的判断）
- **完全替代第三遍精读**（深度质疑需要人做）

**原则：** AI 做第一遍，人做第二三遍。

## 何时读 references/

| 需求 | 读哪个 |
|------|-------|
| Keshav 三遍法详解 | `references/three-pass.md` |
| Zettelkasten 完整方法 | `references/zettelkasten.md` |
| Cornell + SQ3R 对比 | `references/cornell-sq3r.md` |
| 4 类论文的读法差异 | `references/paper-type-reading.md` |
| 批判性评价清单 | `references/critical-appraisal.md` |

## 何时用 assets/

| 需求 | 用哪个 |
|------|-------|
| 三遍法速读卡 | `assets/three-pass-card.md` |
| Cornell 笔记 | `assets/cornell-template.md` |
| Zettelkasten 原子笔记 | `assets/zettel-atom.md` |
| 批判性评价清单填写 | `assets/critical-appraisal-checklist.md` |

## 下游

读完一批文献 →
- 整合成独立综述论文 / 学位综述章 → `文献综述写作`
- 写论文里的 Lit Review 章 → `文献综述章节`
- 引用规范整理 / 发现新主题 → 见完整科研写作 SOP（本套件外）
