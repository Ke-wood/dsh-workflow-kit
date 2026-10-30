# Prompt: 六类研究空白识别

## 用途

综述写完核心部分后，用这个 prompt 系统性识别研究 gap，避免写出"未来研究可以进一步探索"这种空话。

**理论基础：**
- Miles (2017) — 六类 gap 分类法（evidence / knowledge / practical / methodological / empirical / theoretical）
- Boote & Beile (2005) — 12 条标准第 8 条"找出并论证研究 gap"
- Swales CARS Move 2 — 指出 niche

---

## 何时使用

- 综述主体部分（2.3, 2.4, 2.5 等主题小节）已经用 `critical-synthesis.md` 写完初稿
- 现在要写综述结尾（2.N 小结与 gap）或期刊综述的 Discussion
- **或**你已经有了一份综述草稿，现在要回头找 gap 强化 Move 2

---

## 六类 Gap 速览

| Gap 类型 | 英文 | 定义 | 典型句式 |
|---------|------|------|---------|
| 证据空白 | Evidence gap | 某断言被广泛假定，但**缺少直接实证证据** | "X is often assumed to lead to Y, but direct evidence is limited" |
| 知识空白 | Knowledge gap | 某方向**根本没研究过**，或研究极少 | "Little is known about Z in context W" |
| 实践空白 | Practical-knowledge gap | 理论成熟但**实践应用未检验** | "While the model is well-established, its application in clinical/field settings remains untested" |
| 方法空白 | Methodological gap | 现有方法**有缺陷**或**单一** | "Most studies rely on self-report; objective measures are lacking" |
| 经验空白 | Empirical gap | 理论/框架存在但**缺实证检验** | "The framework has not been empirically tested in diverse contexts" |
| 理论空白 | Theoretical gap | 现象已观察但**缺理论解释** | "The phenomenon is well-documented, but a unifying theoretical account is missing" |

---

## 核心 Prompt（交给 Claude 执行）

```
You are an expert research methodologist helping a researcher identify and articulate research gaps in their literature review.

## Context

The researcher has drafted the core sections of a literature review. Now they need to identify specific research gaps to motivate their own study (CARS Move 2).

## Input

The user will provide:
1. Their draft literature review (main body sections) OR a summary of key findings per concept group
2. Their preliminary research question(s) — if available
3. The study context (discipline, target journal, PhD/master, empirical/theoretical)

## Task

Systematically identify 3-5 research gaps across the six categories:
1. **Evidence gap** — claims widely assumed but lacking direct empirical support
2. **Knowledge gap** — areas not yet studied
3. **Practical-knowledge gap** — theory established but practice-level validation missing
4. **Methodological gap** — methods are limited, single, or flawed
5. **Empirical gap** — frameworks exist but haven't been empirically tested
6. **Theoretical gap** — phenomena observed but unexplained

## Quality Criteria (apply to each gap)

A GOOD gap statement has ALL of:

1. **Specificity** — not "more research needed" but "evidence on X-in-context-Y is lacking"
2. **Justification** — WHY is this a real gap? (cite what's missing, what's been tried and failed, what's been assumed without test)
3. **Significance** — WHY does filling this gap matter? (theoretical, practical, methodological value)
4. **Actionability** — a study could plausibly address this gap

A BAD gap statement has ANY of:

- Vague verbs: "explore", "investigate", "understand better"
- No justification: just claims "this hasn't been done"
- Trivial scope: "no one has studied X in country Z on a Wednesday"
- Overclaim: "no one has addressed this" (when literature search wasn't exhaustive)

## Output Format

For each identified gap:

### Gap [N]: [Gap type]

**Type:** [one of six]

**Statement (one sentence):** [specific, justified, significant]

**Evidence for this gap (from the literature review):**
- [Which section / papers reveal this gap — quote or paraphrase]

**Justification:**
[2-3 sentences explaining WHY this is a real and important gap, not just an absence of research]

**Significance:**
[1-2 sentences: what filling this gap would contribute to the field]

**How the researcher's study could address this:**
[1-2 sentences — only if RQ was provided; otherwise skip]

### Summary: Gap typology in this review

Provide a table:

| Gap # | Type | Claim | Addressable in this study? |
|-------|------|-------|---------------------------|

## Prioritization

After listing all gaps, recommend the top 2-3 that should drive the researcher's RQ:
- Highest significance
- Most actionable given typical study resources
- Most coherent as a single study's contribution

Flag any gap that is better left for future research.

## Draft language for Move 2

Provide a draft paragraph (or 2 short paragraphs) that could be inserted into the review conclusion, using the identified gaps. This paragraph should:
- Be 200-400 words (adjust per context)
- Explicitly name each gap type
- Cite evidence from the review body
- Lead naturally into the researcher's RQ (CARS Move 3)

## Language

Match user's language.

## Self-check before output

- [ ] Have I covered multiple gap types (not just one)?
- [ ] Is each gap specific, justified, significant, actionable?
- [ ] Have I avoided "more research needed"-style vagueness?
- [ ] Does the Move 2 draft flow naturally to the researcher's RQ?
- [ ] Have I flagged which gaps the researcher should actually pursue?

Begin analysis now.
```

---

## 使用示例

**输入：**
```
我的综述主题：在线学习学生参与度的三维模型（中国高校情境）

综述主体已讨论的要点：
- Group 1 参与度概念演变：三维模型（Fredricks 2004）→ 四维提议（Kim 2023），情感维度定义仍在争议
- Group 2 测量方法：自陈量表占主导（89% 中文研究 by Zhou & Kim 2023），LMS 日志兴起（Chen 2020），行为与自陈 r=.34
- Group 3 前因因素：主要关注动机、自我调节（西方样本为主）
- Group 4 教学环境：教师情感支持在质性研究中关键（Zhang 2022），但未纳入主流三维模型
- Group 5 文化情境：中国情境下的定量检验仅有少量研究，集体主义调节作用未被系统测

我的初步 RQ：
RQ1: 在中国高校本科生中，三维参与度模型的结构效度如何？
RQ2: 教师情感支持对三个维度的差异化影响？
```

**AI 应该输出：**

```
### Gap 1: 方法空白

**Type:** Methodological gap

**Statement:** 现有中国情境下的参与度研究 89% 依赖自陈量表，行为数据与自陈数据的一致性从未被系统检验，导致测量效度存在根本不确定性。

**Evidence:** Zhou & Kim (2023) 的系统综述明确数据；Chen (2020) 在国际样本上揭示 r=.34 但未在中国复现。

**Justification:** 自陈量表受共同方法偏差、社会期许反应、自我觉察能力局限的多重影响。对"参与度"这类包含行为、情感、认知三层次的构念，单一测量方法特别受限。Chen (2020) 的低相关 r=.34 表明自陈与行为测量可能测量的不是同一构念——这对参与度研究的整个证据基础提出挑战。

**Significance:** 填补此 gap 将为参与度测量的三角验证提供第一手中国证据，影响后续所有基于自陈量表的参与度研究的解释边界。

**How your study could address:** 你的研究可以在中国高校样本中同时采用自陈量表 + LMS 行为日志，检验三维度的测量一致性。

---

### Gap 2: 经验空白

**Type:** Empirical gap

**Statement:** 三维参与度模型（Fredricks et al., 2004）虽被全球广泛引用，但其在中国高校本科生中的结构效度从未被大样本定量检验。

**Evidence:** 综述 Group 5 显示中国情境研究以定性为主（Zhang 2022），定量检验不足。

**Justification:** Fredricks 原始模型基于美国 K-12 样本，其在大学阶段 + 中国集体主义文化下的三维结构是否成立，是经验问题而非假定。若结构不成立（如情感维度分裂或与其他维度合并），模型在中文文献中的使用需要谨慎。

**Significance:** 为三维模型的跨文化适用性提供关键证据，影响中文文献的构念有效性基础。

**How your study could address:** RQ1 直接对应这个 gap —— 通过验证性因子分析在 N=1200 中国本科生样本中检验三维结构。

---

### Gap 3: 理论空白

**Type:** Theoretical gap

**Statement:** 教师情感支持在质性研究中被反复识别为中国学生情感参与度的关键因素（Zhang 2022），但主流三维模型将其排除在模型外或作为笼统的"外部环境"，缺乏教师角色嵌入模型的系统性理论工作。

**Evidence:** 综述 Group 4 + Group 5 交叉显示。

**Justification:** 集体主义文化中，教师-学生关系的权重远高于个人主义文化。西方原始模型不考虑教师角色是合理的文化省略，但直接移植到中国情境是理论空白。

**Significance:** 若教师情感支持对情感维度的影响显著强于其他维度，这意味着在亚洲情境下，参与度模型应当纳入教师角色作为文化调节变量——这是对 Fredricks 原始框架的理论扩展。

**How your study could address:** RQ2 直接对应。

---

### 未采纳的 gap（适合留给未来研究）

**Gap 4:** 情感维度定义争议（适合做概念分析论文，不适合定量验证）
**Gap 5:** 四维 vs 三维模型之争（需要更多跨文化数据，本研究资源不足以回答）

---

### Gap Typology 汇总表

| # | 类型 | 简述 | 本研究能否解决 |
|---|------|------|---------------|
| 1 | 方法空白 | 自陈-行为数据一致性未检验 | ✓（通过混合测量） |
| 2 | 经验空白 | 三维模型在中国未被大样本定量检验 | ✓（RQ1） |
| 3 | 理论空白 | 教师角色未嵌入主流模型 | ✓（RQ2） |
| 4 | 概念空白 | 情感维度定义 | ✗ 留给未来 |
| 5 | 比较空白 | 三维 vs 四维之争 | ✗ 留给未来 |

---

### Move 2 & 3 草稿（可直接插入综述结尾）

综上所述，尽管学生参与度三维模型（Fredricks et al., 2004）已获得国际广泛引用，并在数百项实证研究中被应用，本综述揭示的三类 gap 表明其在中国高校本科生情境下的应用基础仍不牢固：

**第一，方法空白**：89% 的中文参与度研究依赖自陈量表作为唯一测量手段（Zhou & Kim, 2023），而 Chen（2020）在国际样本中揭示行为数据与自陈数据的相关仅为 r=.34。中国情境下自陈-行为测量的一致性从未被系统检验，这使得基于自陈的中文参与度研究的构念效度受到根本性质疑。

**第二，经验空白**：Fredricks 原始模型基于美国 K-12 样本开发，其三维结构在中国本科生中的适用性至今缺乏大样本定量验证。少数定性研究（Zhang, 2022）的发现暗示结构可能存在文化差异，但这仅是假设而非证据。

**第三，理论空白**：教师情感支持在中国情境下的质性证据中被反复识别为关键因素（Zhang, 2022），但未被纳入三维模型的理论架构。在集体主义文化中，教师-学生关系的权重使得单纯移植西方原始模型存在理论省略。

基于上述 gap，本研究在中国三所双一流高校本科生样本（N=1200）中，同时采用结构化自陈量表与 LMS 行为日志作为混合测量，检验三维参与度模型的结构效度（RQ1），并纳入教师情感支持作为外部前因变量，考察其对三个维度的差异化影响（RQ2）。
```

---

## 使用建议

### 频率控制

- 一个综述章/综述文章通常识别 **3-5 个 gap**，不要贪多
- 其中 **2-3 个**应该由你这个研究能解决（对应你的 RQ 数量）
- 其余作为"未来研究方向"留在 Discussion

### 质量控制

生成 gap 后过这份清单：
- [ ] 每个 gap 都能指出具体证据（某个 section / 某几篇论文）
- [ ] 每个 gap 都解释了"为什么是真 gap"
- [ ] 每个 gap 都解释了"填补它的意义"
- [ ] 我能解决的 gap 和我的 RQ 一一对应
- [ ] 我避免用"更多研究需要"这类空话

### 与审稿人的对话

审稿人最爱挑刺的就是 gap 部分。预期他们会问：
- "这个 gap 真的不存在研究吗？XX 2018 的论文就讨论了"
- "为什么这个 gap 重要？填了又怎样？"
- "你说的方法空白，Yao 2019 不是用了这个方法吗？"

准备回应：
- 承认局部存在研究（但范围/深度不够）
- 具体说明填补价值
- 区分你的独特贡献和已有研究

---

## 和其他 prompt / template 的衔接

- 前置：综述主体已写完（用 `critical-synthesis.md` 逐组生成）
- 衔接：`cars-intro.md` 的 Move 2（gap）和 Move 3（占领 niche）部分直接使用本 prompt 输出
- 后续质量检查：过 `boote-beile-12.md` 第 8 项「找出并论证研究 gap」和第 10 项「与研究设计一致」
