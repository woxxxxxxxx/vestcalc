import os

BASE_DIR = r'C:\Users\Administrator\vestcalc'

LOGO = '<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="#fff" stroke-width="2"/><rect x="7" y="5" width="10" height="4" rx="1" fill="none" stroke="#fff" stroke-width="1.5"/><polyline points="8 7.5 10 6 13 7 16 5" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="8.5" cy="14" r="1" fill="#fff"/><circle cx="12" cy="14" r="1" fill="#fff"/><circle cx="15.5" cy="14" r="1" fill="#fff"/><circle cx="8.5" cy="18" r="1" fill="#fff"/><circle cx="12" cy="18" r="1" fill="#fff"/><circle cx="15.5" cy="18" r="1" fill="#fff"/></svg>'

CSS = (
'*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n'
':root{--primary:#0d9488;--primary-dark:#0f766e;--primary-light:#ccfbf1;--primary-dim:rgba(13,148,136,.1);--bg:#f8fafc;--bg2:#ffffff;--text:#0f172a;--text2:#475569;--text3:#94a3b8;--border:#e2e8f0;--radius:12px;--radius-sm:8px;--shadow:0 1px 3px rgba(0,0,0,.08)}\n'
'body{font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}\n'
'header{background:var(--bg2);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100}\n'
'.header-inner{max-width:1100px;margin:0 auto;padding:0 20px;height:64px;display:flex;align-items:center;gap:32px}\n'
'.logo{display:flex;align-items:center;gap:10px;text-decoration:none}\n'
'.logo-icon{width:36px;height:36px;background:var(--primary);border-radius:10px;display:flex;align-items:center;justify-content:center}\n'
'.logo-icon svg{width:20px;height:20px;fill:#fff}\n'
'.logo-name{font-size:22px;font-weight:800;color:var(--text);letter-spacing:-.5px}\n'
'.logo-name span{color:var(--primary)}\n'
'nav{display:flex;align-items:center;gap:4px;flex:1}\n'
'nav a{padding:6px 14px;border-radius:var(--radius-sm);font-size:14px;font-weight:500;color:var(--text2);text-decoration:none;transition:all .15s}\n'
'nav a:hover{color:var(--primary);background:var(--primary-dim)}\n'
'.nav-cta{margin-left:auto;padding:8px 18px;background:var(--primary);color:#fff!important;border-radius:var(--radius-sm);font-size:14px;font-weight:600;text-decoration:none;transition:background .15s}\n'
'.nav-cta:hover{background:var(--primary-dark)!important}\n'
'.page-hero{background:linear-gradient(135deg,#0f766e 0%,#0d9488 50%,#14b8a6 100%);color:#fff;padding:48px 20px;text-align:center}\n'
'.page-hero h1{font-size:clamp(1.6rem,4vw,2.4rem);font-weight:800;margin-bottom:8px}\n'
'.page-hero p{font-size:15px;opacity:.9;max-width:500px;margin:0 auto}\n'
'main{max-width:860px;margin:0 auto;padding:40px 20px 80px}\n'
'.ad-slot{background:var(--bg2);border:1px dashed var(--border);border-radius:var(--radius);padding:20px;text-align:center;color:var(--text3);font-size:13px;margin:28px 0;min-height:90px;display:flex;align-items:center;justify-content:center}\n'
'.calc-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:32px;box-shadow:var(--shadow);margin-bottom:20px}\n'
'.calc-card h2{font-size:1.1rem;font-weight:700;color:var(--text);margin-bottom:20px;padding-bottom:12px;border-bottom:2px solid var(--primary-light)}\n'
'.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}\n'
'.form-group{display:flex;flex-direction:column;gap:6px}\n'
'.form-group.full{grid-column:1/-1}\n'
'label{font-size:13px;font-weight:600;color:var(--text2)}\n'
'input,select{padding:10px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:15px;color:var(--text);background:var(--bg);outline:none;transition:border .15s;width:100%}\n'
'input:focus,select:focus{border-color:var(--primary)}\n'
'.btn{width:100%;padding:13px;background:var(--primary);color:#fff;border:none;border-radius:var(--radius-sm);font-size:15px;font-weight:700;cursor:pointer;transition:background .15s;margin-top:4px}\n'
'.btn:hover{background:var(--primary-dark)}\n'
'.result-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;margin-top:20px}\n'
'.result-box{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:20px;text-align:center}\n'
'.result-box.primary{background:var(--primary-dim);border-color:var(--primary-light)}\n'
'.result-label{font-size:12px;color:var(--text3);margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}\n'
'.result-value{font-size:1.5rem;font-weight:800;color:var(--primary)}\n'
'.result-box:not(.primary) .result-value{color:var(--text);font-size:1.25rem}\n'
'.info-box{background:var(--primary-dim);border:1px solid var(--primary-light);border-radius:var(--radius-sm);padding:14px 18px;margin-top:20px;font-size:14px;color:var(--primary-dark)}\n'
'.table-wrap{overflow-x:auto;margin-top:20px}\n'
'table{width:100%;border-collapse:collapse;font-size:13px}\n'
'th{background:var(--primary);color:#fff;padding:10px 12px;text-align:right;font-weight:600}\n'
'th:first-child{text-align:left}\n'
'td{padding:9px 12px;border-bottom:1px solid var(--border);text-align:right;color:var(--text2)}\n'
'td:first-child{text-align:left;color:var(--text);font-weight:500}\n'
'tr:hover td{background:var(--primary-dim)}\n'
'.sidebar-sticky{position:fixed;right:20px;top:50%;transform:translateY(-50%);width:300px;z-index:50;display:none}\n'
'.sidebar-ad{background:var(--bg2);border:1px dashed var(--border);border-radius:var(--radius);padding:20px;text-align:center;color:var(--text3);font-size:13px;height:600px;display:flex;align-items:center;justify-content:center;flex-direction:column}\n'
'@media(min-width:1400px){.sidebar-sticky{display:block}}\n'
'footer{background:var(--text);color:#94a3b8;padding:40px 20px}\n'
'.footer-inner{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between}\n'
'.footer-logo{font-size:18px;font-weight:800;color:#fff}\n'
'.footer-logo span{color:var(--primary)}\n'
'.footer-links{display:flex;gap:20px;flex-wrap:wrap}\n'
'.footer-links a{color:#94a3b8;text-decoration:none;font-size:13px;transition:color .15s}\n'
'.footer-links a:hover{color:#fff}\n'
'.footer-copy{font-size:13px;width:100%}\n'
'@media(max-width:640px){.header-inner{gap:16px}nav a:not(.nav-cta){display:none}.form-grid{grid-template-columns:1fr}}\n'
)

JS_HELPERS = """
function fmt(n){return '$'+Number(n.toFixed(2)).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
function fmtN(n,d){d=d||0;return Number(n.toFixed(d)).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});}
function fmtPct(n){return n.toFixed(2)+'%';}
function sv(id,v){var el=document.getElementById(id);if(el)el.textContent=v;}
function showR(){document.getElementById('results').style.display='';}
function rbox(id){return document.getElementById(id);}
"""

def rbox(id_, label, is_primary=False):
    cls = ' primary' if is_primary else ''
    return (
        '<div class="result-box' + cls + '">'
        '<div class="result-label">' + label + '</div>'
        '<div class="result-value" id="' + id_ + '">—</div>'
        '</div>'
    )

def fg(id_, label, placeholder='', type_='number', cls='', val='', opts=None):
    """Form group helper"""
    full = ' full' if cls == 'full' else ''
    html = '<div class="form-group' + full + '"><label for="' + id_ + '">' + label + '</label>'
    if opts:
        html += '<select id="' + id_ + '">'
        for v, t in opts:
            html += '<option value="' + v + '">' + t + '</option>'
        html += '</select>'
    else:
        v_attr = ' value="' + val + '"' if val else ''
        html += '<input type="' + type_ + '" id="' + id_ + '" placeholder="' + placeholder + '"' + v_attr + ' step="any">'
    html += '</div>'
    return html

def build(filename, title, desc, hero_sub, form_fields, result_boxes, js, extra_results='', btn_label='Calculate'):
    form_html = '\n'.join(form_fields)
    result_html = '\n'.join(result_boxes)

    html = (
'<!DOCTYPE html>\n'
'<html lang="en">\n'
'<head>\n'
'<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1638874323475457" crossorigin="anonymous"></script>\n'
'<meta charset="UTF-8">\n'
'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
'<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">\n'
'<title>' + title + ' - VestCalc</title>\n'
'<meta name="description" content="' + desc + '">\n'
'<script async src="https://www.googletagmanager.com/gtag/js?id=G-EDVND7BVGL"></script>\n'
'<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag(\'js\',new Date());gtag(\'config\',\'G-EDVND7BVGL\');</script>\n'
'<style>\n' + CSS + '</style>\n'
'</head>\n'
'<body>\n'
'<header>\n'
'  <div class="header-inner">\n'
'    <a href="/" class="logo">\n'
'      <div class="logo-icon">' + LOGO + '</div>\n'
'      <span class="logo-name">Vest<span>Calc</span></span>\n'
'    </a>\n'
'    <nav><a href="/">Home</a><a href="/#calculators">Calculators</a><a href="/" class="nav-cta">All Tools</a></nav>\n'
'  </div>\n'
'</header>\n'
'<div class="page-hero">\n'
'  <h1>' + title + '</h1>\n'
'  <p>' + hero_sub + '</p>\n'
'</div>\n'
'<main>\n'
'  <div class="ad-slot">Advertisement</div>\n'
'  <div class="calc-card">\n'
'    <h2>Enter Your Details</h2>\n'
'    <div class="form-grid">\n'
+ form_html + '\n'
'    </div>\n'
'    <button class="btn" onclick="calc()">' + btn_label + '</button>\n'
'  </div>\n'
'  <div class="ad-slot">Advertisement</div>\n'
'  <div class="calc-card" id="results" style="display:none">\n'
'    <h2>Results</h2>\n'
'    <div class="result-grid">\n'
+ result_html + '\n'
'    </div>\n'
+ extra_results + '\n'
'  </div>\n'
'  <div class="ad-slot">Advertisement</div>\n'
'</main>\n'
'<footer>\n'
'  <div class="footer-inner">\n'
'    <div class="footer-logo">Vest<span>Calc</span></div>\n'
'    <div class="footer-links">\n'
'      <a href="/about.html">About</a><a href="/privacy.html">Privacy Policy</a><a href="/terms.html">Terms of Use</a><a href="/contact.html">Contact</a>\n'
'    </div>\n'
'    <p class="footer-copy">&copy; 2026 VestCalc. All rights reserved.</p>\n'
'  </div>\n'
'</footer>\n'
'<div class="sidebar-sticky"><div class="sidebar-ad">Advertisement<br><small>300&times;600</small></div></div>\n'
'<script>\n'
+ JS_HELPERS + '\n'
+ js + '\n'
'</script>\n'
'</body>\n'
'</html>\n'
    )
    path = os.path.join(BASE_DIR, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print('Created:', filename)


# ── 1. Car Loan Calculator ──────────────────────────────────────────────────
build('car-loan-calculator.html',
  'Car Loan Calculator',
  'Calculate your monthly car payment, total interest, and true cost of financing a vehicle.',
  'Find out exactly what that car will cost you with our free car loan calculator.',
  [
    fg('price','Car Price ($)','25000'),
    fg('down','Down Payment ($)','3000'),
    fg('tradein','Trade-in Value ($)','0'),
    fg('rate','Annual Interest Rate (%)','6.5'),
    fg('term','Loan Term (months)','60'),
  ],
  [
    rbox('r-payment','Monthly Payment', True),
    rbox('r-financed','Amount Financed'),
    rbox('r-interest','Total Interest'),
    rbox('r-total','Total Cost'),
  ],
  js="""
function calc(){
  var price=parseFloat(document.getElementById('price').value)||0;
  var down=parseFloat(document.getElementById('down').value)||0;
  var tradein=parseFloat(document.getElementById('tradein').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var term=parseInt(document.getElementById('term').value)||60;
  var principal=price-down-tradein;
  if(principal<=0||rate<=0||term<=0)return;
  var r=rate/100/12;
  var pmt=principal*r*Math.pow(1+r,term)/(Math.pow(1+r,term)-1);
  var total=pmt*term;
  var interest=total-principal;
  sv('r-payment',fmt(pmt));sv('r-financed',fmt(principal));
  sv('r-interest',fmt(interest));sv('r-total',fmt(total));
  showR();
}
""")


# ── 2. Home Equity Calculator ───────────────────────────────────────────────
build('home-equity-calculator.html',
  'Home Equity Calculator',
  'Calculate how much equity you have in your home and your maximum HELOC borrowing power.',
  'Instantly see your home equity, equity percentage, and available credit line.',
  [
    fg('hvalue','Home Current Value ($)','400000'),
    fg('mortgage','Outstanding Mortgage Balance ($)','250000'),
    fg('heloc','Existing HELOC / 2nd Mortgage ($)','0'),
  ],
  [
    rbox('r-equity','Home Equity', True),
    rbox('r-pct','Equity Percentage'),
    rbox('r-max','Max HELOC (80% LTV)'),
    rbox('r-avail','Available to Borrow'),
  ],
  js="""
function calc(){
  var val=parseFloat(document.getElementById('hvalue').value)||0;
  var mort=parseFloat(document.getElementById('mortgage').value)||0;
  var heloc=parseFloat(document.getElementById('heloc').value)||0;
  if(val<=0)return;
  var equity=val-mort-heloc;
  var pct=(equity/val)*100;
  var maxHeloc=val*0.80;
  var avail=Math.max(0,maxHeloc-mort-heloc);
  sv('r-equity',fmt(equity));sv('r-pct',fmtPct(pct));
  sv('r-max',fmt(maxHeloc));sv('r-avail',fmt(avail));
  showR();
}
""")


# ── 3. Refinance Calculator ─────────────────────────────────────────────────
build('refinance-calculator.html',
  'Refinance Calculator',
  'Compare your current mortgage to a new loan and calculate your break-even point.',
  'Find out if refinancing saves you money and how long until you break even on closing costs.',
  [
    fg('balance','Current Loan Balance ($)','280000'),
    fg('cur_rate','Current Interest Rate (%)','7.5'),
    fg('cur_term','Remaining Term (months)','300'),
    fg('new_rate','New Interest Rate (%)','6.0'),
    fg('new_term','New Loan Term (months)','360'),
    fg('closing','Closing Costs ($)','5000'),
  ],
  [
    rbox('r-cur','Current Monthly Payment', True),
    rbox('r-new','New Monthly Payment'),
    rbox('r-save','Monthly Savings'),
    rbox('r-break','Break-Even (months)'),
    rbox('r-5yr','5-Year Net Savings'),
  ],
  js="""
function pmtCalc(p,r,n){var mr=r/100/12;return p*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1);}
function calc(){
  var bal=parseFloat(document.getElementById('balance').value)||0;
  var cr=parseFloat(document.getElementById('cur_rate').value)||0;
  var ct=parseInt(document.getElementById('cur_term').value)||0;
  var nr=parseFloat(document.getElementById('new_rate').value)||0;
  var nt=parseInt(document.getElementById('new_term').value)||0;
  var cc=parseFloat(document.getElementById('closing').value)||0;
  if(bal<=0||cr<=0||ct<=0||nr<=0||nt<=0)return;
  var curPmt=pmtCalc(bal,cr,ct);
  var newPmt=pmtCalc(bal,nr,nt);
  var save=curPmt-newPmt;
  var breakEven=save>0?Math.ceil(cc/save):Infinity;
  var net5yr=save<=0?-cc:(save*60-cc);
  sv('r-cur',fmt(curPmt));sv('r-new',fmt(newPmt));
  sv('r-save',fmt(save));
  sv('r-break',save>0?fmtN(breakEven,0)+' mo':'N/A');
  sv('r-5yr',fmt(net5yr));
  showR();
}
""")


# ── 4. Debt Payoff Calculator ───────────────────────────────────────────────
build('debt-payoff-calculator.html',
  'Debt Payoff Calculator',
  'See exactly how long it will take to pay off your debt and how much interest you will pay.',
  'Enter your balance, rate, and monthly payment to get a clear payoff timeline.',
  [
    fg('balance','Debt Balance ($)','10000'),
    fg('rate','Annual Interest Rate (%)','19.99'),
    fg('payment','Monthly Payment ($)','300'),
  ],
  [
    rbox('r-months','Months to Pay Off', True),
    rbox('r-years','Years'),
    rbox('r-interest','Total Interest Paid'),
    rbox('r-total','Total Amount Paid'),
  ],
  js="""
function calc(){
  var bal=parseFloat(document.getElementById('balance').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var pmt=parseFloat(document.getElementById('payment').value)||0;
  if(bal<=0||rate<=0||pmt<=0)return;
  var mr=rate/100/12;
  if(pmt<=bal*mr){sv('r-months','Never');sv('r-years','—');sv('r-interest','—');sv('r-total','—');showR();return;}
  var months=Math.ceil(Math.log(pmt/(pmt-bal*mr))/Math.log(1+mr));
  var total=pmt*months;
  var interest=total-bal;
  sv('r-months',fmtN(months,0));sv('r-years',fmtN(months/12,1));
  sv('r-interest',fmt(interest));sv('r-total',fmt(total));
  showR();
}
""")


# ── 5. Student Loan Calculator ──────────────────────────────────────────────
build('student-loan-calculator.html',
  'Student Loan Calculator',
  'Estimate your monthly student loan payment and total repayment cost under any repayment plan.',
  'Calculate standard, graduated, and income-based repayment estimates for your student loans.',
  [
    fg('amount','Loan Amount ($)','30000'),
    fg('rate','Annual Interest Rate (%)','5.5'),
    fg('term','Repayment Term (years)','10'),
    fg('grace','Grace Period (months)','6'),
  ],
  [
    rbox('r-payment','Monthly Payment', True),
    rbox('r-grace_int','Interest During Grace'),
    rbox('r-interest','Total Interest Paid'),
    rbox('r-total','Total Repayment Cost'),
  ],
  js="""
function calc(){
  var amt=parseFloat(document.getElementById('amount').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var term=parseFloat(document.getElementById('term').value)||10;
  var grace=parseInt(document.getElementById('grace').value)||0;
  if(amt<=0||rate<=0||term<=0)return;
  var mr=rate/100/12;
  var graceInt=amt*mr*grace;
  var principal=amt+graceInt;
  var n=term*12;
  var pmt=principal*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1);
  var total=pmt*n;
  var interest=total-principal+graceInt;
  sv('r-payment',fmt(pmt));sv('r-grace_int',fmt(graceInt));
  sv('r-interest',fmt(interest));sv('r-total',fmt(total+graceInt));
  showR();
}
""")


# ── 6. Personal Loan Calculator ─────────────────────────────────────────────
build('personal-loan-calculator.html',
  'Personal Loan Calculator',
  'Calculate monthly payments, total cost, and effective APR for any personal loan.',
  'Get instant estimates for personal loan payments including origination fees.',
  [
    fg('amount','Loan Amount ($)','10000'),
    fg('rate','Annual Interest Rate (%)','10.0'),
    fg('term','Loan Term (months)','36'),
    fg('fee','Origination Fee (%)','1.0'),
  ],
  [
    rbox('r-payment','Monthly Payment', True),
    rbox('r-fee_amt','Origination Fee'),
    rbox('r-interest','Total Interest'),
    rbox('r-total','Total Cost'),
    rbox('r-apr','Effective APR'),
  ],
  js="""
function calc(){
  var amt=parseFloat(document.getElementById('amount').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var term=parseInt(document.getElementById('term').value)||36;
  var feePct=parseFloat(document.getElementById('fee').value)||0;
  if(amt<=0||rate<=0||term<=0)return;
  var feeAmt=amt*feePct/100;
  var net=amt-feeAmt;
  var mr=rate/100/12;
  var pmt=amt*mr*Math.pow(1+mr,term)/(Math.pow(1+mr,term)-1);
  var total=pmt*term;
  var interest=total-amt;
  // APR estimate via Newton's method on net proceeds
  var apr=rate/100;
  for(var i=0;i<50;i++){
    var mr2=apr/12;
    var f=net-pmt*(1-Math.pow(1+mr2,-term))/mr2;
    var fp=-pmt*(Math.pow(1+mr2,-term-1)*(-term)*mr2/12+(1-Math.pow(1+mr2,-term))/(mr2*mr2*12));
    apr=apr-f/fp;
  }
  sv('r-payment',fmt(pmt));sv('r-fee_amt',fmt(feeAmt));
  sv('r-interest',fmt(interest));sv('r-total',fmt(total));
  sv('r-apr',fmtPct(apr*100));
  showR();
}
""")


# ── 7. Down Payment Calculator ──────────────────────────────────────────────
build('down-payment-calculator.html',
  'Down Payment Calculator',
  'Calculate how much you need for a down payment and how long it will take to save.',
  'Set your home price and savings rate to find out when you can afford to buy.',
  [
    fg('price','Home Price ($)','400000'),
    fg('pct','Target Down Payment (%)','20'),
    fg('savings','Current Savings ($)','30000'),
    fg('monthly','Monthly Savings ($)','1500'),
  ],
  [
    rbox('r-needed','Down Payment Needed', True),
    rbox('r-have','You Currently Have'),
    rbox('r-gap','Still Need'),
    rbox('r-months','Months to Goal'),
  ],
  js="""
function calc(){
  var price=parseFloat(document.getElementById('price').value)||0;
  var pct=parseFloat(document.getElementById('pct').value)||20;
  var savings=parseFloat(document.getElementById('savings').value)||0;
  var monthly=parseFloat(document.getElementById('monthly').value)||0;
  if(price<=0)return;
  var needed=price*pct/100;
  var gap=Math.max(0,needed-savings);
  var months=monthly>0?Math.ceil(gap/monthly):Infinity;
  sv('r-needed',fmt(needed));sv('r-have',fmt(savings));
  sv('r-gap',fmt(gap));
  sv('r-months',gap===0?'Ready Now!':(monthly>0?fmtN(months,0)+' mo':'—'));
  showR();
}
""")


# ── 8. Rent vs Buy Calculator ───────────────────────────────────────────────
build('rent-vs-buy-calculator.html',
  'Rent vs Buy Calculator',
  'Compare the true financial cost of renting versus buying a home over any time horizon.',
  'Factor in appreciation, rent increases, mortgage costs, and opportunity cost.',
  [
    fg('price','Home Price ($)','400000'),
    fg('down','Down Payment (%)','20'),
    fg('mrate','Mortgage Rate (%)','7.0'),
    fg('rent','Monthly Rent ($)','2200'),
    fg('appr','Annual Home Appreciation (%)','3.0'),
    fg('rincr','Annual Rent Increase (%)','3.0'),
    fg('years','Years to Compare','10'),
  ],
  [
    rbox('r-buy','Total Cost: Buy', True),
    rbox('r-rent','Total Cost: Rent'),
    rbox('r-diff','Difference'),
    rbox('r-winner','Better Choice'),
  ],
  js="""
function calc(){
  var price=parseFloat(document.getElementById('price').value)||0;
  var downPct=parseFloat(document.getElementById('down').value)||20;
  var mrate=parseFloat(document.getElementById('mrate').value)||0;
  var rent=parseFloat(document.getElementById('rent').value)||0;
  var appr=parseFloat(document.getElementById('appr').value)||3;
  var rincr=parseFloat(document.getElementById('rincr').value)||3;
  var years=parseInt(document.getElementById('years').value)||10;
  if(price<=0||mrate<=0||rent<=0)return;
  var down=price*downPct/100;
  var loan=price-down;
  var mr=mrate/100/12;
  var n=30*12;
  var pmt=loan*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1);
  // Buy costs: mortgage payments + property tax (1.2%) + maintenance (1%) - equity gained
  var propTax=price*0.012/12;
  var maint=price*0.01/12;
  var totalBuyPay=(pmt+propTax+maint)*years*12;
  var futureVal=price*Math.pow(1+appr/100,years);
  // Remaining balance after years
  var balance=loan;
  for(var i=0;i<years*12;i++){balance=balance*(1+mr)-pmt;}
  balance=Math.max(0,balance);
  var equity=futureVal-balance;
  var netBuy=totalBuyPay+down-equity;
  // Rent costs
  var totalRent=0;
  var r=rent;
  for(var y=0;y<years;y++){totalRent+=r*12;r*=(1+rincr/100);}
  var diff=Math.abs(netBuy-totalRent);
  var winner=netBuy<totalRent?'Buying':'Renting';
  sv('r-buy',fmt(netBuy));sv('r-rent',fmt(totalRent));
  sv('r-diff',fmt(diff));sv('r-winner',winner+' Wins');
  showR();
}
""")


# ── 9. Amortization Calculator ──────────────────────────────────────────────
build('amortization-calculator.html',
  'Amortization Calculator',
  'Generate a full amortization schedule showing principal, interest, and balance for every payment.',
  'Visualize exactly how your loan balance decreases over time with our amortization tool.',
  [
    fg('amount','Loan Amount ($)','300000'),
    fg('rate','Annual Interest Rate (%)','7.0'),
    fg('term','Loan Term (years)','30'),
  ],
  [
    rbox('r-payment','Monthly Payment', True),
    rbox('r-interest','Total Interest'),
    rbox('r-total','Total Paid'),
    rbox('r-payoff','Payoff Date'),
  ],
  extra_results='<div class="table-wrap"><table id="amort-table"><thead><tr><th>#</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody id="amort-body"></tbody></table></div>',
  js="""
function calc(){
  var amt=parseFloat(document.getElementById('amount').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var term=parseInt(document.getElementById('term').value)||30;
  if(amt<=0||rate<=0||term<=0)return;
  var mr=rate/100/12;
  var n=term*12;
  var pmt=amt*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1);
  sv('r-payment',fmt(pmt));
  sv('r-interest',fmt(pmt*n-amt));
  sv('r-total',fmt(pmt*n));
  var d=new Date();d.setMonth(d.getMonth()+n);
  sv('r-payoff',d.toLocaleDateString('en-US',{month:'short',year:'numeric'}));
  var bal=amt;var tbody=document.getElementById('amort-body');tbody.innerHTML='';
  var showMax=60;// show first 5 years
  for(var i=1;i<=Math.min(n,showMax);i++){
    var interest=bal*mr;var principal=pmt-interest;bal-=principal;
    var tr=document.createElement('tr');
    tr.innerHTML='<td>'+i+'</td><td>'+fmt(pmt)+'</td><td>'+fmt(principal)+'</td><td>'+fmt(interest)+'</td><td>'+fmt(Math.max(0,bal))+'</td>';
    tbody.appendChild(tr);
  }
  if(n>showMax){var tr2=document.createElement('tr');tr2.innerHTML='<td colspan="5" style="text-align:center;color:var(--text3)">Showing first '+showMax+' of '+n+' payments</td>';tbody.appendChild(tr2);}
  showR();
}
""")


# ── 10. Balloon Payment Calculator ─────────────────────────────────────────
build('balloon-payment-calculator.html',
  'Balloon Payment Calculator',
  'Calculate balloon loan payments and the lump-sum amount due at the end of your loan term.',
  'See your regular payments and the balloon balance due when the loan matures.',
  [
    fg('amount','Loan Amount ($)','200000'),
    fg('rate','Annual Interest Rate (%)','6.5'),
    fg('amort','Amortization Period (years)','30'),
    fg('balloon','Balloon Term (years)','7'),
  ],
  [
    rbox('r-payment','Monthly Payment', True),
    rbox('r-balloon','Balloon Payment Due'),
    rbox('r-interest','Interest Paid (pre-balloon)'),
    rbox('r-principal','Principal Paid'),
  ],
  js="""
function calc(){
  var amt=parseFloat(document.getElementById('amount').value)||0;
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var amort=parseInt(document.getElementById('amort').value)||30;
  var balloon=parseInt(document.getElementById('balloon').value)||7;
  if(amt<=0||rate<=0)return;
  var mr=rate/100/12;
  var n=amort*12;
  var pmt=amt*mr*Math.pow(1+mr,n)/(Math.pow(1+mr,n)-1);
  var bal=amt;var totalInt=0;
  var balloonN=balloon*12;
  for(var i=0;i<balloonN;i++){
    var interest=bal*mr;totalInt+=interest;
    bal=bal*(1+mr)-pmt;
  }
  var principalPaid=amt-Math.max(0,bal);
  sv('r-payment',fmt(pmt));sv('r-balloon',fmt(Math.max(0,bal)));
  sv('r-interest',fmt(totalInt));sv('r-principal',fmt(principalPaid));
  showR();
}
""")


# ── 11. 401(k) Calculator ───────────────────────────────────────────────────
build('401k-calculator.html',
  '401(k) Calculator',
  'Project your 401(k) balance at retirement based on your contributions, employer match, and returns.',
  'See the power of tax-deferred growth and employer matching on your retirement savings.',
  [
    fg('cur_age','Current Age','30'),
    fg('ret_age','Retirement Age','65'),
    fg('balance','Current 401(k) Balance ($)','25000'),
    fg('contrib','Monthly Contribution ($)','500'),
    fg('match','Employer Match (%)','50'),
    fg('match_limit','Match Limit (% of salary)','6'),
    fg('return_rate','Expected Annual Return (%)','7'),
  ],
  [
    rbox('r-total','Balance at Retirement', True),
    rbox('r-contributions','Your Contributions'),
    rbox('r-employer','Employer Match Total'),
    rbox('r-growth','Investment Growth'),
  ],
  js="""
function calc(){
  var age=parseInt(document.getElementById('cur_age').value)||30;
  var ret=parseInt(document.getElementById('ret_age').value)||65;
  var bal=parseFloat(document.getElementById('balance').value)||0;
  var contrib=parseFloat(document.getElementById('contrib').value)||0;
  var match=parseFloat(document.getElementById('match').value)||0;
  var ret_rate=parseFloat(document.getElementById('return_rate').value)||7;
  if(ret<=age)return;
  var years=ret-age;
  var mr=ret_rate/100/12;
  var matchAmt=contrib*(match/100);
  var totalMonthly=contrib+matchAmt;
  // Future value of existing balance
  var fvBal=bal*Math.pow(1+mr,years*12);
  // Future value of monthly contributions
  var fvContrib=totalMonthly*(Math.pow(1+mr,years*12)-1)/mr;
  var total=fvBal+fvContrib;
  var yourTotal=contrib*years*12;
  var empTotal=matchAmt*years*12;
  var growth=total-yourTotal-empTotal-bal;
  sv('r-total',fmt(total));sv('r-contributions',fmt(yourTotal));
  sv('r-employer',fmt(empTotal));sv('r-growth',fmt(growth));
  showR();
}
""")


# ── 12. Roth IRA Calculator ─────────────────────────────────────────────────
build('roth-ira-calculator.html',
  'Roth IRA Calculator',
  'Project your tax-free Roth IRA growth and see how much you can accumulate by retirement.',
  'Discover the long-term tax advantage of Roth IRA contributions versus a taxable account.',
  [
    fg('cur_age','Current Age','30'),
    fg('ret_age','Retirement Age','65'),
    fg('balance','Current Roth IRA Balance ($)','10000'),
    fg('annual','Annual Contribution ($)','6500'),
    fg('ret_rate','Expected Annual Return (%)','7'),
    fg('tax_rate','Marginal Tax Rate (%)','22'),
  ],
  [
    rbox('r-total','Roth Balance at Retirement', True),
    rbox('r-contributions','Total Contributions'),
    rbox('r-growth','Tax-Free Growth'),
    rbox('r-taxable','Taxable Account Equivalent'),
  ],
  js="""
function calc(){
  var age=parseInt(document.getElementById('cur_age').value)||30;
  var ret=parseInt(document.getElementById('ret_age').value)||65;
  var bal=parseFloat(document.getElementById('balance').value)||0;
  var annual=parseFloat(document.getElementById('annual').value)||0;
  var rate=parseFloat(document.getElementById('ret_rate').value)||7;
  var tax=parseFloat(document.getElementById('tax_rate').value)||22;
  if(ret<=age)return;
  var years=ret-age;
  var r=rate/100;
  var fvBal=bal*Math.pow(1+r,years);
  var fvContrib=annual*(Math.pow(1+r,years)-1)/r;
  var total=fvBal+fvContrib;
  var totalContrib=annual*years;
  var growth=total-totalContrib-bal;
  // Taxable equivalent: same but gains taxed at 15% cap gains
  var taxableTotal=total*(1-(0.15*(1-totalContrib/total)));
  sv('r-total',fmt(total));sv('r-contributions',fmt(totalContrib));
  sv('r-growth',fmt(growth));sv('r-taxable',fmt(taxableTotal));
  showR();
}
""")


# ── 13. Dividend Calculator ─────────────────────────────────────────────────
build('dividend-calculator.html',
  'Dividend Calculator',
  'Calculate your dividend income and project portfolio growth with dividend reinvestment (DRIP).',
  'See your annual dividend income and how reinvesting dividends grows your portfolio over time.',
  [
    fg('price','Stock Price ($)','50'),
    fg('shares','Number of Shares','100'),
    fg('dividend','Annual Dividend per Share ($)','2.00'),
    fg('years','Investment Period (years)','10'),
    fg('growth','Annual Dividend Growth (%)','5'),
    fg('drip','Reinvest Dividends (DRIP)',opts=[('yes','Yes — Reinvest'),('no','No — Take Cash')]),
  ],
  [
    rbox('r-annual','Annual Dividend Income', True),
    rbox('r-monthly','Monthly Income'),
    rbox('r-yield','Dividend Yield'),
    rbox('r-projected','Projected Value'),
  ],
  js="""
function calc(){
  var price=parseFloat(document.getElementById('price').value)||0;
  var shares=parseFloat(document.getElementById('shares').value)||0;
  var div=parseFloat(document.getElementById('dividend').value)||0;
  var years=parseInt(document.getElementById('years').value)||10;
  var growth=parseFloat(document.getElementById('growth').value)||0;
  var drip=document.getElementById('drip').value==='yes';
  if(price<=0||shares<=0||div<=0)return;
  var annual=shares*div;
  var monthly=annual/12;
  var yld=(div/price)*100;
  // DRIP projection
  var s=shares;var d=div;var totalDiv=0;
  for(var y=0;y<years;y++){
    var yearDiv=s*d;totalDiv+=yearDiv;
    if(drip)s+=yearDiv/price;
    d*=(1+growth/100);price*=(1+growth/100*0.5);// rough price appreciation
  }
  var projectedValue=s*price;
  sv('r-annual',fmt(annual));sv('r-monthly',fmt(monthly));
  sv('r-yield',fmtPct(yld));sv('r-projected',fmt(projectedValue));
  showR();
}
""")


# ── 14. Stock Return Calculator ─────────────────────────────────────────────
build('stock-return-calculator.html',
  'Stock Return Calculator',
  'Calculate your total stock return including capital gains, dividends, and annualized performance.',
  'Measure exactly how well an investment performed with accurate return calculations.',
  [
    fg('buy_price','Purchase Price per Share ($)','50'),
    fg('sell_price','Current / Sale Price per Share ($)','75'),
    fg('shares','Number of Shares','100'),
    fg('dividends','Total Dividends Received ($)','200'),
    fg('years','Holding Period (years)','3'),
  ],
  [
    rbox('r-total_return','Total Return ($)', True),
    rbox('r-pct','Total Return (%)'),
    rbox('r-annualized','Annualized Return'),
    rbox('r-cap_gain','Capital Gain'),
  ],
  js="""
function calc(){
  var buy=parseFloat(document.getElementById('buy_price').value)||0;
  var sell=parseFloat(document.getElementById('sell_price').value)||0;
  var shares=parseFloat(document.getElementById('shares').value)||0;
  var divs=parseFloat(document.getElementById('dividends').value)||0;
  var years=parseFloat(document.getElementById('years').value)||1;
  if(buy<=0||shares<=0)return;
  var invested=buy*shares;
  var proceeds=sell*shares;
  var capGain=proceeds-invested;
  var totalReturn=capGain+divs;
  var pct=(totalReturn/invested)*100;
  var annualized=(Math.pow(1+totalReturn/invested,1/years)-1)*100;
  sv('r-total_return',fmt(totalReturn));sv('r-pct',fmtPct(pct));
  sv('r-annualized',fmtPct(annualized));sv('r-cap_gain',fmt(capGain));
  showR();
}
""")


# ── 15. Emergency Fund Calculator ──────────────────────────────────────────
build('emergency-fund-calculator.html',
  'Emergency Fund Calculator',
  'Calculate exactly how large your emergency fund should be based on your monthly expenses.',
  'Find out if your savings are sufficient to cover unexpected job loss or emergencies.',
  [
    fg('housing','Monthly Housing (rent/mortgage $)','1500'),
    fg('food','Monthly Food & Groceries ($)','400'),
    fg('utilities','Monthly Utilities ($)','150'),
    fg('transport','Monthly Transportation ($)','300'),
    fg('other','Monthly Other Expenses ($)','250'),
    fg('months','Months of Coverage Desired','6'),
    fg('current','Current Emergency Savings ($)','5000'),
  ],
  [
    rbox('r-monthly','Total Monthly Expenses', True),
    rbox('r-recommended','Recommended Fund'),
    rbox('r-current','You Currently Have'),
    rbox('r-gap','Gap to Fill'),
  ],
  js="""
function calc(){
  var housing=parseFloat(document.getElementById('housing').value)||0;
  var food=parseFloat(document.getElementById('food').value)||0;
  var util=parseFloat(document.getElementById('utilities').value)||0;
  var trans=parseFloat(document.getElementById('transport').value)||0;
  var other=parseFloat(document.getElementById('other').value)||0;
  var months=parseFloat(document.getElementById('months').value)||6;
  var current=parseFloat(document.getElementById('current').value)||0;
  var monthly=housing+food+util+trans+other;
  var recommended=monthly*months;
  var gap=Math.max(0,recommended-current);
  sv('r-monthly',fmt(monthly));sv('r-recommended',fmt(recommended));
  sv('r-current',fmt(current));sv('r-gap',gap===0?'Fully Funded!':fmt(gap));
  showR();
}
""")


# ── 16. Net Worth Calculator ────────────────────────────────────────────────
build('net-worth-calculator.html',
  'Net Worth Calculator',
  'Calculate your total net worth by summing your assets and subtracting all liabilities.',
  'Get a clear snapshot of your financial health with this comprehensive net worth calculator.',
  [
    fg('cash','Cash & Bank Accounts ($)','10000'),
    fg('investments','Investments & Retirement ($)','50000'),
    fg('realestate','Real Estate Value ($)','300000'),
    fg('vehicles','Vehicle Value ($)','20000'),
    fg('other_assets','Other Assets ($)','5000'),
    fg('mortgage_bal','Mortgage Balance ($)','220000'),
    fg('car_loans','Car Loans ($)','10000'),
    fg('student_loans','Student Loans ($)','25000'),
    fg('credit_cards','Credit Card Debt ($)','3000'),
    fg('other_liab','Other Liabilities ($)','2000'),
  ],
  [
    rbox('r-networth','Net Worth', True),
    rbox('r-assets','Total Assets'),
    rbox('r-liabilities','Total Liabilities'),
    rbox('r-ratio','Debt-to-Asset Ratio'),
  ],
  js="""
function calc(){
  var cash=parseFloat(document.getElementById('cash').value)||0;
  var inv=parseFloat(document.getElementById('investments').value)||0;
  var re=parseFloat(document.getElementById('realestate').value)||0;
  var veh=parseFloat(document.getElementById('vehicles').value)||0;
  var oa=parseFloat(document.getElementById('other_assets').value)||0;
  var mort=parseFloat(document.getElementById('mortgage_bal').value)||0;
  var car=parseFloat(document.getElementById('car_loans').value)||0;
  var stud=parseFloat(document.getElementById('student_loans').value)||0;
  var cc=parseFloat(document.getElementById('credit_cards').value)||0;
  var ol=parseFloat(document.getElementById('other_liab').value)||0;
  var assets=cash+inv+re+veh+oa;
  var liabilities=mort+car+stud+cc+ol;
  var networth=assets-liabilities;
  var ratio=assets>0?liabilities/assets*100:0;
  sv('r-networth',fmt(networth));sv('r-assets',fmt(assets));
  sv('r-liabilities',fmt(liabilities));sv('r-ratio',fmtPct(ratio));
  showR();
}
""")


# ── 17. Inflation Calculator ────────────────────────────────────────────────
build('inflation-calculator.html',
  'Inflation Calculator',
  'See how inflation affects purchasing power and what today\'s money will be worth in the future.',
  'Understand the real impact of inflation on your savings, income, and spending over time.',
  [
    fg('amount','Amount ($)','1000'),
    fg('years','Number of Years','10'),
    fg('inf_rate','Average Annual Inflation Rate (%)','3.0'),
  ],
  [
    rbox('r-future','Future Value Needed', True),
    rbox('r-real','Real Value Today'),
    rbox('r-loss_dollar','Purchasing Power Loss ($)'),
    rbox('r-loss_pct','Purchasing Power Loss (%)'),
  ],
  js="""
function calc(){
  var amt=parseFloat(document.getElementById('amount').value)||0;
  var years=parseFloat(document.getElementById('years').value)||0;
  var rate=parseFloat(document.getElementById('inf_rate').value)||3;
  if(amt<=0||years<=0)return;
  var future=amt*Math.pow(1+rate/100,years);
  var realVal=amt/Math.pow(1+rate/100,years);
  var lossAmt=amt-realVal;
  var lossPct=(lossAmt/amt)*100;
  sv('r-future',fmt(future));sv('r-real',fmt(realVal));
  sv('r-loss_dollar',fmt(lossAmt));sv('r-loss_pct',fmtPct(lossPct));
  showR();
}
""")


# ── 18. Break-Even Calculator ───────────────────────────────────────────────
build('break-even-calculator.html',
  'Break-Even Calculator',
  'Calculate the exact number of units you need to sell to cover your costs and start making profit.',
  'Essential for business planning — find your break-even point and contribution margin.',
  [
    fg('fixed','Total Fixed Costs ($)','50000'),
    fg('variable','Variable Cost per Unit ($)','15'),
    fg('price','Selling Price per Unit ($)','35'),
  ],
  [
    rbox('r-units','Break-Even Units', True),
    rbox('r-revenue','Break-Even Revenue'),
    rbox('r-margin','Contribution Margin'),
    rbox('r-margin_pct','Contribution Margin %'),
  ],
  js="""
function calc(){
  var fixed=parseFloat(document.getElementById('fixed').value)||0;
  var variable=parseFloat(document.getElementById('variable').value)||0;
  var price=parseFloat(document.getElementById('price').value)||0;
  if(price<=variable||price<=0)return;
  var margin=price-variable;
  var units=Math.ceil(fixed/margin);
  var revenue=units*price;
  var marginPct=(margin/price)*100;
  sv('r-units',fmtN(units,0)+' units');sv('r-revenue',fmt(revenue));
  sv('r-margin','$'+margin.toFixed(2)+' / unit');sv('r-margin_pct',fmtPct(marginPct));
  showR();
}
""")


# ── 19. Cash Flow Calculator ────────────────────────────────────────────────
build('cash-flow-calculator.html',
  'Cash Flow Calculator',
  'Analyze your monthly income and expenses to understand your personal cash flow position.',
  'See where your money goes each month and identify opportunities to boost savings.',
  [
    fg('salary','Salary / Wages (after tax $)','5000'),
    fg('side','Side Income ($)','500'),
    fg('invest_inc','Investment Income ($)','100'),
    fg('other_inc','Other Income ($)','0'),
    fg('housing','Housing (rent/mortgage $)','1500'),
    fg('food','Food & Groceries ($)','400'),
    fg('transport','Transportation ($)','350'),
    fg('insurance','Insurance ($)','200'),
    fg('entertainment','Entertainment ($)','150'),
    fg('savings_exp','Savings / Investments ($)','500'),
    fg('other_exp','Other Expenses ($)','300'),
  ],
  [
    rbox('r-income','Total Monthly Income', True),
    rbox('r-expenses','Total Monthly Expenses'),
    rbox('r-cashflow','Net Cash Flow'),
    rbox('r-savings_rate','Savings Rate'),
  ],
  js="""
function calc(){
  var salary=parseFloat(document.getElementById('salary').value)||0;
  var side=parseFloat(document.getElementById('side').value)||0;
  var inv=parseFloat(document.getElementById('invest_inc').value)||0;
  var oi=parseFloat(document.getElementById('other_inc').value)||0;
  var housing=parseFloat(document.getElementById('housing').value)||0;
  var food=parseFloat(document.getElementById('food').value)||0;
  var trans=parseFloat(document.getElementById('transport').value)||0;
  var ins=parseFloat(document.getElementById('insurance').value)||0;
  var ent=parseFloat(document.getElementById('entertainment').value)||0;
  var sav=parseFloat(document.getElementById('savings_exp').value)||0;
  var oe=parseFloat(document.getElementById('other_exp').value)||0;
  var income=salary+side+inv+oi;
  var expenses=housing+food+trans+ins+ent+sav+oe;
  var cashflow=income-expenses;
  var savingsRate=income>0?((sav+cashflow)/income)*100:0;
  sv('r-income',fmt(income));sv('r-expenses',fmt(expenses));
  sv('r-cashflow',fmt(cashflow));sv('r-savings_rate',fmtPct(savingsRate));
  showR();
}
""")


# ── 20. Rule of 72 Calculator ───────────────────────────────────────────────
build('rule-of-72-calculator.html',
  'Rule of 72 Calculator',
  'Quickly estimate how long it takes your investment to double using the Rule of 72.',
  'Instantly calculate doubling time from an interest rate, or the required rate from a time goal.',
  [
    fg('rate','Annual Return Rate (%)','7'),
    fg('principal','Initial Investment ($) (optional)','10000'),
    fg('target_years','Target Years to Double (optional — for reverse calc)',''),
  ],
  [
    rbox('r-rule72','Rule of 72 Result', True),
    rbox('r-exact','Exact Doubling Time'),
    rbox('r-value','Value After Doubling'),
    rbox('r-req_rate','Required Rate (from years)'),
  ],
  js="""
function calc(){
  var rate=parseFloat(document.getElementById('rate').value)||0;
  var principal=parseFloat(document.getElementById('principal').value)||0;
  var targetYears=parseFloat(document.getElementById('target_years').value)||0;
  if(rate<=0&&targetYears<=0)return;
  var rule72years=rate>0?72/rate:0;
  var exactYears=rate>0?Math.log(2)/Math.log(1+rate/100):0;
  var val=principal>0?principal*2:0;
  var reqRate=targetYears>0?((Math.pow(2,1/targetYears)-1)*100):0;
  sv('r-rule72',rate>0?fmtN(rule72years,1)+' years':'—');
  sv('r-exact',rate>0?fmtN(exactYears,2)+' years':'—');
  sv('r-value',val>0?fmt(val):'—');
  sv('r-req_rate',targetYears>0?fmtPct(reqRate):'—');
  showR();
}
""")

print('\nAll 20 pages generated successfully!')
