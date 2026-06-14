#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix broken FAQ items in vestcalc HTML files.
Items have single chars; replaces all faq-items after 'Frequently Asked Questions' h2."""

import os, re

SITE_DIR = r"C:\Users\Administrator\vestcalc"
MARKER = "<!-- vc-seo-expanded -->"
SKIP = {"404.html", "about.html", "privacy.html", "index.html"}

def get_cat(slug):
    if re.search(r'401k|retirement|pension|annuity|social.security|rmd', slug):
        return 'retire'
    if re.search(r'investment|stock|dividend|portfolio|roi|index.fund|etf', slug):
        return 'invest'
    if re.search(r'loan|mortgage|amortization|refinance|heloc|car.loan|auto.loan', slug):
        return 'loan'
    if re.search(r'budget|savings|emergency.fund|net.worth|debt', slug):
        return 'budget'
    if re.search(r'tax|withholding|capital.gain|roth|ira', slug):
        return 'tax'
    if re.search(r'bmi|calorie|body.fat|fitness|weight|health', slug):
        return 'health'
    if re.search(r'age|life.expect|personal', slug):
        return 'personal'
    return 'finance'

def get_tool_name(content, slug):
    m = re.search(r'<h1[^>]*>([^<]+)</h1>', content)
    if m:
        return m.group(1).strip()
    m = re.search(r'<title>([^<|]+)', content)
    if m:
        t = m.group(1).strip()
        for sep in [' - ', ' | ']:
            if sep in t:
                return t.split(sep)[0].strip()
        return t
    return slug.replace('-', ' ').title()

def build_faq_items(name, cat):
    templates = {
        'retire': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account, no subscription, and no payment. Use it as many times as you need to model your retirement scenarios.".format(name)),
            ("How accurate are the projections in {}?".format(name),
             "{} uses standard financial formulas and compound interest calculations. Results are estimates based on the assumptions you enter and should be used for planning purposes alongside professional financial advice.".format(name)),
            ("Can I adjust the assumptions in {}?".format(name),
             "Yes. {} lets you change key inputs including contribution amounts, expected return rates, retirement age, and time horizon to model different scenarios for your retirement plan.".format(name)),
            ("Does {} account for inflation?".format(name),
             "{} allows you to enter an inflation rate assumption so your projections reflect the real purchasing power of your future savings, not just the nominal balance.".format(name)),
            ("Is my financial data stored when I use {}?".format(name),
             "No. {} performs all calculations locally in your browser. No financial information you enter is sent to or stored on any server.".format(name)),
        ],
        'invest': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account and has no usage limits. Model as many investment scenarios as you need at no cost.".format(name)),
            ("How accurate are results from {}?".format(name),
             "{} uses verified financial formulas. All results are projections based on the assumptions you enter and should complement, not replace, professional financial advice.".format(name)),
            ("Can I model different return rates in {}?".format(name),
             "Yes. {} lets you adjust expected annual return rates, contribution amounts, and time horizons so you can compare outcomes under different market scenarios.".format(name)),
            ("Does {} factor in taxes on investment gains?".format(name),
             "{} focuses on pre-tax growth calculations. For tax-adjusted projections, consider entering after-tax return estimates or consult a tax professional for your specific situation.".format(name)),
            ("Is my data safe when I use {}?".format(name),
             "Yes. All calculations in {} run locally in your browser. No data you enter is ever transmitted to or stored on any server.".format(name)),
        ],
        'loan': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account, no registration, and no payment. Calculate loan scenarios as many times as you need.".format(name)),
            ("How accurate is {}?".format(name),
             "{} uses standard amortization formulas used by lenders and financial institutions. Results should closely match your actual loan terms for the same inputs.".format(name)),
            ("Can I compare different loan scenarios with {}?".format(name),
             "Yes. Run {} multiple times with different interest rates, terms, or down payment amounts to compare the total cost of different loan options before you commit.".format(name)),
            ("Does {} show a full amortization schedule?".format(name),
             "{} provides a detailed breakdown of each payment, showing how much goes to principal versus interest over the life of the loan.".format(name)),
            ("Is my financial data stored when I use {}?".format(name),
             "No. {} runs entirely in your browser. No loan details or personal information you enter is transmitted to or stored on any server.".format(name)),
        ],
        'budget': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account, no subscription, and no payment. Use it as often as you need for your financial planning.".format(name)),
            ("How should I use the results from {}?".format(name),
             "{} gives you a clear starting point for your financial plan. Use the results as a guide and adjust based on your actual income, expenses, and goals.".format(name)),
            ("Can I save my budget from {}?".format(name),
             "You can copy or screenshot your results from {} to save them. The tool does not store data between sessions, so keep a record of inputs you want to reference later.".format(name)),
            ("Does {} account for irregular income or expenses?".format(name),
             "{} works best with regular income and expenses. For irregular items, use a monthly average to get a representative picture of your financial situation.".format(name)),
            ("Is my financial data stored when I use {}?".format(name),
             "No. All calculations in {} happen locally in your browser. No financial information you enter is sent to or stored on any server.".format(name)),
        ],
        'tax': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account and has no usage limits. Calculate your tax estimates as many times as you need.".format(name)),
            ("How accurate are {} estimates?".format(name),
             "{} uses current tax tables and standard calculation methods. Results are estimates for planning purposes; your actual tax liability may differ based on deductions, credits, and other factors.".format(name)),
            ("Should I rely solely on {} for my tax planning?".format(name),
             "{} is a useful planning tool, but tax situations can be complex. For a complete and accurate picture, consult a qualified tax professional or use certified tax preparation software for your final filing.".format(name)),
            ("Does {} reflect current tax rates?".format(name),
             "{} is updated to reflect current federal tax brackets and rates. State tax calculations may vary; check your state's tax authority for the most current rates.".format(name)),
            ("Is my tax information stored when I use {}?".format(name),
             "No. {} performs all calculations locally in your browser. No income or tax information you enter is transmitted to or stored on any server.".format(name)),
        ],
        'health': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account, no subscription, and no payment. Use it as often as you like to track your health metrics.".format(name)),
            ("How accurate is {}?".format(name),
             "{} uses standard medical and scientific formulas widely used by healthcare professionals. Results are general estimates; individual results can vary based on factors not captured by the formula.".format(name)),
            ("Should I use {} results to make medical decisions?".format(name),
             "{} provides useful general health metrics, but results should not replace professional medical advice. Consult your doctor or healthcare provider for personalized guidance.".format(name)),
            ("Can I use {} for multiple people?".format(name),
             "Yes. {} works for any individual; simply enter the relevant measurements for each person. No data is saved between uses, so each calculation is independent.".format(name)),
            ("Is my health data stored when I use {}?".format(name),
             "No. All calculations in {} happen locally in your browser. No personal health information you enter is sent to or stored on any server.".format(name)),
        ],
        'personal': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account and has no usage limits.".format(name)),
            ("How accurate is {}?".format(name),
             "{} uses standard calculation methods. Results are estimates based on the inputs you provide and general statistical data.".format(name)),
            ("Can I use {} on my mobile device?".format(name),
             "Yes. {} is fully responsive and works on smartphones and tablets as well as desktop browsers without installation.".format(name)),
            ("Do I need to create an account to use {}?".format(name),
             "No. {} is available immediately with no registration, no login, and no personal information required.".format(name)),
            ("Is my data stored when I use {}?".format(name),
             "No. {} runs entirely in your browser. No data you enter is sent to or stored on any server.".format(name)),
        ],
        'finance': [
            ("Is {} free to use?".format(name),
             "Yes, completely free. {} requires no account, no subscription, and no payment. Use it as many times as you need.".format(name)),
            ("How accurate are results from {}?".format(name),
             "{} uses standard financial formulas for accurate calculations. Results are based on the values you enter and should be used for planning and estimation purposes.".format(name)),
            ("Can I adjust the inputs in {} to model different scenarios?".format(name),
             "Yes. {} is designed for scenario modeling. Change the key inputs to compare outcomes under different assumptions before making financial decisions.".format(name)),
            ("Do I need to create an account to use {}?".format(name),
             "No. {} is available immediately with no registration or login required. Simply open the tool and start calculating.".format(name)),
            ("Is my financial data stored when I use {}?".format(name),
             "No. All calculations in {} run locally in your browser. No financial information you enter is transmitted to or stored on any server.".format(name)),
        ],
    }
    pairs = templates.get(cat, templates['finance'])
    items = []
    for q, a in pairs:
        items.append(
            '    <div class="faq-item">'
            '<div class="faq-q">{}</div>'
            '<div class="faq-a">{}</div>'
            '</div>'.format(q, a)
        )
    return '\n'.join(items)

def find_all_faq_items_block(content, faq_h2_pos):
    """Return (start, end) of the contiguous block of faq-item divs after faq_h2_pos."""
    first = content.find('<div class="faq-item">', faq_h2_pos)
    if first == -1:
        return -1, -1

    pos = first
    last_end = first
    while True:
        item_start = content.find('<div class="faq-item">', pos)
        if item_start == -1:
            break
        # Depth-track to find end of this faq-item
        ipos = item_start + len('<div class="faq-item">')
        depth = 1
        item_end = -1
        while ipos < len(content) and depth > 0:
            open_div = content.find('<div', ipos)
            close_div = content.find('</div>', ipos)
            if close_div == -1:
                break
            if open_div != -1 and open_div < close_div:
                depth += 1
                ipos = open_div + 1
            else:
                depth -= 1
                if depth == 0:
                    item_end = close_div + len('</div>')
                ipos = close_div + 1

        if item_end == -1:
            break
        last_end = item_end
        # Check if next non-whitespace is another faq-item
        tail = content[item_end:]
        stripped = tail.lstrip()
        if stripped.startswith('<div class="faq-item">'):
            pos = item_end + (len(tail) - len(stripped))
        else:
            break

    return first, last_end

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    if MARKER not in content:
        return False, "no_marker"

    faq_h2_pos = content.find('Frequently Asked Questions')
    if faq_h2_pos == -1:
        return False, "no_faq_h2"

    start, end = find_all_faq_items_block(content, faq_h2_pos)
    if start == -1:
        return False, "no_faq_items"

    slug = os.path.basename(filepath).replace('.html', '')
    cat = get_cat(slug)
    name = get_tool_name(content, slug)
    new_items = build_faq_items(name, cat)

    new_content = content[:start] + new_items + '\n' + content[end:]

    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(new_content)

    return True, cat

def main():
    files = sorted([f for f in os.listdir(SITE_DIR)
                    if f.endswith('.html') and f not in SKIP])
    fixed = skipped = errors = 0
    for fname in files:
        fpath = os.path.join(SITE_DIR, fname)
        ok, msg = fix_file(fpath)
        if ok:
            fixed += 1
            print("  OK  {} ({})".format(fname.replace('.html',''), msg))
        elif msg == "no_marker":
            skipped += 1
        else:
            errors += 1
            print("  !!  {} ({})".format(fname.replace('.html',''), msg))
    print("\nDone: fixed={}, skipped_no_marker={}, errors={}".format(fixed, skipped, errors))

if __name__ == '__main__':
    main()
