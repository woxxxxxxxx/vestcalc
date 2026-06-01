from PIL import Image, ImageDraw

def make_favicon(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    s = size

    # Green rounded-rectangle background
    bg = (13, 148, 136, 255)
    r = round(s * 0.18)  # corner radius
    d.rounded_rectangle([0, 0, s-1, s-1], radius=r, fill=bg)

    # White calculator body (inset rect)
    pad = round(s * 0.12)
    cw = s - pad * 2  # calc width
    ch = s - pad * 2  # calc height
    cx, cy = pad, pad  # top-left of calc

    # Screen area (top ~35% of calc interior)
    sp = round(s * 0.06)   # screen padding from calc edges
    sw = cw - sp * 2
    sh = round(ch * 0.32)
    sx, sy = cx + sp, cy + sp

    # Draw screen rectangle (white, rounded)
    d.rounded_rectangle([sx, sy, sx+sw, sy+sh], radius=round(s*0.04), fill=(255,255,255,255))

    # Draw upward trend polyline ON the screen using green (so it's visible on white)
    trend_color = (13, 148, 136, 255)
    lw = max(1, round(s * 0.045))
    pts = [
        (sx + round(sw*0.12), sy + round(sh*0.72)),
        (sx + round(sw*0.38), sy + round(sh*0.38)),
        (sx + round(sw*0.62), sy + round(sh*0.55)),
        (sx + round(sw*0.88), sy + round(sh*0.18)),
    ]
    d.line(pts, fill=trend_color, width=lw)

    # Draw 6 button dots (2 rows x 3 cols) below the screen
    btn_area_top = sy + sh + sp
    btn_area_h = cy + ch - btn_area_top - sp
    cols, rows = 3, 2
    btn_r = round(s * 0.055)
    col_positions = [sx + round(sw * (i+0.5) / cols) for i in range(cols)]
    row_positions = [btn_area_top + round(btn_area_h * (j+0.5) / rows) for j in range(rows)]

    for ry in row_positions:
        for rx in col_positions:
            d.ellipse([rx-btn_r, ry-btn_r, rx+btn_r, ry+btn_r], fill=(255,255,255,255))

    return img

# Generate 32x32 PNG
img32 = make_favicon(32)
img32.save(r'C:\Users\Administrator\vestcalc\favicon.png', 'PNG')
print('favicon.png saved')

# Generate favicon.ico with multiple sizes (16, 32, 48)
img16 = make_favicon(16)
img48 = make_favicon(48)
img32.save(
    r'C:\Users\Administrator\vestcalc\favicon.ico',
    format='ICO',
    sizes=[(16,16),(32,32),(48,48)],
    append_images=[img16, img48]
)
print('favicon.ico saved')
