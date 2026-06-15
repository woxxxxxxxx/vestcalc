import re

files = [
    'C:/Users/Administrator/vestcalc/about.html',
    'C:/Users/Administrator/vestcalc/contact.html',
    'C:/Users/Administrator/vestcalc/privacy.html',
    'C:/Users/Administrator/vestcalc/terms.html',
]

for f in files:
    txt = open(f, encoding='utf-8').read()
    # <div class="breadcrumb"> › Page</div>  →  <div class="breadcrumb"><a href="/">Home</a> › Page</div>
    new = re.sub(
        r'(<div[^>]+class="breadcrumb"[^>]*>)\s*›',
        r'\1<a href="/">Home</a> ›',
        txt
    )
    if new != txt:
        open(f, 'w', encoding='utf-8').write(new)
        print(f'fixed: {f.split("/")[-1]}')
    else:
        print(f'no-op: {f.split("/")[-1]}')
