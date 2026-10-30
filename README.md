# dsh-workflow-kit

> 给 DeepSeek Harness 的工作流套件：**5 个代理预设 + 18 个协作/学术 skill + skill 路由表**。
> 目标：**自我审查 + 上下文洁净**——判据常驻（极短）、路径知识按需、执行细节外包、判决可执行。

[![GitHub](https://img.shields.io/badge/GitHub-Ke--wood%2Fdsh--workflow--kit-blue?logo=github)](https://github.com/Ke-wood/dsh-workflow-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 它解决什么

默认 `standard`/`cordis` 预设的 persona 只教你"派活"，不教你"什么算对"。结果是：
主代理负责却无力 → 只能把责任转译成流程语言（"已委派""已对齐"）→ 退化成秘书。

本套件的做法：

| 层 | 装什么 | 量级 |
|---|---|---|
| L0 主代理常驻 | 验收判据 · 失败模式 · 钩子表 · 通道纪律 · 红线 | ≤60 行 |
| L1 路径知识 | 岔路口集合，按需 `read` | 5–10 行 + references |
| L2 执行细节 | 全部外包给子代理 | 0 |
| L3 产物与证据 | `report.json` / 日志 / diff / checks | 只留指针 |

## 五个预设

按**工作区间**分档，切换即换 persona：

| preset | 用途 | 特点 |
|---|---|---|
| `base` | 通用编码/文件/终端/委派 | 证据优先、驳回力、细节留指针 |
| `research` | 文献调研、综述、RAG | **先摸基线再谈深化** |
| `figure` | 期刊配图、数据可视化 | 图先有数据再有风格；中文验字形 |
| `writer` | 论文正文、润色 | 每个论断要有出处；润色不改事实 |
| `delegation` | 长任务/大型工程 | 强委派、子代理沟通、子代理复用（用完不丢） |

## Agent Teams 三件套

随包启用（子代理直接沟通 + 任务板 + Web 可视化）：

- `@deepseek-ai/dsh-experimental-agent-team` — Host：名册 + peer messaging + 共享任务 DAG
- `@deepseek-ai/dsh-experimental-tool-agent-team` — 模型侧团队工具
- `@deepseek-ai/dsh-experimental-client-ui-agent-team` — Web 任务板 + teammate 导航

## 18 个 skill

**协作类**
- `dispatching-parallel-agents` — 2+ 独立任务才并行派，子代理不继承父上下文
- `subagent-driven-development` — 每任务 fresh 执行者 + 任务级审查 + 终审（薄索引，完整版在 references）
- `verification-before-completion` — 没跑过验证不许说"通过"
- `executing-plans` / `writing-plans` / `systematic-debugging`

**调研类**
- `baseline-survey` — 摸清既有项目基线，产出 survey/{structure,baseline,hotspots,risks}
- `lit-search-strategy` — 文献检索策略（PICO/SPIDER，PRISMA 2020）
- `lit-deep-reading` — 文献精读（Keshav 三遍法）
- `lit-review-writing` — 批判性综述写作
- `paper-reader` / `nature-reader` / `nature-academic-search`

**写作类**
- `nature-writing` / `nature-polishing` / `nature-citation`

**绘图类**
- `sci-figure-kit`

## 安装

### 方式 A：本地安装（推荐，可改）

```bash
# 1. 把本仓库放到任意目录，例如
git clone git@github.com:Ke-wood/dsh-workflow-kit.git ~/dsh-workflow-kit

# 2. 安装 bundle
#    在 DSH 里执行 plugin_manager install_bundle，target = 该目录绝对路径

# 3. 注册 skills（本包自带，无需手动复制）
#    index.js 会自动把 <包目录>/skills 写入 DSH_WORKFLOW_KIT_SKILLS
```

### 方式 B：手动注册 skills

若自动注册未生效，把本包的 `skills/*` 复制到 `~/.dsh/skills/`：

```bash
cp -r dsh-workflow-kit/skills/* ~/.dsh/skills/
```

> **注意**：skill 目录名必须是 `^[a-z0-9]+(?:-[a-z0-9]+)*$`（小写字母、数字、连字符）。
> **中文名会被静默跳过，不报错**——这是最常见的"装了但没生效"原因。

## 使用

1. 在 GUI 的模式/预设选择里，按当前项目选档（`base`/`research`/`figure`/`writer`）
2. 需要选 skill 时先读 `skills/ROUTING.md`（22 条任务信号路由 + 5 条组合链路）
3. 声称完成前必过 `verification-before-completion`

建议把这条加进 `~/.dsh/AGENTS.md`：

```markdown
- 选 skill / 不确定用哪个 → 读 ~/.dsh/skills/ROUTING.md（先查再加载）
```

## 设计原则

1. **判据常驻，规则不常驻** — 淘汰标准（驳回力测试）：删掉这条知识，还能否掉同样多的错误产出？能 → 是杂质，外置。
2. **格式成本落在信息产生方** — 子代理写结构化产物，主代理只读判决。
3. **能写成断言的绝不亲审，写不成断言的绝不委托**。
4. **探索可以委派，交付必须可验收** — 直接禁止"我不懂所以我派出去"。
5. **不重复造轮子** — 先用已有 skill/工具，再考虑新建。

## 已知限制

| 限制 | 说明 |
|---|---|
| **浏览器工具无法按 preset 裁剪** | 34 个 `dsh_browser_*` 来自 profile 级 `dsh-builtin-browser` bundle，不在 preset 内。`ctx.tools.restrict()` 要求 `agent.ctx` 作用域，preset 插件是 preset 作用域，调用会抛错。 |
| **4 个 skill 超 8192 字符** | `nature-writing`(9.6KB) / `systematic-debugging`(9.5KB) / `paper-reader`(8.9KB) / `sci-figure-kit`(8.7KB) 会被 pruner 裁剪（保留头4096+尾1024）。需要时可按 `subagent-driven-development` 方式拆分为索引 + references。 |
| **skill 正文加载后不可撤回** | 一旦 `skill()` 加载即进历史，只能靠 compaction 折叠。 |
| **compaction 压不动 system/tools/prefix** | 只压历史，不是"重置成空"。 |

## 结构

```
dsh-workflow-kit/
├── package.json          # dsh.bundle.patch 指向 cordis.patch.yml
├── index.js              # 注册 skills 目录（写入 DSH_WORKFLOW_KIT_SKILLS）
├── cordis.patch.yml      # 四个 preset 声明
├── skills/               # 17 个 skill + ROUTING.md
│   ├── ROUTING.md
│   ├── baseline-survey/
│   ├── dispatching-parallel-agents/
│   └── ...
└── presets/              # （预留，供拆分使用）
```

## 自包含性

本包**不依赖任何硬编码路径**，可放在任意目录、也可被 npm 安装：

- `index.js` 在 Host 启动时用 `import.meta.url` 算出自身目录，把 `skills/` 绝对路径写入 `DSH_WORKFLOW_KIT_SKILLS`
- `cordis.patch.yml` 里用 `!!js process.env.DSH_WORKFLOW_KIT_SKILLS` 引用它
- 已验证：复制到全新位置后仍能正确解析出全部 17 个 skill（`ROUTING.md` 不是 skill）

> 若你在别处显式设置了 `DSH_WORKFLOW_KIT_SKILLS`，本包不会覆盖（方便指向自己的 skills 目录）。

## 许可

- **本仓库原创部分**：MIT（`LICENSE`）
- **`skills/` 下第三方 skill**：各自沿用原许可（MIT / Apache-2.0）

完整的来源、版权与修改说明见 [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md)，各许可全文在 `licenses/`。

如需移除第三方组件，删除对应 `skills/<name>/` 目录即可，不影响其余功能。

## 发布到 npm（可选）

本包以 `@local/dsh-workflow-kit` 名字本地安装。若要发布到 npm：

1. 把 `package.json` 的 `name` 改为 `dsh-workflow-kit`（或你的 scope），删除 `"private": true`
2. `npm publish`
3. 用户即可用 `plugin_manager install_bundle` 指定 `dsh-workflow-kit@<version>` 安装

> 改名后需重新安装一次，本地 profile 引用的旧名会被替换。
