# Prompt: 按概念聚类文献笔记

## 用途

给一堆论文笔记或概念矩阵，让 AI 把零散的概念聚成 3–7 个大主题组，用于后续按主题组织综述段落。

**理论基础：** Webster & Watson (2002) 概念中心方法——综述必须按概念组织，这个 prompt 是从"一堆论文"到"按概念组织"的关键工具。

---

## 何时使用

- 你已经填好了 `concept-matrix.md`（至少 20 篇文献 + 10-30 个概念列）
- 或你有一堆结构化论文笔记（每篇笔记含关键概念标签）
- 现在要决定综述章分几个主题节，每节包含哪些概念

---

## 使用方式

### 方式 A：调用 Claude Code

```
/科研-文献综述 聚类
（粘贴你的概念矩阵或笔记列表）
```

Claude 会调用下面的 prompt 处理。

### 方式 B：直接复制下面 prompt 到任何 AI 对话

---

## 核心 Prompt（交给 Claude 执行）

```
You are an expert methodologist helping a researcher organize a literature review.

## Task
Given a list of papers with their extracted concepts (or a concept matrix), cluster the concepts into 3-7 higher-level thematic groups that can serve as subsection headings in a literature review.

## Input Format Expected
The user will provide either:
- A concept matrix (papers × concepts grid)
- A flat list of concepts with associated papers
- A list of paper notes with concept tags

## Clustering Principles (Strict)

1. **Concept-centered, not author-centered.** Groups MUST be named by concepts/themes, NOT by time periods ("early research vs recent"), nationalities ("Western vs Chinese"), or research methods ("quantitative vs qualitative").

2. **Mutually exclusive, collectively exhaustive (MECE).** Every input concept should belong to exactly one group. If a concept legitimately spans two groups, flag it explicitly.

3. **Right granularity.** 3-7 groups total. Fewer than 3 = too coarse (won't differentiate subsections). More than 7 = too granular (reader loses thread).

4. **Each group should support a coherent narrative.** Ask: "Can I write one coherent 5-10 page subsection about just this group?"

5. **Groups should reflect the literature's conceptual structure, not impose an external framework** (unless the researcher explicitly specifies a theoretical lens).

## Output Format

For each group, provide:

### Group [N]: [Group name — a concept or theme, 3-8 characters]

**Concepts included:** [list of concepts from input]

**Core claim of this group:** [1 sentence: what is the thematic thread that unites these concepts?]

**Papers primarily contributing to this group:** [5-15 key papers from input]

**Narrative arc for subsection:** [2-3 sentences: what's the story this subsection will tell — what's established, what's contested, what's evolving]

**Connection to adjacent groups:** [how this group relates to groups N-1 and N+1]

### Cross-cutting concepts (if any)
[Concepts that legitimately span multiple groups — flag them for the researcher to decide placement]

### Coverage check
[Any input concept you couldn't cluster? List them with a note on why.]

## Quality Self-Check (apply before output)

- [ ] Are group names concept-based (not time/geography/method)?
- [ ] Is each group narratable as a coherent subsection?
- [ ] Is total count 3-7?
- [ ] Is every input concept assigned (or flagged as cross-cutting)?
- [ ] Does the sequence of groups have a logical flow?

## Language Output

Match the user's language (if they write in Chinese, output in Chinese; if English, English).

Begin clustering now.
```

---

## 使用示例

**输入：**
```
已读 62 篇关于"在线学习学生参与度"的文献。从中提取概念：

1. 参与度三维模型（行为/情感/认知）
2. 四维模型（行为/情感/认知/社交）
3. LMS 点击流数据
4. 自陈量表
5. 情感维度定义争议
6. 学习动机
7. 自我调节能力
8. 教师反馈频率
9. 教师情感支持
10. 同伴互动
11. 平台设计（视频 / 讨论区 / 小测）
12. 内容难度
13. 课程结构
14. 中国文化情境
15. 集体主义调节作用
16. 亚洲 vs 西方样本
17. COVID-19 期间特殊情境
18. 行为参与度测量效度
19. 情感参与度测量效度
20. 认知参与度测量效度
... (共 28 个概念)
```

**AI 应该输出：**

```
### Group 1：参与度的概念与维度演变
概念：1, 2, 5
核心论点：参与度的理论模型从三维到四维的演变，以及情感维度定义的争议
贡献文献：Fredricks et al. 2004; Henrie et al. 2015; Kim et al. 2023; Zhang 2022
叙事弧：Fredricks 三维奠基 → Kim 等提出四维挑战 → 情感维度定义在四维框架下仍未共识
关联：为 Group 2 的测量问题做概念铺垫

### Group 2：参与度的测量方法
概念：3, 4, 18, 19, 20
核心论点：自陈 vs 行为数据的测量效度差异
贡献文献：Chen 2020; Henrie et al. 2015; Fredricks et al. 2004
叙事弧：量表测量主流 → LMS 日志数据兴起 → 两者一致性存疑
关联：Group 1 的概念模糊导致 Group 2 的测量困难

### Group 3：学习者个体因素
概念：6, 7
核心论点：动机与自我调节作为参与度的内在驱动
贡献文献：[相关 8 篇]
叙事弧：...

### Group 4：教学环境因素
概念：8, 9, 10, 11, 12, 13
核心论点：教师行为与平台设计对参与度的影响
贡献文献：...

### Group 5：文化情境与边界条件
概念：14, 15, 16, 17
核心论点：三/四维模型在中国情境与特殊时期的适用性
贡献文献：...

### Cross-cutting
概念 9（教师情感支持）同时属于 Group 4（环境）和 Group 1（情感维度定义），
建议：放在 Group 4 为主，Group 1 做引用提示

### Coverage check
所有 28 个概念均已归类。
```

---

## 后续步骤

拿到 5 组后：

1. 在 `concept-matrix.md` 的基础上，按这 5 组重排列
2. 每组写综述一节（2.3, 2.4, 2.5, 2.6, 2.7）
3. 每节用 `prompts/critical-synthesis.md` 生成段落初稿
4. 最后用 `prompts/identify-gap.md` 找出六类 gap

---

## 常见问题

### Q：AI 给的分组我不满意怎么办？

多试几次，或给 AI 更多上下文：
- 你的 RQ 是什么
- 你希望从哪个理论视角看
- 你的读者是谁（决定抽象层级）

### Q：概念矩阵有 50+ 个概念，AI 分组不理想？

先手工预筛：
- 删除太笼统的概念（"学习"这种）
- 合并明显同义的（"师生互动" = "教师互动"）
- 剩 15-25 个核心概念再丢给 AI

### Q：分组后发现某组只有 3-4 篇文献？

- 如果文献本身少（新兴领域），可以保留但说明
- 否则合并到相邻组，避免写一节只讲几篇

### Q：能否直接让 AI 写综述段落？

**强烈不建议跳过这一步。** 直接让 AI 写综述段落 = 输出堆砌式文本（因为 AI 没有按概念组织的结构约束）。必须先聚类，再按组生成。
