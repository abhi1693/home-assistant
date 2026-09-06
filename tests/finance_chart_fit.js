const assert = require('node:assert/strict');

async function assertChartFit(page) {
  const issues = await page.locator('svg.recharts-surface, svg.spend-cal-svg, svg.investment-donut').evaluateAll(charts => {
    const problems = [];
    for (const chart of charts) {
      const panel = chart.closest('.card');
      if (!panel) continue;
      const box = chart.getBoundingClientRect(), bounds = panel.getBoundingClientRect();
      const name = chart.closest('section')?.getAttribute('aria-label') || panel.querySelector('h2')?.textContent;
      if (box.left < bounds.left - 1 || box.right > bounds.right + 1) problems.push(`${name}: chart exceeds panel`);
      for (let el = chart.parentElement; el && el !== panel.parentElement; el = el.parentElement) {
        const css = getComputedStyle(el);
        if (['auto','scroll'].includes(css.overflowX) || ['auto','scroll'].includes(css.overflowY)) {
          problems.push(`${name}: scrolling chart ancestor ${el.className}`);
        }
        if (el === panel) break;
      }
      const labels = [...chart.querySelectorAll('.recharts-xAxis .recharts-cartesian-axis-tick-value')].map(el=>el.getBoundingClientRect()).sort((a,b)=>a.left-b.left);
      for(let i=1;i<labels.length;i++) if(labels[i].left < labels[i-1].right-1) problems.push(`${name}: overlapping time labels`);
      for (const bar of chart.querySelectorAll('.recharts-bar-rectangle .recharts-rectangle')) {
        const r=bar.getBoundingClientRect();
        if(r.height>0 && (r.width<=0 || r.left<box.left-1 || r.right>box.right+1)) problems.push(`${name}: missing or clipped bar`);
      }
    }
    return [...new Set(problems)];
  });
  assert.deepEqual(issues, [], 'All charts fit their panel without scrolling or overlapping time labels');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Charts do not widen the page');
}
module.exports = {assertChartFit};
