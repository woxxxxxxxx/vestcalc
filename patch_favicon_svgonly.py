import glob

count = 0
for f in glob.glob('C:/Users/Administrator/vestcalc/**/*.html', recursive=True):
    txt = open(f, encoding='utf-8').read()
    new = txt
    new = new.replace('<link rel="icon" href="/favicon.ico" sizes="any">', '')
    new = new.replace('<link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">', '')
    if new != txt:
        open(f, 'w', encoding='utf-8').write(new)
        count += 1
print(f'updated: {count} files')
