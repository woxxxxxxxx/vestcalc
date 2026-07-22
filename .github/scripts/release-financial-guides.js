const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const updated = '2026-07-23';

const guides = [
  {
    slug: 'credit-card-payoff-mistakes',
    category: 'Debt',
    title: 'Credit Card Payoff Mistakes That Keep Balances Growing',
    description: 'Learn how daily interest, minimum payments, new purchases, fees, and payment timing can undermine a credit card payoff plan.',
    calculator: '/credit-card-payoff-calculator.html',
    calculatorLabel: 'Open the credit card payoff calculator',
    dek: 'A payoff estimate becomes useful only when the balance, APR, payment schedule, fees, and new spending match what actually happens on the account.',
    sections: [
      ['Mistake 1: treating APR as a once-a-month charge', [
        'Many card issuers calculate interest daily from an average daily balance. That means the balance can change throughout the billing cycle and interest can continue to accrue between the statement date and the day a payment arrives. A calculator that simply divides the annual percentage rate by twelve is a planning approximation, not a reconstruction of the issuer\'s ledger.',
        'Use the current statement balance and the APR attached to that balance category. If purchases, cash advances, or balance transfers have different rates, model them separately. The Consumer Financial Protection Bureau notes that statements must identify the balance and APR for each category. Combining them into one blended number can hide the most expensive part of the debt.'
      ]],
      ['Mistake 2: building the plan around the minimum payment', [
        'The minimum is the amount required to keep the account current; it is not designed to meet a personal payoff date. Paying only the minimum can stretch repayment because the required amount may decline as the balance falls. CFPB guidance recommends paying more than the minimum when possible to reduce interest cost and shorten repayment.',
        'Choose a fixed monthly amount that still leaves room for essential bills and a small cash buffer. Then compare that amount with a second scenario that is ten percent lower. If the lower scenario adds years, the plan has very little tolerance for a missed month and needs either a larger payment or a lower-cost restructuring option.'
      ]],
      ['Mistake 3: continuing to spend on the payoff card', [
        'A payoff projection assumes the balance only moves down. New purchases reverse that assumption and may also affect the grace period. Separate ordinary spending from the payoff account, remove the card from saved checkout profiles, and track any unavoidable recurring charges as additions to the starting balance.',
        'If the card must remain active for a subscription, add that monthly charge to the planned payment so the principal reduction stays intact. Review the next two statements against the model. A balance that falls by less than expected is evidence that interest, fees, or new transactions were omitted.'
      ]],
      ['Mistake 4: ignoring payment timing and promotional terms', [
        'A payment received earlier generally reduces the balance exposed to daily interest sooner, but the due date still controls whether the required payment is on time. Automate at least the minimum before the due date, then schedule the additional payoff amount after income arrives. This protects the account if a manual payment is forgotten.',
        'For a promotional APR, run two schedules: one that finishes before the promotion ends and one using the post-promotion rate. Include any balance-transfer fee in the opening balance. A plan that works only under the promotional rate needs a clear fallback before that rate expires.'
      ]],
      ['A practical monthly review', [
        'Record the statement balance, interest charged, fees, new transactions, and total payments. Compare the actual ending balance with the projected balance. A small difference is normal because issuer calculations vary, but a repeated gap deserves investigation.',
        'Do not drain emergency savings to make an aggressive payment unless the tradeoff is deliberate. A new emergency charged back to the card can erase the apparent progress. The goal is a payment amount that is both mathematically effective and operationally sustainable.'
      ]]
    ],
    sources: [
      ['CFPB: How credit card interest is calculated', 'https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/'],
      ['CFPB: Know Before You Owe - credit cards', 'https://www.consumerfinance.gov/data-research/credit-card-data/know-you-owe-credit-cards/']
    ]
  },
  {
    slug: 'mortgage-affordability-guide', category: 'Housing',
    title: 'Mortgage Affordability: Build a Payment You Can Keep',
    description: 'Estimate an affordable home payment by separating principal and interest from taxes, insurance, dues, repairs, and cash needed at closing.',
    calculator: '/home-affordability-calculator.html', calculatorLabel: 'Open the home affordability calculator',
    dek: 'The amount a lender may approve and the payment a household can comfortably maintain are different questions. Start with the household budget, then work backward to a loan amount.',
    sections: [
      ['Start with the total housing payment', [
        'Principal and interest are only part of the monthly cost. Add property taxes, homeowners insurance, mortgage insurance when applicable, homeowners association dues, and a repair allowance. If any tax or insurance item is not escrowed, convert its annual bill into a monthly reserve instead of treating it as a surprise.',
        'The CFPB Loan Estimate separates principal and interest from the estimated total monthly payment. Use the total figure when testing affordability. A calculator result that excludes taxes and insurance is a loan-payment estimate, not a household housing budget.'
      ]],
      ['Work backward from cash flow, not approval', [
        'List take-home income, required debt payments, childcare, health costs, transportation, savings goals, and irregular obligations. Decide what remains for housing without sacrificing the emergency reserve or relying on credit cards for ordinary expenses. CFPB guidance emphasizes that qualification does not account for every family priority.',
        'Test the budget with one income interruption, a major repair, or a higher insurance renewal. If a modest shock immediately creates revolving debt, reduce the target price or increase the cash reserve before buying.'
      ]],
      ['Separate the down payment from cash to close', [
        'The down payment is not the full upfront requirement. Closing costs, prepaid taxes and insurance, moving costs, immediate repairs, and cash reserves all compete for the same savings. Keep these buckets separate so a larger down payment does not leave the household without liquidity.',
        'When the down payment is below twenty percent, mortgage insurance may increase the monthly cost depending on the loan. Do not assume one threshold applies to every program; ask each lender to show the actual payment and cancellation rules in writing.'
      ]],
      ['Stress-test rates, insurance, and maintenance', [
        'Run the calculator at the quoted rate and again at a higher rate before locking. For an adjustable-rate product, use the projected-payment disclosures rather than assuming the initial payment lasts forever. Also test a higher insurance cost, especially where weather or disaster risk is material.',
        'A maintenance reserve is not a lender requirement, but it is a real ownership cost. Use property age and condition to choose a planning amount, then keep it outside the mortgage payment. The objective is not a universal percentage; it is a budget that recognizes repairs will occur.'
      ]],
      ['Compare offers on the same assumptions', [
        'Request Loan Estimates for the same loan type, term, and amount. Compare the estimated total monthly payment, origination charges, services, lender credits, cash to close, and whether the rate is locked. A lower advertised rate can be offset by points or fees.',
        'Update the calculator with the figures from each written estimate. Keep the home price and down payment constant so the comparison isolates financing differences. The final decision should preserve both monthly flexibility and enough cash after closing.'
      ]]
    ],
    sources: [
      ['CFPB: Decide how much you want to spend on a home', 'https://www.consumerfinance.gov/owning-a-home/prepare/decide-how-much-you-want-spend/'],
      ['CFPB: Loan Estimate explainer', 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/']
    ]
  },
  {
    slug: 'retirement-calculator-guide', category: 'Retirement',
    title: 'Retirement Calculator Assumptions: A Scenario Checklist',
    description: 'Use retirement projections responsibly by testing savings, inflation, returns, Social Security, retirement timing, and withdrawal assumptions.',
    calculator: '/retirement-calculator.html', calculatorLabel: 'Open the retirement calculator',
    dek: 'A retirement calculator is a scenario model, not a promise. Its value comes from exposing which assumptions matter and showing what actions remain under your control.',
    sections: [
      ['Keep today\'s dollars and future dollars consistent', [
        'A projection can express the future account balance in nominal dollars or inflation-adjusted dollars. Problems arise when future income is entered in nominal dollars while spending is entered in today\'s purchasing power. Pick one basis and use it for every input and result.',
        'For a planning view, today\'s dollars are often easier to interpret. If the calculator uses a nominal investment return, subtract a separate inflation assumption or use a real return. Label the scenario so it can be reproduced later.'
      ]],
      ['Use a range of returns instead of one forecast', [
        'Long-term average returns do not arrive smoothly. A sequence of poor years near retirement can have a different effect from the same average return earlier in the career. Run a base case, a lower-return case, and a case with weak returns during the first retirement years.',
        'Avoid raising the return assumption merely to make the result reach the target. When a projection falls short, test controllable levers first: contribution amount, retirement date, spending target, and the mix of guaranteed and market-dependent income.'
      ]],
      ['Verify income sources separately', [
        'Do not enter Social Security as a guessed percentage of salary. The Social Security Administration provides personalized estimates based on the earnings record and the age benefits begin. Review the earnings record and compare more than one claiming age.',
        'Model pensions, rental income, and part-time work separately because they may start or stop at different times. Note whether each amount is before or after tax and whether it changes with inflation. A single combined income number can hide these timing differences.'
      ]],
      ['Model contributions and retirement timing', [
        'Use current contribution amounts rather than an aspirational percentage, then create a second scenario for the planned increase. Include employer contributions only when the eligibility and vesting assumptions are understood. Revisit the model after compensation or plan rules change.',
        'A later retirement date can add contributions, shorten the withdrawal period, and change Social Security benefits. Test one-year increments instead of treating retirement age as fixed. The comparison shows whether timing is a powerful lever or whether spending and savings require more attention.'
      ]],
      ['Turn the output into a review process', [
        'Save the input assumptions with the date. Review the model annually and after major changes such as a job transition, marriage, inheritance, or large market movement. Update actual balances without rewriting history to make earlier estimates appear correct.',
        'Use the result as a conversation starter with a qualified professional when taxes, pensions, estate planning, or complex withdrawal choices are involved. VestCalc does not provide individualized investment, tax, or legal advice.'
      ]]
    ],
    sources: [
      ['SSA: Get a personalized benefits estimate', 'https://www.ssa.gov/prepare/get-benefits-estimate'],
      ['SSA: Retirement benefit calculators', 'https://www.ssa.gov/OACT/anypia/']
    ]
  },
  {
    slug: 'emergency-fund-planning', category: 'Savings',
    title: 'Emergency Fund Planning Based on Your Actual Risks',
    description: 'Build an emergency reserve from essential expenses, income stability, deductibles, family obligations, access needs, and recovery time.',
    calculator: '/emergency-fund-calculator.html', calculatorLabel: 'Open the emergency fund calculator',
    dek: 'There is no single reserve target that fits every household. A defensible target connects likely financial shocks with essential spending and the time needed to recover.',
    sections: [
      ['Define what the fund is for', [
        'An emergency fund is a cash reserve for unplanned expenses or income disruption, not a replacement for every sinking fund. Car registration, annual insurance premiums, and planned travel are irregular but predictable; save for them separately so they do not consume the emergency balance.',
        'Write a short use policy. Examples might include urgent medical costs, necessary home or vehicle repairs, travel for a family emergency, or essential expenses during job loss. A written boundary makes it easier to use the money when a real emergency occurs and harder to spend it casually.'
      ]],
      ['Calculate essential monthly spending', [
        'Start with housing, utilities, food, insurance, minimum debt payments, transportation, medicine, childcare, and other obligations that cannot be paused. Exclude discretionary categories that would be reduced during a crisis. Use recent statements rather than memory.',
        'If income and expenses are irregular, calculate a low, typical, and high essential month. The calculator target should reflect the pattern most likely during a disruption. A household with seasonal utility bills may need more than a simple average suggests.'
      ]],
      ['Add risk-specific amounts', [
        'Months of expenses address income loss, but other shocks may be larger and faster. Review health, auto, and homeowners deductibles; common repair costs; unpaid leave exposure; and travel obligations. Avoid double-counting an expense already covered by insurance or a dedicated sinking fund.',
        'Income stability matters as much as household size. Two independent earners, one highly variable contractor income, and a single specialized salary have different recovery profiles. Choose a coverage period that reflects how long replacing income could realistically take.'
      ]],
      ['Choose access and safety over maximum yield', [
        'CFPB guidance says an emergency reserve should be safe and accessible. A dedicated bank or credit union account can separate it from everyday spending while keeping it available. Compare account insurance, transfer speed, withdrawal restrictions, and fees before focusing on yield.',
        'Do not place the entire first line of emergency cash in an asset that may fall in value or take days to sell. Some households keep a small amount of physical cash for outages, but cash can be lost or stolen and should not replace a secure account.'
      ]],
      ['Build in milestones and a refill rule', [
        'A large target can discourage action. Use milestones such as one known deductible, then one month of essential expenses, then the full risk-based target. Automate a transfer aligned with payday and adjust it when income changes.',
        'After using the fund, record what happened and establish a refill schedule. The event may reveal that the target was too low, the account was too difficult to access, or a predictable expense needs its own sinking fund. The reserve should improve as evidence accumulates.'
      ]]
    ],
    sources: [
      ['CFPB: An essential guide to building an emergency fund', 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/']
    ]
  },
  {
    slug: 'rent-vs-buy-guide', category: 'Housing',
    title: 'Rent vs. Buy: Compare Flexibility, Cash Flow, and Risk',
    description: 'Compare renting and buying with a realistic time horizon, transaction costs, maintenance, insurance, opportunity cost, and scenario ranges.',
    calculator: '/rent-vs-buy-calculator.html', calculatorLabel: 'Open the rent vs. buy calculator',
    dek: 'The decision is not settled by comparing rent with principal and interest. The useful comparison includes the full cost, the likely holding period, and the value of flexibility.',
    sections: [
      ['Choose a realistic holding period', [
        'Buying has upfront and exit costs, while renting usually preserves more flexibility. Estimate how long employment, family needs, and location preferences are likely to keep you in the home. Run shorter and longer periods rather than forcing one prediction.',
        'The CFPB warns that buying can be risky and expensive if a move is likely within a few years. A break-even year from a calculator is not a promise that the property can be sold at that time or at the assumed value.'
      ]],
      ['Compare the complete monthly cash flow', [
        'For ownership, include principal and interest, property taxes, homeowners insurance, mortgage insurance, association dues, maintenance, and utilities that differ from the rental. For renting, include rent, renters insurance, fees, parking, and expected increases.',
        'Principal reduction builds equity and should not be treated exactly like interest or rent, but it still requires monthly cash. Keep cash-flow affordability and long-term net worth as separate outputs so an apparently favorable investment result does not hide a strained budget.'
      ]],
      ['Account for cash at the beginning and end', [
        'Buying may require a down payment, closing costs, inspections, moving expenses, and immediate repairs. Selling can involve commissions, taxes, concessions, and repairs. Renting may require deposits and moving costs but usually commits less capital.',
        'Model what the uncommitted cash could do if the household continues renting. Use a conservative alternative return and include taxes or fees where relevant. Opportunity cost is uncertain, so run more than one assumption rather than declaring a winner from a single rate.'
      ]],
      ['Stress-test appreciation and maintenance', [
        'Home prices can rise, stagnate, or fall. Use a flat-price scenario and a lower-price scenario in addition to the base case. Maintenance also arrives unevenly: one roof or heating-system replacement can overwhelm a smooth annual average.',
        'Insurance availability and cost can change, particularly where climate risk is significant. Research the property and obtain realistic insurance information before treating a calculator estimate as a purchase budget.'
      ]],
      ['Make the decision with nonfinancial constraints visible', [
        'Ownership offers control over the property but transfers repair responsibility and market risk to the owner. Renting can make relocation easier but may limit modifications and expose the tenant to lease changes. List which constraints matter to the household before reviewing the calculated result.',
        'A disciplined conclusion should state the conditions under which each option works. For example: buying is affordable only if the household stays seven years and preserves a repair reserve; renting is preferable if relocation remains likely. Conditional conclusions survive uncertainty better than a universal rule.'
      ]]
    ],
    sources: [
      ['CFPB: Consider whether it is the right time to buy', 'https://www.consumerfinance.gov/owning-a-home/prepare/consider-whether-its-the-right-time-for-you-to-buy/'],
      ['CFPB: Housing resources', 'https://www.consumerfinance.gov/housing/']
    ]
  }
];

const esc = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function articleHtml(guide) {
  const body = guide.sections.map(([heading, paragraphs]) => `<section><h2>${heading}</h2>${paragraphs.map(p => `<p>${p}</p>`).join('')}</section>`).join('\n');
  const sources = guide.sources.map(([label, url]) => `<li><a href="${url}" rel="noopener">${label}</a></li>`).join('');
  const schema = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Article', headline: guide.title,
    description: guide.description, datePublished: updated, dateModified: updated,
    author: {'@type': 'Organization', name: 'VestCalc Editorial Team'},
    publisher: {'@type': 'Organization', name: 'VestCalc'},
    mainEntityOfPage: `https://vestcalc.com/blog/${guide.slug}.html`
  });
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${guide.title} | VestCalc</title><meta name="description" content="${esc(guide.description)}"><meta name="robots" content="index, follow">
<link rel="canonical" href="https://vestcalc.com/blog/${guide.slug}.html"><link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta property="og:title" content="${esc(guide.title)} | VestCalc"><meta property="og:description" content="${esc(guide.description)}"><meta property="og:url" content="https://vestcalc.com/blog/${guide.slug}.html"><meta property="og:type" content="article"><meta name="twitter:card" content="summary_large_image">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EDVND7BVGL"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-EDVND7BVGL')</script>
<script type="application/ld+json">${schema}</script>
<style>
*,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#172033;background:#f5f8fa;line-height:1.7}a{color:#0f766e}.skip{position:fixed;left:12px;top:12px;z-index:30;background:#172033;color:#fff;padding:9px 12px;transform:translateY(-160%)}.skip:focus{transform:none}header{background:#fff;border-bottom:1px solid #dbe4e8}.bar{max-width:1080px;margin:auto;min-height:64px;padding:10px 20px;display:flex;align-items:center;gap:18px}.brand{font-size:21px;font-weight:800;color:#172033;text-decoration:none}.bar nav{margin-left:auto;display:flex;gap:8px}.bar nav a{padding:7px 10px;text-decoration:none;color:#4f5d6b;font-weight:650}.hero{background:#0f766e;color:#fff}.hero-inner{max-width:920px;margin:auto;padding:54px 20px 50px}.eyebrow{font-size:13px;font-weight:800;text-transform:uppercase;margin-bottom:12px;color:#ccfbf1}.hero h1{max-width:820px;margin:0 0 14px;font-size:clamp(2rem,5vw,3.35rem);line-height:1.08}.hero p{max-width:780px;margin:0;color:#e6fffb;font-size:18px}.meta{margin-top:20px;font-size:13px;color:#ccfbf1}.layout{max-width:1080px;margin:0 auto;padding:34px 20px 70px;display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:34px}.article{min-width:0;background:#fff;border:1px solid #dbe4e8;padding:34px}.article .lead{font-size:19px;color:#354454;margin-top:0}.article section{padding:18px 0;border-top:1px solid #e6ecef}.article h2{font-size:26px;line-height:1.25;margin:0 0 12px}.article p{font-size:17px;margin:0 0 16px}.callout{background:#ecfdf5;border-left:4px solid #0d9488;padding:18px;margin:22px 0}.sources ul{padding-left:20px}.sources li{margin:8px 0}.sidebar{min-width:0}.tool{position:sticky;top:20px;background:#fff;border:1px solid #cbd9df;padding:22px}.tool h2{font-size:20px;margin:0 0 8px}.tool p{color:#566176;font-size:14px}.button{display:block;background:#0d9488;color:#fff;text-decoration:none;text-align:center;font-weight:800;padding:12px 14px;margin-top:16px}.tool .note{border-top:1px solid #e6ecef;margin-top:18px;padding-top:16px;font-size:13px}footer{background:#172033;color:#d5dde5;padding:28px 20px;text-align:center;font-size:13px}footer a{color:#99f6e4}.editorial-policy-link{display:inline;margin-left:10px}@media(max-width:800px){.layout{grid-template-columns:1fr;padding:20px 12px 48px}.article{padding:23px 18px}.sidebar{grid-row:1}.tool{position:static}.bar{flex-wrap:wrap}.bar nav{margin-left:0;width:100%;overflow-x:auto}.hero-inner{padding:38px 18px}.article p{font-size:16px}}
</style></head><body><a class="skip portfolio-skip-link" href="#main-content">Skip to main content</a>
<header><div class="bar"><a class="brand" href="/">VestCalc</a><nav><a href="/">Calculators</a><a href="/blog/">Guides</a><a href="/methodology.html">Methodology</a><a href="/editorial-policy.html">Editorial policy</a></nav></div></header>
<div class="hero"><div class="hero-inner"><div class="eyebrow">${guide.category} guide</div><h1>${guide.title}</h1><p>${guide.dek}</p><div class="meta">Reviewed by the VestCalc Editorial Team · Updated July 23, 2026</div></div></div>
<main id="main-content" class="layout"><article class="article"><p class="lead">${guide.description}</p>${body}<div class="callout"><strong>Use the calculator as a scenario tool.</strong> Replace sample inputs with figures from current statements or written estimates, save the assumptions, and compare at least one less favorable case.</div><section class="sources"><h2>Official sources and further reading</h2><ul>${sources}</ul><p>Sources were accessed during the July 2026 editorial review. Product terms, laws, and personal circumstances can change, so verify current information before acting.</p></section><section><h2>Scope of this guide</h2><p>This educational guide explains calculator assumptions and comparison steps. It is not individualized financial, investment, tax, legal, lending, or insurance advice. VestCalc does not sell financial products and does not ask for account credentials.</p></section></article><aside class="sidebar"><div class="tool"><h2>Test your own numbers</h2><p>Open the related calculator, then run a base case and a conservative case using the checklist in this guide.</p><a class="button" href="${guide.calculator}">${guide.calculatorLabel}</a><p class="note"><a href="/methodology.html">How VestCalc calculations work</a><br><a href="/editorial-policy.html">Editorial standards and corrections</a></p></div></aside></main>
<footer>&copy; 2026 VestCalc · <a href="/about.html">About</a> · <a href="/privacy.html">Privacy</a> · <a href="/contact.html">Contact</a><p class="editorial-policy-link"><a href="/editorial-policy.html">Editorial Policy</a></p></footer></body></html>`;
}

function blogIndex() {
  const cards = guides.map(g => `<a class="card" href="/blog/${g.slug}.html"><span>${g.category}</span><h2>${g.title}</h2><p>${g.description}</p><strong>Read guide →</strong></a>`).join('\n');
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Financial Planning Guides | VestCalc</title><meta name="description" content="Five source-backed guides for using VestCalc debt, housing, savings, and retirement calculators responsibly."><meta name="robots" content="index, follow"><link rel="canonical" href="https://vestcalc.com/blog/"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta property="og:title" content="Financial Planning Guides | VestCalc"><meta property="og:description" content="Five source-backed guides for using VestCalc debt, housing, savings, and retirement calculators responsibly."><meta property="og:url" content="https://vestcalc.com/blog/"><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image"><style>*,*::before,*::after{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f5f8fa;color:#172033;line-height:1.6}a{text-decoration:none;color:inherit}.portfolio-skip-link{position:fixed;left:12px;top:12px;z-index:30;background:#172033;color:#fff;padding:9px 12px;transform:translateY(-160%)}.portfolio-skip-link:focus{transform:none}header{background:#fff;border-bottom:1px solid #dbe4e8}.bar{max-width:1080px;margin:auto;min-height:64px;padding:10px 20px;display:flex;align-items:center;gap:18px}.brand{font-size:21px;font-weight:800}.bar nav{margin-left:auto;display:flex;gap:8px}.bar nav a{padding:7px 10px;color:#4f5d6b;font-weight:650}.hero{background:#0f766e;color:#fff}.hero div{max-width:1080px;margin:auto;padding:54px 20px}.hero h1{font-size:clamp(2rem,5vw,3.2rem);line-height:1.1;margin:0 0 12px}.hero p{max-width:760px;color:#e6fffb;font-size:18px;margin:0}main{max-width:1080px;margin:auto;padding:36px 20px 70px}.intro{max-width:780px;color:#4f5d6b;font-size:17px;margin-bottom:26px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.card{min-width:0;background:#fff;border:1px solid #dbe4e8;padding:24px;transition:border-color .15s,transform .15s}.card:hover{border-color:#0d9488;transform:translateY(-2px)}.card span{font-size:12px;font-weight:800;text-transform:uppercase;color:#0f766e}.card h2{font-size:22px;line-height:1.28;margin:9px 0}.card p{color:#566176}.card strong{color:#0f766e}.standards{margin-top:28px;padding:22px;background:#e8f7f4;border-left:4px solid #0d9488}.standards a{color:#0f766e;font-weight:750}footer{background:#172033;color:#d5dde5;text-align:center;padding:28px 20px;font-size:13px}footer a{color:#99f6e4}.editorial-policy-link{display:inline;margin-left:10px}@media(max-width:700px){.grid{grid-template-columns:1fr}.bar{flex-wrap:wrap}.bar nav{width:100%;margin-left:0;overflow-x:auto}.hero div{padding:38px 18px}main{padding:28px 14px 48px}}</style></head><body><a class="portfolio-skip-link" href="#main-content">Skip to main content</a><header><div class="bar"><a class="brand" href="/">VestCalc</a><nav><a href="/">Calculators</a><a href="/blog/">Guides</a><a href="/methodology.html">Methodology</a></nav></div></header><div class="hero"><div><h1>Financial planning guides</h1><p>Focused explanations for five calculator workflows where assumptions, timing, and omitted costs can materially change the result.</p></div></div><main id="main-content"><p class="intro">Each released guide is reviewed for a distinct user question, links to primary public sources, and explains how to stress-test the related calculator. Broader draft topics remain out of search until they receive the same review.</p><div class="grid">${cards}</div><div class="standards"><strong>How these guides are maintained</strong><p>VestCalc separates calculation methodology from editorial interpretation and records source links for factual guidance. Read our <a href="/methodology.html">methodology</a> and <a href="/editorial-policy.html">editorial policy</a>.</p></div></main><footer>&copy; 2026 VestCalc · <a href="/about.html">About</a> · <a href="/privacy.html">Privacy</a> · <a href="/contact.html">Contact</a><p class="editorial-policy-link"><a href="/editorial-policy.html">Editorial Policy</a></p></footer></body></html>`;
}

for (const guide of guides) fs.writeFileSync(path.join(root, 'blog', `${guide.slug}.html`), articleHtml(guide), 'utf8');
fs.writeFileSync(path.join(root, 'blog', 'index.html'), blogIndex(), 'utf8');

const homePath = path.join(root, 'index.html');
let home = fs.readFileSync(homePath, 'utf8');
const homeCards = guides.map(g => `<a class="guide-card" href="/blog/${g.slug}.html"><span>${g.category}</span><h3>${g.title}</h3><p>${g.description}</p></a>`).join('\n      ');
home = home.replace(/<div class="guide-grid">[\s\S]*?<\/div>\s*<div class="guide-more"><a href="\/blog\/">[\s\S]*?<\/a><\/div>/, `<div class="guide-grid">\n      ${homeCards}\n    </div>\n    <div class="guide-more"><a href="/blog/">View all 5 reviewed guides</a></div>`);
home = home.replace(/\s*<section data-block="SEO_INTENT_GUIDES"[\s\S]*?<\/section>/, '');
home = home.replace(/\s*<section data-block="INDEXING_PRIORITY_LINKS"[\s\S]*?<\/section>/, '');
const releasedCalculators = new Set([
  '401k-calculator.html', 'budget-calculator.html', 'compound-interest-calculator.html',
  'credit-card-payoff-calculator.html', 'emergency-fund-calculator.html',
  'home-affordability-calculator.html', 'inflation-calculator.html',
  'mortgage-calculator.html', 'net-worth-calculator.html', 'paycheck-calculator.html',
  'rent-vs-buy-calculator.html', 'retirement-calculator.html'
]);
home = home.replace(/<a href="\/([^"/]+\.html)" class="tool-card"[\s\S]*?<\/a>/g, (card, file) => releasedCalculators.has(file) ? card : '');
const releasedHubs = new Set(['budget-calculators.html', 'debt-calculators.html', 'mortgage-calculators.html', 'retirement-calculators.html', 'tax-calculators.html']);
home = home.replace(/<a class="cat-nav-link" href="\/([^"/]+\.html)">[\s\S]*?<\/a>/g, (link, file) => releasedHubs.has(file) ? link : '');
for (const draftHub of ['home-calculators.html', 'math-calculators.html', 'analysis-calculators.html', 'education-calculators.html']) {
  home = home.replace(new RegExp(`\\s*<a href="/${draftHub.replace('.', '\\.')}">[^<]+<\\/a>`), '');
}
home = home.replace('101 Free Calculators', '12 Reviewed Financial Calculators');
home = home.replace('Finance, health, education, math, and home calculators — all free, no sign-up required.', 'Focused calculators for debt, budgeting, housing, income, savings, and retirement — free and usable without an account.');
home = home.replace(/<div class="cat-tabs">[\s\S]*?<\/div>\s*<div class="search-wrap">/, `<div class="cat-tabs">\n      <button class="cat-tab active" data-cat="all" onclick="filterCat(this)">All</button>\n      <button class="cat-tab" data-cat="mortgage" onclick="filterCat(this)">Housing</button>\n      <button class="cat-tab" data-cat="retirement" onclick="filterCat(this)">Savings &amp; retirement</button>\n      <button class="cat-tab" data-cat="tax" onclick="filterCat(this)">Income</button>\n      <button class="cat-tab" data-cat="debt" onclick="filterCat(this)">Debt &amp; budgeting</button>\n    </div>\n    <div class="search-wrap">`);
home = home.replace('All calculators are completely free. No account, no subscription.', 'The 12 reviewed calculators are free to use. No account or subscription is required.');
home = home.replace(/[ \t]+$/gm, '');
fs.writeFileSync(homePath, home, 'utf8');

const sitemapPath = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
sitemap = sitemap.replace(/\s*<url><loc>https:\/\/vestcalc\.com\/blog\/[^<]+\.html<\/loc>[\s\S]*?<\/url>/g, '');
sitemap = sitemap.replace('</urlset>', `${guides.map(g => `  <url><loc>https://vestcalc.com/blog/${g.slug}.html</loc><lastmod>${updated}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}\n</urlset>`);
sitemap = sitemap.replace(/(<loc>https:\/\/vestcalc\.com\/blog\/<\/loc><lastmod>)[^<]+/, `$1${updated}`);
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log(`Released ${guides.length} reviewed guides.`);
