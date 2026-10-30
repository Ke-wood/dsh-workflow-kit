/**
 * dsh-workflow-kit — 把本包自带的 skills/ 目录注册为 skill provider。
 *
 * 为什么不用 bundledSkillDir：
 *   那是 `skill-filesystem` 的静态配置项，由 `!!js` 在 patch 求值时读取，
 *   而求值发生在插件 apply 之前 —— 本插件来不及设置环境变量，导致值为 undefined。
 *
 * 做法：插件 apply 时直接 `ctx.skills.registerProvider()` 注册一个 provider，
 * 自行扫描 <包目录>/skills/。无环境变量、无时序依赖、无硬编码路径。
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'workflow-kit'

export const inject = ['skills']

/** skill 名合法规则，与 dsh-skill 的 SKILL_NAME 一致 */
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const PROVIDER_NAME = 'workflow-kit'
const RANK = 600 // 与 BUNDLED_SKILL_RANK 一致

/** 解析 SKILL.md 的 YAML frontmatter（只取本插件需要的字段） */
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) return {}
  const out = {}
  let key = null
  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim()) continue
    const kv = raw.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (kv) {
      key = kv[1]
      out[key] = kv[2].trim()
    } else if (key && /^\s+/.test(raw)) {
      // 续行（如 description 换行），拼接到上一个键
      out[key] = `${out[key]} ${raw.trim()}`.trim()
    }
  }
  // 去掉可能的引号
  for (const k of Object.keys(out)) {
    out[k] = out[k].replace(/^["']|["']$/g, '')
  }
  return out
}

export function apply(ctx) {
  const here = dirname(fileURLToPath(import.meta.url))
  const skillsDir = join(here, 'skills')

  if (!existsSync(skillsDir) || !statSync(skillsDir).isDirectory()) {
    ctx.logger?.warn?.(`[workflow-kit] skills 目录不存在: ${skillsDir}`)
    return
  }

  ctx.skills.registerProvider(() => ({
    name: PROVIDER_NAME,

    async list() {
      const entries = readdirSync(skillsDir, { withFileTypes: true })
      const candidates = []
      for (const entry of entries) {
        if (!entry.isDirectory()) continue
        if (!SKILL_NAME.test(entry.name)) continue
        const dir = join(skillsDir, entry.name)
        const file = join(dir, 'SKILL.md')
        if (!existsSync(file)) continue
        try {
          const meta = parseFrontmatter(readFileSync(file, 'utf8'))
          // SKILL.md 里的 name 优先，否则用目录名
          const skillName = SKILL_NAME.test(meta.name ?? '') ? meta.name : entry.name
          candidates.push({
            name: skillName,
            description: (meta.description ?? '').slice(0, 500),
            rank: RANK,
            locator: { file, dir },
            invocation: { modelInvocable: true, userInvocable: true },
            source: 'bundled',
            provider: PROVIDER_NAME,
            resourceBase: { kind: 'directory', path: dir },
          })
        } catch (error) {
          ctx.logger?.warn?.(`[workflow-kit] 读取 ${file} 失败: ${error}`)
        }
      }
      return candidates
    },

    async get(candidate) {
      const { file, dir } = candidate.locator ?? {}
      if (!file || !existsSync(file)) return undefined
      return {
        ...candidate,
        content: readFileSync(file, 'utf8'),
        resourceBase: { kind: 'directory', path: dir },
      }
    },
  }))

  ctx.logger?.info?.(`[workflow-kit] 已注册 skill provider: ${skillsDir}`)
}
