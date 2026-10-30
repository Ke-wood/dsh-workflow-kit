/**
 * dsh-workflow-kit — 右侧栏「工作台」
 *
 * 显示当前会话的实时工作状态，不是文档：
 *   · 当前模式（来自 session header 的 agentPreset）
 *   · 会话状态与轮次
 *   · TODO 进度
 *   · 最近动作时间线（工具调用）
 *   · 子代理调用计数
 *
 * 所有数据提取都是防御式的：拿不到就降级显示，不抛错。
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-workflow-kit',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const TAB_ID = 'workflow-kit'
    const TAB_KIND = 'workflow-kit'

    // ── 工具函数（全部防御式）─────────────────────────────

    const isObj = (v) => typeof v === 'object' && v !== null
    const asArray = (v) => (Array.isArray(v) ? v : [])
    const safe = (fn, fallback) => {
      try {
        const r = fn()
        return r === undefined || r === null ? fallback : r
      } catch (e) {
        return fallback
      }
    }

    /** 从任意层级的对象里找 agentPreset（session header 里叫这个） */
    function findPreset() {
      const roots = Array.prototype.slice.call(arguments)
      for (let i = 0; i < roots.length; i++) {
        const root = roots[i]
        const v = safe(
          () => root && (root.agentPreset ?? root.header?.agentPreset ?? root.session?.header?.agentPreset),
          undefined,
        )
        if (typeof v === 'string' && v) return v
      }
      return null
    }

    /** 从对话节点里抽工具调用 */
    function collectToolCalls(nodes) {
      const out = []
      const list = asArray(nodes)
      for (let i = 0; i < list.length; i++) {
        const n = list[i]
        if (!isObj(n)) continue
        const name = safe(() => n.name ?? n.toolName ?? n.data?.name ?? n.call?.name, null)
        if (!name) continue
        const kind = n.kind ?? n.type
        if (kind === 'tool-call' || kind === 'tool' || n.callId || n.call) {
          out.push({ name: String(name) })
        }
      }
      return out
    }

    /** 从对话节点里抽最后一次 todo 状态 */
    function lastTodo(nodes) {
      let latest = null
      const list = asArray(nodes)
      for (let i = 0; i < list.length; i++) {
        const n = list[i]
        const name = safe(() => n?.name ?? n?.toolName ?? n?.data?.name, null)
        if (name !== 'todo_write') continue
        const items = safe(() => {
          const raw = n?.result?.value ?? n?.data?.result?.value ?? n?.output ?? n?.result
          const l = Array.isArray(raw) ? raw : raw?.todos ?? raw?.items
          return Array.isArray(l) ? l : null
        }, null)
        if (items) latest = items
      }
      return latest
    }

    function todoSummary(items) {
      const list = asArray(items)
      if (!list.length) return null
      let done = 0
      let doing = 0
      for (let i = 0; i < list.length; i++) {
        const s = safe(() => String(list[i].status ?? list[i].state ?? ''), '')
        if (s === 'completed' || s === 'done') done++
        else if (s === 'in_progress' || s === 'doing' || s === 'in-progress') doing++
      }
      return { total: list.length, done, doing, items: list }
    }

    // ── 样式 ──────────────────────────────────────────────

    const C = {
      page: { padding: '12px 14px', fontSize: 12.5, color: 'var(--dsw-alias-label-primary)' },
      row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '5px 0' },
      k: { color: 'var(--dsw-alias-label-secondary)', fontSize: 12 },
      v: { fontWeight: 600, fontSize: 12.5 },
      sec: { marginTop: 14 },
      secTitle: {
        fontSize: 11, fontWeight: 600, letterSpacing: '.4px', textTransform: 'uppercase',
        color: 'var(--dsw-alias-label-secondary)', marginBottom: 6,
      },
      card: {
        border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 8,
        padding: '8px 10px', marginBottom: 8, background: 'var(--dsw-alias-bg-l1)',
      },
      badge: {
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontSize: 11.5, padding: '2px 8px', borderRadius: 20,
        background: 'var(--dsw-alias-bg-l2)', color: 'var(--dsw-alias-label-primary)',
      },
      dot: {
        width: 7, height: 7, borderRadius: '50%',
        background: 'var(--dsw-alias-label-secondary)',
        display: 'inline-block',
      },
      dotOn: {
        width: 7, height: 7, borderRadius: '50%',
        background: '#3caa6e', boxShadow: '0 0 0 3px rgba(60,170,110,.18)',
        display: 'inline-block',
      },
      bar: { height: 5, borderRadius: 3, background: 'var(--dsw-alias-bg-l2)', overflow: 'hidden', marginTop: 5 },
      item: { display: 'flex', gap: 6, alignItems: 'baseline', padding: '3px 0', fontSize: 12 },
      empty: { fontSize: 12, color: 'var(--dsw-alias-label-secondary)', fontStyle: 'italic', padding: '4px 0' },
      mono: { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: 11.5 },
      tl: {
        fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', padding: '2px 0',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      },
      note: { marginTop: 12, fontSize: 10.5, color: 'var(--dsw-alias-label-secondary)', lineHeight: 1.6 },
    }

    // ── 图标 ──────────────────────────────────────────────

    function PanelIcon(props) {
      const size = (props && props.size) || 18
      return h('svg', {
        width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
      },
      h('path', { d: 'M3 17l5-5 4 3 5-7' }),
      h('circle', { cx: 20, cy: 5, r: 1.6 }),
      h('path', { d: 'M3 21h18' }))
    }

    // ── 主面板 ────────────────────────────────────────────

    function makePanel() {
      return function WorkbenchPanel(props) {
        const p = isObj(props) ? props : {}

        const status = safe(() => {
          const s = typeof p.useSessionStatus === 'function' ? p.useSessionStatus() : p.sessionStatus
          if (typeof s === 'string') return s
          if (isObj(s)) return s.status ?? s.state ?? (s.running ? 'running' : 'idle')
          return null
        }, null)

        const sessionSnap = safe(() => (typeof p.useSession === 'function' ? p.useSession() : null), null)
        const conv = safe(() => (typeof p.useConversation === 'function' ? p.useConversation() : null), null)
        const nodes = safe(() => conv?.nodes ?? conv?.items ?? conv?.chat?.nodes ?? [], [])
        const messages = safe(() => conv?.messages ?? [], [])
        const sessions = safe(() => (typeof p.useSessions === 'function' ? p.useSessions() : null), null)

        const preset = findPreset(sessionSnap, sessions?.current, p.session, p)
        const calls = collectToolCalls(nodes)
        const todos = todoSummary(lastTodo(nodes))
        const subCalls = calls.filter((c) => c.name === 'subagent' || c.name === 'subagent_fork' || c.name === 'spawn_teammate')

        const running = status === 'running' || status === 'busy' || status === 'streaming'
        const statusText = status === null ? '—' : running ? '运行中' : '空闲'

        const modeDesc =
          preset === 'brownfield' ? '存量深化 · 先摸基线 · 强委派'
            : preset === 'greenfield' ? '从零开始 · 先定接口 · 轻委派'
              : ''

        const pct = todos && todos.total ? (todos.done / todos.total) * 100 : 0

        return h('div', { style: C.page },
          h('div', { style: C.row },
            h('span', { style: C.k }, '状态'),
            h('span', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
              h('span', { style: running ? C.dotOn : C.dot }),
              h('span', { style: C.v }, statusText))),

          h('div', { style: C.row },
            h('span', { style: C.k }, '模式'),
            h('span', { style: C.badge }, preset || '未知')),
          modeDesc ? h('div', { style: { fontSize: 11, color: 'var(--dsw-alias-label-secondary)' } }, modeDesc) : null,

          h('div', { style: C.row },
            h('span', { style: C.k }, '消息'),
            h('span', { style: C.v }, String(asArray(messages).length))),
          h('div', { style: C.row },
            h('span', { style: C.k }, '工具调用'),
            h('span', { style: C.v }, String(calls.length))),
          h('div', { style: C.row },
            h('span', { style: C.k }, '子代理'),
            h('span', { style: C.v }, String(subCalls.length))),

          h('div', { style: C.sec },
            h('div', { style: C.secTitle }, '任务进度'),
            todos
              ? h('div', { style: C.card },
                  h('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 11.5 } },
                    h('span', null, todos.done + ' / ' + todos.total + ' 完成'),
                    todos.doing ? h('span', { style: { color: '#b8791a' } }, todos.doing + ' 进行中') : null),
                  h('div', { style: C.bar },
                    h('div', { style: { width: Math.max(0, Math.min(100, pct)) + '%', height: '100%', background: '#3caa6e' } })),
                  asArray(todos.items).slice(0, 8).map((it, i) => {
                    const s = safe(() => String(it.status ?? ''), '')
                    const mark = s === 'completed' ? '✓' : s === 'in_progress' ? '◐' : '○'
                    const color = s === 'completed' ? '#2f8a5b' : s === 'in_progress' ? '#b8791a' : 'var(--dsw-alias-label-secondary)'
                    return h('div', { key: i, style: C.item },
                      h('span', { style: { flex: '0 0 14px', color: color } }, mark),
                      h('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
                        safe(() => String(it.content ?? it.text ?? it.title ?? ''), '')))
                  }))
              : h('div', { style: C.empty }, '还没有任务清单')),

          h('div', { style: C.sec },
            h('div', { style: C.secTitle }, '最近动作'),
            calls.length
              ? h('div', { style: C.card },
                  calls.slice(-8).reverse().map((c, i) =>
                    h('div', { key: i, style: C.tl }, h('span', { style: C.mono }, c.name))))
              : h('div', { style: C.empty }, '还没有工具调用')),

          !preset || !nodes.length
            ? h('div', { style: C.note },
                '数据不全时显示 —。',
                h('br'),
                'hooks：status=' + (typeof p.useSessionStatus === 'function' ? '✓' : '✗'),
                ' session=' + (typeof p.useSession === 'function' ? '✓' : '✗'),
                ' conversation=' + (typeof p.useConversation === 'function' ? '✓' : '✗'))
            : null)
      }
    }

    function TitleComponent(props) {
      const preset = findPreset(isObj(props) ? props : {})
      return h('span', null, preset ? '工作台 · ' + preset : '工作台')
    }

    // ── 注册 ──────────────────────────────────────────────

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.inject(['sidebarRightTabs'], (scoped) => {
          const tabs = safe(() => scoped.sidebarRightTabs, null)
          if (!tabs || typeof tabs.register !== 'function') return

          tabs.register({
            id: TAB_ID,
            kind: TAB_KIND,
            title: () => '工作台',
            guide: [{
              order: 15,
              title: () => '工作台',
              description: () => '当前模式、任务进度、子代理与最近动作',
              icon: PanelIcon,
            }],
          })

          scoped.slots.inject('sidebar.right.pane.tab', () =>
            scoped.slots.register({ name: 'sidebar.right.pane.tab', key: TAB_ID }, makePanel()))

          scoped.slots.inject('sidebar.right.pane.tab.title', () =>
            scoped.slots.register({ name: 'sidebar.right.pane.tab.title', key: TAB_ID }, TitleComponent))
        })
      },
    }
  },
})
