# 第三方组件声明 / Third-Party Notices

本套件（`dsh-workflow-kit`）的**代码与自建内容**采用 MIT 许可（见 `LICENSE`）。
随包分发的 `skills/` 目录中，部分 skill 来自第三方项目，其许可如下。

---

## 1. 本仓库原创（MIT）

| 内容 | 说明 |
|---|---|
| `index.js` | 注册 skills 目录的 Host 插件 |
| `cordis.patch.yml` | 五个 agent preset 声明 |
| `skills/baseline-survey/` | 基线调研 skill（原创） |
| `skills/ROUTING.md` | skill 路由表（原创） |
| `skills/sci-figure-kit/` | 科研绘图工具箱（原创） |

Copyright (c) 2026 Ke wood

---

## 2. superpowers — MIT License

来源：https://github.com/obra/superpowers
许可全文：`licenses/superpowers-MIT.txt`
Copyright (c) 2025 Jesse Vincent

包含的 skill：

| 目录 | 说明 |
|---|---|
| `skills/dispatching-parallel-agents/` | 并行委派 |
| `skills/subagent-driven-development/` | 子代理驱动开发（本仓库重构为薄索引 + references） |
| `skills/verification-before-completion/` | 完成前验证 |
| `skills/executing-plans/` | 执行计划 |
| `skills/writing-plans/` | 编写计划 |
| `skills/systematic-debugging/` | 系统化调试 |

> **修改说明**：`subagent-driven-development/SKILL.md` 由原 32KB 重构为约 4.7KB 的索引，
> 原文完整保留在 `references/full-guide.md`，未删减内容，仅为适配 8192 字符的裁剪阈值。

---

## 3. literature-review-skill — MIT License

来源：https://github.com/zhanlin-yan/literature-review-skill
许可全文：`licenses/literature-review-skill-MIT.txt`
Copyright (c) 2026 YAN (zhanlin_yan@sutd.edu.sg)

包含的 skill：

| 目录 | 原目录名 |
|---|---|
| `skills/lit-search-strategy/` | 文献检索 |
| `skills/lit-deep-reading/` | 文献精读 |
| `skills/lit-review-writing/` | 文献综述写作 |

> **修改说明**：原目录名为中文。DSH 的 skill 名必须匹配 `^[a-z0-9]+(?:-[a-z0-9]+)*$`，
> 中文名会被静默跳过，故改为上述英文名；`SKILL.md` 的 `name` 字段同步更新，**内容未改**。

---

## 4. nature-skills — Apache License 2.0

来源：https://github.com/nature-skills/nature-skills
许可全文：`licenses/nature-skills-Apache-2.0.txt`

包含的 skill：

| 目录 |
|---|
| `skills/nature-academic-search/` |
| `skills/nature-citation/` |
| `skills/nature-polishing/` |
| `skills/nature-reader/` |
| `skills/nature-writing/` |

> Apache 2.0 要求保留版权与许可声明。原文未修改。

---

## 5. dailypaper-skills — Apache License 2.0

来源：https://github.com/dailypaper-skills/dailypaper-skills
许可全文：`licenses/dailypaper-skills-Apache-2.0.txt`

包含的 skill：

| 目录 |
|---|
| `skills/paper-reader/` |

> Apache 2.0 要求保留版权与许可声明。原文未修改。

---

## 许可兼容性说明

- MIT 与 Apache-2.0 兼容：可以共同分发。
- Apache-2.0 组件保留了各自的许可全文，未以 MIT 覆盖。
- 本仓库整体对外以 MIT 发布，**但 `skills/` 下的第三方子目录仍遵循其原许可**。

如需移除第三方组件，删除对应 `skills/<name>/` 目录即可，不影响其余功能。
