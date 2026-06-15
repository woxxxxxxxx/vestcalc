import glob, re

OLD_CTA = '.nav-cta{background:#0d9488;color:#fff;padding:8px 18px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;transition:background .15s}'
NEW_CTA = '.nav-cta{margin-left:auto;background:#0d9488;color:#fff;padding:8px 18px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;transition:background .15s}'

all_files = glob.glob('C:/Users/Administrator/vestcalc/*.html')
fixed = 0
for f in all_files:
    txt = open(f, encoding='utf-8').read()
    if OLD_CTA in txt:
        open(f, 'w', encoding='utf-8').write(txt.replace(OLD_CTA, NEW_CTA))
        fixed += 1

print(f'nav-cta margin-left:auto restored: {fixed} files')
print('all done')
