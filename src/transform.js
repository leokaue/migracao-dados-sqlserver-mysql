function applyRule(value, rule) {
  if (value === null || value === undefined) return null;
  if (!rule) return value;
  if (rule === 'date') {
    const d = new Date(value);
    return isNaN(d) ? null : d.toISOString().slice(0,10);
  }
  if (rule === 'number') {
    const n = Number(value);
    return isNaN(n) ? null : n;
  }
  return String(value).trim();
}

function transformRows(map, rows) {
  return rows.map(row => {
    const out = {};
    const srcCols = map.source.columns;
    const tgtCols = map.target.columns;
    const rules = map.rules || {};
    for (let i = 0; i < srcCols.length; i++) {
      const sc = srcCols[i];
      const tc = tgtCols[i];
      out[tc] = applyRule(row[sc], rules[tc]);
    }
    return out;
  });
}

module.exports = { transformRows };
