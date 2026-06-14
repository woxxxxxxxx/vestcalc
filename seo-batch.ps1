# VestCalc SEO Batch Processor
# Adds seo section, ensures 5 FAQ items, adds 3 related cards
# Usage: .\seo-batch.ps1 -Batch <1-N>

param([int]$Batch = 0)

$siteDir  = "C:\Users\Administrator\vestcalc"
$skipFiles = @('404.html','about.html','privacy.html','terms.html','contact.html','index.html')
$allFiles  = @(Get-ChildItem -Path $siteDir -Filter "*.html" |
    Where-Object { $skipFiles -notcontains $_.Name } |
    Sort-Object Name)

Write-Host "Total tool files: $($allFiles.Count)"

# ── Categorise ────────────────────────────────────────────────────────────────
function Get-Cat([string]$slug) {
    if ($slug -match 'retire|pension|401k|roth|ira|social.security|annuity')   { return 'retire' }
    if ($slug -match 'invest|stock|dividend|portfolio|return|compound|compound') { return 'invest' }
    if ($slug -match 'mortgage|loan|debt|amort|apr|balloon|refinanc|heloc')     { return 'loan' }
    if ($slug -match 'budget|savings|emerg|net.worth|expense|sinking')          { return 'budget' }
    if ($slug -match 'tax|capital.gain|rmd|1040|deduct|withhold')               { return 'tax' }
    if ($slug -match 'bmi|calorie|body|health|tdee|water|sleep|heart')          { return 'health' }
    if ($slug -match 'tip|inflation|currency|rent|lease|salary|hourly|paycheck|income') { return 'personal' }
    return 'finance'
}

# ── SEO text 200+ words ───────────────────────────────────────────────────────
function Get-Seo([string]$name, [string]$slug) {
    $cat = Get-Cat $slug
    switch ($cat) {
        'retire' { return @"
<p>VestCalc's $name is a free online retirement planning tool designed to help individuals at every career stage model their financial future with clarity and confidence. Whether you are just starting to save for retirement or approaching your target retirement date, this calculator lets you visualise how your current contributions, employer matching, investment returns, and time horizon combine to build long-term wealth.</p>
<p>Retirement planning is one of the most important financial decisions you will make — yet most people underestimate how early they need to start and how dramatically small changes in contribution rate or return assumptions affect their final balance. Our $name makes these relationships visible with instant recalculation as you adjust inputs, empowering you to test different strategies and understand their real-world impact.</p>
<p>Key variables modelled include current savings balance, annual contributions, employer match percentage, expected annual return, inflation adjustments, and years until retirement. The tool calculates projected balances, total contributions versus investment growth, and monthly income projections in retirement — giving you a complete picture of your financial trajectory.</p>
<p>VestCalc is committed to making professional-grade financial planning tools accessible to everyone. This $name is completely free, requires no account, and stores none of your data. Use it as often as you like to model different scenarios — adjusting your savings rate, retirement age, or return assumptions — and make informed decisions about your financial future.</p>
"@ }
        'invest' { return @"
<p>The $name by VestCalc is a free online investment analysis tool that helps investors understand potential returns, compare strategies, and make informed portfolio decisions. Whether you are calculating the future value of a lump-sum investment, modelling the impact of regular contributions, or analysing historical return scenarios, this tool provides instant, accurate results without complex spreadsheets or financial software.</p>
<p>Investment decisions require a clear understanding of how time, rate of return, compounding frequency, and contribution amounts interact. The $name makes these relationships transparent, showing you exactly how your investments could grow under different assumptions. Adjusting one variable and seeing the immediate impact helps you develop better financial intuition and make decisions aligned with your risk tolerance and time horizon.</p>
<p>Our $name handles calculations for individual investors, financial planning students, advisers building client scenarios, and anyone who wants to evaluate an investment opportunity with accurate math. The tool is particularly useful for comparing the cost of waiting — demonstrating the significant long-term impact of starting to invest earlier versus later.</p>
<p>VestCalc provides this $name and a comprehensive library of financial calculators completely free. No registration is required and no data is stored. Our tools are designed for educational and planning purposes — run as many scenarios as you need to build confidence in your investment strategy.</p>
"@ }
        'loan' { return @"
<p>VestCalc's $name is a free online loan analysis tool that helps borrowers understand the true cost of debt, compare financing options, and make informed decisions about mortgages, personal loans, auto loans, and other credit products. Getting a loan without fully understanding the payment schedule, total interest cost, and amortisation structure can lead to significant financial surprises — our calculator makes all of these transparent before you commit.</p>
<p>The $name calculates monthly payment amounts, total interest paid over the life of the loan, the complete amortisation schedule showing how each payment splits between principal and interest, and how extra payments or different loan terms affect your total cost. These insights help you negotiate better terms, decide between loan options, and understand the financial impact of your borrowing decisions.</p>
<p>Key inputs include loan amount, interest rate (APR), loan term, and any additional payment amounts. The tool instantly recalculates when you adjust any variable, making it easy to run side-by-side comparisons of different scenarios — such as a 15-year versus 30-year mortgage, or the savings from making bi-weekly instead of monthly payments.</p>
<p>VestCalc is dedicated to providing free, professional-quality financial tools to help individuals make better-informed borrowing decisions. This $name requires no account, stores no personal data, and is available 24/7 on any device. Use it whenever you are evaluating a loan or refinancing option.</p>
"@ }
        'budget' { return @"
<p>The $name from VestCalc is a free online budgeting and savings tool that helps individuals and families take control of their personal finances. Whether you are building an emergency fund, creating a monthly budget, tracking progress toward a savings goal, or calculating your net worth, this tool provides the calculations and structure you need to move from financial uncertainty to financial clarity.</p>
<p>Effective financial planning starts with understanding your current situation and setting clear, measurable goals. Our $name helps you do exactly that — enter your income, expenses, and savings targets to see how long it will take to reach your goal, how much you need to save monthly, or how your current spending compares to recommended budgeting frameworks.</p>
<p>The tool is designed for real-world use by everyday savers and budgeters. Whether you are following the 50/30/20 rule, building your first emergency fund, saving for a house down payment, or planning a major purchase, the $name gives you accurate projections based on your specific numbers — not generic estimates.</p>
<p>VestCalc provides this $name and dozens of related personal finance calculators completely free. No registration is required and no financial data is stored on our servers. Your privacy is fully protected while you plan confidently for your financial future.</p>
"@ }
        'tax' { return @"
<p>VestCalc's $name is a free online tax estimation tool that helps individuals understand their potential tax liability, plan withholding, or estimate payments before filing. While not a substitute for professional tax advice, this calculator helps you get a clear picture of how different income levels, deductions, filing statuses, and tax law changes affect your overall tax burden.</p>
<p>Tax planning is most effective when done proactively — not at the last minute before a filing deadline. Our $name allows you to model different scenarios throughout the year, helping you decide whether to adjust withholding, make estimated quarterly payments, maximise deductions, or take advantage of tax-advantaged accounts like IRAs and 401(k)s.</p>
<p>Key inputs include gross income, filing status, deduction type (standard or itemised), relevant tax credits, and applicable tax year. The tool calculates estimated federal tax liability, effective tax rate, and marginal rate — giving you the key metrics needed for informed tax planning decisions.</p>
<p>VestCalc provides this $name as a free resource for educational and planning purposes. Always consult a qualified tax professional for personalised advice and final return preparation. This tool requires no account and stores no data — your financial information remains completely private.</p>
"@ }
        'health' { return @"
<p>The $name from VestCalc is a free online health and wellness calculator that helps individuals track, measure, and understand key health metrics using evidence-based formulas. Whether you are monitoring your body composition, calculating nutritional needs, estimating calorie expenditure, or tracking a health and fitness goal, this tool provides accurate, science-backed results instantly.</p>
<p>Understanding your personal health metrics is the first step toward making informed lifestyle decisions. Our $name takes clinically validated calculation methods and puts them in a simple, accessible interface — so you get the same quality of results a health professional would calculate, without the cost or inconvenience of a clinic visit for routine measurements.</p>
<p>Results from the $name are based on widely-accepted formulas and are appropriate for general health awareness and fitness planning. The tool is used by fitness enthusiasts, health-conscious individuals, personal trainers, nutrition students, and anyone who wants data-driven insight into their physical health metrics.</p>
<p>VestCalc offers this $name alongside other health, fitness, and financial calculators — all free, all browser-based, and available without any account or registration. Your health data is processed entirely in your browser and is never transmitted to or stored on our servers.</p>
"@ }
        'personal' { return @"
<p>VestCalc's $name is a free online personal finance tool that helps individuals with everyday money calculations — from understanding your take-home pay to calculating tips, comparing rental costs, converting salary figures, and staying on top of the numbers that affect your daily financial life. Fast, accurate, and always free, this calculator puts the answer you need at your fingertips.</p>
<p>Personal finance decisions happen constantly — when you receive a job offer and need to evaluate the true hourly value, when you are at a restaurant and want to split the bill accurately, when inflation affects your purchasing power, or when you are comparing job offers in different cities. Our $name handles these calculations instantly so you can make better decisions in the moment.</p>
<p>The tool is designed for simplicity and speed. Enter your values and get an immediate result with a clear explanation of the calculation. No financial background is required — the $name is built for everyday use by anyone who wants to handle their personal finances with more confidence and precision.</p>
<p>VestCalc provides this $name alongside a comprehensive library of retirement, investment, loan, budgeting, and tax calculators — all completely free and available without registration. Your data is processed locally in your browser and never stored on our servers.</p>
"@ }
        default { return @"
<p>VestCalc's $name is a free online financial calculator that delivers accurate, instant results for a wide range of financial planning and analysis needs. Whether you are a student learning financial concepts, a professional running quick calculations, or an individual planning your financial future, this tool provides the precision and clarity you need without complex spreadsheets or expensive financial software.</p>
<p>Financial calculations often require careful attention to variables, formulas, and edge cases that are easy to get wrong manually. Our $name automates the calculation using verified financial formulas, displaying results clearly with a breakdown that helps you understand exactly how the answer was derived. This transparency builds financial literacy and confidence in your planning decisions.</p>
<p>The $name is designed for real-world use across a variety of scenarios. Enter your specific values, adjust inputs to model different scenarios, and instantly see how changing one variable affects the outcome. This iterative approach to financial modelling helps you identify the most impactful levers in your specific financial situation.</p>
<p>VestCalc is dedicated to providing professional-quality financial tools at no cost to individuals and families. This $name requires no account, stores no data, and is available on any device. Use it whenever you need accurate financial calculations to support better money decisions.</p>
"@ }
    }
}

# ── 5 FAQs per category ───────────────────────────────────────────────────────
function Get-FaqItems([string]$name, [string]$slug) {
    $cat = Get-Cat $slug
    $qa = switch ($cat) {
        'retire' { @(
            @("How much do I need to retire comfortably?","A common guideline is to save 25x your annual expenses (the 4% rule). However, the right number depends on your desired lifestyle, expected Social Security income, health costs, and longevity assumptions. Use the $name to model your specific situation.")
            @("What rate of return should I assume in retirement calculations?","Conservative planners often use 5-7% for a diversified stock/bond portfolio. The $name defaults to 7%, which reflects historical long-term average returns for balanced portfolios. Adjust this to match your own investment strategy and risk tolerance.")
            @("How does employer matching affect my retirement savings?","Employer matching is effectively a 50-100% instant return on your contribution up to the match limit. The $name includes employer match in its projections so you can see the full compounded value of capturing your employer's full match over your career.")
            @("Should I use a traditional or Roth retirement account?","Traditional accounts give a tax deduction now; Roth accounts grow tax-free. Your best choice depends on your current versus expected future tax rate. Model both scenarios with the $name and compare the after-tax results.")
            @("Is this retirement calculator free to use?","Yes, VestCalc's $name is 100% free with no account required. Your data is processed in your browser and never stored on our servers. Use it as many times as you need to model different retirement scenarios.")
        )}
        'invest' { @(
            @("What return rate should I use in investment projections?","Historical US stock market returns average approximately 7-10% annually before inflation. For conservative planning, 5-7% is commonly used. The $name lets you input any rate so you can model optimistic, moderate, and conservative scenarios.")
            @("How does compounding frequency affect investment growth?","More frequent compounding (monthly vs. annual) produces slightly higher returns because interest earns interest sooner. The $name accounts for compounding in its calculations so your results reflect the investment structure you specify.")
            @("Is this investment calculator free?","Yes, completely free. VestCalc's $name requires no account, no subscription, and no payment. Use it as often as needed to analyse investment scenarios.")
            @("Can I use this calculator to compare two investment options?","Yes. Run the calculator once for each scenario with the different inputs (rate of return, term, or contribution amount) and compare the results. This side-by-side approach helps clarify which option better fits your goals.")
            @("Does the calculator account for inflation?","Some of our calculators include an inflation adjustment option. When enabled, results are shown in today's dollars (real terms) rather than nominal future dollars, giving you a more realistic picture of purchasing power.")
        )}
        'loan' { @(
            @("How is my monthly payment calculated?","Your monthly payment is calculated using the standard amortisation formula: M = P[r(1+r)^n]/[(1+r)^n-1], where P is the loan principal, r is the monthly interest rate, and n is the number of payments. The $name applies this formula automatically.")
            @("How much interest will I pay over the life of the loan?","The $name calculates total interest paid by multiplying your monthly payment by the number of payments and subtracting the original principal. This total interest figure is often surprising — and motivates borrowers to consider extra payments or shorter terms.")
            @("How do extra payments reduce my loan?","Each extra dollar paid toward principal reduces the balance on which future interest is calculated, shortening your loan term and reducing total interest paid. The $name can show you the impact of regular extra payments.")
            @("What is APR and how does it differ from the interest rate?","APR (Annual Percentage Rate) includes the interest rate plus most fees, providing a more complete picture of borrowing cost. For simple loan comparisons, use APR rather than the stated interest rate to get an accurate cost comparison.")
            @("Is this loan calculator free to use?","Yes, VestCalc's $name is completely free. No account is required and no personal data is stored. Use it to evaluate any loan or compare financing options at no cost.")
        )}
        'budget' { @(
            @("What is a good savings rate?","Financial experts commonly recommend saving 15-20% of gross income for retirement alone, plus additional amounts for emergency funds and other goals. The $name helps you model the impact of different savings rates on your goal timeline.")
            @("How large should my emergency fund be?","Standard guidance recommends 3-6 months of essential living expenses in a liquid, accessible account. Use the $name to calculate your target emergency fund amount based on your actual monthly expenses.")
            @("How long will it take to reach my savings goal?","Enter your goal amount, current savings, monthly contribution, and expected interest rate into the $name to get an exact timeline. You can also work backwards from a deadline to find the required monthly savings amount.")
            @("Is this budgeting calculator free?","Yes, completely free. VestCalc's $name requires no signup and stores none of your financial data. All calculations are performed locally in your browser.")
            @("How do I account for inflation in savings goals?","For long-term goals, it is important to adjust for inflation. If your goal is 10+ years away, consider using our inflation calculator alongside the $name to determine the inflation-adjusted target amount you will actually need.")
        )}
        'tax' { @(
            @("Is this tax calculator accurate?","Our $name uses current tax brackets and standard formulas to provide reasonable estimates for educational and planning purposes. For final tax preparation and legal compliance, always consult a qualified tax professional or use official IRS resources.")
            @("What information do I need to use this tax calculator?","You typically need your estimated gross income, filing status (single, married filing jointly, etc.), whether you plan to take the standard or itemised deduction, and any relevant tax credits. The $name guides you through the required inputs.")
            @("What is the difference between effective and marginal tax rate?","Your marginal rate is the rate applied to your last dollar of income. Your effective rate is total tax divided by total income — always lower than your marginal rate because lower income portions are taxed at lower brackets. The $name shows both.")
            @("Can this calculator estimate state income tax?","Our $name focuses on federal income tax calculations. State income tax rates vary significantly by state — check your state's revenue department for current rates and apply them separately for a complete picture.")
            @("Is my income data safe?","Yes. All calculations are performed locally in your browser. Your income and tax information is never transmitted to or stored on VestCalc's servers.")
        )}
        'health' { @(
            @("How accurate are the health calculations?","Our $name uses clinically validated formulas (such as the Mifflin-St Jeor equation for metabolism, or standard BMI formulas from the WHO) appropriate for general health awareness. Individual results may vary — consult a healthcare professional for personalised medical guidance.")
            @("What units does the calculator support?","The $name supports both metric (kg, cm) and imperial (lbs, feet/inches) units. Select your preferred unit system before entering your measurements.")
            @("Is this health calculator free?","Yes, completely free with no account required. VestCalc's $name is available to all users with no usage limits or fees.")
            @("Is my health data shared or stored?","No. All calculations are performed in your browser and no health information is transmitted to or stored on VestCalc's servers. Your personal health data remains completely private.")
            @("Should I use these results to make medical decisions?","These calculations are provided for general informational and fitness planning purposes only. Always consult a qualified healthcare professional before making medical or dietary decisions based on health metrics.")
        )}
        'personal' { @(
            @("Is the $name free to use?","Yes, completely free with no account required. VestCalc's $name is available to all users without any fees or usage limits.")
            @("How accurate are the calculations?","Our $name uses standard formulas appropriate for personal finance planning purposes. Results are provided for informational use — for decisions involving significant money, verify with additional sources or a financial professional.")
            @("Can I use this on my mobile phone?","Yes. The $name is fully responsive and works on smartphones, tablets, and desktop computers in any modern browser.")
            @("Is my financial data stored anywhere?","No. All calculations are performed locally in your browser. No data is transmitted to or stored on VestCalc's servers.")
            @("Can I run multiple calculations?","Yes, there are no usage limits. Adjust your inputs and recalculate as many times as you need to model different scenarios or find the answer that fits your situation.")
        )}
        default { @(
            @("Is this calculator free to use?","Yes, VestCalc's $name is 100% free with no account required. All features are available at no cost with no usage limits.")
            @("How accurate are the calculations?","Our $name uses standard financial formulas and provides results appropriate for planning and educational purposes. For major financial decisions, verify results with a qualified financial professional.")
            @("Can I use this calculator on mobile?","Yes. The $name is fully responsive and works on all modern smartphones, tablets, and desktop computers.")
            @("Is my data stored or shared?","No. All calculations are performed locally in your browser. No financial data is transmitted to or stored on VestCalc's servers.")
            @("Can I adjust inputs and recalculate?","Yes, adjust any input field and the calculator updates immediately. Run as many scenarios as you need — there are no usage limits.")
        )}
    }
    $items = ''
    foreach ($pair in $qa) {
        $items += "  <div class=`"faq-item`"><div class=`"faq-q`">$($pair[0])</div><div class=`"faq-a`">$($pair[1])</div></div>`n"
    }
    return $items
}

# ── Extra related cards per category ─────────────────────────────────────────
$ExtraLinks = @{
    'retire'   = @('/retirement-calculator.html','Retirement Calculator'),@('/roth-ira-calculator.html','Roth IRA Calculator'),@('/401k-calculator.html','401(k) Calculator')
    'invest'   = @('/compound-interest-calculator.html','Compound Interest'),@('/investment-return-calculator.html','Investment Return'),@('/dividend-calculator.html','Dividend Calculator')
    'loan'     = @('/mortgage-calculator.html','Mortgage Calculator'),@('/loan-calculator.html','Loan Calculator'),@('/amortization-calculator.html','Amortisation Schedule')
    'budget'   = @('/savings-calculator.html','Savings Calculator'),@('/budget-calculator.html','Budget Calculator'),@('/emergency-fund-calculator.html','Emergency Fund')
    'tax'      = @('/tax-calculator.html','Tax Calculator'),@('/capital-gains-calculator.html','Capital Gains'),@('/rmd-calculator.html','RMD Calculator')
    'health'   = @('/bmi-calculator.html','BMI Calculator'),@('/calorie-calculator.html','Calorie Calculator'),@('/body-fat-calculator.html','Body Fat Calculator')
    'personal' = @('/tip-calculator.html','Tip Calculator'),@('/salary-calculator.html','Salary Calculator'),@('/inflation-calculator.html','Inflation Calculator')
    'finance'  = @('/loan-calculator.html','Loan Calculator'),@('/savings-calculator.html','Savings Calculator'),@('/retirement-calculator.html','Retirement Calculator')
}

function Get-ExtraCards([string]$slug) {
    $cat = Get-Cat $slug
    $pool = $ExtraLinks[$cat]
    if (-not $pool) { $pool = $ExtraLinks['finance'] }
    $cards = @()
    foreach ($link in $pool) {
        $linkSlug = [System.IO.Path]::GetFileNameWithoutExtension($link[0]) + '.html'
        if ($linkSlug -ne ($slug + '.html')) {
            $cards += "    <a href=`"$($link[0])`" class=`"related-card`"><div class=`"related-card-title`">$($link[1])</div><div class=`"related-card-desc`">Free online calculator</div></a>"
        }
    }
    return $cards -join "`n"
}

# ── SEO CSS (inline with existing style block) ───────────────────────────────
$SeoCss = '.seo-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:28px 32px;box-shadow:var(--shadow);margin-bottom:20px}.seo-card h2{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:12px}.seo-card p{font-size:14px;color:var(--text2);line-height:1.75;margin-bottom:10px}.seo-card p:last-child{margin-bottom:0}'

# ── Process one file ──────────────────────────────────────────────────────────
function Process-File([System.IO.FileInfo]$file) {
    $slug    = $file.BaseName
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    if ($content.Contains('<!-- vc-seo-expanded -->')) {
        Write-Host "  SKIP $slug"
        return
    }

    $m = [regex]::Match($content, '<h1[^>]*>([^<]+)</h1>')
    $toolName = if ($m.Success) { $m.Groups[1].Value.Trim() } else { ($slug -replace '-',' ') }

    # 1. Inject SEO CSS if not already present
    if (-not $content.Contains('seo-card{')) {
        $content = $content.Replace('</style>', "$SeoCss`n</style>")
    }

    # 2. Build SEO block
    $seoHtml = "<!-- vc-seo-expanded -->`n<div class=`"seo-card`">`n<h2>About $toolName</h2>`n" + (Get-Seo $toolName $slug) + "`n</div>`n"

    # 3. Insert SEO block before the FAQ calc-card
    $faqCardMarker = '<div class="calc-card" style="margin-top:0">'
    $fci = $content.IndexOf($faqCardMarker)
    if ($fci -ge 0) {
        $content = $content.Substring(0, $fci) + $seoHtml + $content.Substring($fci)
    }

    # 4. Replace/augment FAQ items — replace existing items with 5
    $faqOpen  = '<div class="faq-item">'
    $faqFirst = $content.IndexOf($faqOpen)
    if ($faqFirst -ge 0) {
        # Find end of last faq-item block (the closing </div> of the last faq-item)
        $searchPos = $faqFirst
        $lastEnd = $faqFirst
        while ($true) {
            $nextOpen = $content.IndexOf($faqOpen, $searchPos + 1)
            if ($nextOpen -lt 0) { break }
            $searchPos = $nextOpen
        }
        # $searchPos is start of last faq-item; find its closing </div>
        $innerClose = $content.IndexOf('</div>', $searchPos + $faqOpen.Length) # closes faq-q
        $outerClose = $content.IndexOf('</div>', $innerClose + 6)              # closes faq-a
        $lastFaqEnd = $content.IndexOf('</div>', $outerClose + 6)              # closes faq-item

        if ($lastFaqEnd -ge 0) {
            $newItems = Get-FaqItems $toolName $slug
            $before = $content.Substring(0, $faqFirst)
            $after  = $content.Substring($lastFaqEnd + 6)  # skip </div>
            $content = $before + $newItems.TrimEnd() + $after
        }
    }

    # 5. Add 3 extra related cards to existing related-grid
    $gridMarker = '<div class="related-grid">'
    $gi = $content.LastIndexOf($gridMarker)   # use last occurrence (the Related Calculators section)
    if ($gi -ge 0) {
        # Find closing </div> of the grid
        $depth = 1
        $pos = $gi + $gridMarker.Length
        $gClose = -1
        while ($pos -lt $content.Length -and $depth -gt 0) {
            $nextOpen  = $content.IndexOf('<div', $pos)
            $nextClose = $content.IndexOf('</div>', $pos)
            if ($nextClose -lt 0) { break }
            if ($nextOpen -ge 0 -and $nextOpen -lt $nextClose) { $depth++; $pos = $nextOpen + 4 }
            else { $depth--; if ($depth -eq 0) { $gClose = $nextClose } else { $pos = $nextClose + 6 } }
        }
        if ($gClose -ge 0) {
            $extraCards = Get-ExtraCards $slug
            $content = $content.Substring(0, $gClose) + "`n" + $extraCards + "`n    " + $content.Substring($gClose)
        }
    }

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "  OK  $slug"
}

# ── Run one batch ─────────────────────────────────────────────────────────────
$batchSize    = 20
$totalBatches = [Math]::Ceiling($allFiles.Count / $batchSize)

if ($Batch -lt 1 -or $Batch -gt $totalBatches) {
    Write-Error ("Usage: .\seo-batch.ps1 -Batch <1-" + $totalBatches + ">  (total: " + $allFiles.Count + " files)")
    exit 1
}

$startIdx = ($Batch - 1) * $batchSize
$endIdx   = [Math]::Min($startIdx + $batchSize - 1, $allFiles.Count - 1)

Write-Host "`n=== Batch $($Batch) of $($totalBatches) -- files $($startIdx+1) to $($endIdx+1) ==="

for ($i = $startIdx; $i -le $endIdx; $i++) {
    Process-File $allFiles[$i]
}

Write-Host "`nBatch $($Batch) done -- committing..."
Set-Location $siteDir
git add *.html
git commit -m "SEO batch $($Batch) of $($totalBatches) ($($startIdx+1)-$($endIdx+1)): add seo + 5 FAQ + extra links"
git -c http.proxy=http://127.0.0.1:7897 -c http.sslVerify=false push origin master
Write-Host "Batch $($Batch) pushed."
