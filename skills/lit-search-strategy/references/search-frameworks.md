# PICO / PICOC / SPIDER 用于检索（而非选题验证）

> **注：** 这些框架在 `选题验证/references/question-frameworks.md` 已详解。本文件只讲**用于构建检索策略**的角度。

---

## 框架选择回顾

- 定量 + 干预效应 → **PICO**
- 定量 + 社科情境 → **PICOC**
- 质性研究 → **SPIDER**

---

## 把框架用于检索（流程）

### Step 1：按框架拆解 RQ

把你的 RQ 拆到每格。每格只写**一个核心词**。

### Step 2：对每格做同义词扩展

每个核心词扩出 **3-8 个同义表达**：

- 学术同义词（MeSH / 主题词）
- 俗称（行业术语、口语表达）
- 反义词（有时反方向的词也有效）
- 中英双译

### Step 3：组合为搜索字符串

- 每格内的同义词用 **OR** 连接
- 不同格之间用 **AND** 连接

模板：

```
(核心词1a OR 核心词1b OR 核心词1c)   ← Population 的同义词
AND 
(核心词2a OR 核心词2b OR 核心词2c)   ← Intervention 的同义词
AND 
(核心词3a OR 核心词3b OR 核心词3c)   ← Outcome 的同义词
```

**Context / Comparison 作为可选**（有明显限制时加）。

---

## 完整检索字符串示例

### 示例 1：PICO（医学）

**RQ:** AI 辅助 breast cancer 诊断相比传统方法的准确率如何？

**PICO 拆解：**

- P: 乳腺癌患者
- I: AI 辅助诊断
- C: 传统影像诊断
- O: 诊断准确率

**同义词扩展：**

- P: "breast cancer" OR "breast neoplasm*" OR "mammary carcinoma" OR "乳腺癌"
- I: "artificial intelligence" OR "machine learning" OR "deep learning" OR "AI" OR "CNN"
- C: 不设（让数据库自己筛）
- O: "diagnosis" OR "accuracy" OR "sensitivity" OR "specificity"

**Web of Science 搜索字符串：**

```
TS = (("breast cancer" OR "breast neoplasm*" OR "mammary carcinoma")
       AND
      ("artificial intelligence" OR "machine learning" OR "deep learning")
       AND
      ("diagnosis" OR "accuracy" OR "sensitivity" OR "specificity"))
AND
PY = 2020-2024
```

### 示例 2：PICOC（教育）

**RQ:** ChatGPT 辅助写作对中国大学生写作质量的影响（vs 传统指导）？

**PICOC：**

- P: 中国大学生
- I: ChatGPT 辅助写作
- C: 传统教师指导
- O: 写作质量
- **Context:** 中国高校英语写作课

**同义词扩展：**

- P: "Chinese" AND ("undergraduate*" OR "college student*" OR "university student*")
- I: "ChatGPT" OR "generative AI" OR "GPT" OR "AI-assisted writing" OR "LLM"
- C: "peer review" OR "teacher feedback" OR "traditional instruction"
- O: "writing quality" OR "writing performance" OR "writing outcome*"
- Context: "English writing" OR "EFL writing" OR "L2 writing"

**Scopus 搜索字符串：**

```
TITLE-ABS-KEY (
  ("Chinese" AND ("undergraduate*" OR "university student*"))
  AND 
  ("ChatGPT" OR "generative AI" OR "LLM")
  AND 
  ("writing quality" OR "writing performance")
  AND 
  ("English writing" OR "EFL" OR "L2 writing")
)
AND PUBYEAR > 2022
```

### 示例 3：SPIDER（质性）

**RQ:** 中国肿瘤病人家属的照护经历？

**SPIDER：**

- S: 肿瘤病人家属
- P (Phenomenon of Interest): 长期照护经历与身份构建
- D: 半结构访谈
- E: 诠释现象学分析
- R: 质性

**同义词扩展：**

- S: ("cancer patient*" OR "oncology patient*") AND ("caregiver*" OR "family member*" OR "relative*")
- P: "care experience" OR "caregiving experience" OR "lived experience" OR "caregiver burden"
- D: "interview*" OR "qualitative interview*"
- E: "phenomenological analysis" OR "IPA" OR "thematic analysis"
- R: "qualitative" OR "qualitative research"

**PubMed 搜索字符串：**

```
(("cancer patient*"[TIAB] OR "oncology patient*"[TIAB]) 
   AND 
 ("caregiver*"[TIAB] OR "family member*"[TIAB]))
AND 
("care experience"[TIAB] OR "caregiving experience"[TIAB] OR "lived experience"[TIAB])
AND 
("qualitative"[TIAB] OR "phenomenological"[TIAB] OR "IPA"[TIAB])
```

---

## 框架用于检索 vs 用于选题验证的区别

| 用途 | 做什么 |
|------|-------|
| **选题验证**（见 `选题验证` skill）| 填每格判断题是否**足够具体** |
| **文献检索**（本文件）| 用每格扩同义词做**搜索字符串** |

同一个框架，两个阶段用法不同。

---

## 常见错误

### 错误 1：一格只放一个词

```
P: "Chinese undergraduate"
```

漏掉 "Chinese college student"、"Chinese university student" 的论文。

**对策：** 每格 3-8 个同义词 OR 连接。

### 错误 2：跨格用了 OR

```
"Chinese undergraduate" OR "ChatGPT" OR "writing"
```

这会命中任何提到这三个词之一的论文（垃圾结果）。

**对策：** 跨格必须用 AND。

### 错误 3：PICO 四格全填满却不区分

如果 P / I / C / O 不明确，就别硬填，考虑换成 SPIDER 或自由关键词组合。

### 错误 4：忽略 Context

社科研究**情境高度依赖**。美国大学生 vs 中国大学生结果可能完全不同。

**对策：** 有明显情境限制的题用 PICOC 而非 PICO。

---

## 迭代（根据结果调整框架）

**结果过少（<30 条）：**
- 减同义词 OR 条件（一格 OR 从 3 个减到 2 个）
- 去掉最严格的一格（通常是 Comparison 或 Context）
- 放宽时间范围

**结果过多（>1000 条）：**
- 加同义词（确保每个概念都扩够）
- 加 Context 限制
- 收紧时间范围
- 加字段限定（只在标题 / 摘要）
- 加文献类型限制（只期刊文章 / 综述）

**相关度低（前 20 条不相关）：**
- 你的同义词扩展可能错了
- 某些同义词有其他含义污染了结果
- 用受控词替代关键词（减少歧义）

---

## 检索完成后的衔接

框架扩出来的搜索字符串 → 保存在 `assets/search-log.md` → 下一步去 `assets/picos-worksheet.md` 填出完整的 PICO/SPIDER 作为 Methods 章节附录。
