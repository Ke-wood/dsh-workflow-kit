---
name: lit-search-strategy
description: 帮用户构建系统的中英文文献检索策略。根据综述类型（叙事/系统/范围/快速）选择 PICO/SPIDER 框架，在 Web of Science / Scopus / Google Scholar / CNKI / 万方 等数据库执行检索，产出可复现的检索日志。当用户说"帮我搜文献"、"怎么找相关论文"、"关键词搜不到合适的"、"我要做系统综述的检索"时触发。基于 PRISMA 2020 + PRISMA-S 2021 报告标准、Gusenbauer & Haddaway 2020 数据库对比实证、Richardson 1995 PICO、Cooke 2012 SPIDER。
---

# 文献检索

把研究问题变成可复现的检索策略，而不是凭感觉搜几个词。

## 触发

激活：
- "帮我搜文献"、"怎么找相关论文"
- "关键词搜不到合适的"
- "我要做系统综述的检索"
- "这个领域有什么关键文献"

不激活：
- 论文下载不到 → `文献获取`
- 搜出来了不知怎么读 → `文献精读`
- 文献堆读完了要整合 → `文献综述写作`

## 工作流

### Step 1｜判断检索类型（决定严格度）

| 综述类型 | 检索严格度 | 参考标准 |
|---------|---------|---------|
| 叙事综述（学位论文综述章） | 中 | 覆盖主要文献即可 |
| 系统综述 | **严** | PRISMA-S 27 项全部 |
| 范围综述 | 严 | PRISMA-ScR |
| 快速综述 | 松 | 简化 systematic |
| 引言内 mini 综述 | 松 | 覆盖核心即可 |

### Step 2｜问题概念化（选 PICO / PICOC / SPIDER）

把 RQ 拆成可检索的概念块。

- **定量 + 干预** → PICO（Population / Intervention / Comparison / Outcome）
- **定量 + 社科** → PICOC（+ Context）
- **质性** → SPIDER（Sample / Phenomenon / Design / Evaluation / Research type）

每格填出 3-8 个同义词。填 `assets/picos-worksheet.md`。

框架详解 → `references/search-frameworks.md`

### Step 3｜关键词扩展

对每个概念块：

1. 列**同义词**（学术 + 俗称）
2. 查**受控词表**（MeSH / Emtree / CNKI 主题词）
3. 加**截断符**（writing vs writings vs writer → writ*）
4. 考虑**不同表达**（中英互译、不同学科术语）

Boolean + MeSH 详解 → `references/boolean-search.md`

### Step 4｜选数据库

**最少 4 个英文库 + 2 个中文库（系统综述）**

| 学科 | 英文必检 | 中文必检 |
|------|---------|---------|
| 医学 | PubMed / Cochrane / Embase / Web of Science | CNKI / 万方 / 中国生物医学文献库 |
| 心理 | PsycINFO / Web of Science / Scopus / ERIC | CNKI / 万方 |
| 管理 | Business Source / Web of Science / Scopus / ABI | CNKI / 万方 |
| 教育 | ERIC / Web of Science / Scopus / PsycINFO | CNKI / 万方 |
| CS | IEEE Xplore / ACM DL / Web of Science / Scopus / DBLP | CNKI（工程辑）|

数据库覆盖对比 + 选型依据 → `references/databases.md`（基于 Gusenbauer & Haddaway 2020 26 库实证）

### Step 5｜构建搜索字符串

每个库**语法不同**，不能复制粘贴。

- Web of Science: `TS=("digital transformation" AND "SME*")`
- PubMed: `"digital transformation"[Title/Abstract] AND SME*`
- Scopus: `TITLE-ABS-KEY("digital transformation" AND SME*)`
- CNKI: `SU = '数字化转型' AND SU = '中小企业'`

详见 `references/boolean-search.md`。

### Step 6｜执行检索 + 记录

**每次检索必须记录**：日期、数据库、搜索字符串、命中数、筛选标准、保留数。

填 `assets/search-log.md`。这是可复现性的核心。

### Step 7｜去重 + 导出

- Zotero / EndNote 批量去重
- 导出 RIS / BibTeX 供下一步引用管理（Zotero / EndNote / Mendeley）

### Step 8｜灰色文献（如需）

- 会议论文（IEEE / ACM）
- 预印本（arXiv / bioRxiv / SSRN）
- 政府/机构报告
- 博硕学位论文（ProQuest / 万方）

方法详见 `references/grey-literature.md`

### Step 9｜质量自检（系统综述用）

PRISMA-S 27 项 checklist → `references/prisma-s.md`

## 中文数据库特殊点

- **CNKI** — 最大中文期刊库，但导出需订阅
- **万方** — 与 CNKI 重叠度高，部分补充
- **维普** — 工科偏好
- **超星/读秀** — 图书 + 学位论文强
- **ProQuest（含中文版）** — 海外访问学位论文

详见 `references/databases-cn.md`

## 雷区

1. **只搜一个库** — Google Scholar 覆盖面最广但召回差，系统综述必多库
2. **凭感觉选关键词** — 不查 MeSH / 主题词，漏掉同义表达
3. **不记录搜索过程** — 答辩 / 审稿问"怎么搜的"答不出
4. **忽略灰色文献** — 发表偏误（publication bias）严重
5. **中英分离** — 中文学位论文只搜中文库 = 没看到国际进展
6. **一次性搜完不迭代** — 搜到几篇关键文献后应该再扩关键词二次搜

## AI 边界

- **能做：** 生成同义词表、翻译中英术语、检查搜索字符串语法、导出格式转换
- **不能做：** 代访问订阅库（无订阅 AI 也进不去）、判断某库是否值得订阅、评估一篇论文质量

## 何时读 references/

| 需求 | 读哪个 |
|------|-------|
| PICO/SPIDER 具体用法 | `references/search-frameworks.md` |
| 英文数据库选型与对比 | `references/databases.md` |
| 中文数据库使用 | `references/databases-cn.md` |
| Boolean + MeSH 详解 | `references/boolean-search.md` |
| 灰色文献检索 | `references/grey-literature.md` |
| PRISMA-S 27 项 | `references/prisma-s.md` |
| 引文追踪（雪球法） | `references/citation-chaining.md` |

## 何时用 assets/

| 需求 | 用哪个 |
|------|-------|
| 填 PICO/PICOC/SPIDER 概念化 | `assets/picos-worksheet.md` |
| 每次检索记录 | `assets/search-log.md` |

## 下游

检索完成 →
- 下载不到 → `文献获取`
- 下完开始读 → `文献精读`
- 全部读完开始整合 → `文献综述写作`
