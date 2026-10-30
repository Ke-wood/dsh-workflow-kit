# 第三方组件声明 / Third-Party Notices

本套件（`dsh-workflow-kit`）的**代码与自建内容**采用 MIT 许可（见 `LICENSE`）。
随包分发的 `skills/` 目录中，部分 skill 来自第三方项目，其许可如下。

---

## 1. 本仓库原创（MIT）

| 内容 | 说明 |
|---|---|
| `index.js` | 注册 skills 目录的 Host 插件 |
| `cordis.patch.yml` | 五个 agent preset 声明 |
| `skills/baseline-survey/` | 基线调研 skill |
| `skills/sci-figure-kit/` | 科研绘图工具箱 |
| `skills/kit-selftest/` | 自包含探针（仅包内存在） |
| `skills/ROUTING.md` | skill 路由表 |

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

## 关于领域 skill（本包不包含）

文献检索、论文写作、期刊配图规范等**领域技能**不随本包分发。原因：

1. **目录税**：每个 skill 的 `description` 常驻于每轮对话。9 个文献/写作类 skill
   合计约 3,466 字符（≈1,733 tokens），占全部目录税的 77%。
2. **定位单一**：本包的定位是**协作方法论**（判据常驻、上下文洁净、分层执行），
   领域能力属于另一个维度，应各自选配。
3. **按需组装**：需要文献能力时，单独安装相应 skill 即可，本包的 presets
   已通过"若装有 X 则用"的方式解耦，不会硬绑定。

推荐来源（各自遵循其原许可）：

| 领域 | 项目 | 许可 |
|---|---|---|
| 文献综述全链路 | literature-review-skill | MIT |
| Nature 系写作/润色/引用/精读 | nature-skills | Apache-2.0 |
| 每日论文 / 精读 | dailypaper-skills | Apache-2.0 |

> 安装时注意：skill 目录名必须匹配 `^[a-z0-9]+(?:-[a-z0-9]+)*$`，
> **中文名会被静默跳过**，需改为英文名并同步 `SKILL.md` 的 `name` 字段。
