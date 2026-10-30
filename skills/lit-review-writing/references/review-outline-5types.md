# 5 种综述类型大纲模板

> **Source:**
> Grant, M. J., & Booth, A. (2009). A typology of reviews. *Health Information & Libraries Journal*, 26(2), 91–108.
> Cooper, H. M. (1988). Organizing knowledge syntheses. *Knowledge in Society*, 1(1), 104–126.
> Page et al. (2021). PRISMA 2020. *BMJ*, 372, n71.
> Peters et al. (2020). Updated methodological guidance for scoping reviews. *JBI Evidence Synthesis*.
> Swales, J. M. (1990). *Genre analysis*.

---

## 如何选？

先回答三个问题：

1. **用途：** 学位论文章节？期刊投稿？论文引言内嵌？
2. **目标：** 梳理主题？评估干预效果？探索新领域？整合已有理论？
3. **长度约束：** ≤ 3 页 / 15-30 页 / 40-80 页 / PRISMA 规定长度

```
用途 + 目标 + 长度
  ├── 学位论文综述章 → 模板 1（叙事性综述）
  ├── 期刊整合式综述 → 模板 2（整合式 Torraco）
  ├── 期刊系统综述 → 模板 3（PRISMA 2020）
  ├── 期刊范围综述 → 模板 4（Scoping Review PRISMA-ScR）
  └── 论文引言内嵌 → 模板 5（Mini Review / CARS）
```

---

## 模板 1：叙事性综述（学位论文第 2 章）

**适用：** 博硕学位论文综述章。长度博士 40-80 页，硕士 15-30 页。

**理论基础：** Webster & Watson 2002 概念中心 + Boote & Beile 2005 12 条

### 标准结构

```markdown
# 第二章 文献综述

## 2.1 引言（1-2 页）
  2.1.1 综述目的与范围（本章回答什么问题）
  2.1.2 综述类型与方法（叙事性 / 整合式；检索策略简述）
  2.1.3 章节组织逻辑（为什么按 2.3-2.5 的主题划分）

## 2.2 核心概念界定（2-5 页）
  2.2.1 [核心术语 1] 的学术定义及演变
  2.2.2 [核心术语 2]
  2.2.3 [核心术语 3]
  2.2.4 本研究采用的操作性定义

## 2.3 [主题 1 — 通常是自变量 / 前因研究]（8-15 页）
  2.3.1 [子主题 1a] 
    - 段落以概念开头
    - 批判性综合：一致 / 分歧 / 方法演变 / 边界
  2.3.2 [子主题 1b]
  2.3.3 小结与评论
    - 主题 1 下的研究发现了什么
    - 仍存在的问题 / 矛盾

## 2.4 [主题 2 — 通常是因变量 / 结果研究]（8-15 页）
  2.4.1 [子主题 2a]
  2.4.2 [子主题 2b]
  2.4.3 小结与评论

## 2.5 [主题 3 — 通常是关系研究 / 调节变量]（8-15 页）
  2.5.1 [子主题 3a]
  2.5.2 [子主题 3b]
  2.5.3 小结与评论

## 2.6 理论框架（4-10 页）
  2.6.1 候选理论对比（2-3 个理论各自优劣）
  2.6.2 本研究采用的理论框架（+ 为什么）
  2.6.3 理论框架在本研究中的操作化

## 2.7 综述小结与研究 gap（2-3 页）
  2.7.1 既有研究成就（CARS Move 1）
  2.7.2 现有 gap（CARS Move 2）
    - 按 Miles 六类 gap 分类列出
    - 每条 gap 的论证（为什么是真 gap）
  2.7.3 本研究如何填补 gap（CARS Move 3）
    - 预告第 3 章 RQ
```

### 填写提示

- **子主题命名：** 用**概念名词短语**，不要用"国外研究 / 国内研究 / 早期研究"
- **每节末尾小结：** 1 段 150-300 字，避免只列不评
- **2.6 理论框架：** 中文学位论文常混在 2.3-2.5 里，建议独立出来
- **2.7 与后续衔接：** 读者读完 2.7 应该能**猜到**第 3 章 RQ 是什么

---

## 模板 2：整合式综述（期刊投稿）

**适用：** 投稿到《Review》类期刊或综述专栏。长度 15-30 页。

**理论基础：** Torraco 2005/2016 + Whittemore & Knafl 2005

### 标准结构（IMRaD 变体）

```markdown
# Title: 领域内某主题的整合性综述 —— 朝向 X 的整合框架

## Abstract（200-300 词）
- 领域重要性 + 综述动机
- 文献范围与选择方法
- 核心整合发现（3-5 条）
- 对领域的贡献

## 1. Introduction（2-3 页）
  - 领域重要性（CARS Move 1）
  - 既有综述的局限（CARS Move 2：已有综述是什么、还缺什么）
  - 本综述目的（CARS Move 3：我们整合什么、提出什么框架）

## 2. Methodology（2-3 页）
  - 2.1 综述类型：整合式（Whittemore & Knafl 2005 或 Torraco 2016 方法学）
  - 2.2 检索策略（数据库 / 关键词 / 时间 / 语言 / 纳入排除）
  - 2.3 筛选流程（PRISMA-ScR 风格流程图可选）
  - 2.4 分析方法（thematic synthesis / conceptual mapping）

## 3. Results / Findings（8-15 页）—— 核心部分
  - 3.1 纳入文献概况（N=？，年代分布、研究类型分布、理论立场分布）
  - 3.2 [主题 1]：[关键论点]
    - 一致之处
    - 分歧与调和
    - 方法学演变
  - 3.3 [主题 2]：[关键论点]
  - 3.4 [主题 3]：[关键论点]
  - 3.5 主题间关系（整合性部分：这几个主题如何关联）

## 4. Discussion（3-5 页）
  - 4.1 整合框架（核心贡献：一张图 + 几段文字）
  - 4.2 对理论的贡献
  - 4.3 对实践 / 方法论的贡献
  - 4.4 局限
  - 4.5 未来研究方向（Miles 六类 gap 对照）

## 5. Conclusion（1 页）

## References
```

### 与模板 1 的关键差异

- 有明确**方法学章节**（像实证论文）
- 有**整合框架**（贡献性的概念图或理论模型）
- **未来研究方向**不是空话，是具体的 RQ 清单
- 整篇文章可以独立引用

---

## 模板 3：系统综述（PRISMA 2020）

**适用：** 评估干预效果的系统综述，常见于医学、心理学、教育学、管理学。

**理论基础：** PRISMA 2020 声明（27 项清单）

### 标准结构（严格遵循 PRISMA）

```markdown
# Title: 包含 "systematic review" + 可加 "and meta-analysis"

## Abstract（结构化摘要，遵循 PRISMA 摘要 12 项）
  - Background
  - Objectives
  - Eligibility criteria
  - Information sources
  - Risk of bias
  - Synthesis of results
  - Included studies
  - Synthesis of results
  - Description of the effect
  - Strengths and limitations
  - Interpretation
  - Funding
  - Registration

## 1. Introduction
  - 1.1 Rationale
  - 1.2 Objectives (PICO 格式)

## 2. Methods（PRISMA 2020 Items 5-21）
  - 2.1 Eligibility criteria
  - 2.2 Information sources
  - 2.3 Search strategy（附完整搜索式于附录）
  - 2.4 Selection process
  - 2.5 Data collection process
  - 2.6 Data items
  - 2.7 Study risk of bias assessment
  - 2.8 Effect measures
  - 2.9 Synthesis methods
  - 2.10 Reporting bias assessment
  - 2.11 Certainty assessment (GRADE 推荐)

## 3. Results（PRISMA 2020 Items 22-28）
  - 3.1 Study selection（附 PRISMA 流程图）
  - 3.2 Study characteristics（表 1）
  - 3.3 Risk of bias in studies
  - 3.4 Results of individual studies（森林图）
  - 3.5 Results of syntheses（meta-analysis 部分）
  - 3.6 Reporting biases
  - 3.7 Certainty of evidence

## 4. Discussion
  - 4.1 Summary of evidence
  - 4.2 Limitations
  - 4.3 Conclusions

## Other Information
  - Registration（PROSPERO 注册号必填）
  - Protocol availability
  - Funding
  - Competing interests
  - Data availability

## References
## Appendices
  - Search strategies (all databases)
  - Data extraction forms
  - Risk of bias assessments
```

### 关键要求

- **必须预注册**（PROSPERO / OSF）
- **搜索必须由两人独立执行 + 第三人裁决**
- **数据提取两人独立**
- **每一项都要有审计线索**（搜索日期、筛选记录）
- 具体条目参见 `01-检索与获取` skill 的 PRISMA-S 模板

---

## 模板 4：范围综述（Scoping Review）

**适用：** 新兴领域的概念映射、证据 gap 识别、主题扫描。长度 15-30 页。

**理论基础：** Arksey & O'Malley 2005 五步 + Peters et al. 2020 JBI 更新 + PRISMA-ScR

### 标准结构

```markdown
# Title: 含 "scoping review"

## Abstract（结构化，PRISMA-ScR 版本）

## 1. Introduction
  - 背景
  - 为什么是 scoping 不是 systematic（问题特征：探索性、新兴、概念模糊）
  - Objectives 与 review questions（PCC 框架：Population / Concept / Context）

## 2. Methods
  - 2.1 Protocol and registration
  - 2.2 Eligibility criteria（PCC 对照）
  - 2.3 Information sources
  - 2.4 Search strategy
  - 2.5 Selection of sources of evidence
  - 2.6 Data charting process（extraction 在 scoping 里叫 charting）
  - 2.7 Synthesis of results（主题映射 / 概念映射）

## 3. Results
  - 3.1 Selection of sources（PRISMA-ScR 流程图）
  - 3.2 Characteristics of sources（表格：年代分布 / 国家分布 / 研究类型 / 主题分布）
  - 3.3 Results of individual sources
  - 3.4 Synthesis of results（主题映射图 + 概念图）

## 4. Discussion
  - 4.1 Summary of evidence
  - 4.2 Implications for practice / research
  - 4.3 Limitations
  - 4.4 Conclusions
```

### 与系统综述的关键差异

- **不要求**评价证据质量（scoping 目的是映射不是评判）
- **不做**效应量合并
- **charting** 而非 extraction（术语更宽）
- 输出是**概念地图**而非效果合并

---

## 模板 5：Mini Review（论文引言内嵌）

**适用：** 实证论文的引言部分的综述子节。长度 1-3 页。

**理论基础：** Swales 1990 CARS model

### 标准结构（CARS 三 Move）

```markdown
## [引言或引言第 2-3 段]

### Move 1：建立领域（Establishing a Territory）
  
  Step 1.1 — 声明中心性
    示例句式：
    - "X 是……领域的核心问题（Author, Year; Author, Year）"
    - "随着……的发展，X 受到广泛关注"
    - "超过 N 项研究聚焦于 X（综述引用）"
  
  Step 1.2 — 做主题归纳
    - 简要说明这个主题的主流研究方向（2-3 句）
  
  Step 1.3 — 综述先前研究（浓缩版）
    - 引用奠基文献 2-3 篇 + 近期代表 3-5 篇
    - 这里**不是**综述整个领域，是**为你的 RQ 铺路的那部分**

### Move 2：指出 Gap（Establishing a Niche）

  选择以下之一（或组合）：
  
  Step 2.1A — 指出缺陷 / 矛盾
    示例句式：
    - "然而，……尚未被检验"
    - "X 与 Y 的关系在文献中仍存在分歧"
    - "既有研究聚焦于……，忽略了……"
    - "大多数研究基于……样本，……情境下的证据仍然缺乏"
  
  Step 2.1B — 提出问题
    - "这引发了一个重要问题：…"
  
  Step 2.1C — 继续传统（延续性）
    - "延续 Smith (2020) 开启的……研究方向"

### Move 3：占领 Gap（Occupying the Niche）

  Step 3.1 — 陈述目的 / RQ（必有）
    示例句式：
    - "本研究旨在……"
    - "我们检验……"
    - "本文回答三个研究问题：……"
  
  Step 3.2 — 宣告发现或结果（可选，取决于期刊风格）
    - "我们发现……"
    - "结果支持……"
  
  Step 3.3 — 宣告价值（可选）
    - "本研究对……理论/实践有以下贡献"
  
  Step 3.4 — 声明论文结构（可选）
    - "本文结构如下：……"
```

### 长度与密度建议

- 整个引言 2-4 页时：Move 1 占 1-1.5 页，Move 2 占 0.5-1 页，Move 3 占 0.5 页
- 整个引言 1 页时：各 Move 1-3 段
- 引用文献控制在 15-30 条，不要塞满

### 常见错误

1. **Move 1 过长**：综述了半个领域，读者迷路
   - 解法：只综述与你 RQ 直接相关的子领域
2. **Move 2 太弱**："有待进一步研究"（废话）
   - 解法：具体指出 gap，如"方法空白：现有研究均采用自陈量表，缺乏行为数据"
3. **Move 2 与 Move 3 脱节**：gap 与 RQ 不对应
   - 解法：确保 Move 3 的 RQ 直接对应 Move 2 的 gap

---

## 选择决策速查表

| 场景 | 模板 | 长度 | 必过质量门 |
|------|------|------|----------|
| 博士学位论文第 2 章 | 1 | 40-80 页 | Boote & Beile 18+/24 |
| 硕士学位论文第 2 章 | 1 精简版 | 15-30 页 | Boote & Beile 15+/24 |
| 期刊综述文章（一般） | 2 | 15-30 页 | Torraco 6 维 |
| 期刊综述文章（定量合并） | 3 | 15-30 页 | PRISMA 27/27 |
| 期刊综述文章（映射） | 4 | 15-30 页 | PRISMA-ScR |
| 实证论文引言 | 5 | 1-3 页 | CARS 三 Move 齐全 |

---

## 下一步

选好模板后：
1. 用 `concept-matrix.md` 或 `synthesis-matrix.md` 整理文献
2. 用 `prompts/cluster-by-concept.md` 分组
3. 按模板结构逐节填写
4. 终稿过 `boote-beile-12.md` 自检
