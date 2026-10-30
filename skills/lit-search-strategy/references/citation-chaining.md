# 引文追踪（Citation Chaining / Snowballing）

> **核心参考：**
> - Wohlin, C. (2014). Guidelines for snowballing in systematic literature studies and a replication in software engineering. *EASE '14: Proceedings of the 18th International Conference on Evaluation and Assessment in Software Engineering*, 1–10.
> - Haddaway, N. R., Grainger, M. J., & Gray, C. T. (2022). citationchaser: A tool for transparent and efficient forward and backward citation chasing in systematic searching. *Research Synthesis Methods*, 13(4), 533–545.

---

## 什么是引文追踪

除了关键词数据库检索，另一条重要路径：**从已知相关论文出发，追踪其引用关系**。

- **向后追踪（Backward）** — 读 A 论文的参考文献，找 A 所引用的前序研究
- **向前追踪（Forward）** — 查被 A 引用的论文（Google Scholar "Cited by" 功能）

这是 Wohlin 2014 定义的 **snowballing** 方法学。

---

## 为什么必做

1. **数据库检索有遗漏** — 关键词不可能穷尽
2. **能找到"未想到的论文"** — 同主题但用不同术语的研究
3. **形成网络视图** — 不是孤立论文，而是有对话关系的研究群
4. **验证关键论文没漏** — 系统综述的同行评议常问"为什么没引 Smith 2020？"

---

## 操作流程

### Step 1：确定"种子"论文（Seed Papers）

从数据库检索中筛 **5-10 篇最相关**的论文作为种子。

选择标准：
- 直接回答 RQ
- 高被引
- 近期（便于 forward chaining）
- 经典奠基（便于 backward chaining）

### Step 2：向后追踪（Backward Chaining）

打开每篇种子论文的**参考文献列表**。

- 扫描标题和作者年份
- 标注看起来相关的 → 加入候选池
- 每篇种子论文通常能追出 5-20 篇候选

### Step 3：向前追踪（Forward Chaining）

查每篇种子论文的"**被引**"：

- **Google Scholar**："Cited by X" 按钮
- **Web of Science**："Cited Reference Search"
- **Scopus**："Cited by" 标签

每篇种子能追出 50-500+ 篇候选（近期高被引论文更多）。

### Step 4：筛选候选池

向后 + 向前合计可能 100-500 条。用**标题筛选**：

- 标题明显相关 → 保留
- 标题可能相关 → 读摘要
- 标题无关 → 剔除

### Step 5：新纳入的论文作为新种子

对新纳入的论文**再追踪一轮**。

当不再有新增相关论文时 → **达到饱和**，停止。

---

## 工具支持

### citationchaser (开源)

Haddaway 2022 发布的工具，自动化 backward + forward chaining：

- 输入：DOI 列表
- 输出：该论文的所有引用和被引
- 网址：app.citationchaser.com

**优点：** 批量处理多篇种子，比手工快 10 倍

### Connected Papers

- 可视化：论文之间的引用网络图
- 适合探索性（不是系统综述）
- 网址：connectedpapers.com

### Research Rabbit

- 文献发现平台
- 自动推荐相关论文
- 网址：researchrabbit.ai

### Inciteful

- 简单的 citation graph 工具
- 免费
- 网址：inciteful.xyz

### Litmaps

- 类似 Research Rabbit
- 付费为主

**重要提醒：** Connected Papers / Research Rabbit / Inciteful 等**没有同行评议的学术论文**描述其方法（citationchaser 除外）。系统综述引用时需注意：把它们作为**辅助工具**，不作为主方法。

---

## 手工 vs 工具

**手工追踪：**
- **优势：** 每篇论文都能深读（明白为什么这篇论文引了那篇）
- **劣势：** 慢
- **适用：** 小规模综述（种子 <5 篇）

**工具辅助：**
- **优势：** 快，能处理大量种子
- **劣势：** 批量导出后仍需人工筛选
- **适用：** 系统综述 / 大规模综述

---

## 何时用 Forward 何时用 Backward

### Forward 更强的场景

- 主题是**新兴领域**（老论文的被引代表了当前发展）
- 种子是**经典论文**（被引网络庞大）
- 想找**最新进展**

### Backward 更强的场景

- 主题是**成熟领域**（需要找奠基文献）
- 种子是**新近论文**（其参考文献是前期研究全貌）
- 想追**思想演变**

### 两者结合（推荐）

系统综述通常**同时**做 Forward + Backward。

---

## 引文追踪在 PRISMA-S 中的要求

PRISMA-S 第 5 项明确要求报告：

1. 是否进行了 citation chaining？
2. Forward / Backward / 还是都做了？
3. 从哪些种子论文开始？
4. 方法（手工 / 工具）？
5. 停止的标准（饱和 / 时间限制）？

**Methods 段写法：**

```markdown
为减少数据库检索的遗漏，本综述对 8 篇种子论文
（XXXX）进行了前向和后向引文追踪。
使用 citationchaser（Haddaway et al., 2022）工具批量处理，
并通过 Web of Science Cited Reference Search 人工验证。

追踪结果合计 347 条新候选，经标题筛选保留 23 条，
经全文审阅纳入最终综述 9 条。

追踪停止标准：连续 2 轮追踪无新增符合纳入标准的论文。
```

---

## 常见陷阱

### 陷阱 1：只追 Forward 不追 Backward

- 漏掉奠基性老文献（> 20 年前）
- 导致综述看起来"只关注近 5 年"

### 陷阱 2：Google Scholar 当唯一 Forward 源

- GS 的 "Cited by" 不完整（小期刊被引可能漏）
- **建议：** Scholar + Scopus + WoS 交叉

### 陷阱 3：不记录流程

- 答辩 / 审稿要求"你怎么知道没漏关键论文"答不出
- **建议：** 记录每篇种子追出多少条，保留多少条

### 陷阱 4：追得太广

- 一篇种子追出 500+ 候选，全纳入候选池太大
- **建议：** 每轮追踪设**最大候选数**（如 200），超出部分按被引数排序

### 陷阱 5：无限递归

- 新种子又追新种子，越追越多
- **建议：** 设**最大轮数**（通常 2-3 轮），或"饱和"标准

---

## 实操 Checklist

- [ ] 选出 5-10 篇种子论文
- [ ] 每篇做 Backward（读参考文献）
- [ ] 每篇做 Forward（查被引）
- [ ] 用 citationchaser 或手工记录
- [ ] 筛选候选池
- [ ] 记录追踪过程（用于 PRISMA-S 报告）
- [ ] 判断是否达到饱和
- [ ] 如未饱和，用新种子再追一轮

---

## 与数据库检索的关系

```
数据库关键词检索 → 得到候选池 A
          ↓
筛出 5-10 篇种子论文
          ↓
引文追踪 → 得到候选池 B
          ↓
合并 A + B，去重
          ↓
按纳入标准筛选
          ↓
最终纳入综述的文献
```

**两者都是必需**。只用数据库检索 = 遗漏；只用引文追踪 = 起点偏见。
