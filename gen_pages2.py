import os, sys
sys.path.insert(0, r'C:\Users\Administrator\vestcalc')
from gen_pages import CSS, LOGO, JS_HELPERS, build, fg, rbox

# ── 1. Tip Calculator ────────────────────────────────────────────────────────
build('tip-calculator.html',
  'Tip Calculator',
  'Calculate tip amount, total bill, and per-person split for any restaurant or service.',
  'Instantly split the bill and calculate tips for any group size.',
  [
    fg('bill','Bill Amount ($)','85.00'),
    fg('pct','Tip Percentage (%)', '18'),
    fg('people','Number of People','2'),
  ],
  [
    rbox('r-tip','Tip Amount', True),
    rbox('r-total','Total Bill'),
    rbox('r-per_tip','Tip per Person'),
    rbox('r-per_total','Total per Person'),
  ],
  extra_results='<div class="info-box">Quick tip: 15% = standard, 18% = good service, 20–25% = excellent service.</div>',
  js="""
function calc(){
  var bill=parseFloat(document.getElementById('bill').value)||0;
  var pct=parseFloat(document.getElementById('pct').value)||0;
  var people=parseInt(document.getElementById('people').value)||1;
  if(bill<=0)return;
  var tip=bill*pct/100;
  var total=bill+tip;
  sv('r-tip',fmt(tip));sv('r-total',fmt(total));
  sv('r-per_tip',fmt(tip/people));sv('r-per_total',fmt(total/people));
  showR();
}
""")


# ── 2. Sales Tax Calculator ──────────────────────────────────────────────────
build('sales-tax-calculator.html',
  'Sales Tax Calculator',
  'Calculate sales tax and total price for any purchase amount and tax rate.',
  'Quickly add or remove sales tax from any purchase price.',
  [
    fg('price','Purchase Price ($)','100'),
    fg('rate','Sales Tax Rate (%)','8.5'),
    fg('mode','Calculate', opts=[('add','Add Tax to Price'),('remove','Remove Tax from Price')]),
  ],
  [
    rbox('r-tax','Sales Tax Amount', True),
    rbox('r-pre','Pre-Tax Price'),
    rbox('r-total','Total Price'),
    rbox('r-tax_pct','Tax % of Total'),
  ],
  js="""
function calc(){
  var price=parseFloat(document.getElementById('price').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var mode=document.getElementById('mode').value;
  if(price<=0||rate<=0)return;
  var pre,tax,total;
  if(mode==='add'){pre=price;tax=price*rate/100;total=pre+tax;}
  else{total=price;pre=price/(1+rate/100);tax=total-pre;}
  sv('r-tax',fmt(tax));sv('r-pre',fmt(pre));
  sv('r-total',fmt(total));sv('r-tax_pct',fmtPct(tax/total*100));
  showR();
}
""")


# ── 3. VAT Calculator ────────────────────────────────────────────────────────
build('vat-calculator.html',
  'VAT Calculator',
  'Add or remove Value Added Tax (VAT) from any price with instant calculations.',
  'Calculate VAT amounts for any country rate — add to or extract from any price.',
  [
    fg('amount','Amount ($)','100'),
    fg('vat_rate','VAT Rate (%)','20'),
    fg('mode','Mode', opts=[('add','Add VAT to Price'),('remove','Extract VAT from Price')]),
  ],
  [
    rbox('r-vat','VAT Amount', True),
    rbox('r-excl','Price Excl. VAT'),
    rbox('r-incl','Price Incl. VAT'),
    rbox('r-vat_pct','VAT % of Final'),
  ],
  js="""
function calc(){
  var amt=parseFloat(document.getElementById('amount').value)||0;
  var rate=parseFloat(document.getElementById('vat_rate').value)||0;
  var mode=document.getElementById('mode').value;
  if(amt<=0||rate<=0)return;
  var excl,vat,incl;
  if(mode==='add'){excl=amt;vat=amt*rate/100;incl=excl+vat;}
  else{incl=amt;excl=amt/(1+rate/100);vat=incl-excl;}
  sv('r-vat',fmt(vat));sv('r-excl',fmt(excl));
  sv('r-incl',fmt(incl));sv('r-vat_pct',fmtPct(vat/incl*100));
  showR();
}
""")


# ── 4. Paycheck Calculator ───────────────────────────────────────────────────
build('paycheck-calculator.html',
  'Paycheck Calculator',
  'Estimate your take-home pay after federal tax, state tax, Social Security, and Medicare.',
  'See exactly what lands in your bank account after all deductions.',
  [
    fg('gross','Gross Pay ($)','5000'),
    fg('period','Pay Period', opts=[('monthly','Monthly'),('biweekly','Bi-Weekly'),('weekly','Weekly')]),
    fg('fed_rate','Federal Tax Rate (%)','22'),
    fg('state_rate','State Tax Rate (%)','5'),
    fg('retirement','401(k) / Retirement (%)','6'),
    fg('health','Health Insurance ($/period)','200'),
  ],
  [
    rbox('r-gross','Gross Pay', True),
    rbox('r-fed','Federal Tax'),
    rbox('r-state','State Tax'),
    rbox('r-fica','FICA (SS + Medicare)'),
    rbox('r-deductions','Other Deductions'),
    rbox('r-net','Net Take-Home Pay'),
  ],
  js="""
function calc(){
  var gross=parseFloat(document.getElementById('gross').value)||0;
  var fed=parseFloat(document.getElementById('fed_rate').value)||0;
  var state=parseFloat(document.getElementById('state_rate').value)||0;
  var ret=parseFloat(document.getElementById('retirement').value)||0;
  var health=parseFloat(document.getElementById('health').value)||0;
  if(gross<=0)return;
  var retAmt=gross*ret/100;
  var taxable=gross-retAmt;
  var fedTax=taxable*fed/100;
  var stateTax=taxable*state/100;
  var ss=gross*0.062;
  var medicare=gross*0.0145;
  var fica=ss+medicare;
  var totalDed=fedTax+stateTax+fica+retAmt+health;
  var net=gross-totalDed;
  sv('r-gross',fmt(gross));sv('r-fed',fmt(fedTax));
  sv('r-state',fmt(stateTax));sv('r-fica',fmt(fica));
  sv('r-deductions',fmt(retAmt+health));sv('r-net',fmt(net));
  showR();
}
""")


# ── 5. Overtime Calculator ───────────────────────────────────────────────────
build('overtime-calculator.html',
  'Overtime Calculator',
  'Calculate your overtime pay, regular pay, and total weekly earnings.',
  'Quickly find out how much you earn with overtime at 1.5x or 2x your regular rate.',
  [
    fg('hourly','Regular Hourly Rate ($)','20'),
    fg('regular_hrs','Regular Hours per Week','40'),
    fg('ot_hrs','Overtime Hours','8'),
    fg('ot_mult','Overtime Rate', opts=[('1.5','1.5x (Time and a Half)'),('2','2x (Double Time)'),('1.75','1.75x')]),
  ],
  [
    rbox('r-reg_pay','Regular Pay', True),
    rbox('r-ot_pay','Overtime Pay'),
    rbox('r-total','Total Weekly Pay'),
    rbox('r-effective','Effective Hourly Rate'),
  ],
  js="""
function calc(){
  var rate=parseFloat(document.getElementById('hourly').value)||0;
  var regHrs=parseFloat(document.getElementById('regular_hrs').value)||40;
  var otHrs=parseFloat(document.getElementById('ot_hrs').value)||0;
  var mult=parseFloat(document.getElementById('ot_mult').value)||1.5;
  if(rate<=0)return;
  var regPay=rate*regHrs;
  var otPay=rate*mult*otHrs;
  var total=regPay+otPay;
  var totalHrs=regHrs+otHrs;
  var effective=totalHrs>0?total/totalHrs:0;
  sv('r-reg_pay',fmt(regPay));sv('r-ot_pay',fmt(otPay));
  sv('r-total',fmt(total));sv('r-effective','$'+effective.toFixed(2)+'/hr');
  showR();
}
""")


# ── 6. Salary to Hourly Calculator ──────────────────────────────────────────
build('salary-calculator.html',
  'Salary to Hourly Calculator',
  'Convert annual salary to hourly rate, or hourly wage to annual salary, in seconds.',
  'Instantly see your pay broken down by year, month, week, day, and hour.',
  [
    fg('annual','Annual Salary ($)','60000'),
    fg('hours_week','Hours per Week','40'),
    fg('weeks_year','Weeks per Year','52'),
  ],
  [
    rbox('r-annual','Annual Salary', True),
    rbox('r-monthly','Monthly'),
    rbox('r-biweekly','Bi-Weekly'),
    rbox('r-weekly','Weekly'),
    rbox('r-daily','Daily'),
    rbox('r-hourly','Hourly'),
  ],
  js="""
function calc(){
  var annual=parseFloat(document.getElementById('annual').value)||0;
  var hpw=parseFloat(document.getElementById('hours_week').value)||40;
  var wpy=parseFloat(document.getElementById('weeks_year').value)||52;
  if(annual<=0||hpw<=0||wpy<=0)return;
  var monthly=annual/12;
  var biweekly=annual/26;
  var weekly=annual/wpy;
  var daily=weekly/(hpw/8);
  var hourly=annual/(hpw*wpy);
  sv('r-annual',fmt(annual));sv('r-monthly',fmt(monthly));
  sv('r-biweekly',fmt(biweekly));sv('r-weekly',fmt(weekly));
  sv('r-daily',fmt(daily));sv('r-hourly','$'+hourly.toFixed(2)+'/hr');
  showR();
}
""")


# ── 7. Cost of Living Calculator ─────────────────────────────────────────────
build('cost-of-living-calculator.html',
  'Cost of Living Calculator',
  'Find out what salary you need in a new city to maintain your current standard of living.',
  'Compare cost of living between cities and calculate your equivalent salary.',
  [
    fg('salary','Current Salary ($)','75000'),
    fg('cur_index','Current City Cost Index','100'),
    fg('new_index','New City Cost Index','130'),
  ],
  [
    rbox('r-equiv','Equivalent Salary Needed', True),
    rbox('r-diff','Salary Difference'),
    rbox('r-pct_diff','Cost of Living Difference'),
    rbox('r-monthly_diff','Monthly Difference'),
  ],
  extra_results='<div class="info-box">Tip: Use 100 for an average U.S. city. NYC ≈ 187, San Francisco ≈ 195, Austin ≈ 118, Charlotte ≈ 96.</div>',
  js="""
function calc(){
  var salary=parseFloat(document.getElementById('salary').value)||0;
  var cur=parseFloat(document.getElementById('cur_index').value)||100;
  var nw=parseFloat(document.getElementById('new_index').value)||100;
  if(salary<=0||cur<=0||nw<=0)return;
  var equiv=salary*(nw/cur);
  var diff=equiv-salary;
  var pctDiff=(nw/cur-1)*100;
  sv('r-equiv',fmt(equiv));sv('r-diff',(diff>=0?'+':'')+fmt(diff));
  sv('r-pct_diff',(pctDiff>=0?'+':'')+fmtPct(Math.abs(pctDiff)));
  sv('r-monthly_diff',(diff>=0?'+':'')+fmt(diff/12)+'/mo');
  showR();
}
""")


# ── 8. Home Affordability Calculator ────────────────────────────────────────
build('home-affordability-calculator.html',
  'Home Affordability Calculator',
  'Find out how much house you can afford based on your income, debts, and down payment.',
  'Calculate your maximum home price using the 28/36 debt-to-income rule.',
  [
    fg('income','Annual Gross Income ($)','100000'),
    fg('debts','Monthly Debt Payments ($)','400'),
    fg('down','Down Payment ($)','60000'),
    fg('rate','Mortgage Rate (%)','7.0'),
    fg('term','Loan Term (years)','30'),
    fg('tax_ins','Property Tax + Insurance ($/mo)','400'),
  ],
  [
    rbox('r-price','Max Home Price', True),
    rbox('r-loan','Max Loan Amount'),
    rbox('r-payment','Monthly Payment'),
    rbox('r-dti','Debt-to-Income Ratio'),
  ],
  js="""
function calc(){
  var income=parseFloat(document.getElementById('income').value)||0;
  var debts=parseFloat(document.getElementById('debts').value)||0;
  var down=parseFloat(document.getElementById('down').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var term=parseInt(document.getElementById('term').value)||30;
  var taxIns=parseFloat(document.getElementById('tax_ins').value)||0;
  if(income<=0||rate<=0)return;
  var mr=rate/100/12;
  var n=term*12;
  var maxHousing=income/12*0.28;
  var maxTotal=income/12*0.36-debts;
  var maxPmt=Math.min(maxHousing,maxTotal)-taxIns;
  if(maxPmt<=0){sv('r-price','N/A — reduce debts');showR();return;}
  var maxLoan=maxPmt*(Math.pow(1+mr,n)-1)/(mr*Math.pow(1+mr,n));
  var maxPrice=maxLoan+down;
  var dti=(maxPmt+taxIns+debts)/(income/12)*100;
  sv('r-price',fmt(maxPrice));sv('r-loan',fmt(maxLoan));
  sv('r-payment',fmt(maxPmt+taxIns));sv('r-dti',fmtPct(dti));
  showR();
}
""")


# ── 9. Credit Card Payoff Calculator ────────────────────────────────────────
build('credit-card-payoff-calculator.html',
  'Credit Card Payoff Calculator',
  'Calculate how long it will take to pay off your credit card debt and total interest charged.',
  'See the real cost of minimum payments vs. paying more each month.',
  [
    fg('balance','Current Balance ($)','5000'),
    fg('apr','Annual Percentage Rate / APR (%)','19.99'),
    fg('payment','Monthly Payment ($)','150'),
    fg('min_pct','Minimum Payment (% of balance)','2'),
  ],
  [
    rbox('r-months','Months to Pay Off', True),
    rbox('r-interest','Total Interest Paid'),
    rbox('r-total','Total Paid'),
    rbox('r-min_months','Months (min. payment)'),
  ],
  extra_results='<div class="info-box" id="cc-tip"></div>',
  js="""
function payoffMonths(bal,apr,pmt){
  var mr=apr/100/12;
  if(pmt<=bal*mr)return Infinity;
  return Math.ceil(Math.log(pmt/(pmt-bal*mr))/Math.log(1+mr));
}
function calc(){
  var bal=parseFloat(document.getElementById('balance').value)||0;
  var apr=parseFloat(document.getElementById('apr').value)||0;
  var pmt=parseFloat(document.getElementById('payment').value)||0;
  var minPct=parseFloat(document.getElementById('min_pct').value)||2;
  if(bal<=0||apr<=0||pmt<=0)return;
  var months=payoffMonths(bal,apr,pmt);
  var total=pmt*months;
  var interest=total-bal;
  var minPmt=bal*minPct/100;
  var minMonths=payoffMonths(bal,apr,Math.max(minPmt,bal*apr/100/12+1));
  sv('r-months',months===Infinity?'Never':fmtN(months,0)+' mo');
  sv('r-interest',fmt(interest));sv('r-total',fmt(total));
  sv('r-min_months',minMonths===Infinity?'Never':fmtN(minMonths,0)+' mo');
  var tip=document.getElementById('cc-tip');
  if(tip&&months!==Infinity&&minMonths!==Infinity&&minMonths>months){
    tip.textContent='By paying '+fmt(pmt)+'/mo instead of the minimum, you save '+(minMonths-months)+' months and '+fmt((minPmt>0?minPmt*minMonths:0)-total)+' in interest.';
    tip.style.display='block';
  }
  showR();
}
""")


# ── 10. Interest Rate Calculator ────────────────────────────────────────────
build('interest-rate-calculator.html',
  'Interest Rate Calculator',
  'Calculate the implied interest rate on a loan from the payment amount, balance, and term.',
  'Reverse-engineer any loan to find the true interest rate being charged.',
  [
    fg('amount','Loan Amount ($)','20000'),
    fg('payment','Monthly Payment ($)','450'),
    fg('term','Loan Term (months)','48'),
  ],
  [
    rbox('r-annual','Annual Interest Rate', True),
    rbox('r-monthly_rate','Monthly Rate'),
    rbox('r-total_interest','Total Interest'),
    rbox('r-total_paid','Total Paid'),
  ],
  js="""
function calc(){
  var P=parseFloat(document.getElementById('amount').value)||0;
  var pmt=parseFloat(document.getElementById('payment').value)||0;
  var n=parseInt(document.getElementById('term').value)||0;
  if(P<=0||pmt<=0||n<=0)return;
  // Newton-Raphson to solve for monthly rate r in: P = pmt*(1-(1+r)^-n)/r
  var r=0.01;
  for(var i=0;i<1000;i++){
    var f=P-pmt*(1-Math.pow(1+r,-n))/r;
    var fp=pmt*(1-Math.pow(1+r,-n))/(r*r)-pmt*n*Math.pow(1+r,-n-1)/r;
    var rn=r-f/fp;
    if(Math.abs(rn-r)<1e-8){r=rn;break;}
    r=rn;
  }
  var annual=r*12*100;
  var total=pmt*n;
  sv('r-annual',fmtPct(annual));sv('r-monthly_rate',fmtPct(r*100));
  sv('r-total_interest',fmt(total-P));sv('r-total_paid',fmt(total));
  showR();
}
""")


# ── 11. Simple Interest Calculator ──────────────────────────────────────────
build('simple-interest-calculator.html',
  'Simple Interest Calculator',
  'Calculate simple interest earned or owed on any principal amount over time.',
  'Quickly compute interest on savings accounts, short-term loans, and bonds.',
  [
    fg('principal','Principal Amount ($)','10000'),
    fg('rate','Annual Interest Rate (%)','5.0'),
    fg('years','Time Period (years)','3'),
  ],
  [
    rbox('r-interest','Simple Interest', True),
    rbox('r-total','Total Amount'),
    rbox('r-monthly','Monthly Interest'),
    rbox('r-daily','Daily Interest'),
  ],
  js="""
function calc(){
  var P=parseFloat(document.getElementById('principal').value)||0;
  var r=parseFloat(document.getElementById('rate').value)||0;
  var t=parseFloat(document.getElementById('years').value)||0;
  if(P<=0||r<=0||t<=0)return;
  var interest=P*r/100*t;
  var total=P+interest;
  var monthly=interest/(t*12);
  var daily=interest/(t*365);
  sv('r-interest',fmt(interest));sv('r-total',fmt(total));
  sv('r-monthly',fmt(monthly)+'/mo');sv('r-daily',fmt(daily)+'/day');
  showR();
}
""")


# ── 12. APR Calculator ───────────────────────────────────────────────────────
build('apr-calculator.html',
  'APR Calculator',
  'Calculate the true Annual Percentage Rate (APR) of a loan including all fees and costs.',
  'Find out the real cost of borrowing by factoring in origination fees and charges.',
  [
    fg('amount','Loan Amount ($)','25000'),
    fg('rate','Nominal Interest Rate (%)','8.0'),
    fg('term','Loan Term (months)','60'),
    fg('fees','Total Loan Fees ($)','500'),
  ],
  [
    rbox('r-apr','APR', True),
    rbox('r-payment','Monthly Payment'),
    rbox('r-total_interest','Total Interest'),
    rbox('r-total_fees','Total Cost of Borrowing'),
  ],
  js="""
function calc(){
  var P=parseFloat(document.getElementById('amount').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var n=parseInt(document.getElementById('term').value)||60;
  var fees=parseFloat(document.getElementById('fees').value)||0;
  if(P<=0||rate<=0||n<=0)return;
  var mr=rate/100/12;
  var pmt=P*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1);
  var netP=P-fees;
  // APR via Newton-Raphson on net proceeds
  var r=mr;
  for(var i=0;i<200;i++){
    var f=netP-pmt*(1-Math.pow(1+r,-n))/r;
    var fp=pmt*(1-Math.pow(1+r,-n))/(r*r)-pmt*n*Math.pow(1+r,-n-1)/r;
    var rn=r-f/fp;
    if(Math.abs(rn-r)<1e-9){r=rn;break;}
    r=Math.max(r+rn,0.0001)/2;
  }
  var apr=r*12*100;
  var total=pmt*n;
  sv('r-apr',fmtPct(apr));sv('r-payment',fmt(pmt));
  sv('r-total_interest',fmt(total-P));sv('r-total_fees',fmt(total-P+fees));
  showR();
}
""")


# ── 13. ROI Calculator ───────────────────────────────────────────────────────
build('roi-calculator.html',
  'ROI Calculator',
  'Calculate Return on Investment (ROI) for any investment, including annualized performance.',
  'Measure the profitability of any investment with net profit, ROI %, and annualized return.',
  [
    fg('cost','Initial Investment ($)','10000'),
    fg('value','Final Value ($)','15000'),
    fg('years','Holding Period (years)','3'),
  ],
  [
    rbox('r-roi','ROI', True),
    rbox('r-profit','Net Profit'),
    rbox('r-annualized','Annualized ROI'),
    rbox('r-multiple','Return Multiple'),
  ],
  js="""
function calc(){
  var cost=parseFloat(document.getElementById('cost').value)||0;
  var val=parseFloat(document.getElementById('value').value)||0;
  var years=parseFloat(document.getElementById('years').value)||1;
  if(cost<=0)return;
  var profit=val-cost;
  var roi=profit/cost*100;
  var annualized=(Math.pow(val/cost,1/years)-1)*100;
  var multiple=val/cost;
  sv('r-roi',fmtPct(roi));sv('r-profit',fmt(profit));
  sv('r-annualized',fmtPct(annualized));sv('r-multiple',multiple.toFixed(2)+'x');
  showR();
}
""")


# ── 14. CAGR Calculator ──────────────────────────────────────────────────────
build('cagr-calculator.html',
  'CAGR Calculator',
  'Calculate Compound Annual Growth Rate (CAGR) to measure investment or business growth.',
  'Find the smoothed annual growth rate between any two values over any time period.',
  [
    fg('start','Starting Value ($)','10000'),
    fg('end','Ending Value ($)','25000'),
    fg('years','Number of Years','8'),
  ],
  [
    rbox('r-cagr','CAGR', True),
    rbox('r-total_return','Total Return'),
    rbox('r-growth','Absolute Growth'),
    rbox('r-multiple','Growth Multiple'),
  ],
  js="""
function calc(){
  var start=parseFloat(document.getElementById('start').value)||0;
  var end=parseFloat(document.getElementById('end').value)||0;
  var years=parseFloat(document.getElementById('years').value)||0;
  if(start<=0||end<=0||years<=0)return;
  var cagr=(Math.pow(end/start,1/years)-1)*100;
  var totalReturn=(end-start)/start*100;
  var growth=end-start;
  var multiple=end/start;
  sv('r-cagr',fmtPct(cagr));sv('r-total_return',fmtPct(totalReturn));
  sv('r-growth',fmt(growth));sv('r-multiple',multiple.toFixed(2)+'x');
  showR();
}
""")


# ── 15. Present Value Calculator ────────────────────────────────────────────
build('present-value-calculator.html',
  'Present Value Calculator',
  'Calculate the present value of a future cash amount using any discount rate.',
  'Determine how much a future payment is worth in today\'s dollars.',
  [
    fg('future_val','Future Value ($)','50000'),
    fg('rate','Annual Discount Rate (%)','8'),
    fg('years','Number of Years','10'),
    fg('compound','Compounding', opts=[('annual','Annual'),('monthly','Monthly'),('quarterly','Quarterly')]),
  ],
  [
    rbox('r-pv','Present Value', True),
    rbox('r-discount','Discount Amount'),
    rbox('r-pv_factor','PV Factor'),
    rbox('r-growth_needed','Growth Needed'),
  ],
  js="""
function calc(){
  var fv=parseFloat(document.getElementById('future_val').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var years=parseFloat(document.getElementById('years').value)||0;
  var comp=document.getElementById('compound').value;
  if(fv<=0||rate<=0||years<=0)return;
  var n,r;
  if(comp==='monthly'){n=years*12;r=rate/100/12;}
  else if(comp==='quarterly'){n=years*4;r=rate/100/4;}
  else{n=years;r=rate/100;}
  var pvFactor=1/Math.pow(1+r,n);
  var pv=fv*pvFactor;
  var discount=fv-pv;
  sv('r-pv',fmt(pv));sv('r-discount',fmt(discount));
  sv('r-pv_factor',pvFactor.toFixed(6));sv('r-growth_needed',fmtPct((fv/pv-1)*100));
  showR();
}
""")


# ── 16. Future Value Calculator ─────────────────────────────────────────────
build('future-value-calculator.html',
  'Future Value Calculator',
  'Calculate how much an investment will be worth in the future with compound interest.',
  'Project any lump sum or recurring investment forward using compound interest.',
  [
    fg('pv','Present Value / Principal ($)','10000'),
    fg('rate','Annual Interest Rate (%)','7'),
    fg('years','Number of Years','20'),
    fg('compound','Compounding', opts=[('annual','Annual'),('monthly','Monthly'),('quarterly','Quarterly'),('daily','Daily')]),
  ],
  [
    rbox('r-fv','Future Value', True),
    rbox('r-interest','Total Interest Earned'),
    rbox('r-principal','Principal'),
    rbox('r-eff_rate','Effective Annual Rate'),
  ],
  js="""
function calc(){
  var pv=parseFloat(document.getElementById('pv').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var years=parseFloat(document.getElementById('years').value)||0;
  var comp=document.getElementById('compound').value;
  if(pv<=0||rate<=0||years<=0)return;
  var n;
  if(comp==='monthly')n=12;
  else if(comp==='quarterly')n=4;
  else if(comp==='daily')n=365;
  else n=1;
  var r=rate/100/n;
  var fv=pv*Math.pow(1+r,n*years);
  var interest=fv-pv;
  var effRate=(Math.pow(1+r,n)-1)*100;
  sv('r-fv',fmt(fv));sv('r-interest',fmt(interest));
  sv('r-principal',fmt(pv));sv('r-eff_rate',fmtPct(effRate));
  showR();
}
""")


# ── 17. NPV Calculator ───────────────────────────────────────────────────────
_npv_form = [
  fg('invest','Initial Investment ($)','50000'),
  fg('disc_rate','Discount Rate (%)','10'),
]
_npv_form += [fg('cf'+str(i), 'Year '+str(i)+' Cash Flow ($)', '15000') for i in range(1,9)]

build('npv-calculator.html',
  'NPV Calculator',
  'Calculate Net Present Value (NPV) to evaluate whether an investment creates value.',
  'Enter up to 8 years of cash flows to determine if an investment is worth pursuing.',
  _npv_form,
  [
    rbox('r-npv','Net Present Value (NPV)', True),
    rbox('r-total_cf','Total Cash Flows'),
    rbox('r-total_pv','Total Present Value'),
    rbox('r-decision','Decision'),
  ],
  js="""
function calc(){
  var invest=parseFloat(document.getElementById('invest').value)||0;
  var disc=parseFloat(document.getElementById('disc_rate').value)||0;
  if(invest<=0||disc<=0)return;
  var r=disc/100;
  var totalCF=0,totalPV=0;
  for(var i=1;i<=8;i++){
    var cf=parseFloat(document.getElementById('cf'+i).value)||0;
    totalCF+=cf;
    totalPV+=cf/Math.pow(1+r,i);
  }
  var npv=totalPV-invest;
  sv('r-npv',fmt(npv));sv('r-total_cf',fmt(totalCF));
  sv('r-total_pv',fmt(totalPV));sv('r-decision',npv>=0?'✓ Accept (NPV > 0)':'✗ Reject (NPV < 0)');
  showR();
}
""")


# ── 18. IRR Calculator ───────────────────────────────────────────────────────
_irr_form = [fg('invest2','Initial Investment ($)','50000')]
_irr_form += [fg('ir'+str(i), 'Year '+str(i)+' Cash Flow ($)', '15000') for i in range(1,9)]

build('irr-calculator.html',
  'IRR Calculator',
  'Calculate Internal Rate of Return (IRR) to evaluate and compare investment opportunities.',
  'Find the discount rate at which NPV equals zero — a key metric for capital allocation.',
  _irr_form,
  [
    rbox('r-irr','Internal Rate of Return (IRR)', True),
    rbox('r-total_cf2','Total Cash Flows'),
    rbox('r-net_profit','Net Profit'),
    rbox('r-payback','Payback Period'),
  ],
  js="""
function calc(){
  var invest=parseFloat(document.getElementById('invest2').value)||0;
  if(invest<=0)return;
  var cfs=[-invest];
  var cumulative=0,payback=null;
  var runningBal=-invest;
  for(var i=1;i<=8;i++){
    var cf=parseFloat(document.getElementById('ir'+i).value)||0;
    cfs.push(cf);
    runningBal+=cf;
    if(payback===null&&runningBal>=0)payback=i;
  }
  var totalCF=cfs.slice(1).reduce(function(a,b){return a+b;},0);
  // Bisection method for IRR
  function npvAtR(r){return cfs.reduce(function(acc,cf,i){return acc+cf/Math.pow(1+r,i);},0);}
  var lo=-0.9,hi=10,irr=0;
  for(var j=0;j<200;j++){var mid=(lo+hi)/2;if(npvAtR(mid)>0)lo=mid;else hi=mid;}
  irr=(lo+hi)/2*100;
  sv('r-irr',fmtPct(irr));sv('r-total_cf2',fmt(totalCF));
  sv('r-net_profit',fmt(totalCF-invest));
  sv('r-payback',payback?'Year '+payback:'> 8 years');
  showR();
}
""")


# ── 19. Lease Calculator ─────────────────────────────────────────────────────
build('lease-calculator.html',
  'Lease Calculator',
  'Calculate your monthly car lease payment based on vehicle price, residual value, and money factor.',
  'Understand the true cost of leasing a vehicle versus buying.',
  [
    fg('msrp','Vehicle MSRP ($)','40000'),
    fg('cap_cost','Negotiated Price / Cap Cost ($)','38000'),
    fg('residual','Residual Value (%)','55'),
    fg('mf','Money Factor (e.g. 0.00125)','0.00125'),
    fg('term','Lease Term (months)','36'),
    fg('down_pay','Down Payment ($)','2000'),
    fg('tax_rate','Sales Tax Rate (%)','8'),
  ],
  [
    rbox('r-payment','Monthly Payment', True),
    rbox('r-total_cost','Total Lease Cost'),
    rbox('r-residual_val','Residual Value'),
    rbox('r-dep_cost','Monthly Depreciation'),
  ],
  js="""
function calc(){
  var msrp=parseFloat(document.getElementById('msrp').value)||0;
  var cap=parseFloat(document.getElementById('cap_cost').value)||0;
  var resPct=parseFloat(document.getElementById('residual').value)||0;
  var mf=parseFloat(document.getElementById('mf').value)||0;
  var term=parseInt(document.getElementById('term').value)||36;
  var down=parseFloat(document.getElementById('down_pay').value)||0;
  var tax=parseFloat(document.getElementById('tax_rate').value)||0;
  if(msrp<=0||cap<=0)return;
  var adjCap=cap-down;
  var residualVal=msrp*resPct/100;
  var depreciation=(adjCap-residualVal)/term;
  var financeCharge=(adjCap+residualVal)*mf;
  var basePayment=depreciation+financeCharge;
  var monthlyPayment=basePayment*(1+tax/100);
  var totalCost=monthlyPayment*term+down;
  sv('r-payment',fmt(monthlyPayment));sv('r-total_cost',fmt(totalCost));
  sv('r-residual_val',fmt(residualVal));sv('r-dep_cost',fmt(depreciation));
  showR();
}
""")


# ── 20. Escrow Calculator ────────────────────────────────────────────────────
build('escrow-calculator.html',
  'Escrow Calculator',
  'Calculate your monthly escrow payment for property taxes, insurance, and PMI.',
  'See exactly how much of your mortgage payment goes into escrow each month.',
  [
    fg('home_val','Home Value ($)','350000'),
    fg('loan_amt','Loan Amount ($)','280000'),
    fg('prop_tax','Annual Property Tax Rate (%)','1.2'),
    fg('insurance','Annual Homeowner\'s Insurance ($)','1400'),
    fg('pmi_rate','PMI Rate (%) — if down payment < 20%','0.5'),
    fg('down_pct','Down Payment (%)','20'),
  ],
  [
    rbox('r-escrow','Monthly Escrow Payment', True),
    rbox('r-prop_tax_mo','Property Tax (monthly)'),
    rbox('r-ins_mo','Insurance (monthly)'),
    rbox('r-pmi_mo','PMI (monthly)'),
  ],
  extra_results='<div class="info-box" id="pmi-note"></div>',
  js="""
function calc(){
  var val=parseFloat(document.getElementById('home_val').value)||0;
  var loan=parseFloat(document.getElementById('loan_amt').value)||0;
  var taxRate=parseFloat(document.getElementById('prop_tax').value)||0;
  var ins=parseFloat(document.getElementById('insurance').value)||0;
  var pmiRate=parseFloat(document.getElementById('pmi_rate').value)||0;
  var downPct=parseFloat(document.getElementById('down_pct').value)||20;
  if(val<=0)return;
  var taxMo=val*taxRate/100/12;
  var insMo=ins/12;
  var pmiMo=downPct<20?(loan*pmiRate/100/12):0;
  var escrow=taxMo+insMo+pmiMo;
  sv('r-escrow',fmt(escrow));sv('r-prop_tax_mo',fmt(taxMo));
  sv('r-ins_mo',fmt(insMo));sv('r-pmi_mo',pmiMo>0?fmt(pmiMo):'N/A (≥20% down)');
  var note=document.getElementById('pmi-note');
  if(note){note.textContent=downPct<20?'PMI is required when down payment is below 20%. It can be cancelled once you reach 20% equity.':'No PMI required — your down payment is 20% or more.';note.style.display='block';}
  showR();
}
""")

print('\nAll 20 pages generated successfully!')
