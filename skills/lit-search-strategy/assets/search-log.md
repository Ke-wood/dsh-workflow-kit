# 检索日志（Search Log）

> 每次检索都要记录。可复现性的核心。
> PRISMA-S 第 6、16、17 项要求此类日志。

---

## 日志格式

每次检索填一行。多次迭代保留历史。

---

## 表头

| 日期 | 数据库 | 搜索字符串（完整）| 限制条件 | 命中数 | 去重后 | 标题筛选保留 | 全文审阅保留 | 最终纳入 |
|------|-------|-----------------|---------|--------|-------|------------|------------|---------|

---

## 数据行（示例）

| 2025-01-15 | Web of Science | `TS=("ChatGPT" OR "generative AI") AND TS=("writing" OR "composition") AND TS=("Chinese" OR "China")` | PY=2022-2024 | 187 | 175 | 45 | 23 | 12 |
| 2025-01-15 | Scopus | `TITLE-ABS-KEY("ChatGPT" AND "writing" AND "Chinese")` | PUBYEAR>2021 | 234 | 210 | 58 | 28 | 15 |
| 2025-01-16 | PubMed | (medical 相关部分) | 2022-2024 | 45 | 42 | 8 | 3 | 2 |
| 2025-01-16 | CNKI | `SU='ChatGPT' AND SU='写作' AND SU='大学生'` | YE=2022-2024 | 89 | 82 | 20 | 12 | 8 |
| 2025-01-17 | Google Scholar | ChatGPT Chinese university writing | 2022+, 前 200 | 200 | 195 | 35 | 12 | 3（灰色文献补充） |

---

## 汇总

| | 数字 |
|-|-----|
| 总命中（所有库） |  |
| 去重后 |  |
| 标题筛选保留 |  |
| 全文审阅保留 |  |
| 最终纳入综述 |  |

---

## PRISMA 流程图数据（填完生成）

```
Identification（识别）
  Records identified from databases: N = ___
    - Web of Science: ___
    - Scopus: ___
    - PubMed: ___
    - CNKI: ___
    - Other: ___
  Records identified from other sources:
    - Grey literature: ___
    - Citation chaining: ___
    - Hand searching: ___
  Total identified: ___

Screening（筛选）
  Records after duplicates removed: ___
  Records screened (title/abstract): ___
  Records excluded: ___

Eligibility（资格）
  Full-text articles assessed: ___
  Full-text articles excluded with reasons:
    - Reason 1: ___ (N)
    - Reason 2: ___ (N)
    - Reason 3: ___ (N)

Included（纳入）
  Studies included in qualitative synthesis: ___
  Studies included in quantitative synthesis (meta-analysis): ___
```

---

## 迭代记录

### 第 1 轮（探索性）

日期: _______________
目的: 了解领域主要文献
关键发现:
- _______________
- _______________
调整: 下一轮增加同义词 _______________

### 第 2 轮（正式检索）

日期: _______________
调整后的字符串: _______________
结果: _______________

### 第 3 轮（更新）

日期: _______________（写作期间更新）
新增文献: _______________

---

## 筛选标准（Inclusion / Exclusion Criteria）

### 纳入标准

- [ ] 主题：关于 _______________
- [ ] 研究类型：_______________（实证/综述/理论）
- [ ] 人群：_______________
- [ ] 时间：_______________
- [ ] 语言：_______________
- [ ] 文献类型：_______________（期刊/会议/学位/报告）

### 排除标准

- [ ] 非同行评议（除非灰色文献章节）
- [ ] 非相关主题 (off-topic)
- [ ] 重复发表
- [ ] 无全文可获取
- [ ] 其他: _______________

---

## 搜索策略同行评议（PRESS）

如果做系统综述，应有一位 librarian 或同行审阅你的搜索策略。

| PRESS 项 | 评审意见 | 修改 |
|---------|---------|------|
| 1. 与 RQ 匹配度 |  |  |
| 2. 布尔逻辑 |  |  |
| 3. 同义词覆盖 |  |  |
| 4. 受控词使用 |  |  |
| 5. 字段限定 |  |  |
| 6. 过滤（时间 / 类型） |  |  |

参考: McGowan, J., et al. (2016). PRESS peer review of electronic search strategies: 2015 guideline statement. *Journal of Clinical Epidemiology*, 75, 40-46.

---

## Export 记录

| 日期 | 数据库 | 导出格式 | 文件名 | 保存位置 |
|-----|-------|---------|--------|--------|
|  | WoS | RIS |  |  |
|  | Scopus | CSV |  |  |
|  | PubMed | NBIB |  |  |
|  | CNKI | Endnote |  |  |

---

## 使用建议

1. **每次检索立即填**（别以为"等下再记" — 几天后就忘了具体字符串）
2. **保存原始命中** — 每次导出时用命名规则（如 `wos_20250115.ris`）
3. **版本控制** — 搜索字符串改版保留历史，不覆盖
4. **半年重新搜一次**（论文写作期间）— 新文献持续产出
