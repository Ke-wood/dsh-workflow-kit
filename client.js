/**
 * dsh-workflow-kit — 工作流面板
 *
 * 把「模式判据」和「skill 路由」做成可查的界面，不用翻文档。
 * 纯静态数据：内容与 modes/*.md、skills/ROUTING.md 保持一致，
 * 改完那两处后同步更新本文件即可。
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-workflow-kit',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    // ── 数据 ───────────────────────────────────────────────

    const MODES = [
      {
        id: 'brownfield',
        name: '存量深化',
        tag: '最常用',
        tone: 'warn',
        when: '目标处已有能跑的基线（代码 / 实验 / 文献集），你还不完全掌握它',
        rules: [
          '先摸基线再动手 —— 不读清结构就改 = 瞎改',
          '能跑才算完成 —— 改完必须跑原有测试/构建',
          '最小改动 —— 不顺手重构、不调格式',
          '先查调用方再改签名 —— 避免修好 A 坏了 B',
          '先复现再修 —— 没有复现的修复等于猜',
          '尊重既有约定 —— 一致性优于局部最优',
        ],
        delegate: '强委派：调研 / 独立模块改造 / 多 bug 排查 / 回归验证都可派',
        keep: '自己留：架构级取舍、跨模块接口变更、风险区改动',
      },
      {
        id: 'greenfield',
        name: '从零开始',
        tag: '',
        tone: 'ok',
        when: '目标处是空的，或只有无关文件；需要从空白设计并搭建',
        rules: [
          '先定接口再写实现 —— 签名/数据结构/边界先确定',
          '最小可行 —— 先端到端跑通，再加功能',
          '快速验证假设 —— 库能不能用、API 长什么样，先用最小实验验证',
          '不过度设计 —— YAGNI，不造工厂、不留扩展点',
          '一次一件事 —— 不相关改动分开做、分次验证',
        ],
        delegate: '轻委派：接口已定死后的具体实现、样板代码、独立模块测试',
        keep: '自己留：接口设计、模块划分、技术选型、调试关键路径',
      },
    ]

    const SKILLS = [
      { group: '强制', items: [
        { name: 'verification-before-completion', desc: '没当场跑过验证，不许说"通过"', when: '声称完成前' },
      ]},
      { group: '协作', items: [
        { name: 'dispatching-parallel-agents', desc: '2+ 互不依赖的任务并行派', when: '多个独立模块/bug' },
        { name: 'subagent-driven-development', desc: '每任务 fresh 执行者 + 任务级审查', when: '按计划执行多任务' },
        { name: 'writing-plans', desc: '多步骤任务先写计划', when: '需求明确但步骤多' },
        { name: 'executing-plans', desc: '在独立会话执行计划', when: '换会话继续做' },
      ]},
      { group: '诊断与调研', items: [
        { name: 'systematic-debugging', desc: '系统化定位，别急着改', when: '报错 / 测试失败' },
        { name: 'baseline-survey', desc: '摸清基线，产出 survey/*.md', when: '接手不熟的项目' },
      ]},
      { group: '领域（需另装）', items: [
        { name: 'sci-figure-kit', desc: '科研绘图（figkit / R / omicverse）', when: '出图、期刊配图' },
        { name: 'lit-search-strategy', desc: '检索策略（PICO/SPIDER）', when: '系统检索、综述检索' },
        { name: 'lit-deep-reading', desc: '论文精读（Keshav 三遍法）', when: '读论文、做笔记' },
        { name: 'lit-review-writing', desc: '批判性综述写作', when: '写文献综述' },
        { name: 'nature-writing', desc: 'Nature 风格论文写作', when: '写正文、投稿材料' },
        { name: 'nature-polishing', desc: '学术润色 / 中译英', when: '润色、改写' },
        { name: 'nature-citation', desc: '加 Nature/CNS 引用', when: '正文加引用' },
      ]},
    ]

    const FLOW = [
      { step: '1', title: '判断模式', desc: '先查 brownfield，不匹配再看 greenfield', hint: '误判成 greenfield 的代价更高' },
      { step: '2', title: '摸清基线', desc: '存量项目先跑 baseline-survey，主代理只读摘要', hint: '不读就改 = 瞎改' },
      { step: '3', title: '拆任务 + 写任务书', desc: '每个子任务自包含，写明用什么领域 skill', hint: '子代理不继承你的上下文' },
      { step: '4', title: '派发', desc: '独立上下文用 spawn，要继承决策用 fork', hint: '互不依赖的同一批并发派' },
      { step: '5', title: '收三行证据', desc: '改了什么 / 凭什么说对 / 最不确定的一点', hint: '只查第 3 条，信息密度最高' },
      { step: '6', title: '验证后交付', desc: '跑 verification-before-completion', hint: '没有命令输出 = 没完成' },
    ]

    // ── 样式 ───────────────────────────────────────────────

    const C = {
      page: { padding: '20px 24px', maxWidth: 980, margin: '0 auto', fontFamily: 'inherit' },
      head: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 },
      title: { fontSize: 18, fontWeight: 600, margin: 0, color: 'var(--dsw-alias-label-primary)' },
      sub: { fontSize: 12.5, color: 'var(--dsw-alias-label-secondary)', margin: '0 0 16px' },
      tabs: { display: 'flex', gap: 6, marginBottom: 16, borderBottom: '1px solid var(--dsw-alias-border-l1)' },
      tab: {
        padding: '7px 14px', border: 'none', background: 'transparent', cursor: 'pointer',
        fontSize: 13, color: 'var(--dsw-alias-label-secondary)',
        borderBottom: '2px solid transparent', marginBottom: -1,
      },
      tabOn: { color: 'var(--dsw-alias-brand-primary)', borderBottom: '2px solid var(--dsw-alias-brand-primary)', fontWeight: 600 },
      card: {
        border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 10, padding: '14px 16px',
        marginBottom: 12, background: 'var(--dsw-alias-bg-l1)',
      },
      cardHead: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 },
      cardTitle: { fontSize: 14.5, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' },
      chip: {
        fontSize: 11, padding: '2px 7px', borderRadius: 20,
        background: 'var(--dsw-alias-bg-l2)', color: 'var(--dsw-alias-label-secondary)',
      },
      chipWarn: { background: 'rgba(230,160,40,.16)', color: '#b8791a' },
      chipOk: { background: 'rgba(60,170,110,.16)', color: '#2f8a5b' },
      label: { fontSize: 11.5, fontWeight: 600, color: 'var(--dsw-alias-label-secondary)', margin: '10px 0 4px' },
      li: { fontSize: 13, lineHeight: 1.75, color: 'var(--dsw-alias-label-primary)', margin: 0, paddingLeft: 16 },
      meta: { fontSize: 12.5, color: 'var(--dsw-alias-label-secondary)', lineHeight: 1.7 },
      row: { display: 'grid', gridTemplateColumns: '160px 1fr 130px', gap: 10, alignItems: 'baseline',
        padding: '7px 0', borderBottom: '1px dashed var(--dsw-alias-border-l1)' },
      code: { fontSize: 12, fontFamily: 'ui-monospace, Consolas, monospace', color: 'var(--dsw-alias-brand-primary)' },
      step: {
        display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0',
        borderBottom: '1px dashed var(--dsw-alias-border-l1)',
      },
      stepNo: {
        flex: '0 0 26px', height: 26, borderRadius: '50%', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: 12.5, fontWeight: 600,
        background: 'var(--dsw-alias-bg-l2)', color: 'var(--dsw-alias-brand-primary)',
      },
      note: { fontSize: 12, color: 'var(--dsw-alias-label-secondary)', marginTop: 14, lineHeight: 1.7 },
    }

    // ── 图标 ───────────────────────────────────────────────

    function PanelIcon(props) {
      const size = (props && props.size) || 18
      return h('svg', {
        width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
      },
        h('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1.5 }),
        h('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1.5 }),
        h('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1.5 }),
        h('path', { d: 'M17.5 14v7M14 17.5h7' }))
    }

    // ── 面板 ───────────────────────────────────────────────

    function makePanel() {
      return function WorkflowPanel() {
        const [tab, setTab] = React.useState('modes')

        const modesView = () =>
          h('div', null,
            MODES.map((m) => h('div', { key: m.id, style: C.card },
              h('div', { style: C.cardHead },
                h('span', { style: C.cardTitle }, m.name),
                h('code', { style: C.code }, m.id),
                m.tag ? h('span', { style: Object.assign({}, C.chip, C.chipWarn) }, m.tag) : null),
              h('div', { style: C.meta }, m.when),
              h('div', { style: C.label }, '核心判据'),
              h('ul', { style: { margin: 0, paddingLeft: 18 } },
                m.rules.map((r, i) => h('li', { key: i, style: C.li }, r))),
              h('div', { style: C.label }, '委派'),
              h('div', { style: C.meta }, m.delegate),
              h('div', { style: C.meta }, m.keep))),
            h('p', { style: C.note },
              '判定顺序：先查 brownfield，不匹配再看 greenfield。',
              '因为把存量项目当新项目做（重复造轮子、破坏既有约定）的代价，远高于把新项目多花几分钟确认"确实是空的"。'))

        const skillsView = () =>
          h('div', null,
            SKILLS.map((g) => h('div', { key: g.group, style: C.card },
              h('div', { style: C.cardHead }, h('span', { style: C.cardTitle }, g.group)),
              g.items.map((s) => h('div', { key: s.name, style: C.row },
                h('code', { style: C.code }, s.name),
                h('span', { style: { fontSize: 12.5, color: 'var(--dsw-alias-label-primary)' } }, s.desc),
                h('span', { style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)' } }, s.when))))),
            h('p', { style: C.note },
              '领域 skill 不随本包分发，需自行安装到 ~/.dsh/skills/。',
              '目录名必须匹配 ^[a-z0-9]+(?:-[a-z0-9]+)*$ —— 中文名会被静默跳过。'))

        const flowView = () =>
          h('div', null,
            h('div', { style: C.card },
              FLOW.map((f) => h('div', { key: f.step, style: C.step },
                h('div', { style: C.stepNo }, f.step),
                h('div', null,
                  h('div', { style: { fontSize: 13.5, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' } }, f.title),
                  h('div', { style: C.meta }, f.desc),
                  h('div', { style: { fontSize: 11.5, color: 'var(--dsw-alias-label-secondary)', marginTop: 2 } }, '· ' + f.hint))))),
            h('p', { style: C.note },
              '完整文档：modes/MODES.md（模式库）、modes/brownfield.md、modes/greenfield.md、skills/ROUTING.md（skill 路由）。'))

        const TABS = [['modes', '模式'], ['skills', 'Skill 路由'], ['flow', '任务流程']]

        return h('div', { style: C.page },
          h('div', { style: C.head },
            h('span', { style: { color: 'var(--dsw-alias-brand-primary)', display: 'flex' } }, h(PanelIcon, { size: 20 })),
            h('h1', { style: C.title }, '工作流')),
          h('p', { style: C.sub }, '模式决定怎么工作 · skill 决定用什么能力 · 领域能力随任务流动'),
          h('div', { style: C.tabs },
            TABS.map(([id, label]) => h('button', {
              key: id, type: 'button',
              style: Object.assign({}, C.tab, tab === id ? C.tabOn : null),
              onClick: () => setTab(id),
            }, label))),
          tab === 'modes' ? modesView() : tab === 'skills' ? skillsView() : flowView())
      }
    }

    // ── 注册 ───────────────────────────────────────────────

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            { name: 'sidebar.panellist', id: 'workflow-kit', order: 15, label: () => '工作流' },
            PanelIcon))
        ctx.slots.inject('main', () =>
          ctx.slots.register({ name: 'main', key: 'workflow-kit' }, makePanel()))
      },
    }
  },
})
