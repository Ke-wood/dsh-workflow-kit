/**
 * dsh-workflow-kit — 把套件内自带的 skills 目录注册给 skill 系统。
 *
 * 背景：`bundledSkillDir` 是 `skill-filesystem` 的配置项，但 preset 的声明是静态 YAML，
 * 无法可靠地写出"本包在哪"的绝对路径（安装位置因人而异）。
 *
 * 做法：本插件在 Host 启动时算出自身目录，把 skills/ 的绝对路径写进
 * `DSH_WORKFLOW_KIT_SKILLS` 环境变量；patch 里用 `!!js process.env.DSH_WORKFLOW_KIT_SKILLS`
 * 引用它。这样包可以放在任何位置，也可被 npm 安装到 node_modules。
 *
 * 若环境变量已被外部显式设置，则不覆盖（允许用户强制指向自己的 skills 目录）。
 */
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

export const name = 'workflow-kit'

export function apply(ctx) {
  // index.js 位于包根目录
  const here = dirname(fileURLToPath(import.meta.url))
  const skillsDir = join(here, 'skills')

  if (!existsSync(skillsDir)) {
    ctx.logger?.warn?.(`[workflow-kit] skills 目录不存在: ${skillsDir}`)
    return
  }

  if (!process.env.DSH_WORKFLOW_KIT_SKILLS) {
    process.env.DSH_WORKFLOW_KIT_SKILLS = skillsDir
    ctx.logger?.info?.(`[workflow-kit] skills 目录: ${skillsDir}`)
  }
}
