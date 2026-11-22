/*! Eretek Online Araçlar #61 — Replikasyon Backlog ve Yakalama Süresi */
ERT.def('61', {
	run: function (v, c) {
		var eff = (v.eff || 100) / 100, cap = v.link * eff * 1e6 / 8 * 3600 / 1e9, net = cap - (v.rate || 0), vv = { capGBh: Math.round(cap * 1000) / 1000 }, kv = [[c.t('cap'), c.n(cap, 2) + ' GB/' + c.t('h')], [c.t('net'), c.n(net, 2) + ' GB/' + c.t('h')]], msgs = [];
		if (net <= 0) { vv.hours = null; msgs.push(['err', c.t('never', { n: c.n(v.rate, 2), cap: c.n(cap, 2) })]); }
		else { var h = v.backlog / net; vv.hours = Math.round(h * 1000) / 1000; kv.push([c.t('time'), c.dur(h * 3600)]); if (v.rate > cap * 0.7) { msgs.push(['warn', c.t('tight')]); } else { msgs.push(['ok', c.t('ok')]); } }
		msgs.push(['info', c.t('method')]);
		return { big: vv.hours === null ? c.t('neverB') : c.dur(vv.hours * 3600), kv: kv, msgs: msgs, v: vv };
	}
});
