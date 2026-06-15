import glob, re

cat_names = set(f.split('\\')[-1] for f in glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html'))
cat_names.add('index.html')

fixed = 0
for f in glob.glob('C:/Users/Administrator/vestcalc/*.html'):
    if f.split('\\')[-1] in cat_names:
        continue
    txt = open(f, encoding='utf-8').read()
    orig = txt

    # 恢复 breadcrumb-nav 开头的 Home 链接（若缺失）
    # 原结构：<nav class="breadcrumb-nav"...><a href="/">Home</a><span>›</span>...
    # 现状：  <nav class="breadcrumb-nav"...><span>›</span>...
    txt = re.sub(
        r'(<nav[^>]+breadcrumb[^>]*>)(<span>›</span>)',
        r'\1<a href="/">Home</a>\2',
        txt
    )

    if txt != orig:
        open(f, 'w', encoding='utf-8').write(txt)
        fixed += 1

print(f'breadcrumb Home restored: {fixed} files')
print('done')
