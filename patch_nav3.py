import glob, re

# ① 分类页：height 64px、justify-content:space-between、去 margin-left:auto、加 sticky
cat_files = glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html')
for f in cat_files:
    txt = open(f, encoding='utf-8').read()

    # header-inner height 56→64
    txt = txt.replace('height:56px', 'height:64px')

    # header-inner 加 justify-content:space-between
    txt = re.sub(
        r'(\.header-inner\{[^}]*?)(display:flex)',
        r'\1display:flex;justify-content:space-between',
        txt
    )

    # 去掉 nav-cta 上的 margin-left:auto（已靠 space-between 定位）
    txt = txt.replace('margin-left:auto!important', 'margin-left:0')
    txt = txt.replace('margin-left: auto !important', 'margin-left:0')

    # 分类页 header 加 sticky（若无）
    if 'position:sticky' not in txt and 'position: sticky' not in txt:
        txt = re.sub(
            r'(header\s*\{)',
            r'\1position:sticky;top:0;z-index:100;',
            txt, count=1
        )

    open(f, 'w', encoding='utf-8').write(txt)
    print(f'cat fixed: {f.split(chr(92))[-1]}')

# ② 工具页（根目录，排除分类页和 index.html）
cat_names = set(f.split('\\')[-1] for f in cat_files)
tool_files = [
    f for f in glob.glob('C:/Users/Administrator/vestcalc/*.html')
    if f.split('\\')[-1] not in cat_names and f.split('\\')[-1] != 'index.html'
]
fixed = 0
for f in tool_files:
    txt = open(f, encoding='utf-8').read()
    orig = txt
    # header-inner 加 justify-content:space-between
    txt = re.sub(
        r'(\.header-inner\{[^}]*?)(display:flex)',
        r'\1display:flex;justify-content:space-between',
        txt
    )
    # nav-cta 的 margin-left:auto 改为 margin-left:0
    # （logo ↔ nav 已 space-between，nav 内 CTA 靠 flex 末尾自然右对齐）
    txt = txt.replace('margin-left:auto;', 'margin-left:0;')
    txt = txt.replace('margin-left: auto;', 'margin-left:0;')
    if txt != orig:
        open(f, 'w', encoding='utf-8').write(txt)
        fixed += 1

print(f'tool pages fixed: {fixed}')
print('all done')
