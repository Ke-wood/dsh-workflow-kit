/**
 * 生成 cordis.patch.yml
 *
 * 输入：personas/*.txt（persona 源文本）
 * 输出：cordis.patch.yml（预设声明）
 *
 * 用法：
 *   node scripts/gen-patch.mjs           生成并写入
 *   node scripts/gen-patch.mjs --check   只校验：现有 patch 是否与源一致
 *                                        （不一致 → 退出码 1，CI 友好）
 *
 * 路径一律相对**本脚本自身**，不依赖 cwd —— 从任何目录调用都能跑。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')
const PERSONA_DIR = join(ROOT, 'personas')
const OUT = join(ROOT, 'cordis.patch.yml')

const MODES = ['greenfield', 'brownfield']

const PERSONA = {}
for (const id of MODES) {
  PERSONA[id] = readFileSync(join(PERSONA_DIR, `${id}.txt`), 'utf8').replace(/\n+$/, '')
}

const META = {
  greenfield: {
    name: 'Greenfield',
    desc: '从零开始：设计优先、最小可行、快速验证假设、轻委派。',
    order: 10,
  },
  brownfield: {
    name: 'Brownfield',
    desc: '存量深化：先摸基线再动手、最小改动、先查调用方、强委派。',
    order: 11,
  },
}

// 共享工具块（两个模式一致）
const TOOLS = `          - id: agent-instructions
            name: '@deepseek-ai/dsh-agent-instructions'
            config:
              maxBytes: 65536
          - id: time-context
            name: '@deepseek-ai/dsh-time-context'
          - id: tool-bash
            name: '@deepseek-ai/dsh-tool-bash'
            disabled: !!js process.platform === 'win32'
          - id: tool-pwsh
            name: '@deepseek-ai/dsh-tool-pwsh'
            disabled: !!js process.platform !== 'win32'
          - id: tool-fs
            name: '@deepseek-ai/dsh-tool-fs'
          - id: tool-fs-search
            name: '@deepseek-ai/dsh-tool-fs-search'
            config:
              sampleOverCapGlobResults: false
          - id: tool-jobs
            name: '@deepseek-ai/dsh-tool-jobs'
          - id: tool-schedule
            name: '@deepseek-ai/dsh-tool-schedule'
          - id: skill-filesystem
            name: '@deepseek-ai/dsh-skill-filesystem'
          - id: tool-skill
            name: '@deepseek-ai/dsh-tool-skill'
          - id: tool-ask-user
            name: '@deepseek-ai/dsh-tool-ask-user'
          - id: tool-todo
            name: '@deepseek-ai/dsh-tool-todo'
            config:
              allowParallelInProgress: true
          - id: tool-web
            name: '@deepseek-ai/dsh-tool-web'
            config:
              fetch: true
              searchTimeoutMs: 60000
          - id: present
            name: '@deepseek-ai/dsh-tool-present'
          - id: compaction
            name: cordis:group
            group: true
            isolate:
              compaction: true
              toolResultPruner: true
            config:
              - id: compaction-basic
                name: '@deepseek-ai/dsh-compaction-basic'
              - id: command-compact
                name: '@deepseek-ai/dsh-command-compact'
              - id: tool-result-pruner
                name: '@deepseek-ai/dsh-compaction-tool-result-pruner'
                config:
                  thresholdChars: 8192
                  headChars: 4096
                  tailChars: 1024
          - id: delegation
            name: cordis:group
            group: true
            isolate:
              workflowEngine: true
            config:
              - id: tool-subagent-control
                name: '@deepseek-ai/dsh-tool-subagent-control'
              - id: tool-subagent-list-agents
                name: '@deepseek-ai/dsh-tool-subagent-control/list-agents'
              - id: tool-subagent
                name: '@deepseek-ai/dsh-tool-subagent'
                config:
                  provider: spawn
                  toolName: subagent
                  modelSelectionSettings: true
                  allowedAgentPresets:
                    - greenfield
                    - brownfield
              - id: tool-subagent-fork
                name: '@deepseek-ai/dsh-tool-subagent'
                config:
                  provider: fork
                  toolName: subagent_fork
              - id: workflow-ptc
                name: '@deepseek-ai/dsh-workflow-ptc'
                config:
                  provider: spawn
              - id: tool-workflow
                name: '@deepseek-ai/dsh-tool-workflow'
`

const indent = (t) =>
  t
    .split('\n')
    .map((l) => (l.trim() === '' ? '' : '                ' + l))
    .join('\n')

let out = `# dsh-workflow-kit —— 协作方法论套件
#
# ⚠️ 本文件由 scripts/gen-patch.mjs 从 personas/*.txt 生成，请勿手改。
#    改 persona → 改 personas/<模式>.txt → node scripts/gen-patch.mjs
#
# 架构：
#   · 2 个入口预设：greenfield（从零开始）/ brownfield（存量深化）
#     二者工具集相同，persona 不同；都能 read modes/MODES.md 切换模式
#   · 模式即插件：modes/*.md，加文件 + 在 MODES.md 加一行即可扩展
#   · 领域能力不进预设：由任务书指定 + skills/ROUTING.md 路由
#   · Agent Teams 三件套：子代理沟通 + 任务板 + 可视化

- insert:
    # ── 0. 本包自身：注册自带 skills/ ──
    - id: workflow-kit
      name: '@local/dsh-workflow-kit'

    # ── 0b. Agent Teams ──
    - id: agent-team
      name: '@deepseek-ai/dsh-experimental-agent-team'
    - id: agent-team-tool
      name: '@deepseek-ai/dsh-experimental-tool-agent-team'
    - id: agent-team-ui
      name: '@deepseek-ai/dsh-experimental-client-ui-agent-team'
`

for (const id of MODES) {
  const m = META[id]
  out += `
    # ══════════════════════════════════════════════════════
    # ${m.name} —— ${m.desc}
    # ══════════════════════════════════════════════════════
    - id: preset-${id}
      name: '@deepseek-ai/dsh-agent-preset'
      config:
        id: ${id}
        name: ${m.name}
        description: ${m.desc}
        order: ${m.order}
        plugins:
          - id: persona
            name: '@deepseek-ai/dsh-persona'
            config:
              prefix: |-
${indent(PERSONA[id])}
${TOOLS}`
}

out += `
# ══════════════════════════════════════════════════════
# 委派深度：主代理(0) → 子代理(1) → 孙代理(2)
# maxDepth 是绝对深度上限。默认 1 时子代理无法再派生；这里设为 2，
# 允许再往下派一层，到此为止。
# 注意：spawn_teammate 不受此限——它只允许 Team Lead 调用，
# teammate 派不出执行者，这与 maxDepth 无关。
# ══════════════════════════════════════════════════════
- id: subagent
  name: '@deepseek-ai/dsh-subagent'
  config:
    maxDepth: 2
`

const checkMode = process.argv.includes('--check')

if (checkMode) {
  let current = ''
  try {
    current = readFileSync(OUT, 'utf8')
  } catch {
    console.error('[FAIL] cordis.patch.yml 不存在')
    process.exit(1)
  }
  if (current !== out) {
    console.error('[FAIL] cordis.patch.yml 与 personas/*.txt 不一致')
    console.error('       运行 node scripts/gen-patch.mjs 重新生成')
    process.exit(1)
  }
  console.log('[OK] cordis.patch.yml 与 personas/*.txt 一致')
} else {
  writeFileSync(OUT, out, 'utf8')
  console.log(`生成完成: ${out.split('\n').length} 行 → ${OUT}`)
}
