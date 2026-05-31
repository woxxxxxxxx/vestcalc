import re, os, json

BASE = r'C:\Users\Administrator\vestcalc'
DOMAIN = 'https://vestcalc.com'
OG_IMAGE = 'https://vestcalc.com/og-image.png'

# ── SEO data for every page ──────────────────────────────────────────────────
# title: ≤60 chars  |  desc: 150-160 chars  |  keywords: comma-separated
SEO = {
'index.html': {
  'title': 'VestCalc — Free Online Financial Calculators',
  'desc': 'Free online financial calculators for loans, mortgages, investments, taxes, and retirement. No sign-up required. Instant results on any device.',
  'kw': 'financial calculator, loan calculator, mortgage calculator, investment calculator, tax calculator, retirement calculator, free calculator online',
  'schema': 'WebSite',
},
'about.html': {
  'title': 'About VestCalc — Free Financial Calculators for Everyone',
  'desc': 'Learn about VestCalc — 50+ free financial calculators for everyone. Accurate, private, and instant tools with no sign-up, no data stored, ever.',
  'kw': 'about VestCalc, free financial tools, financial calculator website, online calculators',
  'schema': 'WebPage',
},
'privacy.html': {
  'title': 'Privacy Policy — VestCalc',
  'desc': 'VestCalc Privacy Policy. All calculations run in your browser — we never store your inputs. Learn about our use of Google Analytics and AdSense.',
  'kw': 'VestCalc privacy policy, data privacy, calculator privacy',
  'schema': 'WebPage',
},
'terms.html': {
  'title': 'Terms of Use — VestCalc',
  'desc': 'VestCalc Terms of Use. Review the terms governing use of our free financial calculators. Results are estimates and do not constitute financial advice.',
  'kw': 'VestCalc terms of use, terms and conditions, calculator disclaimer',
  'schema': 'WebPage',
},
'contact.html': {
  'title': 'Contact VestCalc — Questions, Bugs & Feedback',
  'desc': 'Contact VestCalc to report a bug, request a new calculator, or share general feedback. We respond to all messages within 2 business days.',
  'kw': 'contact VestCalc, calculator feedback, report bug, feature request',
  'schema': 'WebPage',
},
'loan-calculator.html': {
  'title': 'Loan Calculator — Monthly Payment & Interest | VestCalc',
  'desc': 'Free loan calculator — enter loan amount, interest rate, and term to instantly see monthly payment, total interest, and full amortization schedule.',
  'kw': 'loan calculator, monthly payment calculator, loan payment, interest calculator, amortization calculator, personal loan calculator',
  'schema': 'WebApplication',
},
'mortgage-calculator.html': {
  'title': 'Mortgage Calculator — Monthly Payment Estimator | VestCalc',
  'desc': 'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. Free mortgage calculator with instant results — no sign-up.',
  'kw': 'mortgage calculator, mortgage payment calculator, home loan calculator, PITI calculator, mortgage estimator',
  'schema': 'WebApplication',
},
'compound-interest-calculator.html': {
  'title': 'Compound Interest Calculator — Investment Growth | VestCalc',
  'desc': 'See how your money grows with compound interest. Enter principal, rate, and time to instantly calculate future value and total earnings. 100% free.',
  'kw': 'compound interest calculator, interest calculator, investment growth calculator, future value, compound interest formula',
  'schema': 'WebApplication',
},
'tax-calculator.html': {
  'title': 'Income Tax Calculator — Federal Tax Estimate | VestCalc',
  'desc': 'Estimate your federal income tax liability for free. Enter income, filing status, and deductions for a fast estimate. Updated 2024 tax brackets included.',
  'kw': 'income tax calculator, federal tax calculator, tax estimator, tax bracket calculator, 2024 tax calculator',
  'schema': 'WebApplication',
},
'retirement-calculator.html': {
  'title': 'Retirement Calculator — Savings Goal Projector | VestCalc',
  'desc': 'Plan your retirement with our free calculator. Enter savings, contributions, and expected return to see if you are on track to retire comfortably.',
  'kw': 'retirement calculator, retirement savings calculator, retirement planning, retirement goal calculator',
  'schema': 'WebApplication',
},
'investment-return-calculator.html': {
  'title': 'Investment Return Calculator — ROI & Gains | VestCalc',
  'desc': 'Calculate investment ROI, annualized returns, and total profit for any stock or fund investment. Free investment return calculator with instant results.',
  'kw': 'investment return calculator, ROI calculator, investment profit calculator, annualized return, stock return',
  'schema': 'WebApplication',
},
'savings-goal-calculator.html': {
  'title': 'Savings Goal Calculator — How Much to Save | VestCalc',
  'desc': 'Calculate how much to save monthly to reach a financial goal. Set your target amount, date, and interest rate for a free, instant savings plan estimate.',
  'kw': 'savings goal calculator, savings calculator, how much to save, monthly savings calculator, savings plan',
  'schema': 'WebApplication',
},
'budget-calculator.html': {
  'title': 'Budget Calculator — Monthly Income vs Expenses | VestCalc',
  'desc': 'Build a monthly budget in seconds. Enter income and expenses to see net cash flow, savings rate, and spending breakdown. Free budget calculator online.',
  'kw': 'budget calculator, monthly budget calculator, personal budget, income expense calculator, budgeting tool',
  'schema': 'WebApplication',
},
'currency-converter.html': {
  'title': 'Currency Converter — 150+ World Currencies | VestCalc',
  'desc': 'Convert between 150+ world currencies with estimated exchange rates. Free online currency converter — instantly see foreign exchange amounts and rates.',
  'kw': 'currency converter, exchange rate calculator, foreign currency converter, USD EUR converter, forex calculator',
  'schema': 'WebApplication',
},
'percentage-calculator.html': {
  'title': 'Percentage Calculator — % Change & Difference | VestCalc',
  'desc': 'Calculate percentages instantly — find what percent of a number is, percentage change, or the difference between two values. Free percentage calculator.',
  'kw': 'percentage calculator, percent calculator, percentage change calculator, what percent of, percentage difference',
  'schema': 'WebApplication',
},
'car-loan-calculator.html': {
  'title': 'Car Loan Calculator — Auto Payment Estimator | VestCalc',
  'desc': 'Calculate car loan monthly payments and total interest cost. Enter vehicle price, down payment, trade-in value, and interest rate for instant results.',
  'kw': 'car loan calculator, auto loan calculator, car payment calculator, vehicle financing calculator, auto finance',
  'schema': 'WebApplication',
},
'home-equity-calculator.html': {
  'title': 'Home Equity Calculator — HELOC Borrowing Power | VestCalc',
  'desc': 'Find out how much equity you have in your home and your maximum HELOC borrowing power. Free home equity calculator — instant equity percentage results.',
  'kw': 'home equity calculator, HELOC calculator, home equity loan, equity percentage, home value calculator',
  'schema': 'WebApplication',
},
'refinance-calculator.html': {
  'title': 'Refinance Calculator — Break-Even & Savings | VestCalc',
  'desc': 'Should you refinance? Compare current vs. new mortgage. Calculate monthly savings, break-even point, and 5-year net savings for free. Instant results.',
  'kw': 'refinance calculator, mortgage refinance calculator, refinance break even, refinancing savings, refi calculator',
  'schema': 'WebApplication',
},
'debt-payoff-calculator.html': {
  'title': 'Debt Payoff Calculator — Payoff Date & Interest | VestCalc',
  'desc': 'See how long to pay off any debt and total interest paid. Free debt payoff calculator — compare minimum payments vs. higher monthly payments instantly.',
  'kw': 'debt payoff calculator, debt calculator, pay off debt, debt free date, loan payoff calculator',
  'schema': 'WebApplication',
},
'student-loan-calculator.html': {
  'title': 'Student Loan Calculator — Monthly Payment & Cost | VestCalc',
  'desc': 'Calculate student loan monthly payments and total repayment cost including grace period interest. Free student loan payment calculator — instant results.',
  'kw': 'student loan calculator, student loan payment, student loan interest, college loan calculator, loan repayment calculator',
  'schema': 'WebApplication',
},
'personal-loan-calculator.html': {
  'title': 'Personal Loan Calculator — Payment & APR | VestCalc',
  'desc': 'Calculate personal loan monthly payments, total cost, and effective APR including origination fees. Free personal loan payment calculator — instant.',
  'kw': 'personal loan calculator, personal loan payment, loan APR calculator, personal loan interest, loan cost calculator',
  'schema': 'WebApplication',
},
'down-payment-calculator.html': {
  'title': 'Down Payment Calculator — Home Savings Goal | VestCalc',
  'desc': 'Calculate how much you need for a home down payment and how long it takes to save. Enter home price and monthly savings for an instant savings timeline.',
  'kw': 'down payment calculator, home down payment, down payment savings, house down payment calculator, 20 percent down',
  'schema': 'WebApplication',
},
'rent-vs-buy-calculator.html': {
  'title': 'Rent vs Buy Calculator — True Cost Comparison | VestCalc',
  'desc': 'Renting or buying — which is smarter? Compare total costs over time including appreciation, equity gains, and rent increases. Free rent vs buy calculator.',
  'kw': 'rent vs buy calculator, renting vs buying, rent or buy a home, housing cost calculator, buy vs rent comparison',
  'schema': 'WebApplication',
},
'amortization-calculator.html': {
  'title': 'Amortization Calculator — Full Payment Schedule | VestCalc',
  'desc': 'Generate a complete loan amortization schedule. See exactly how much goes to principal vs. interest each month. Free amortization table calculator.',
  'kw': 'amortization calculator, amortization schedule, loan amortization table, mortgage amortization, monthly payment breakdown',
  'schema': 'WebApplication',
},
'balloon-payment-calculator.html': {
  'title': 'Balloon Payment Calculator — Lump Sum Due | VestCalc',
  'desc': 'Calculate balloon loan monthly payments and the lump-sum amount due at maturity. Free balloon payment calculator for any amortization period and term.',
  'kw': 'balloon payment calculator, balloon loan calculator, balloon mortgage, lump sum payment, balloon payment amount',
  'schema': 'WebApplication',
},
'401k-calculator.html': {
  'title': '401(k) Calculator — Retirement Balance Projection | VestCalc',
  'desc': 'Project your 401(k) balance at retirement. Enter contributions, employer match, and expected return for a free 401k retirement savings projection.',
  'kw': '401k calculator, 401k retirement calculator, 401k contribution calculator, employer match calculator, retirement savings',
  'schema': 'WebApplication',
},
'roth-ira-calculator.html': {
  'title': 'Roth IRA Calculator — Tax-Free Growth Projection | VestCalc',
  'desc': 'Project your Roth IRA balance at retirement and see the tax-free growth advantage. Free Roth IRA calculator — compare growth to a taxable account.',
  'kw': 'Roth IRA calculator, Roth IRA growth, IRA calculator, tax free retirement savings, Roth IRA projection',
  'schema': 'WebApplication',
},
'dividend-calculator.html': {
  'title': 'Dividend Calculator — Income & DRIP Growth | VestCalc',
  'desc': 'Calculate annual dividend income and project portfolio growth with DRIP reinvestment. Free dividend calculator — find your dividend yield and income.',
  'kw': 'dividend calculator, dividend income calculator, DRIP calculator, dividend yield calculator, stock dividend',
  'schema': 'WebApplication',
},
'stock-return-calculator.html': {
  'title': 'Stock Return Calculator — Total Return & Gains | VestCalc',
  'desc': 'Calculate total stock return including capital gains, dividends, and annualized performance for any holding period. Free stock return calculator.',
  'kw': 'stock return calculator, stock profit calculator, capital gains calculator, investment return, annualized return calculator',
  'schema': 'WebApplication',
},
'emergency-fund-calculator.html': {
  'title': 'Emergency Fund Calculator — How Much to Save | VestCalc',
  'desc': 'Calculate your recommended emergency fund size based on monthly expenses. Free calculator — see your target amount, current savings, and gap to fill.',
  'kw': 'emergency fund calculator, emergency savings calculator, how much emergency fund, 6 month emergency fund, rainy day fund',
  'schema': 'WebApplication',
},
'net-worth-calculator.html': {
  'title': 'Net Worth Calculator — Assets Minus Liabilities | VestCalc',
  'desc': 'Calculate your total net worth by adding all assets and subtracting all liabilities. Free net worth calculator — track your financial health instantly.',
  'kw': 'net worth calculator, personal net worth, assets and liabilities calculator, financial health calculator, wealth calculator',
  'schema': 'WebApplication',
},
'inflation-calculator.html': {
  'title': 'Inflation Calculator — Purchasing Power Over Time | VestCalc',
  'desc': 'See how inflation erodes purchasing power over time. Calculate the future equivalent of today\'s money at any inflation rate. Free inflation calculator.',
  'kw': 'inflation calculator, purchasing power calculator, CPI calculator, inflation rate calculator, cost of inflation',
  'schema': 'WebApplication',
},
'break-even-calculator.html': {
  'title': 'Break-Even Calculator — Units & Revenue | VestCalc',
  'desc': 'Find your break-even point. Enter fixed costs, variable costs, and selling price to calculate break-even units and revenue. Free business calculator.',
  'kw': 'break even calculator, breakeven point, break even analysis, contribution margin calculator, fixed variable cost',
  'schema': 'WebApplication',
},
'cash-flow-calculator.html': {
  'title': 'Cash Flow Calculator — Income vs Expenses | VestCalc',
  'desc': 'Analyze monthly income and expenses to understand personal cash flow and savings rate. Free cash flow calculator — identify areas to save more money.',
  'kw': 'cash flow calculator, personal cash flow, income expense calculator, monthly cash flow, net cash flow calculator',
  'schema': 'WebApplication',
},
'rule-of-72-calculator.html': {
  'title': 'Rule of 72 Calculator — Investment Doubling Time | VestCalc',
  'desc': 'Use the Rule of 72 to estimate how long your investment takes to double. Free calculator — enter interest rate for instant doubling time results.',
  'kw': 'rule of 72 calculator, doubling time calculator, investment doubling, rule of 72 formula, compound growth',
  'schema': 'WebApplication',
},
'tip-calculator.html': {
  'title': 'Tip Calculator — Bill Split & Tip Amount | VestCalc',
  'desc': 'Calculate tip amount and split the bill for any group size. Free tip calculator — choose 15%, 18%, 20%, or custom tip with instant per-person totals.',
  'kw': 'tip calculator, restaurant tip calculator, bill split calculator, tip percentage, how much to tip',
  'schema': 'WebApplication',
},
'sales-tax-calculator.html': {
  'title': 'Sales Tax Calculator — Add or Remove Tax | VestCalc',
  'desc': 'Calculate sales tax for any purchase price and rate. Add tax to get total price or remove tax to find pre-tax amount. Free sales tax calculator online.',
  'kw': 'sales tax calculator, tax calculator, add sales tax, remove sales tax, state tax calculator, purchase tax',
  'schema': 'WebApplication',
},
'vat-calculator.html': {
  'title': 'VAT Calculator — Add or Remove VAT | VestCalc',
  'desc': 'Add or remove Value Added Tax from any price instantly. Free VAT calculator for any rate worldwide — see VAT-exclusive and VAT-inclusive amounts.',
  'kw': 'VAT calculator, value added tax calculator, add VAT, remove VAT, tax inclusive exclusive calculator',
  'schema': 'WebApplication',
},
'paycheck-calculator.html': {
  'title': 'Paycheck Calculator — Take-Home Pay Estimator | VestCalc',
  'desc': 'Estimate take-home pay after federal tax, state tax, Social Security, Medicare, and retirement deductions. Free paycheck calculator — instant results.',
  'kw': 'paycheck calculator, take home pay calculator, net pay calculator, payroll calculator, salary after tax',
  'schema': 'WebApplication',
},
'overtime-calculator.html': {
  'title': 'Overtime Calculator — Time and a Half Pay | VestCalc',
  'desc': 'Calculate overtime pay at 1.5x or 2x your hourly rate. See regular pay, overtime earnings, and total weekly wages. Free overtime pay calculator.',
  'kw': 'overtime calculator, overtime pay calculator, time and a half calculator, double time calculator, hourly overtime',
  'schema': 'WebApplication',
},
'salary-calculator.html': {
  'title': 'Salary to Hourly Calculator — Annual & Hourly Pay | VestCalc',
  'desc': 'Convert annual salary to hourly rate or hourly wage to annual salary. Instantly see monthly, weekly, daily, and hourly pay breakdowns. 100% free.',
  'kw': 'salary to hourly calculator, hourly to salary, annual salary calculator, wage calculator, pay calculator',
  'schema': 'WebApplication',
},
'cost-of-living-calculator.html': {
  'title': 'Cost of Living Calculator — City Salary Comparison | VestCalc',
  'desc': 'Find out what salary you need in a new city to maintain your standard of living. Free cost of living comparison calculator — instant equivalent salary.',
  'kw': 'cost of living calculator, city comparison calculator, salary comparison cities, moving salary calculator, COL calculator',
  'schema': 'WebApplication',
},
'home-affordability-calculator.html': {
  'title': 'Home Affordability Calculator — Max Price | VestCalc',
  'desc': 'Calculate how much house you can afford based on income, debts, and down payment. Free home affordability calculator using the standard 28/36 DTI rule.',
  'kw': 'home affordability calculator, how much house can I afford, affordability calculator, mortgage affordability, DTI calculator',
  'schema': 'WebApplication',
},
'credit-card-payoff-calculator.html': {
  'title': 'Credit Card Payoff Calculator — Debt Free Date | VestCalc',
  'desc': 'Calculate how long to pay off credit card debt and total interest charged. Compare minimum payments vs. higher payments. Free credit card calculator.',
  'kw': 'credit card payoff calculator, credit card debt calculator, pay off credit card, minimum payment calculator, credit card interest',
  'schema': 'WebApplication',
},
'interest-rate-calculator.html': {
  'title': 'Interest Rate Calculator — Find Rate from Payment | VestCalc',
  'desc': 'Find the implied interest rate on any loan from payment amount, balance, and term. Free reverse loan calculator — instantly back-calculate any APR.',
  'kw': 'interest rate calculator, find interest rate, loan rate calculator, implied interest rate, APR calculator from payment',
  'schema': 'WebApplication',
},
'simple-interest-calculator.html': {
  'title': 'Simple Interest Calculator — I = PRT Formula | VestCalc',
  'desc': 'Calculate simple interest earned or owed on any principal. Find total interest, daily interest, and monthly interest for savings or loans. Free tool.',
  'kw': 'simple interest calculator, I=PRT calculator, simple interest formula, interest earned calculator, loan interest calculator',
  'schema': 'WebApplication',
},
'apr-calculator.html': {
  'title': 'APR Calculator — True Annual Percentage Rate | VestCalc',
  'desc': 'Calculate the true Annual Percentage Rate (APR) of any loan including origination fees and closing costs. Free APR calculator for accurate loan costs.',
  'kw': 'APR calculator, annual percentage rate calculator, true cost of loan, loan APR, effective APR calculator',
  'schema': 'WebApplication',
},
'roi-calculator.html': {
  'title': 'ROI Calculator — Return on Investment | VestCalc',
  'desc': 'Calculate Return on Investment (ROI), net profit, and annualized return for any investment with holding period. Free ROI calculator — instant results.',
  'kw': 'ROI calculator, return on investment calculator, investment ROI, profit calculator, annualized ROI',
  'schema': 'WebApplication',
},
'cagr-calculator.html': {
  'title': 'CAGR Calculator — Compound Annual Growth Rate | VestCalc',
  'desc': 'Calculate Compound Annual Growth Rate (CAGR) between any two values over any period. Free CAGR calculator for investments, revenue, or business growth.',
  'kw': 'CAGR calculator, compound annual growth rate, CAGR formula, investment growth rate, annualized growth rate',
  'schema': 'WebApplication',
},
'present-value-calculator.html': {
  'title': 'Present Value Calculator — Discount Future Cash | VestCalc',
  'desc': 'Calculate the present value of any future amount at any discount rate. Free PV calculator with annual, monthly, and quarterly compounding options.',
  'kw': 'present value calculator, PV calculator, discounted cash flow, discount rate calculator, time value of money',
  'schema': 'WebApplication',
},
'future-value-calculator.html': {
  'title': 'Future Value Calculator — Investment Growth | VestCalc',
  'desc': 'Calculate how much any investment grows with compound interest. Free future value calculator with annual, monthly, quarterly, or daily compounding.',
  'kw': 'future value calculator, FV calculator, compound interest future value, investment growth calculator, time value money',
  'schema': 'WebApplication',
},
'npv-calculator.html': {
  'title': 'NPV Calculator — Net Present Value | VestCalc',
  'desc': 'Calculate Net Present Value (NPV) for up to 8 years of cash flows. Free NPV calculator — determine if an investment creates value at your required rate.',
  'kw': 'NPV calculator, net present value calculator, discounted cash flow, NPV formula, capital budgeting calculator',
  'schema': 'WebApplication',
},
'irr-calculator.html': {
  'title': 'IRR Calculator — Internal Rate of Return | VestCalc',
  'desc': 'Calculate Internal Rate of Return (IRR) for up to 8 years of cash flows. Free IRR calculator — find the break-even discount rate for any investment.',
  'kw': 'IRR calculator, internal rate of return, IRR formula, investment IRR, capital budgeting IRR',
  'schema': 'WebApplication',
},
'lease-calculator.html': {
  'title': 'Lease Calculator — Monthly Car Lease Payment | VestCalc',
  'desc': 'Calculate your monthly car lease payment from cap cost, residual value, and money factor. Free auto lease calculator with total lease cost breakdown.',
  'kw': 'lease calculator, car lease calculator, auto lease payment, money factor calculator, vehicle lease calculator',
  'schema': 'WebApplication',
},
'escrow-calculator.html': {
  'title': 'Escrow Calculator — Monthly PITI Breakdown | VestCalc',
  'desc': 'Calculate your monthly escrow payment for property taxes, homeowner\'s insurance, and PMI. Free escrow calculator — see your complete PITI breakdown.',
  'kw': 'escrow calculator, PITI calculator, property tax escrow, mortgage escrow, PMI calculator',
  'schema': 'WebApplication',
},
}

# ── Helpers ──────────────────────────────────────────────────────────────────
def make_seo_block(fname, seo):
    slug = fname if fname == 'index.html' else fname
    url = DOMAIN + '/' + ('' if fname == 'index.html' else fname)
    title = seo['title']
    desc  = seo['desc']
    kw    = seo['kw']
    schema_type = seo['schema']

    # Open Graph
    og = (
        '\n<meta property="og:type" content="website">'
        '\n<meta property="og:site_name" content="VestCalc">'
        '\n<meta property="og:title" content="' + title.replace('"', '&quot;') + '">'
        '\n<meta property="og:description" content="' + desc.replace('"', '&quot;') + '">'
        '\n<meta property="og:url" content="' + url + '">'
        '\n<meta property="og:image" content="' + OG_IMAGE + '">'
        '\n<meta name="twitter:card" content="summary_large_image">'
        '\n<meta name="twitter:title" content="' + title.replace('"', '&quot;') + '">'
        '\n<meta name="twitter:description" content="' + desc.replace('"', '&quot;') + '">'
    )

    # Canonical
    canonical = '\n<link rel="canonical" href="' + url + '">'

    # JSON-LD
    if schema_type == 'WebSite':
        schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "VestCalc",
            "url": DOMAIN,
            "description": desc,
            "potentialAction": {
                "@type": "SearchAction",
                "target": DOMAIN + "/?s={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        }
    elif schema_type == 'WebApplication':
        schema = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": title.split(' — ')[0].split(' | ')[0].strip(),
            "url": url,
            "description": desc,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "browserRequirements": "Requires JavaScript",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "provider": {
                "@type": "Organization",
                "name": "VestCalc",
                "url": DOMAIN
            }
        }
    else:  # WebPage
        schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "url": url,
            "description": desc,
            "isPartOf": {"@type": "WebSite", "url": DOMAIN, "name": "VestCalc"}
        }

    ld = '\n<script type="application/ld+json">\n' + json.dumps(schema, indent=2, ensure_ascii=False) + '\n</script>'

    return (
        '\n<meta name="keywords" content="' + kw + '">'
        + og
        + canonical
        + ld
    )

# ── Process each file ────────────────────────────────────────────────────────
def strip_existing_seo(html):
    # Remove old keywords, OG, twitter, canonical, JSON-LD blocks
    html = re.sub(r'\n?<meta name="keywords"[^>]*>', '', html)
    html = re.sub(r'\n?<meta property="og:[^"]*"[^>]*>', '', html)
    html = re.sub(r'\n?<meta property="og:[^"]*"[^>]*/>', '', html)
    html = re.sub(r'\n?<meta name="twitter:[^"]*"[^>]*>', '', html)
    html = re.sub(r'\n?<link rel="canonical"[^>]*>', '', html)
    html = re.sub(r'\n?<script type="application/ld\+json">.*?</script>', '', html, flags=re.DOTALL)
    return html

updated = 0
skipped = 0

for fname, seo in SEO.items():
    fpath = os.path.join(BASE, fname)
    if not os.path.exists(fpath):
        print(f'MISSING: {fname}')
        skipped += 1
        continue

    with open(fpath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Strip any previously injected SEO tags
    html = strip_existing_seo(html)

    # Replace <title>
    html = re.sub(r'<title>[^<]*</title>', '<title>' + seo['title'] + '</title>', html)

    # Replace or insert <meta name="description">
    new_desc_tag = '<meta name="description" content="' + seo['desc'] + '">'
    if re.search(r'<meta name="description"', html):
        html = re.sub(r'<meta name="description"[^>]*>', new_desc_tag, html)
    else:
        # Insert after </title>
        html = html.replace('</title>', '</title>\n' + new_desc_tag, 1)

    # Build SEO block and insert after the description meta tag
    seo_block = make_seo_block(fname, seo)
    html = re.sub(r'(<meta name="description"[^>]*>)', lambda m: m.group(1) + seo_block, html)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(html)

    updated += 1
    print(f'OK: {fname}')

print(f'\nDone: {updated} updated, {skipped} skipped.')
