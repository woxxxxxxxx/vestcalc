const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const updated = '2026-08-07';
const updatedLabel = 'August 7, 2026';

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

const guideVerification = {
  'credit-card-payoff-mistakes': 'Before relying on a payoff schedule, compare the opening balance and APR with the latest statement, confirm whether purchases, transfers, or cash advances use different rates, and check the issuer\'s minimum-payment formula. Run a second case with one missed extra payment and one month of ordinary card spending. The result should be treated as a planning range because issuers can compound interest and apply payments differently. After each statement closes, replace the estimate with the actual interest, fees, payments, and ending balance.',
  'mortgage-affordability-guide': 'Verify the property-tax estimate with the local taxing authority, obtain an insurance indication for the property, and ask the lender for a written Loan Estimate using the same price, down payment, term, and loan type used here. Run a conservative case with higher insurance, a repair reserve, and a higher rate. Keep cash to close separate from the monthly payment. A household budget is not validated merely because a lender approves the loan; it is validated when essential spending, reserves, and savings remain workable after the full housing cost is included.',
  'retirement-calculator-guide': 'Record every input with its source and date: current account balances, actual contribution amounts, employer-plan rules, a Social Security estimate, retirement age, inflation, and return assumptions. Then run a lower-return case and a delayed-retirement case without changing several variables at once. Compare results in the same dollar basis. Review the model annually rather than reacting to short-term market changes. The projection is useful when it reveals which assumptions drive the outcome and which actions are controllable; it is not evidence that a future balance or income level is guaranteed.',
  'emergency-fund-planning': 'Build the target from recent statements rather than a generic multiple. Label essential monthly expenses, insurance deductibles, predictable sinking funds, and the time it could take to replace income. Test a case in which two costs occur in the same month, then confirm that the reserve remains accessible without market loss, withdrawal penalties, or an avoidable delay. Review the target after a job change, move, insurance renewal, or actual emergency. A useful reserve policy also states what qualifies for withdrawal and how the balance will be replenished afterward.',
  'rent-vs-buy-guide': 'Use written rent terms, a lender Loan Estimate, realistic taxes and insurance, and property-specific maintenance information. Run at least three holding periods and include both purchase and sale costs. Test flat home prices as well as the preferred appreciation assumption, and keep monthly affordability separate from projected net worth. The comparison is ready for a decision only when the result remains understandable under a less favorable case and the nonfinancial constraints are documented. A calculator cannot predict the sale price, repair timing, rent renewal, or how long the household will remain in the property.'
};

const hubDefinitions = [
  {
    file: 'budget-calculators.html', title: 'Budget and Cash-Flow Calculators',
    description: 'Use a monthly budget and an emergency-fund model together to separate recurring cash flow from financial shocks.',
    calculators: [['budget-calculator.html', 'Monthly Budget Calculator', 'Map income, fixed costs, flexible spending, and planned savings.'], ['emergency-fund-calculator.html', 'Emergency Fund Calculator', 'Translate essential expenses and recovery time into a reserve range.']],
    sections: [
      ['Start with observed cash flow', 'A useful budget begins with recent pay statements, bank transactions, card statements, and known annual bills. Separate take-home income from gross income and separate required expenses from categories that can change during a disruption. Annual premiums, registrations, gifts, and maintenance should be converted into monthly sinking-fund amounts rather than treated as surprises. The budget result is a snapshot, so keep the statement month and any unusual expense visible when comparing periods.'],
      ['Connect the budget to resilience', 'The emergency-fund result should use the essential portion of the budget, not total lifestyle spending. Add risks that a simple monthly multiple misses, including insurance deductibles, unpaid leave, urgent travel, and the likely time needed to replace income. Run a typical case and a higher-cost case. Keep predictable expenses in separate sinking funds so the emergency reserve remains available for genuinely unplanned events.'],
      ['Decision checklist', 'Confirm that every input has a recent source, that recurring expenses are not counted twice, and that the savings target leaves routine bills affordable. Revisit both tools after income, housing, insurance, debt, or family obligations change. These calculators organize assumptions and arithmetic; they do not evaluate account safety, benefits eligibility, taxes, or the suitability of a specific financial product.'],
      ['Keep a monthly evidence trail', 'Save the budget month, account-statement dates, category definitions, and the reason for any manual adjustment. Compare planned and actual figures after the month closes, but do not overwrite the original plan. The gap is useful evidence: it can identify a missing annual bill, an unrealistic flexible-spending target, or an emergency category that should become a dedicated sinking fund. A three-month record is more informative than repeatedly tuning one month until it appears balanced.']
    ],
    sources: [['CFPB budgeting resources', 'https://www.consumerfinance.gov/consumer-tools/budgeting/'], ['CFPB emergency-fund guide', 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/']]
  },
  {
    file: 'debt-calculators.html', title: 'Debt Payoff Calculators',
    description: 'Build a credit-card payoff schedule from the balance, APR, payment, timing, and spending behavior shown on current statements.',
    calculators: [['credit-card-payoff-calculator.html', 'Credit Card Payoff Calculator', 'Compare fixed-payment scenarios and the time and interest required to reach a zero balance.']],
    sections: [
      ['Use account-specific terms', 'Credit-card statements may separate purchases, balance transfers, and cash advances because each category can carry a different APR. Use the balance and rate that correspond to the debt being modeled, then include transfer fees or recurring charges in the opening balance. A fixed monthly payment is easier to evaluate than a declining minimum because it reveals whether the planned amount can meet a target date.'],
      ['Reconcile the estimate monthly', 'Issuer calculations can differ from a simplified planning model because interest may accrue daily and payments may be allocated under account rules. After each statement, compare projected and actual interest, fees, transactions, payments, and ending balance. Update the next month rather than changing earlier records. A repeated gap usually means an input or account behavior was omitted.'],
      ['Protect the plan from new debt', 'Test a lower-payment month before selecting an aggressive schedule. Preserve enough cash for essential bills and a small reserve so an ordinary emergency does not return to the card. Automate at least the required minimum before the due date and keep promotional-rate expiration dates visible. VestCalc provides educational estimates and does not recommend consolidation, transfer, or settlement products.'],
      ['Document a reproducible payoff case', 'Save the statement date, balance category, APR, fixed payment, promotional end date, and whether new purchases are excluded. Label extra payments separately from the required minimum. When the next statement arrives, keep the original estimate and record the difference instead of rewriting earlier inputs. This creates a clear record of whether the schedule changed because of issuer interest, fees, new spending, a payment delay, or a deliberate change in the household budget.']
    ],
    sources: [['CFPB credit-card interest explanation', 'https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/'], ['CFPB credit-card resources', 'https://www.consumerfinance.gov/consumer-tools/credit-cards/']]
  },
  {
    file: 'mortgage-calculators.html', title: 'Housing Cost Calculators',
    description: 'Compare mortgage payments, home affordability, and renting versus buying without omitting taxes, insurance, repairs, or transaction costs.',
    calculators: [['mortgage-calculator.html', 'Mortgage Calculator', 'Estimate principal and interest, then add the property-specific costs outside the loan.'], ['home-affordability-calculator.html', 'Home Affordability Calculator', 'Work backward from household cash flow to a sustainable housing range.'], ['rent-vs-buy-calculator.html', 'Rent vs. Buy Calculator', 'Compare cash flow and long-term scenarios across realistic holding periods.']],
    sections: [
      ['Separate loan cost from housing cost', 'Principal and interest are only one part of ownership. Add property taxes, homeowners insurance, mortgage insurance when applicable, association dues, utilities, and a repair reserve. Obtain property-specific figures where possible. For renting, include renters insurance, fees, parking, utilities, and plausible renewal changes. Keeping the categories separate makes the comparison auditable.'],
      ['Use comparable written assumptions', 'When comparing lenders, request Loan Estimates for the same loan type, term, amount, price, and down payment. Compare total monthly payment, origination charges, lender credits, cash to close, and rate-lock status. When comparing rent with ownership, include purchase and sale costs and run more than one holding period. Do not use an advertised rate or payment without its conditions.'],
      ['Stress-test the decision', 'Run higher-rate, higher-insurance, flat-price, and major-repair cases. Preserve emergency savings and closing reserves instead of assigning every available dollar to the down payment. Qualification and affordability answer different questions: approval reflects underwriting rules, while affordability reflects the household budget and priorities. The calculators organize scenarios but cannot predict property value, repairs, insurance availability, or future rates.'],
      ['Build a property decision file', 'Keep the listing date, tax source, insurance indication, inspection findings, lender documents, association information, repair assumptions, and calculator scenarios together. Record which figures are confirmed, estimated, or still unknown. If an estimate changes, update the relevant scenario without silently changing the others. This file makes offers comparable and helps the household explain why a price or payment was accepted, reduced, or rejected after the initial excitement of a property search.']
    ],
    sources: [['CFPB home-buying preparation', 'https://www.consumerfinance.gov/owning-a-home/prepare/'], ['CFPB Loan Estimate explainer', 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/']]
  },
  {
    file: 'retirement-calculators.html', title: 'Savings and Retirement Calculators',
    description: 'Test contribution, compounding, inflation, employer match, retirement timing, and income assumptions as a range rather than a promise.',
    calculators: [['401k-calculator.html', '401(k) Calculator', 'Model contributions, employer match, time, and return assumptions.'], ['compound-interest-calculator.html', 'Compound Interest Calculator', 'Separate deposits from modeled growth over time.'], ['inflation-calculator.html', 'Inflation Calculator', 'Translate amounts across years using an explicit inflation assumption.'], ['retirement-calculator.html', 'Retirement Calculator', 'Compare savings and retirement-timing scenarios in a consistent dollar basis.']],
    sections: [
      ['Keep assumptions consistent', 'Record whether each amount is expressed in today\'s dollars or future dollars. A nominal investment return and a real spending target cannot be combined without an inflation adjustment. Use current balances and actual contribution amounts, then create a separate case for planned increases. Employer contributions should reflect written plan rules rather than a generic match percentage.'],
      ['Use ranges, not a single forecast', 'Long-term averages do not arrive smoothly and cannot guarantee a future balance. Run lower-return and higher-inflation cases and test retirement age in one-year increments. Obtain a personalized Social Security estimate from the official earnings record instead of entering a guessed percentage of salary. Keep pensions and other income sources separate because their start dates and inflation treatment can differ.'],
      ['Maintain a reproducible review', 'Save the assumptions and review date, then update the model annually and after major changes. Change one variable at a time so the effect remains understandable. These tools illustrate mathematical relationships and help identify controllable levers such as contributions, timing, and spending. They do not select investments, account for every tax rule, model market sequence precisely, or replace individualized retirement advice.'],
      ['Separate evidence from preferences', 'Account balances, contribution records, plan rules, and official benefit estimates are evidence. Retirement age, spending goals, return assumptions, and desired safety margins are planning choices. Labeling them separately prevents an optimistic preference from being mistaken for a verified fact. When a result changes, identify whether new evidence arrived or a preference changed. That distinction makes annual reviews more useful and gives a qualified adviser a clearer record when taxes, pensions, healthcare, or withdrawal sequencing require individualized analysis.']
    ],
    sources: [['Investor.gov compound-interest resources', 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator'], ['SSA retirement estimators', 'https://www.ssa.gov/prepare/get-benefits-estimate'], ['BLS Consumer Price Index', 'https://www.bls.gov/cpi/']]
  },
  {
    file: 'tax-calculators.html', title: 'Paycheck and Withholding Calculator',
    description: 'Use paycheck estimates to understand gross pay, deductions, and withholding inputs, then verify the result against official forms and payroll records.',
    calculators: [['paycheck-calculator.html', 'Paycheck Calculator', 'Estimate take-home pay from pay frequency, taxes, and deductions entered by the user.']],
    sections: [
      ['Collect the payroll inputs first', 'Use the gross pay and pay frequency from a current pay statement or written offer. Separate pre-tax deductions, after-tax deductions, withholding, and employer-paid benefits. Filing status and withholding selections should match the employee\'s current forms. Bonuses, commissions, overtime, local taxes, benefit limits, and midyear changes can make one pay period unrepresentative.'],
      ['Treat the result as a reconciliation aid', 'Compare the estimate with an actual pay statement line by line. A difference may come from state or local rules, payroll timing, benefit treatment, rounding, supplemental wages, or an input that was entered on a monthly rather than per-pay-period basis. Correct the assumption instead of forcing the calculator to match a preferred take-home amount.'],
      ['Verify withholding through official channels', 'Use the IRS Tax Withholding Estimator when federal withholding needs review and consult the relevant state or local authority for other taxes. VestCalc does not file forms, transmit payroll, store entries, or determine tax liability. The tool is educational and cannot account for every jurisdiction, credit, deduction, benefit plan, or household circumstance.'],
      ['Keep the estimate tied to one pay period', 'Record the pay-period start and end dates, payment date, regular and supplemental wages, deductions, and withholding selections used in the scenario. Do not mix a monthly benefit deduction with biweekly wages without converting it. If the estimate differs from payroll, preserve both versions and identify the exact line responsible. A documented comparison is more useful than repeatedly changing tax percentages until the take-home figure happens to match one statement.']
    ],
    sources: [['IRS Tax Withholding Estimator', 'https://www.irs.gov/individuals/tax-withholding-estimator'], ['IRS Publication 15-T', 'https://www.irs.gov/publications/p15t']]
  }
];

const toolEvidence = {
  '401k-calculator.html': ['401(k) projection method and checks', ['The projection compounds the current balance and recurring contributions over the years entered by the user. Employer match is modeled from the contribution and match inputs; actual plans can cap matches by compensation, contribution rate, eligibility, or vesting rules that this simplified model does not reproduce.', 'Verify the current balance and contribution on a recent plan statement, confirm the match formula in plan documents, and run lower-return and later-retirement cases. Investment returns are uncertain and the output does not include every fee, tax rule, withdrawal rule, or market sequence.'], [['IRS retirement plan resources', 'https://www.irs.gov/retirement-plans'], ['U.S. Department of Labor 401(k) plans', 'https://www.dol.gov/general/topic/retirement/401kplans']]],
  'budget-calculator.html': ['Budget method and reconciliation', ['The calculator totals the income and expense categories entered for one monthly planning period. Convert annual or irregular bills into monthly sinking-fund amounts, and use take-home income when the expense figures are after tax. The result is only as complete as the categories supplied.', 'Reconcile the plan against recent account and card statements, then label unusual months instead of treating them as typical. Keep essential costs, flexible spending, debt payments, and savings visible so a shortfall can be traced to a decision rather than hidden in one miscellaneous total.'], [['CFPB budgeting resources', 'https://www.consumerfinance.gov/consumer-tools/budgeting/']]],
  'compound-interest-calculator.html': ['Compound-interest formula and limits', ['The tool applies the entered rate and compounding frequency to the starting amount and recurring contributions. It separates deposits from modeled growth so the effect of time, rate, and contribution changes can be compared. It does not predict an investment return or account value.', 'Run more than one return assumption and confirm whether the rate is nominal or inflation-adjusted. Real accounts can include fees, taxes, contribution timing, variable returns, and withdrawal rules. Those differences should be evaluated separately before using a projection for a financial decision.'], [['Investor.gov compound interest calculator', 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator']]],
  'credit-card-payoff-calculator.html': ['Payoff schedule method and statement check', ['The payoff estimate applies the entered APR and fixed payment to a declining balance. It is a planning approximation because issuers may calculate interest daily, separate balances by APR, apply payments under account rules, and add fees or new transactions.', 'Use the balance and APR from the latest statement, enter a payment that can be sustained, and compare the next statement with the projected interest and ending balance. Model promotional rates separately and add any transfer fee to the opening balance. New spending must be included or stopped for the payoff date to remain meaningful.'], [['CFPB credit-card interest explanation', 'https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/']]],
  'emergency-fund-calculator.html': ['Emergency-fund method and access test', ['The calculator turns essential monthly expenses and the selected coverage period into a reserve target, then allows risk-specific costs to be considered separately. It does not prescribe one universal number because income stability, deductibles, family obligations, and recovery time differ.', 'Build essential expenses from recent statements, keep predictable sinking funds separate, and test a month in which two shocks occur together. Confirm that the reserve is safe and accessible without market loss, a withdrawal penalty, or an avoidable transfer delay. Review the target after income, insurance, housing, or family changes.'], [['CFPB emergency-fund guide', 'https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/']]],
  'home-affordability-calculator.html': ['Affordability method and written-cost check', ['The estimate works backward from household income, obligations, down payment, and housing-cost assumptions. It is not a lender approval and should include taxes, homeowners insurance, mortgage insurance when applicable, association dues, and a repair reserve in addition to principal and interest.', 'Use property-specific tax and insurance information and compare the result with a written Loan Estimate. Preserve cash for closing costs, moving, repairs, and emergencies. Run higher-rate and higher-insurance cases; a price is not affordable merely because the base case fits or a lender is willing to approve it.'], [['CFPB home-buying preparation', 'https://www.consumerfinance.gov/owning-a-home/prepare/']]],
  'inflation-calculator.html': ['Inflation conversion method and source check', ['The calculator compounds an annual inflation assumption across the selected years to compare purchasing power between two points in time. It illustrates a mathematical relationship and does not forecast the actual price of a specific household item, service, or location.', 'State whether the amount is being converted into future dollars or today\'s dollars and keep that basis consistent with other projections. Historical CPI data can inform a scenario, but individual spending patterns differ from a broad index. Run more than one assumption when the result affects a long-term decision.'], [['U.S. Bureau of Labor Statistics CPI', 'https://www.bls.gov/cpi/']]],
  'mortgage-calculator.html': ['Mortgage payment method and cost boundaries', ['The calculator amortizes principal and interest from the loan amount, rate, and term entered by the user. The full housing payment can also include property taxes, homeowners insurance, mortgage insurance, association dues, and other costs that are not part of the loan formula.', 'Compare the output with a written Loan Estimate using the same loan type, term, amount, and rate-lock status. Check whether points, lender credits, and closing costs change the comparison. Adjustable rates, prepayments, late charges, escrow changes, and refinancing are outside a basic fixed-payment schedule.'], [['CFPB Loan Estimate explainer', 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/']]],
  'net-worth-calculator.html': ['Net-worth method and valuation checks', ['Net worth is calculated as the assets entered minus the liabilities entered at the same review date. The result is most useful as a repeatable balance-sheet snapshot, not as a score. Avoid mixing gross asset values with old debt balances or counting the same account in more than one category.', 'Use current statements for cash, investments, and debts. For property or private assets, label the valuation date and method and consider selling costs or uncertainty separately. Restricted retirement assets, taxes, liquidity, and income stability are not visible in one net-worth total, so keep those constraints alongside the result.'], [['CFPB financial well-being resources', 'https://www.consumerfinance.gov/consumer-tools/financial-well-being/']]],
  'paycheck-calculator.html': ['Paycheck estimate method and payroll reconciliation', ['The calculator applies the entered pay frequency, tax assumptions, and deductions to estimate take-home pay. Actual payroll can differ because of jurisdiction-specific rules, benefit treatment, contribution limits, supplemental wages, rounding, and midyear changes.', 'Use a current pay statement or written offer for gross pay and frequency, separate pre-tax from after-tax deductions, and compare the output line by line with an actual statement. Use the IRS estimator for federal withholding questions and the relevant state or local authority for other taxes. VestCalc does not determine tax liability or file forms.'], [['IRS Tax Withholding Estimator', 'https://www.irs.gov/individuals/tax-withholding-estimator']]],
  'rent-vs-buy-calculator.html': ['Rent-versus-buy method and scenario checks', ['The comparison combines recurring cash flow, upfront and exit costs, the holding period, home-value assumptions, maintenance, and the alternative use of cash. Monthly affordability and projected long-term net worth should be reviewed separately because a favorable modeled return can still create a strained budget.', 'Use written rent terms, a lender Loan Estimate, property-specific taxes and insurance, and a realistic repair reserve. Run shorter and longer holding periods plus a flat-price case. The model cannot predict a sale price, repair timing, rent renewal, insurance availability, or how long the household will stay.'], [['CFPB home-buying timing guidance', 'https://www.consumerfinance.gov/owning-a-home/prepare/consider-whether-its-the-right-time-for-you-to-buy/']]],
  'retirement-calculator.html': ['Retirement scenario method and review process', ['The calculator projects current savings and future contributions using the return, inflation, timing, and income assumptions entered by the user. Keep every amount in a consistent dollar basis and treat the output as a range, not a promised balance or sustainable withdrawal level.', 'Record the source and date for balances, contributions, employer rules, Social Security, pensions, retirement age, and spending. Run a lower-return case and test retirement age in one-year increments. Taxes, fees, market sequence, healthcare costs, longevity, and account-specific withdrawal rules require separate review.'], [['SSA personalized benefit estimate', 'https://www.ssa.gov/prepare/get-benefits-estimate'], ['Investor.gov retirement resources', 'https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/retirement']]]
};

const esc = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function articleHtml(guide) {
  const body = guide.sections.map(([heading, paragraphs]) => `<section><h2>${heading}</h2>${paragraphs.map(p => `<p>${p}</p>`).join('')}</section>`).join('\n');
  const sources = guide.sources.map(([label, url]) => `<li><a href="${url}" rel="noopener">${label}</a></li>`).join('');
  const verification = guideVerification[guide.slug];
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
<header><div class="bar"><a class="brand" href="/">VestCalc</a><nav><a href="/">Calculators</a><a href="/blog/">Guides</a><a href="/methodology.html">Methodology</a></nav></div></header>
<div class="hero"><div class="hero-inner"><div class="eyebrow">${guide.category} guide</div><h1>${guide.title}</h1><p>${guide.dek}</p><div class="meta">Reviewed by the VestCalc Editorial Team &middot; Updated ${updatedLabel}</div></div></div>
<main id="main-content" class="layout"><article class="article"><p class="lead">${guide.description}</p>${body}<section><h2>Verification before using the result</h2><p>${verification}</p></section><div class="callout"><strong>Use the calculator as a scenario tool.</strong> Replace sample inputs with figures from current statements or written estimates, save the assumptions, and compare at least one less favorable case.</div><section class="sources"><h2>Official sources and further reading</h2><ul>${sources}</ul><p>Sources were checked during the August 2026 editorial review. Product terms, laws, and personal circumstances can change, so verify current information before acting.</p></section><section><h2>Scope of this guide</h2><p>This educational guide explains calculator assumptions and comparison steps. It is not individualized financial, investment, tax, legal, lending, or insurance advice. VestCalc does not sell financial products and does not ask for account credentials.</p></section></article><aside class="sidebar"><div class="tool"><h2>Test your own numbers</h2><p>Open the related calculator, then run a base case and a conservative case using the checklist in this guide.</p><a class="button" href="${guide.calculator}">${guide.calculatorLabel}</a><p class="note"><a href="/methodology.html">How VestCalc calculations work</a><br><a href="/editorial-policy.html">Editorial standards and corrections</a></p></div></aside></main>
<footer>&copy; 2026 VestCalc &middot; <a href="/about.html">About</a> &middot; <a href="/privacy.html">Privacy</a> &middot; <a href="/contact.html">Contact</a><p class="editorial-policy-link"><a href="/editorial-policy.html">Editorial Policy</a></p></footer></body></html>`;
}

function blogIndex() {
  const cards = guides.map(g => `<a class="card" href="/blog/${g.slug}.html"><span>${g.category}</span><h2>${g.title}</h2><p>${g.description}</p><strong>Read guide &rarr;</strong></a>`).join('\n');
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
home = home.replace('All 101 Calculators', 'All 12 Calculators');
home = home.replace('<div class="hero-stat-num">101</div><div class="hero-stat-label">Free Calculators</div>', '<div class="hero-stat-num">12</div><div class="hero-stat-label">Reviewed Calculators</div>');
home = home.replace('<div class="hero-stat-num">10</div><div class="hero-stat-label">Categories</div>', '<div class="hero-stat-num">5</div><div class="hero-stat-label">Planning Areas</div>');
home = home.replace('<div class="hero-stat-num">∞</div><div class="hero-stat-label">Free Uses</div>', '<div class="hero-stat-num">$0</div><div class="hero-stat-label">Usage Cost</div>');
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

function hubHtml(hub) {
  const cards = hub.calculators.map(([file, name, text]) => `<a class="tool-card" href="/${file}"><h2>${name}</h2><p>${text}</p><strong>Open calculator &rarr;</strong></a>`).join('');
  const sections = hub.sections.map(([title, text]) => `<section><h2>${title}</h2><p>${text}</p></section>`).join('');
  const sources = hub.sources.map(([label, url]) => `<li><a href="${url}" rel="noopener">${label}</a></li>`).join('');
  const canonical = `https://vestcalc.com/${hub.file}`;
  const schema = JSON.stringify({'@context': 'https://schema.org', '@type': 'CollectionPage', name: hub.title, description: hub.description, url: canonical, dateModified: updated, author: {'@type': 'Organization', name: 'VestCalc Editorial Team'}});
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${hub.title} | VestCalc</title><meta name="description" content="${esc(hub.description)}"><meta name="robots" content="index, follow"><link rel="canonical" href="${canonical}"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1638874323475457" crossorigin="anonymous"></script><script async src="https://www.googletagmanager.com/gtag/js?id=G-EDVND7BVGL"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-EDVND7BVGL')</script><script type="application/ld+json">${schema}</script><style>*,*::before,*::after{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f5f8fa;color:#172033;line-height:1.7}a{color:#0f766e}.skip{position:fixed;left:12px;top:12px;z-index:20;background:#172033;color:#fff;padding:8px 12px;transform:translateY(-160%)}.skip:focus{transform:none}header{background:#fff;border-bottom:1px solid #dbe4e8}.bar{max-width:1080px;margin:auto;min-height:64px;padding:10px 20px;display:flex;align-items:center;gap:18px}.brand{font-weight:800;font-size:21px;text-decoration:none;color:#172033}.bar nav{margin-left:auto;display:flex;gap:14px}.hero{background:#0f766e;color:#fff}.hero div{max-width:1080px;margin:auto;padding:52px 20px}.hero h1{font-size:clamp(2rem,5vw,3.1rem);line-height:1.1;margin:0 0 12px}.hero p{max-width:760px;margin:0;color:#e6fffb;font-size:18px}.meta{margin-top:18px;font-size:13px;color:#ccfbf1}main{max-width:1080px;margin:auto;padding:34px 20px 68px}.tool-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-bottom:28px}.tool-card{background:#fff;border:1px solid #cbd9df;padding:22px;text-decoration:none;color:#172033}.tool-card h2{font-size:21px;margin:0 0 8px}.tool-card p{color:#566176}.tool-card strong{color:#0f766e}.content{background:#fff;border:1px solid #dbe4e8;padding:30px}.content section{border-top:1px solid #e5ecef;padding:18px 0}.content section:first-child{border-top:0}.content h2{font-size:25px;line-height:1.25}.content p{font-size:17px}.sources{background:#ecfdf5;border-left:4px solid #0d9488;padding:20px;margin-top:24px}.sources h2{font-size:20px}.sources li{margin:8px 0}footer{background:#172033;color:#d5dde5;text-align:center;padding:28px 20px;font-size:13px}footer a{color:#99f6e4}@media(max-width:700px){.tool-grid{grid-template-columns:1fr}.bar{flex-wrap:wrap}.bar nav{margin-left:0;width:100%}.content{padding:22px 18px}.hero div{padding:38px 18px}}</style></head><body><a class="skip portfolio-skip-link" href="#main-content">Skip to main content</a><header><div class="bar"><a class="brand" href="/">VestCalc</a><nav><a href="/">Calculators</a><a href="/blog/">Guides</a><a href="/methodology.html">Methodology</a></nav></div></header><div class="hero"><div><h1>${hub.title}</h1><p>${hub.description}</p><div class="meta">Reviewed by the VestCalc Editorial Team &middot; Updated ${updatedLabel}</div></div></div><main id="main-content"><div class="tool-grid">${cards}</div><article class="content">${sections}<div class="sources"><h2>Primary sources used for this collection</h2><ul>${sources}</ul><p>Source links and page scope were checked during the August 2026 review. Verify current rules and written terms before making a financial decision.</p></div></article></main><footer>&copy; 2026 VestCalc &middot; <a href="/about.html">About</a> &middot; <a href="/privacy.html">Privacy</a> &middot; <a href="/contact.html">Contact</a> &middot; <a href="/editorial-policy.html">Editorial Policy</a></footer></body></html>`;
}

function allHtmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'qa-artifacts') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...allHtmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function isNoindex(html) {
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) || /<meta\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

function cleanEncodingArtifacts(html) {
  return html
    .replace(/鈥\?\/span>/g, '&rsaquo;</span>')
    .replace(/鈥\?\/div>/g, '&mdash;</div>')
    .replace(/鈭\?\/div>/g, '&infin;</div>')
    .replace(/鈥\?/g, '&mdash;')
    .replace(/鈫\?/g, '&rarr;')
    .replace(/路/g, '&middot;');
}

function removeAdPlaceholders(html) {
  return html.replace(/<(div|p|span)\b[^>]*class=["'][^"']*(?:ad-slot|ad-label)[^"']*["'][^>]*>\s*Advertisement\s*<\/\1>/gi, '');
}

function addToolEvidence(file, html) {
  const evidence = toolEvidence[file];
  if (!evidence) return html;
  const [title, paragraphs, sources] = evidence;
  const sourceList = sources.map(([label, url]) => `<li><a href="${url}" rel="noopener">${label}</a></li>`).join('');
  const block = `<!-- vc-approval-evidence --><section class="vc-evidence"><p class="vc-evidence-meta">Reviewed by the VestCalc Editorial Team &middot; Updated ${updatedLabel}</p><h2>${title}</h2>${paragraphs.map(text => `<p>${text}</p>`).join('')}<h3>Official sources and further reading</h3><ul>${sourceList}</ul><p class="vc-evidence-note">This calculator is an educational scenario tool. It does not provide individualized financial, investment, tax, legal, lending, or insurance advice.</p></section><!-- /vc-approval-evidence -->`;
  html = html.replace(/<!-- vc-approval-evidence -->[\s\S]*?<!-- \/vc-approval-evidence -->/g, '');
  html = html.replace(/<!-- tool-content-modules -->[\s\S]*?(?=<\/main>)/g, '');
  if (!html.includes('id="vc-evidence-style"')) {
    html = html.replace('</head>', '<style id="vc-evidence-style">.vc-evidence{max-width:960px;margin:22px auto;background:#fff;border:1px solid var(--border,#dbe4e8);border-left:4px solid var(--primary,#0d9488);border-radius:10px;padding:26px 30px}.vc-evidence h2{font-size:1.35rem;margin:0 0 12px}.vc-evidence h3{font-size:1rem;margin:20px 0 8px}.vc-evidence p{color:var(--text2,#475569);line-height:1.75}.vc-evidence-meta{font-size:13px;font-weight:700;color:var(--primary-dark,#0f766e)!important}.vc-evidence-note{font-size:13px}.vc-evidence li{margin:7px 0}@media(max-width:640px){.vc-evidence{padding:22px 18px}}</style></head>');
  }
  return html.replace('</main>', `${block}</main>`);
}

function unlinkHeldPages(html, rel, noindexPaths) {
  return html.replace(/<a\b([^>]*?)\bhref=(["'])([^"']+)\2([^>]*)>([\s\S]*?)<\/a>/gi, (anchor, before, quote, href, after, inner) => {
    if (/^(?:[a-z]+:|#|\/\/)/i.test(href)) return anchor;
    let target = href.split(/[?#]/)[0];
    try { target = decodeURIComponent(target); } catch (_) {}
    if (!target) return anchor;
    target = target.startsWith('/') ? target.slice(1) : path.posix.normalize(path.posix.join(path.posix.dirname(rel), target));
    if (target.endsWith('/')) target += 'index.html';
    if (!target.endsWith('.html')) return anchor;
    return noindexPaths.has(target) ? `<span class="held-link">${inner}</span>` : anchor;
  });
}

for (const hub of hubDefinitions) fs.writeFileSync(path.join(root, hub.file), hubHtml(hub), 'utf8');

let approvalBlog = fs.readFileSync(path.join(root, 'blog', 'index.html'), 'utf8');
const maintenance = `<div class="standards"><strong>How these guides are maintained</strong><p>VestCalc separates calculation methodology from editorial interpretation and records source links for factual guidance. Each guide starts with the decision to be made, identifies inputs that should come from statements or written estimates, and adds a less favorable scenario so a single optimistic result does not control the conclusion.</p><p>The editorial team checks that factual guidance points to primary public sources, calculator assumptions and limitations are visible, and the related tool can be used without creating an account or sending financial entries to VestCalc. Product terms, laws, and household circumstances can change after publication, so readers should verify current documents before acting.</p><p>Corrections are applied to the guide and its review date. Draft topics stay outside the public index until they meet the same standard. Reviewed by the VestCalc Editorial Team &middot; Updated ${updatedLabel}. Read our <a href="/methodology.html">calculation methodology</a> and <a href="/editorial-policy.html">editorial and corrections policy</a>.</p></div>`;
approvalBlog = approvalBlog.replace(/<div class="standards">[\s\S]*?<\/div><\/main>/, `${maintenance}</main>`);
fs.writeFileSync(path.join(root, 'blog', 'index.html'), approvalBlog, 'utf8');

let approvalHtmlFiles = allHtmlFiles(root);
for (const full of approvalHtmlFiles) {
  const rel = path.relative(root, full).replace(/\\/g, '/');
  let html = fs.readFileSync(full, 'utf8');
  html = addToolEvidence(rel, removeAdPlaceholders(cleanEncodingArtifacts(html)));
  fs.writeFileSync(full, html.replace(/[ \t]+$/gm, ''), 'utf8');
}

approvalHtmlFiles = allHtmlFiles(root);
const approvalNoindexPaths = new Set(approvalHtmlFiles.filter(full => isNoindex(fs.readFileSync(full, 'utf8'))).map(full => path.relative(root, full).replace(/\\/g, '/')));
let approvalUnlinked = 0;
for (const full of approvalHtmlFiles) {
  const rel = path.relative(root, full).replace(/\\/g, '/');
  let html = fs.readFileSync(full, 'utf8');
  if (isNoindex(html)) continue;
  const cleaned = unlinkHeldPages(html, rel, approvalNoindexPaths);
  if (cleaned !== html) approvalUnlinked += 1;
  fs.writeFileSync(full, cleaned, 'utf8');
}

const approvalIndexable = allHtmlFiles(root).filter(full => !isNoindex(fs.readFileSync(full, 'utf8'))).sort();
const approvalUrls = approvalIndexable.map(full => {
  let rel = path.relative(root, full).replace(/\\/g, '/');
  if (rel === 'index.html') rel = '';
  else if (rel.endsWith('/index.html')) rel = rel.slice(0, -10);
  return `  <url><loc>https://vestcalc.com/${rel}</loc><lastmod>${updated}</lastmod><changefreq>monthly</changefreq><priority>${rel ? '0.8' : '1.0'}</priority></url>`;
});
const rebuiltSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${approvalUrls.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), rebuiltSitemap, 'utf8');

console.log(`Approval surface: ${approvalIndexable.length} indexable pages, ${releasedCalculators.size} retained calculators, ${hubDefinitions.length} rebuilt hubs, held links cleaned in ${approvalUnlinked} pages.`);
