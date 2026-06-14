'use strict';
const fs   = require('fs');
const path = require('path');
const DIR  = 'C:/Users/Administrator/vestcalc';

const SKIP = new Set([
  'index.html','about.html','privacy.html','terms.html','contact.html','404.html',
  'mortgage-calculators.html','home-calculators.html','math-calculators.html',
  'analysis-calculators.html','health-calculators.html','debt-calculators.html',
  'retirement-calculators.html','education-calculators.html','tax-calculators.html',
  'budget-calculators.html',
]);
const tools = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && !SKIP.has(f));

// ── CSS snippets for batch fixes ──────────────────────────────────────────────
const BTN_CSS =
  '.btn{width:100%;padding:13px;background:var(--primary);color:#fff;border:none;border-radius:var(--radius-sm);font-size:15px;font-weight:700;cursor:pointer;transition:background .15s;margin-top:8px}' +
  '.btn:hover{background:var(--primary-dark)}';

const BC_CSS =
  '.breadcrumb-nav{font-size:13px;color:rgba(255,255,255,.8);padding:0;margin-bottom:16px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center}' +
  '.breadcrumb-nav a{color:rgba(255,255,255,.95);text-decoration:none;font-weight:500}' +
  '.breadcrumb-nav a:hover{color:#fff;text-decoration:underline}' +
  '.breadcrumb-nav span{color:rgba(255,255,255,.5)}';

const COMPONENT_CSS =
  '/* breakdown */' +
  '.breakdown{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:20px 24px;margin-top:20px}' +
  '.breakdown h3{font-size:14px;font-weight:700;color:var(--text);margin-bottom:14px}' +
  '.breakdown-item{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--text2)}' +
  '.breakdown-item:last-of-type{border-bottom:none}' +
  '.breakdown-item span:last-child{font-weight:700;color:var(--text)}' +
  '/* bar chart */' +
  '.bar-wrap{display:flex;height:12px;border-radius:99px;overflow:hidden;margin:16px 0 10px;background:var(--border)}' +
  '.bar-seg{height:100%;transition:width .4s}' +
  '.bar-legend{display:flex;gap:16px;flex-wrap:wrap}' +
  '.legend-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2)}' +
  '.legend-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}' +
  '/* info box */' +
  '.info-box{background:var(--primary-dim);border:1px solid var(--primary-light);border-radius:var(--radius-sm);padding:14px 18px;margin-top:16px;font-size:14px;color:var(--primary-dark);line-height:1.6}' +
  '/* amort / data table */' +
  '.amort-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:16px}' +
  '.amort-table th{background:var(--bg);padding:10px 12px;text-align:right;font-weight:600;color:var(--text2);border-bottom:2px solid var(--border)}' +
  '.amort-table th:first-child{text-align:left}' +
  '.amort-table td{padding:8px 12px;text-align:right;border-bottom:1px solid var(--border);color:var(--text)}' +
  '.amort-table td:first-child{text-align:left;font-weight:600}' +
  '.amort-table tr:hover td{background:var(--primary-dim)}' +
  '.table-wrap{max-height:400px;overflow-y:auto;border:1px solid var(--border);border-radius:var(--radius-sm)}' +
  '/* chart bars */' +
  '.chart-wrap{display:flex;align-items:flex-end;gap:8px;height:120px;margin:20px 0 8px;padding:0 4px}' +
  '.chart-bar{flex:1;background:var(--primary);border-radius:4px 4px 0 0;min-width:20px;transition:height .3s}' +
  '.chart-label{font-size:11px;color:var(--text3);text-align:center;margin-top:4px}' +
  '/* tag / badge */' +
  '.tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:600;background:var(--primary-dim);color:var(--primary)}' +
  '.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;background:var(--primary);color:#fff}';

const RESULT_COMPAT_CSS =
  '.result-box .label,.label-compat{font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}' +
  '.result-box .value,.value-compat{font-size:1.5rem;font-weight:800;color:var(--primary)}' +
  '.result-box.primary .label,.result-box.primary .value{color:#fff}';

// ── Non-standard classes to detect ───────────────────────────────────────────
const SPECIAL_CLASSES = [
  'rate-table','input-inline','calc-row','multi-calc',
  'comparison-grid','step-list','formula-box','note-box',
  'progress-bar','gauge-wrap','donut-wrap','pie-wrap',
  'slider-wrap','range-wrap','toggle-group',
];

// ── STEP 1: Audit ─────────────────────────────────────────────────────────────
const issues = []; // { file, type, desc }
const counters = {
  heroMissing: [], btnMissing: [], calcCardMissing: [],
  specialNoCss: {}, resultMixed: [], cssIncomplete: [],
};

tools.forEach(f => {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  const styleEnd = h.indexOf('</style>');
  const css  = styleEnd > 0 ? h.slice(0, styleEnd) : '';
  const body = h.slice(h.indexOf('<body') > 0 ? h.indexOf('<body') : 0);

  // ── 1. Hero区 ───────────────────────────────────────────────────────────────
  const hasPageHero   = body.includes('class="page-hero"');
  const heroContent   = body.match(/<div class="page-hero">([\s\S]*?)<\/div>/);
  const heroHasH1     = heroContent ? heroContent[1].includes('<h1') : false;
  const heroHasBc     = heroContent ? heroContent[1].includes('breadcrumb-nav') : false;

  if (!hasPageHero) {
    issues.push({ file: f, type: 'hero塌陷/缺失', desc: '无 <div class="page-hero">' });
    counters.heroMissing.push(f);
  } else {
    if (!heroHasH1) {
      issues.push({ file: f, type: 'hero塌陷/缺失', desc: 'page-hero内无<h1>' });
      counters.heroMissing.push(f);
    }
    if (!heroHasBc) {
      issues.push({ file: f, type: 'hero缺面包屑', desc: 'page-hero内无breadcrumb-nav' });
    }
  }

  // ── 2. calc-card结构 ────────────────────────────────────────────────────────
  const hasCalcCard   = body.includes('class="calc-card"');
  const hasFormGrid   = body.includes('class="form-grid"') || body.includes('class="form-group"');
  const hasBtn        = body.includes('class="btn"') || body.includes('<button class="btn"') ||
                        body.includes("class='btn'");

  if (!hasCalcCard) {
    issues.push({ file: f, type: 'calc-card缺失', desc: '无 class="calc-card"' });
    counters.calcCardMissing.push(f);
  } else if (!hasFormGrid) {
    issues.push({ file: f, type: 'calc-card结构异常', desc: 'calc-card内无form-grid/form-group' });
  }

  if (!hasBtn) {
    issues.push({ file: f, type: 'btn缺失', desc: '无 class="btn" 按钮' });
  }

  // ── 3. CSS完整性 ─────────────────────────────────────────────────────────────
  const hasStyle      = h.includes('<style>') || h.includes('<style ');
  const cssHasBtn     = css.includes('.btn{') || css.includes('.btn {');
  const cssHasCard    = css.includes('.calc-card{') || css.includes('.calc-card ');
  const cssHasHero    = css.includes('.page-hero{') || css.includes('.page-hero ');
  const cssHasBc      = css.includes('.breadcrumb-nav{') || css.includes('.breadcrumb-nav ');
  const cssHasResult  = css.includes('.result-box{') || css.includes('.result-box ');

  if (!hasStyle) {
    issues.push({ file: f, type: 'CSS缺失', desc: '无<style>块' });
    counters.cssIncomplete.push(f);
  } else {
    const missing = [];
    if (!cssHasBtn)    missing.push('.btn');
    if (!cssHasCard)   missing.push('.calc-card');
    if (!cssHasHero)   missing.push('.page-hero');
    if (!cssHasBc)     missing.push('.breadcrumb-nav');
    if (!cssHasResult) missing.push('.result-box');
    if (missing.length) {
      issues.push({ file: f, type: 'CSS不完整', desc: '缺少：' + missing.join(', ') });
      if (!cssHasBtn) counters.btnMissing.push(f);
    }
  }

  // ── 4. 结果区class检测 ───────────────────────────────────────────────────────
  const usesOldLabel  = body.includes('class="label"') || body.includes('result-box"><div class="label"');
  const usesNewLabel  = body.includes('result-label') || body.includes('class="result-label"');
  const hasOldLabelCss= css.includes('.result-box .label') || css.includes('.label{') || css.includes('.label ');
  const hasNewLabelCss= css.includes('.result-label{') || css.includes('.result-box .result-label');

  if (usesOldLabel && !hasOldLabelCss) {
    issues.push({ file: f, type: '结果区class混用', desc: '用了.label但CSS未定义' });
    counters.resultMixed.push(f);
  }
  if (usesNewLabel && !hasNewLabelCss) {
    issues.push({ file: f, type: '结果区class混用', desc: '用了.result-label但CSS未定义' });
    counters.resultMixed.push(f);
  }

  // ── 5. 特殊组件检测 ──────────────────────────────────────────────────────────
  SPECIAL_CLASSES.forEach(cls => {
    const usedInBody = body.includes(`class="${cls}"`) || body.includes(`class="${cls} `) ||
                       body.includes(` ${cls}"`) || body.includes(` ${cls} `);
    const definedInCss = css.includes(`.${cls}{`) || css.includes(`.${cls} {`) ||
                         css.includes(`.${cls}:`) || css.includes(`, .${cls}`);
    if (usedInBody && !definedInCss) {
      if (!counters.specialNoCss[cls]) counters.specialNoCss[cls] = [];
      counters.specialNoCss[cls].push(f);
      issues.push({ file: f, type: '特殊组件无CSS', desc: `.${cls} 用了但CSS未定义` });
    }
  });
});

// ── Build report ──────────────────────────────────────────────────────────────
const reportLines = [];
reportLines.push('=== 问题页面汇总 ===');
issues.forEach(({ file, type, desc }) => reportLines.push(`${file} | ${type} | ${desc}`));
reportLines.push('');
reportLines.push('=== 按问题类型统计 ===');
reportLines.push(`- hero塌陷/缺失：${counters.heroMissing.length}页`);
reportLines.push(`  ${counters.heroMissing.join(', ')}`);
reportLines.push(`- btn样式缺失：${counters.btnMissing.length}页`);
reportLines.push(`- calc-card缺失：${counters.calcCardMissing.length}页`);
reportLines.push(`  ${counters.calcCardMissing.join(', ')}`);

const specialEntries = Object.entries(counters.specialNoCss);
const specialTotal = new Set(specialEntries.flatMap(([,files]) => files)).size;
reportLines.push(`- 特殊组件无CSS：${specialTotal}页`);
specialEntries.forEach(([cls, files]) => reportLines.push(`  .${cls}：${files.length}页 → ${files.join(', ')}`));

reportLines.push(`- 结果区class混用：${counters.resultMixed.length}页`);
reportLines.push(`  ${[...new Set(counters.resultMixed)].join(', ')}`);
reportLines.push(`- CSS块缺失：${counters.cssIncomplete.length}页`);

fs.writeFileSync(path.join(DIR, 'ui-audit-report.txt'), reportLines.join('\n'), 'utf8');
console.log('STEP 1 完成，问题数：' + issues.length + '，写入 ui-audit-report.txt');

// ── STEP 2: Batch auto-fix ────────────────────────────────────────────────────
let fixedBtn=0, fixedBc=0, fixedComp=0, fixedResult=0;

const COMP_SENTINEL = '.breakdown{background:var(--bg)';

tools.forEach(f => {
  let h = fs.readFileSync(path.join(DIR, f), 'utf8');
  const styleEnd = h.indexOf('</style>');
  const css = styleEnd > 0 ? h.slice(0, styleEnd) : '';
  let changed = false;

  if (!h.includes('</style>')) return; // 没有style块，跳过

  // A. 补 .btn
  if (!css.includes('.btn{') && !css.includes('.btn {')) {
    h = h.replace('</style>', BTN_CSS + '\n</style>');
    fixedBtn++; changed = true;
  }

  // B. 补 .breadcrumb-nav 白色样式（检测是否是旧的var(--text3)颜色或根本没有）
  const hasBcCss = h.includes('.breadcrumb-nav{') || h.includes('.breadcrumb-nav ');
  const hasWhiteBc = h.includes('rgba(255,255,255,.8)') && h.includes('breadcrumb-nav');
  if (!hasBcCss || !hasWhiteBc) {
    // 移除旧样式（如果存在）
    h = h.replace(/\.breadcrumb-nav\{[^}]*color:var\(--text3\)[^}]*\}/, '');
    h = h.replace(/\.breadcrumb-nav a\{color:var\(--primary\)[^}]*\}/, '');
    h = h.replace(/\.breadcrumb-nav a:hover\{[^}]*\}/, '');
    h = h.replace(/\.breadcrumb-nav span\{[^}]*\}/, '');
    h = h.replace('</style>', BC_CSS + '\n</style>');
    fixedBc++; changed = true;
  }

  // C. 补通用组件CSS
  if (!h.includes(COMP_SENTINEL)) {
    h = h.replace('</style>', COMPONENT_CSS + '\n</style>');
    fixedComp++; changed = true;
  }

  // D. 补 result-box .label/.value 兼容选择器
  const body2 = h.slice(h.indexOf('<body') > 0 ? h.indexOf('<body') : 0);
  const usesOldLabel = body2.includes('class="label"') || body2.includes('"result-box"') && body2.includes('"label"');
  const hasCompatCss = h.includes('.result-box .label') || h.includes('.label-compat');
  if (usesOldLabel && !hasCompatCss) {
    h = h.replace('</style>', RESULT_COMPAT_CSS + '\n</style>');
    fixedResult++; changed = true;
  }

  if (changed) fs.writeFileSync(path.join(DIR, f), h, 'utf8');
});

console.log(`STEP 2 完成：btn+${fixedBtn} bc+${fixedBc} comp+${fixedComp} result-compat+${fixedResult}`);

// ── STEP 3: Manual fix list ───────────────────────────────────────────────────
const manualLines = [];
manualLines.push('=== 需要人工处理的问题 ===');
manualLines.push('');
manualLines.push('── 1. Hero结构完全不同（无page-hero class）──');
counters.heroMissing.forEach(f => manualLines.push(`  ${f}`));
manualLines.push('');
manualLines.push('── 2. 无calc-card结构（可能是完全不同的布局）──');
counters.calcCardMissing.forEach(f => manualLines.push(`  ${f}`));
manualLines.push('');
manualLines.push('── 3. 用了完全自定义组件（需逐页判断）──');
Object.entries(counters.specialNoCss).forEach(([cls, files]) => {
  manualLines.push(`  .${cls}（${files.length}页）：`);
  files.forEach(f => manualLines.push(`    ${f}`));
});
manualLines.push('');
manualLines.push('── 4. CSS块完全缺失的页面 ──');
counters.cssIncomplete.forEach(f => manualLines.push(`  ${f}`));

fs.writeFileSync(path.join(DIR, 'manual-fix-needed.txt'), manualLines.join('\n'), 'utf8');
console.log('STEP 3 完成，写入 manual-fix-needed.txt');

// ── STEP 4: Spot-check ────────────────────────────────────────────────────────
console.log('\n── 抽检验证 ──');
['loan-calculator.html','compound-interest-calculator.html','retirement-calculator.html'].forEach(f => {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  const hasBc   = h.includes('rgba(255,255,255,.8)');
  const hasBtn  = h.includes('.btn{') || h.includes('.btn {');
  const hasComp = h.includes(COMP_SENTINEL);
  console.log(`  ${f}: bc-white=${hasBc?'✓':'✗'} btn=${hasBtn?'✓':'✗'} comp=${hasComp?'✓':'✗'}`);
});
