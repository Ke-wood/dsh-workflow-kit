# PRISMA-S 搜索报告清单（27 项）

> **Source:** Rethlefsen, M. L., Kirtley, S., Waffenschmidt, S., Ayala, A. P., Moher, D., Page, M. J., & Koffel, J. B., on behalf of the PRISMA-S Group. (2021). PRISMA-S: An extension to the PRISMA Statement for Reporting Literature Searches in Systematic Reviews. *Systematic Reviews*, 10(1), 39. https://doi.org/10.1186/s13643-020-01542-z

---

## 用途

**系统综述**和**范围综述**的检索报告强制标准。27 项覆盖从准备到同行评议全流程。

**不是系统综述可跳过本文件**（叙事综述 / mini 综述不要求这么严）。

---

## 27 项清单（分 8 大类）

### A. 信息来源与方法（Information Sources & Methods）

1. **数据库列表** — 列出所有搜索的数据库/平台/接口
   - 例："Web of Science Core Collection (Clarivate, via institutional subscription)"

2. **多数据库搜索** — 说明使用多个数据库并说明理由
   - 例："为减少单库偏误，检索 Web of Science、Scopus、PubMed、CNKI 四库"

3. **其他信息来源** — 灰色文献、会议论文、预印本等
   - 例："另检索 arXiv, bioRxiv, ProQuest Dissertations"

4. **向研究者索取** — 联系作者获取未发表数据的流程（如适用）

5. **引文追踪** — 向后（参考文献）和向前（citing articles）的方法

### B. 搜索策略（Search Strategy）

6. **完整搜索策略** — 逐库完整列出搜索字符串（**附录中给**，不只在正文）
   - 必须能让别人一字不差复现你的搜索

7. **搜索限制** — 日期、语言、文献类型、地区等

8. **受控词表使用** — MeSH / Emtree / ERIC Thesaurus 的具体词条

9. **同行评议** — 搜索策略是否经过 librarian 或同行审阅（PRESS 清单）

### C. 同行评议（Peer Review）

10. **PRESS 清单使用** — McGowan et al. 2016 的 6 项同行评议
    - 使用了说明谁评审的 / 未使用说明理由

11. **搜索团队** — 列出设计、执行、验证的人员

### D. 管理（Management）

12. **搜索结果管理工具** — EndNote / Zotero / Covidence / Rayyan 等

13. **去重** — 方法（自动 / 手动 / 工具）

14. **重复搜索** — 撰写期间如何更新搜索

### E. 同行评议之后的变化

15. **策略变化** — 初稿到终稿搜索策略的任何调整及理由

### F. 数据元素（Data Elements）

16. **搜索日期** — 每个库每次搜索的日期（至少精确到月）

17. **搜索结果数** — 每个库 / 每次搜索的命中数

18. **共检索数 + 去重后数** — PRISMA 流程图顶部的数字

### G. 报告结果（Reporting Results）

19. **纳入 / 排除流程** — PRISMA 流程图的完整数字（命中→筛选→全文读→纳入）

20. **未检索源** — 如果某库本应检索但未检索（如无订阅），说明

### H. 其他

21. **资金来源** — 对搜索是否有影响
22. **利益冲突**
23. **协议注册** — PROSPERO / OSF（强烈推荐）
24. **数据可用性**
25. **检索结果可用性** — 所有命中条目的列表是否公开
26. **审查员培训** — 筛选是否标准化
27. **搜索语言** — 英文为主 / 含其他语言

---

## PRISMA-S 填写模板

以下模板可直接用到你的综述 Methods 章节。

```markdown
## 文献检索策略

### 数据库与其他来源

本综述检索四个数据库（Web of Science, Scopus, PubMed, CNKI）加三个灰色文献源
（arXiv, ProQuest Dissertations, Google Scholar 前 200 条结果）。数据库选择基于
Gusenbauer & Haddaway (2020) 关于系统综述数据库覆盖的建议。

### 搜索策略

搜索策略由 [姓名] 设计，[姓名] 独立审阅（PRESS 2016 清单）。完整检索字符串见附录 A。

核心概念块基于 PICO 框架：
- P (Population): 中国高校本科生
- I (Intervention): 生成式 AI 辅助写作
- C (Comparison): 传统写作指导
- O (Outcome): 写作质量

每个概念块用 3-8 个同义词 + 受控词（MeSH / ERIC Thesaurus）。

### 搜索限制

- 时间：2020-01-01 至 2024-12-31
- 语言：英文 + 中文
- 文献类型：期刊论文 + 会议论文 + 学位论文
- 排除：书评、社论、会议摘要

### 搜索执行

执行日期：2025-01-15。由 [姓名] 独立执行，结果导入 Zotero。

### 管理

使用 Zotero 去重（Zotero 自动去重 + Rayyan 人工复核）。

### 搜索结果

| 数据库 | 命中 | 去重后 |
|-------|-----|-------|
| Web of Science | 234 | — |
| Scopus | 186 | — |
| PubMed | 45 | — |
| CNKI | 89 | — |
| 灰色文献 | 67 | — |
| **合计** | **621** | **412** |

### 协议注册

协议预注册于 PROSPERO：ID CRD42025xxxxxx。
注册协议与最终执行的差异：搜索时间窗由 2019-01 调整为 2020-01（AIGC 热点起点）。
```

---

## 必过项 vs 推荐项

系统综述投稿时，**reviewer 通常硬卡**这几项：

- **6** 完整搜索字符串（附录必给）
- **10** PRESS 清单（强烈建议）
- **16-18** 搜索日期 + 命中数
- **19** PRISMA 流程图（主文必给）
- **23** 协议注册（PROSPERO / OSF）

**推荐做但不强制**：

- **8** 受控词表明确列出
- **14** 更新搜索策略
- **25** 检索结果公开

---

## 快速自检

投稿前过一遍：

- [ ] 搜索策略是否能让一个陌生人一字不差复现？
- [ ] 所有搜索日期是否精确到月？
- [ ] PRISMA 流程图的所有数字是否一致？
- [ ] 是否有协议注册？
- [ ] Methods 章节 + 附录合计覆盖 27 项多少条？

**底线：至少 20/27 条明确覆盖**。缺项在正文或附录说明理由。

---

## 与 PRISMA 2020 主清单的关系

- PRISMA 2020（Page et al., 2021）— 整个系统综述报告的 27 项
- PRISMA-S（Rethlefsen et al., 2021）— 聚焦"Literature Searches" 这一部分的扩展

两者配合使用。PRISMA-S 是 PRISMA 2020 中第 5-10 项（Information Sources / Search Strategy / Selection Process）的深化。

## PRISMA 2020 主清单（简要）

| 章节 | 项数 |
|------|------|
| Title | 1 |
| Abstract | 1（12 子项） |
| Introduction | 2 |
| Methods | 17（含搜索 7 项）|
| Results | 20 |
| Discussion | 3 |
| Other | 5 |

**合计 27 项主清单。** 全部详见 Page et al. (2021), BMJ 372:n71.
