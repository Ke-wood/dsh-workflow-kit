# Boolean 运算符 + MeSH / 受控词 + 检索技巧

---

## Boolean 基础三运算符

### AND（交集 — 缩小）

- `A AND B` = 同时包含 A 和 B
- 结果量减少
- 用于把多个概念块组合

**例：** `"digital transformation" AND "small business"`

### OR（并集 — 扩大）

- `A OR B` = 包含 A 或 B（至少一个）
- 结果量增加
- 用于同义词组合

**例：** `"small business" OR "SME" OR "small and medium enterprise*"`

### NOT（差集 — 排除）

- `A NOT B` = 包含 A 但不包含 B
- **慎用** — 会误伤（某些相关论文可能提及了 B）
- 仅在明显无关主题大量污染结果时用

**例：** `"engagement" NOT "marketing"` （排除营销学的 engagement）

---

## 运算顺序与括号

默认顺序：NOT > AND > OR（但不同库可能不同）

**不要依赖默认，用括号明确：**

```
("digital transformation" OR "digitalization" OR "digitization") 
AND 
("small business" OR "SME" OR "small and medium enterprise*")
AND 
("China" OR "Chinese")
```

---

## 截断符（Truncation）

用于匹配同一词根的多种形式。

| 符号 | 作用 | 例 |
|-----|------|----|
| `*` | 多字符截断 | `writ*` → write, writes, writing, writer, writers, written |
| `?` | 单字符通配 | `wom?n` → woman, women |
| `$` | 零或一字符 | `labo$r` → labor, labour |

**注意：** 不同数据库的截断符可能不同：
- WoS / Scopus / PubMed：`*`
- CNKI：支持 `*` 但不如英文库灵活
- 某些库用 `?` 代替 `*`

查当前库的帮助文档确认。

---

## 短语搜索（Phrase Search）

用**双引号**把多个词锁成短语。

- `digital transformation` = 两个词都出现（不一定相邻）
- `"digital transformation"` = 完整短语

**差别示例：**

- `digital transformation` 会命中 "... digital products' transformation..."
- `"digital transformation"` 只命中完整短语

---

## 邻近运算符（Proximity）

要求两个词**在一定距离内**出现。各库语法不同：

- WoS: `NEAR/n` — 相距 n 词内
  - `"digital" NEAR/3 "transformation"` = 两词相距 3 词内
- Scopus: `PRE/n` — 有顺序
  - `"digital" PRE/3 "transformation"` = digital 在前，transformation 在 3 词内
- Ovid: `adj n`
- CNKI: 支持但语法不同

**何时用：** 当主题需要精确但同义词多时（如 digital transformation 有时被写成 "transformation that is digital"）

---

## 字段限定（Field Search）

把搜索限定到某字段（标题 / 摘要 / 关键词 / 作者 / 年份）。

### Web of Science

```
TS = ("digital transformation")     # 主题（标题+摘要+关键词）
TI = ("digital transformation")     # 标题
AU = ("Yan Zhanlin")                # 作者
PY = 2020-2024                       # 发表年份
SO = ("MIS Quarterly")               # 期刊名
```

### PubMed

```
"digital transformation"[Title/Abstract]
"digital transformation"[MeSH]
Yan Z[Author]
2020:2024[Date - Publication]
```

### CNKI

```
SU = '数字化转型'                     # 主题
TI = '数字化转型'                     # 题名
AU = '某作者'                         # 作者
YE = 2020-2024                       # 年份
```

---

## 受控词表（Controlled Vocabulary）

### 什么是受控词

数据库给文献打的**标准化标签**，可以帮你找到"说同一概念但用不同词"的论文。

### 主要受控词表

| 库 | 受控词系统 | 访问 |
|----|----------|------|
| PubMed | **MeSH** (Medical Subject Headings) | MeSH Browser |
| Embase | Emtree | Emtree Explorer |
| PsycINFO | APA Thesaurus | PsycINFO Thesaurus |
| ERIC | ERIC Thesaurus | ERIC Thesaurus |
| CNKI | 主题词 | CNKI 主题词表 |
| CBM | 中文 MeSH | CBM 主题词表 |

### 如何用 MeSH

**例：** 搜"乳腺癌"

- 关键词搜：`"breast cancer"` → 可能漏掉 `"mammary neoplasms"` 等变体
- MeSH 搜：`"Breast Neoplasms"[MeSH]` → 自动覆盖所有子类和同义词

### 使用流程

1. 进入 PubMed MeSH Browser
2. 搜你的概念
3. 看正式 MeSH 词条及其子类（Subheadings）
4. 决定用 MeSH 还是关键词（或两者都用）

### 关键词 vs MeSH

| 情况 | 推荐 |
|------|------|
| 新概念（MeSH 还没更新） | 关键词 |
| 历史研究（MeSH 曾变过） | 关键词 + 旧 MeSH |
| 系统综述 | **两者都用**（OR 连接）|
| 探索性 | MeSH |

---

## 完整搜索字符串模板

### 医学系统综述示例（PubMed）

```
("artificial intelligence"[Title/Abstract] 
   OR "AI"[Title/Abstract] 
   OR "machine learning"[Title/Abstract] 
   OR "Artificial Intelligence"[MeSH])
AND 
("breast cancer"[Title/Abstract] 
   OR "Breast Neoplasms"[MeSH])
AND 
("diagnosis"[Title/Abstract] 
   OR "Diagnosis"[MeSH])
AND 
("2020/01/01"[Date - Publication] : "2024/12/31"[Date - Publication])
NOT
("review"[Publication Type] OR "systematic review"[Publication Type])
```

### 社科综述示例（Web of Science）

```
TS = (("digital transformation" OR "digitalization" OR "digital strategy")
       AND
      ("SME*" OR "small business*" OR "small and medium enterprise*")
       AND
      ("China" OR "Chinese" OR "Mainland China"))
AND 
PY = 2020-2024
AND 
DT = (Article OR Review)
```

### 中文检索示例（CNKI）

```
(SU = '数字化转型' OR SU = '数字化' OR SU = '数字经济')
AND 
(SU = '中小企业' OR SU = 'SME' OR SU = '小微企业')
AND 
YE BETWEEN ('2020', '2024')
AND 
SRC = ('CSSCI' OR '核心期刊')
```

---

## 避免过度聚焦的陷阱

### 陷阱 1：关键词过于精确 → 漏检

```
过细: "Chinese university freshmen English writing engagement with ChatGPT"
```
→ 可能只命中几篇，漏掉用其他词的相关研究

**对策：** 各概念块 3-8 个同义词，OR 连接

### 陷阱 2：关键词过于宽泛 → 噪音淹没

```
过宽: "AI" AND "writing" 
```
→ 可能命中 50000+ 条

**对策：** 加具体情境 + 受控词 + 时间限制

### 陷阱 3：忘了时态 / 词性变体

```
"writing" 漏掉 "write", "writes", "writer"
```

**对策：** 用截断符 `writ*`

### 陷阱 4：不查受控词

**对策：** 系统综述必用 MeSH / Emtree / 主题词

---

## 迭代策略

第一轮（宽松）：
- 每个概念块用 5-10 个同义词
- 看命中数和相关度
- 如果 >1000 条，加限制

第二轮（收紧）：
- 根据第一轮结果调整关键词
- 加受控词
- 加字段限定

第三轮（精准）：
- 精简到核心概念
- 加时间 / 语言 / 文献类型限制
- 确保能复现

**每次改动都记录在 search log。**

---

## 搜索字符串自检

搜完检查：

- [ ] 命中数合理（医学 50-300，社科 100-500，CS 100-1000）
- [ ] 前 20 条相关度高（> 70% 相关）
- [ ] 你熟悉的 3-5 篇关键论文能被检索到
- [ ] 用截断符覆盖了词性变化
- [ ] 受控词和关键词都用了

全勾 = 好策略。有一条不达标 = 继续改。
