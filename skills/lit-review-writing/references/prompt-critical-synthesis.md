# Prompt: 批判性综合段落生成

## 用途

把一组按概念聚好的文献（一个 Group 内的 5-15 篇）转化成**批判性综合段落初稿**（Torraco 2005; Whittemore & Knafl 2005），避免生成"A 说…B 说…C 说…"的堆砌式文本。

**理论基础：**
- Torraco (2005) — 整合式综述要求批判性综合而非简单汇总
- Belcher (2019) — 批判性综述的句段级指引
- Webster & Watson (2002) — 概念中心组织

---

## 何时使用

- 你已经用 `cluster-by-concept.md` 把文献分成了 3-7 组
- 现在要为某个组写综述的一段 / 一小节（5-15 页中的一段，typically 150-500 字）
- 你有这组文献的完整笔记（关键发现 + 方法 + 样本 + 局限）

---

## 使用方式

对每个概念组单独调用这个 prompt。不要一次性丢 5 组给 AI——那样输出质量会下降。

---

## 核心 Prompt（交给 Claude 执行）

```
You are an expert academic writer helping a researcher draft a critical synthesis paragraph (or short subsection) for their literature review.

## Input
The user will provide:
1. The theme / concept group name
2. The core claim of this group
3. A list of 5-15 papers with for each:
   - Author + Year
   - Study type (empirical / theoretical / review)
   - Method + Sample (if empirical)
   - Key finding / contribution
   - Limitations
   - Relationship to other papers in the group (extends / challenges / reconciles / etc.)

## Task

Draft a critical synthesis paragraph (or short section of 2-4 paragraphs if the group is large).

## STRICT Writing Rules

### Rule 1: Concept-first, not author-first

**Forbidden opening:** "Smith (2020) found..."
**Required opening:** A concept/claim sentence, with citations in parentheses or mid-sentence.

WRONG: "Smith (2020) studied X. Chen (2021) also studied X. Wang (2022) extended this..."

RIGHT: "The relationship between X and Y has been established across diverse contexts (Smith, 2020; Chen, 2021), though its generalizability to Asian populations has been more recently examined (Wang, 2022)."

### Rule 2: Synthesize, don't list

Each paragraph MUST contain at least ONE of:
- **Convergence:** what multiple studies agree on
- **Divergence:** where they disagree (and WHY — method? sample? era? theoretical stance?)
- **Maturity signal:** which claims are consolidated vs contested
- **Methodological evolution:** how methods in this area have shifted over time
- **Boundary conditions:** where findings hold and where they don't

### Rule 3: Critical, not only descriptive

Do NOT just say "Smith found X." Say:
- "Smith found X, though the sample was limited to Y (limitation)"
- "Smith's finding contrasts with Chen's, likely due to (reason)"
- "This finding rests on an assumption that remains untested (critique)"

Include at least ONE critical evaluation per 5 studies cited.

### Rule 4: Guide the reader with signposts

Use transition words to structure the argument:
- Agreement: "consistent with", "in line with", "supports"
- Contrast: "however", "in contrast", "conversely", "challenges"
- Extension: "building on", "extends", "further develops"
- Qualification: "although", "while", "despite"
- Causation/explanation: "likely because", "possibly due to"

### Rule 5: Cite properly

- Use author-year format: (Smith, 2020) or Smith (2020)
- For 3+ authors on first mention: (Smith, Chen, & Wang, 2020); subsequent: (Smith et al., 2020)
- Cite every empirical or theoretical claim

### Rule 6: Appropriate hedging

Academic claims should be appropriately qualified:
- Strong claim only with strong evidence ("meta-analyses consistently show")
- Medium claim for mixed evidence ("evidence suggests", "studies generally report")
- Weak claim for early/limited evidence ("preliminary findings indicate", "a few studies have reported")

Do NOT over-hedge (weakens all paragraphs). Do NOT under-hedge (sounds overclaiming).

### Rule 7: Flag gaps honestly

If this concept group reveals a gap (methodological, empirical, theoretical, etc.), flag it at the end of the paragraph/section. This primes the reader for Move 2 of the overall review.

## Output Format

### Primary paragraph (always)

A well-structured critical synthesis paragraph of 150-400 words.

### Optional: Second paragraph (if group has 10+ papers or high internal complexity)

A follow-up paragraph focusing on a secondary angle (e.g., methodological evolution, boundary conditions).

### Appended: Synthesis notes (metadata, for the researcher)

```
**Synthesis summary:**
- Convergence claim(s): [list]
- Divergence / tension: [list]
- Methodological pattern noted: [if any]
- Implicit gap revealed: [if any — will feed into Move 2 later]
- Papers cited: [count]
- Critical evaluations made: [count]
```

## Language

Match user's language. If the user writes in Chinese and provides Chinese literature notes, output in Chinese. The critical-synthesis rules apply equally in both languages.

Chinese-specific notes:
- Avoid "首先…其次…最后…" (formulaic = sign of list-based writing)
- Avoid "综上所述…" (use "这些研究共同揭示…" or "综合来看…" instead)
- Chinese citation style: "(张三, 2020)" or "张三 (2020)"

## Self-check before output

- [ ] Did I start the paragraph with a concept/claim, not an author?
- [ ] Did I include at least one synthesis move (convergence/divergence/evolution/boundary)?
- [ ] Did I include at least one critical evaluation?
- [ ] Did I cite every non-obvious claim?
- [ ] Is the hedging calibrated to evidence strength?
- [ ] Did I flag any gap for the researcher?

Begin drafting now.
```

---

## 使用示例

**输入：**
```
主题组：参与度的测量方法
核心论点：自陈 vs 行为数据的测量效度差异

文献清单：
1. Fredricks et al. (2004) — 理论 — 提出三维量表 SEI (52 题) — 验证于 K-12 — 未测在线情境 — 奠基
2. Henrie et al. (2015) — 综述 — 143 篇研究 — 发现测量工具高度异质 — 2000-2014 文献 — 延续 Fredricks
3. Chen (2020) — 定量 — LMS 行为日志 — N=1200 大学生 — 行为与自陈 r=.34 — 挑战自陈主导
4. Wang (2021) — 定量 — 混合测量（量表+日志）— N=500 — 认知维度 r=.58，情感维度 r=.21 — 情感维度测量困难
5. Zhou & Kim (2023) — 方法学 — 系统综述 — 53 篇中国研究 — 自陈量表占 89% — 指出方法学单一问题
```

**AI 应该输出：**

```
# 参与度测量方法

学生参与度的测量方法呈现出从单一自陈量表向多源数据整合的过渡，但其效度仍存在根本性争议。Fredricks 等（2004）的三维量表 SEI（52 题）奠定了参与度的自陈测量传统，此后 Henrie 等（2015）对 143 项在线学习研究的综述表明，测量工具高度异质，一致性欠缺。Chen（2020）基于 1200 名大学生的 LMS 行为日志研究提供了关键性挑战证据：行为参与度与自陈量表结果仅呈中等相关（r=.34），揭示两类数据测量的**可能不是同一构念**。Wang（2021）的混合测量研究进一步揭示了维度差异——认知参与度的量表-日志一致性尚可（r=.58），而情感参与度的一致性显著偏低（r=.21），这一发现暗示**情感维度的测量仍是重大挑战**。然而，中国情境下的方法学单一性更为突出：Zhou 与 Kim（2023）的系统综述显示 89% 的中文参与度研究仍以自陈量表为唯一测量手段，这限制了研究结论的外部效度，也使行为数据与自陈数据的一致性在中国情境下几乎未被检验——这一方法空白为本研究的混合测量设计提供了明确切入点。

---

**Synthesis summary:**
- Convergence claim(s): 参与度测量经历了从纯自陈向多源整合的演变
- Divergence / tension: Chen (2020) 与 Fredricks 传统之间的测量效度争议
- Methodological pattern noted: 定量研究中自陈占主导，行为日志作为补充近年兴起
- Implicit gap revealed: 中国情境下行为-自陈一致性未被检验（methodological + empirical gap）
- Papers cited: 5
- Critical evaluations made: 3（Henrie 综述的工具异质性、Chen 揭示的效度差异、Zhou & Kim 指出的方法学单一）
```

---

## 人类编辑环节（必做，不可跳）

**AI 生成 ≠ 定稿**。拿到 AI 初稿后，你必须：

1. **逐句核对引用**：每个 `(Author, Year)` 都查你的原始笔记，确认观点归属正确
2. **加锋芒**：AI 倾向保守（"研究表明"），你要加强批判（"这一假设忽视了…"）
3. **检查时代感**：AI 可能把过时研究当新证据，你确认文献是否反映当前研究前沿
4. **与上下文衔接**：AI 不知道你前面段落说了什么，你调整过渡句
5. **压缩或扩展**：AI 默认输出 200-400 字，你根据综述章要求调整

---

## 避免 AI 陷阱

### 陷阱 1：虚构引用

AI 可能编造作者、年份、甚至页码。**每条引用必须手工核验**。

### 陷阱 2：张冠李戴

AI 可能把 A 的观点错归给 B。特别是当多篇论文讨论同一概念时。

### 陷阱 3：过度中立

AI 倾向说"有争议"、"需要更多研究"这种水话。强迫 AI 给具体立场：
- "你认为 Smith 还是 Chen 的证据更强？为什么？"
- "如果让你判断，哪个测量方法更值得推广？"

### 陷阱 4：堆砌复发

即使给了"不要堆砌"的指令，AI 在文献多时还是会退化成堆砌。解决：
- 输入不超过 10 篇
- 明确要求"先写一段 topic sentence，然后整合 5 篇的贡献到这个论点下"

---

## 和其他 prompt 的衔接

- 前置：`cluster-by-concept.md`（必须先聚类）
- 同时用：`critical-synthesis.md`（本文件）对每组生成一段
- 后续：`identify-gap.md`（综合段落初稿 → 找 gap → 写 Move 2）
