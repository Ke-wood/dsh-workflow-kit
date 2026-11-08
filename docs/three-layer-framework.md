# 三层委派框架

> 一张图说明「人 → 决策层 → 调度层 → 执行层」怎么流转。
> 核心约束：**原料不进上层上下文，只传路径与判决。**

---

## 总览

```mermaid
flowchart TB
    subgraph L0["人（总调度）"]
        H["决定做哪个项目 / 哪个任务<br/>验收最终结果"]
    end

    subgraph L1["决策层（主代理）"]
        D1["拆任务、写要点"]
        D2["派发后立即返回"]
        D3["收到完成通知<br/>只读路径与状态"]
        D4["读筛选后的 verdict<br/>决定收不收"]
    end

    subgraph L2["调度层（router，每个任务一个）"]
        R1["背景：项目文件 + 上次进度"]
        R2["把要点展开成任务书"]
        R3["派执行者 / 调查者"]
        R4["读回产物，做筛选"]
        R5["产出 verdict"]
        R6["进度落盘"]
    end

    subgraph L3["执行层（worker）"]
        W1["执行者<br/>有写权限"]
        W2["调查者<br/>只读"]
    end

    H -->|"下达任务"| D1
    D1 --> D2
    D2 -->|"立即返回，不等"| D3
    D2 -->|"派发"| R1
    R1 --> R2 --> R3
    R3 --> W1
    R3 --> W2
    W1 -->|"变更产物 + 报告"| R4
    W2 -->|"survey 文件"| R4
    R4 --> R5 --> R6
    R5 -->|"完成事件：只带路径与状态"| D3
    D3 --> D4
    D4 -->|"接受"| H
    D4 -->|"打回"| R2
```

---

## 一次完整流转

```mermaid
sequenceDiagram
    participant 人
    participant 决策层
    participant 调度层
    participant 执行者
    participant 调查者

    人->>决策层: 做项目 A
    决策层->>决策层: 拆成 3 个任务，各写 5 行要点
    决策层->>调度层: 派发（立即返回）
    Note over 决策层: 上下文只增加一行「已派 t1/t2/t3」

    调度层->>调查者: 先摸清现状（只读）
    调查者-->>调度层: survey 文件（路径，不是内容）

    调度层->>执行者: 按任务书执行（有写权限）
    执行者-->>调度层: 变更产物 + execution_report

    调度层->>调度层: 读回产物，筛选
    调度层->>调度层: 产出 verdict.json

    调度层-->>决策层: 完成事件（路径 + 状态）
    Note over 决策层: 上下文只增加一行「t1 完成，verdict 在 ...」

    决策层->>决策层: 读 verdict（不读原料）
    决策层-->>人: t1 可收 / t1 打回
```

---

## 上下文边界（这张图最重要）

```mermaid
flowchart LR
    subgraph IN["进上层上下文"]
        A1["完成事件：路径 + 状态<br/>约 2 行"]
        A2["verdict.json<br/>约 10 行"]
        A3["要点：5 行/任务"]
    end

    subgraph OUT["不进上层上下文"]
        B1["任务书全文<br/>约 60 行"]
        B2["execution_report<br/>数百行"]
        B3["survey 原始材料<br/>数千行"]
        B4["critique.md<br/>审核意见全文"]
    end

    style IN fill:#e8f5e9
    style OUT fill:#ffebee
```

**判据：上层只需要「决定收不收」所需的信息。**
决定收不收，需要的是路径、状态、判决。不需要过程。

---

## 三个角色各自的上下文成本

```mermaid
flowchart TB
    subgraph C0["人的上下文"]
        H1["项目级决策<br/>常数"]
    end

    subgraph C1["决策层上下文"]
        M1["每任务 +3 行<br/>（要点 5 行 + 完成事件 2 行）"]
        M2["80 任务 ≈ 240 行<br/>而不是 4800 行"]
    end

    subgraph C2["调度层上下文"]
        R1["任务书全文 + 产物<br/>单任务，可容忍"]
    end

    subgraph C3["执行层上下文"]
        W1["单个子任务<br/>最干净"]
    end

    C0 --> C1 --> C2 --> C3
```

**越往下，上下文越宽；越往上，越窄。**

---

## 关键机制在 DSH 里对应什么

| 框架里的环节 | DSH 机制 | 状态 |
|---|---|---|
| 派发立即返回 | `subagent` 工具返回 child id 立刻返回 | ✅ 原生 |
| 完成通知异步到达 | `Parent delivery emits its notice after settlement` | ✅ 原生 |
| 完成只带路径 | 子代理最终回复留空 / 只回 `✓` | ✅ 需约束 |
| 原料不进上下文 | 子代理写文件，不回内容 | ✅ 需约束 |
| 跨 session 接续 | 进度落盘到项目文件 | ✅ 靠约定 |
| **hook 补投摘要** | ❌ 无此机制 | ⚠️ **需替换** |
| **notify-hub 唤醒** | ❌ 无此机制 | ⚠️ **需替换** |
| **worker 独立进程** | ❌ 子代理在进程内 | ⚠️ **需接受** |

---

## 三个需要替换的机制，怎么替代

### 1. 没有 `UserPromptSubmit hook` → 用「开工先读进度」

```mermaid
flowchart LR
    U["用户发消息"] --> P["决策层：先读 .progress/ 目录"]
    P --> Q["有未处理完成事件？"]
    Q -->|"有"| R["读 verdict，决定收不收"]
    Q -->|"无"| S["按新指令干活"]
```

**不靠钩子，靠「开工第一步固定动作」。** 写进 persona 即可。

### 2. 没有 `notify-hub` → 完成通知本身就是通知

源码：`Parent delivery emits a user-role status notice`

**子代理一完成，主代理自动收到通知。** 不需要额外的唤醒机制。

**但要注意**：通知内容 = 子代理的最终文本。所以**必须让子代理闭嘴**，否则通知会很大。

### 3. worker 不是独立进程 → 接受，并控制并发

`dsh-subagent-spawn-in-process`：所有子代理在同一个 Node 进程。

**后果**：不能真的「独立进程 + 长连接」。并发上限是 `maxActiveSubagents`（当前 24），
瓶颈先出现在内存和 API 速率，不在进程数。

---

## 落地检查清单

一个任务从派发到收尾，逐项确认：

- [ ] 要点写了 5 行（做什么 / 路径 / 验收命令 / 禁止范围）
- [ ] 调度层的任务书里写了「禁止 send_message」
- [ ] 调度层的任务书里写了「最终回复只回 `✓`」
- [ ] 产物路径明确（`tasks/<id>/`）
- [ ] 进度落盘（`.progress/<id>.json`，含状态与路径）
- [ ] 完成事件只带路径与状态，不带内容
- [ ] 决策层读的是 `verdict.json`，不是原料
- [ ] 打回时带上 `critique.md` 路径，不是内容

