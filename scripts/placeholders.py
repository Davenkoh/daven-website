"""Generate placeholder assets so the scene can be built before the real ones exist.
Run: python3 scripts/placeholders.py
Outputs: public/room.png, public/portraits/{r}-{c}.png, public/paper.png, public/og-image.png
Replace room.png and the portraits with the real files; the script never overwrites existing real files
unless --force is passed.
"""
import math
import os
import random
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "public")
FORCE = "--force" in sys.argv
W, H = 2048, 1280


def font(size):
    for name in ("/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Helvetica.ttc"):
        if os.path.exists(name):
            return ImageFont.truetype(name, size)
    return ImageFont.load_default()


def should_write(path):
    if os.path.exists(path) and not FORCE:
        print("skip (exists):", path)
        return False
    return True


def room():
    path = os.path.join(ROOT, "room.png")
    if not should_write(path):
        return
    img = Image.new("RGB", (W, H), (236, 222, 205))
    d = ImageDraw.Draw(img)
    # wall gradient (warm cream, brighter centre)
    for y in range(0, 860):
        t = y / 860
        c = (int(238 - 14 * t), int(226 - 18 * t), int(208 - 22 * t))
        d.line([(0, y), (W, y)], fill=c)
    # floor
    for y in range(860, H):
        t = (y - 860) / (H - 860)
        c = (int(170 - 30 * t), int(125 - 25 * t), int(85 - 20 * t))
        d.line([(0, y), (W, y)], fill=c)
    d.line([(0, 860), (W, 860)], fill=(120, 90, 60), width=6)
    # rug
    d.rounded_rectangle([560, 980, 1500, 1260], radius=30, fill=(150, 90, 80))
    d.rounded_rectangle([600, 1010, 1460, 1230], radius=24, outline=(200, 160, 140), width=6)

    # window (right)
    wx0, wy0, wx1, wy1 = 1290, 150, 1820, 660
    d.rectangle([wx0 - 22, wy0 - 22, wx1 + 22, wy1 + 22], fill=(120, 96, 72))
    # night city gradient inside
    for y in range(wy0, wy1):
        t = (y - wy0) / (wy1 - wy0)
        c = (int(40 + 40 * t), int(58 + 50 * t), int(96 + 60 * t))
        d.line([(wx0, y), (wx1, y)], fill=c)
    rnd = random.Random(7)
    for i in range(38):
        bw = rnd.randint(20, 60)
        bh = rnd.randint(80, 330)
        bx = wx0 + int(i * (wx1 - wx0) / 38) + rnd.randint(-8, 8)
        d.rectangle([bx, wy1 - bh, bx + bw, wy1], fill=(28 + rnd.randint(0, 20), 34 + rnd.randint(0, 20), 52 + rnd.randint(0, 20)))
        for _ in range(rnd.randint(4, 14)):
            lx = rnd.randint(bx + 3, max(bx + 4, bx + bw - 6))
            ly = rnd.randint(wy1 - bh + 6, wy1 - 8)
            d.rectangle([lx, ly, lx + 3, ly + 4], fill=(255, 220, 150))
    # mullions
    mx = (wx0 + wx1) // 2
    my = (wy0 + wy1) // 2
    d.rectangle([mx - 8, wy0, mx + 8, wy1], fill=(120, 96, 72))
    d.rectangle([wx0, my - 8, wx1, my + 8], fill=(120, 96, 72))

    # shelf grid (Preston style) left/centre
    sx0, sy0, sx1, sy1 = 300, 200, 1150, 560
    cols, rows = 5, 2
    cw = (sx1 - sx0) / cols
    rh = (sy1 - sy0) / rows
    for r in range(rows + 1):
        y = int(sy0 + r * rh)
        d.rectangle([sx0, y - 9, sx1, y + 9], fill=(196, 152, 104))
    for c in range(cols + 1):
        x = int(sx0 + c * cw)
        d.rectangle([x - 9, sy0, x + 9, sy1], fill=(206, 160, 110))
    # books & plants on shelves
    for r in range(rows):
        for c in range(cols):
            x = int(sx0 + c * cw) + 24
            yb = int(sy0 + (r + 1) * rh) - 12
            kind = (r * cols + c) % 3
            if kind == 0:
                for k in range(5):
                    col = [(200, 80, 70), (70, 120, 200), (230, 190, 80), (80, 160, 110), (150, 100, 180)][k]
                    d.rectangle([x + k * 18, yb - 90 - k * 6, x + k * 18 + 14, yb], fill=col)
            elif kind == 1:
                d.ellipse([x + 20, yb - 70, x + 90, yb - 20], fill=(90, 150, 90))
                d.rectangle([x + 40, yb - 24, x + 70, yb], fill=(220, 210, 200))
            else:
                d.rectangle([x + 10, yb - 60, x + 80, yb], fill=(240, 236, 228))
                d.rectangle([x + 20, yb - 50, x + 70, yb - 12], fill=(120, 140, 160))

    # pinboard (far left, above plant)
    d.rectangle([90, 240, 280, 470], fill=(196, 168, 128))
    d.rectangle([104, 254, 266, 456], fill=(214, 190, 150))
    for i, (px, py, col) in enumerate([(120, 270, (240, 240, 240)), (190, 300, (250, 230, 150)), (130, 370, (230, 200, 220))]):
        d.rectangle([px, py, px + 60, py + 70], fill=col)
        d.ellipse([px + 26, py - 4, px + 34, py + 4], fill=(200, 60, 60))

    # plant (left corner)
    d.rectangle([120, 760, 210, 860], fill=(180, 120, 90))
    for i in range(9):
        a = -90 + (i - 4) * 22
        L = 220
        ex = 165 + int(L * math.cos(math.radians(a)))
        ey = 770 + int(L * math.sin(math.radians(a)))
        d.line([(165, 770), (ex, ey)], fill=(70, 130, 80), width=22)

    # side cabinet with turntable (left) + photo frame
    d.rectangle([220, 760, 480, 960], fill=(150, 108, 76))
    d.rectangle([220, 760, 480, 782], fill=(176, 132, 96))
    d.rounded_rectangle([236, 728, 370, 776], radius=8, fill=(60, 60, 64))  # plinth
    d.ellipse([254, 700, 352, 772], fill=(28, 28, 30))  # platter
    d.ellipse([292, 728, 314, 750], fill=(217, 164, 65))  # label
    d.rectangle([400, 700, 460, 764], fill=(90, 70, 60))  # photo frame
    d.rectangle([408, 708, 452, 756], fill=(200, 210, 220))

    # desk
    d.rectangle([520, 800, 1500, 830], fill=(196, 152, 104))
    d.rectangle([540, 830, 570, 1050], fill=(150, 108, 76))
    d.rectangle([1450, 830, 1480, 1050], fill=(150, 108, 76))
    # monitor
    d.rectangle([700, 610, 1000, 790], fill=(40, 40, 44))
    d.rectangle([712, 622, 988, 778], fill=(230, 234, 240))
    d.rectangle([836, 790, 864, 800], fill=(60, 60, 64))
    # laptop
    d.polygon([(1150, 800), (1400, 800), (1380, 700), (1170, 700)], fill=(60, 62, 66))
    d.polygon([(1180, 710), (1370, 710), (1355, 790), (1195, 790)], fill=(30, 60, 40))
    # mug
    d.rectangle([1060, 760, 1100, 800], fill=(220, 220, 220))

    # floor lamp (right)
    d.rectangle([1894, 700, 1906, 1180], fill=(60, 56, 52))
    d.ellipse([1840, 1160, 1960, 1200], fill=(60, 56, 52))
    d.polygon([(1830, 690), (1970, 690), (1950, 560), (1850, 560)], fill=(240, 226, 196))
    img = img.filter(ImageFilter.GaussianBlur(0.6))
    # warm lamp glow baked in lightly
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([1600, 400, 2200, 1000], fill=(90, 60, 20))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.blend(img, Image.eval(Image.merge("RGB", [Image.eval(ch, lambda v, g=g: min(255, v + g)) for ch, g in zip(img.split(), (0, 0, 0))]), lambda v: v), 0)
    from PIL import ImageChops
    img = ImageChops.add(img, glow)
    d = ImageDraw.Draw(img)
    d.text((40, 1230), "PLACEHOLDER ROOM — replace public/room.png with the AI-generated image", fill=(255, 255, 255), font=font(26))
    img.save(path, optimize=True)
    print("wrote", path)


def portraits():
    labels = {(0, 0): "UP-LEFT", (0, 1): "UP", (0, 2): "UP-RIGHT", (1, 0): "LEFT", (1, 1): "CENTRE", (1, 2): "RIGHT", (2, 0): "DOWN-LEFT", (2, 1): "DOWN", (2, 2): "DOWN-RIGHT"}
    PW, PH = 1600, 2000
    for (r, c), label in labels.items():
        path = os.path.join(ROOT, "portraits", f"{r}-{c}.png")
        if not should_write(path):
            continue
        img = Image.new("RGBA", (PW, PH), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        # chair
        d.rounded_rectangle([420, 900, 1180, 1500], radius=60, fill=(45, 45, 50, 255))
        d.rounded_rectangle([380, 1380, 1220, 1480], radius=40, fill=(35, 35, 40, 255))
        d.rectangle([760, 1480, 840, 1800], fill=(70, 70, 76, 255))
        d.ellipse([500, 1760, 1100, 1880], fill=(50, 50, 56, 255))
        # armrests
        d.rounded_rectangle([340, 1150, 470, 1210], radius=24, fill=(60, 60, 66, 255))
        d.rounded_rectangle([1130, 1150, 1260, 1210], radius=24, fill=(60, 60, 66, 255))
        # body
        d.rounded_rectangle([520, 980, 1080, 1480], radius=120, fill=(30, 30, 34, 255))
        # arms to armrests
        d.line([(600, 1050), (400, 1180)], fill=(30, 30, 34, 255), width=110)
        d.line([(1000, 1050), (1200, 1180)], fill=(30, 30, 34, 255), width=110)
        d.text((640, 1200), "CRTV DEPT", fill=(200, 200, 200, 255), font=font(64))
        # head — offset by direction so the frame swap is visible
        dx = (c - 1) * 70
        dy = (r - 1) * 50
        cx, cy = 800 + dx, 760 + dy
        d.rounded_rectangle([cx - 190, cy - 240, cx + 190, cy + 240], radius=170, fill=(224, 190, 160, 255))
        d.ellipse([cx - 200, cy - 280, cx + 200, cy - 40], fill=(40, 30, 28, 255))  # hair
        # eyes look in the direction
        for ex in (cx - 70, cx + 70):
            d.ellipse([ex - 26, cy - 30, ex + 26, cy + 10], fill=(255, 255, 255, 255))
            d.ellipse([ex - 10 + dx // 6, cy - 22 + dy // 5, ex + 10 + dx // 6, cy - 2 + dy // 5], fill=(30, 30, 30, 255))
        d.arc([cx - 60, cy + 60, cx + 60, cy + 130], 10, 170, fill=(120, 70, 60, 255), width=8)
        img.save(path, optimize=True)
        print("wrote", path)


def paper():
    path = os.path.join(ROOT, "paper.png")
    if not should_write(path):
        return
    S = 512
    img = Image.new("RGB", (S, S), (251, 249, 244))
    px = img.load()
    rnd = random.Random(3)
    for y in range(S):
        for x in range(S):
            n = rnd.randint(-6, 6)
            r, g, b = px[x, y]
            px[x, y] = (r + n, g + n, b + n - 1)
    img = img.filter(ImageFilter.GaussianBlur(0.4))
    img.save(path, optimize=True)
    print("wrote", path)


def og():
    path = os.path.join(ROOT, "og-image.png")
    if not should_write(path):
        return
    img = Image.new("RGB", (1200, 630), (17, 17, 17))
    d = ImageDraw.Draw(img)
    d.text((80, 200), "Daven Koh", fill=(242, 242, 242), font=font(110))
    d.text((84, 340), "Business x Tech", fill=(200, 200, 200), font=font(48))
    d.text((84, 410), "GTM · Operations · Software · AI", fill=(140, 140, 140), font=font(34))
    img.save(path, optimize=True)
    print("wrote", path)


if __name__ == "__main__":
    os.makedirs(os.path.join(ROOT, "portraits"), exist_ok=True)
    if "--portraits" in sys.argv:
        portraits()
    else:
        room()
        portraits()
        paper()
        og()
