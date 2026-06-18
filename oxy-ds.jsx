/* Oxy Loop — DS component islands (real bundle components in documented roles). */
(function () {
  const DS = window.OxyLoopDesignSystem_0d2024 || {};
  const { StatTile, Tag, Badge } = DS;
  const h = React.createElement;

  const I = (paths) => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    paths.map((d, i) => h('path', { key: i, d })));

  // localized string helper — falls back to English if i18n isn't ready / key missing
  const tr = (key, en) => {
    try {
      const i = window.PFi18n;
      if (i && i.dict && i.get) {
        const e = i.dict[key];
        const lang = i.get();
        if (e && e[lang] != null) return e[lang];
      }
    } catch (_) {}
    return en;
  };

  const statMount = document.getElementById('product-stats');
  const chipMount = document.getElementById('cover-chips');
  const badgeMount = document.getElementById('loop-badge');
  const statRoot = (statMount && StatTile) ? ReactDOM.createRoot(statMount) : null;
  const chipRoot = (chipMount && Tag) ? ReactDOM.createRoot(chipMount) : null;
  const badgeRoot = (badgeMount && Badge) ? ReactDOM.createRoot(badgeMount) : null;

  function render() {
    if (statRoot) {
      statRoot.render(
        h(React.Fragment, null,
          h(StatTile, { tone: 'wash', value: tr('oxy.stat.walk.v', '5 min'), label: tr('oxy.stat.walk', 'Walking time to a station'),
            icon: I(['M9 20l3-6 3 6', 'M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M6 9l6 2 6-2']) }),
          h(StatTile, { value: '25', label: tr('oxy.stat.jar', 'Jar retention in stock'),
            icon: I(['M9 2h6', 'M10 2v3.5L8.5 8A3 3 0 0 0 8 9.6V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9.6A3 3 0 0 0 15.5 8L14 5.5V2']) }),
          h(StatTile, { value: '$0.52', label: tr('oxy.stat.price', 'Per refill — far below a new can'),
            icon: I(['M7 19H4.8c-1.8 0-2.9-2-2-3.5l1.4-2.4', 'm9 8 3-5 3 5', 'm9 19 3 3 3-3']) }),
          h(StatTile, { tone: 'wash', value: '\u221E', label: tr('oxy.stat.cycles', 'Refill cycles per canister'),
            icon: I(['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z']) })
        )
      );
    }
    if (chipRoot) {
      chipRoot.render(
        h(React.Fragment, null,
          h(Tag, { selected: true }, tr('oxy.node.rent.t', 'Rent')),
          h(Tag, null, tr('oxy.node.refill.t', 'Refill')),
          h(Tag, null, tr('oxy.node.recycle.t', 'Recycle')),
          h(Tag, null, tr('oxy.node.redeem.t', 'Redeem'))
        )
      );
    }
    if (badgeRoot) {
      badgeRoot.render(h(Badge, { tone: 'cyan' }, tr('oxy.badge.circular', 'Circular by design')));
    }
  }

  render();
  window.addEventListener('pf-lang-change', render);
})();
