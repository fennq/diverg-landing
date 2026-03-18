#!/usr/bin/env python3
"""Generate page-specific OG images: Diverg - [Page Name] from base og-image.png"""
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("pip install Pillow")
    raise

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
BASE_IMG = ASSETS / "og-image.png"
# Font: Helvetica Bold-ish look; macOS has Helvetica.ttc (index 0 is often regular, 1 bold)
FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"
# Approximate position where "Diverg" ends on the hero (1024x495) — add " - PageName" to the right
TEXT_X = 400
TEXT_Y = 115
FONT_SIZE = 52
COLOR = (232, 240, 254)  # light blue-white

PAGES = ["Careers", "Product", "Solutions", "Company", "Resources"]


def main():
    if not BASE_IMG.exists():
        print(f"Missing {BASE_IMG}")
        return
    base = Image.open(BASE_IMG).convert("RGB")
    # Try Helvetica Bold (font index 1 in ttc), fallback to 0
    try:
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE, index=1)
    except Exception:
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    draw = ImageDraw.Draw(base)
    for name in PAGES:
        text = f" - {name}"
        draw.text((TEXT_X, TEXT_Y), text, fill=COLOR, font=font)
        out = ASSETS / f"og-{name.lower()}.png"
        base.save(out, "PNG")
        print(f"Saved {out}")
        # Re-load base for next iteration so we don't stack text
        base = Image.open(BASE_IMG).convert("RGB")
        draw = ImageDraw.Draw(base)
        try:
            font = ImageFont.truetype(FONT_PATH, FONT_SIZE, index=1)
        except Exception:
            font = ImageFont.truetype(FONT_PATH, FONT_SIZE)


if __name__ == "__main__":
    main()
