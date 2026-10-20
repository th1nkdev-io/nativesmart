"""Export NativeSmart's approved logo as deterministic web and native app icons.

Run from any directory with Python 3 and Pillow installed. This resizes the
approved artwork; it does not redraw or generate a new brand identity.
"""

import json
import math
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "assets/brand/nativesmart-logo-source.png"
OUTPUT = ROOT / "public/brand"
BACKGROUND = "#f8fafc"
THEME = "#087fe8"


def load_symbol():
    image = Image.open(SOURCE).convert("RGBA")
    alpha = image.getchannel("A")
    # The generated source contains almost invisible stray pixels beyond the
    # mark. Discard only alpha <= 15 before measuring the optical bounds.
    alpha = alpha.point(lambda value: value if value > 15 else 0)
    image.putalpha(alpha)
    bounds = alpha.getbbox()
    if bounds is None:
        raise ValueError("The official logo source is empty.")
    return image.crop(bounds)


def icon(symbol, size, *, opaque=False, maskable=False, safe_radius=0.38):
    scale = size * 0.82 / max(symbol.size)
    if maskable:
        # Web maskable icons use the central 80%-diameter safe circle.
        # Android uses a smaller 66/108-diameter safe zone; its caller overrides
        # the radius. Both retain extra clearance for resampling.
        center_x = (symbol.width - 1) / 2
        center_y = (symbol.height - 1) / 2
        radius = max(
            math.hypot(x - center_x, y - center_y)
            for y in range(symbol.height)
            for x in range(symbol.width)
            if symbol.getpixel((x, y))[3] > 15
        )
        scale = min(scale, size * safe_radius / radius)
    width, height = (max(1, round(edge * scale)) for edge in symbol.size)
    mark = symbol.resize((width, height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), BACKGROUND if opaque else (0, 0, 0, 0))
    canvas.alpha_composite(mark, ((size - width) // 2, (size - height) // 2))
    return canvas.convert("RGB") if opaque else canvas


def save(image, name):
    path = OUTPUT / name
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, optimize=True)


def main():
    symbol = load_symbol()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    save(icon(symbol, 1024), "nativesmart-logo.png")
    for size in (16, 32, 48, 64, 128, 192, 256, 512, 1024):
        save(icon(symbol, size), f"icon-{size}.png")
    for size in (16, 32):
        save(icon(symbol, size), f"favicon-{size}x{size}.png")
    for size in (192, 512):
        save(icon(symbol, size, opaque=True, maskable=True), f"icon-maskable-{size}.png")
    save(icon(symbol, 180, opaque=True), "apple-touch-icon.png")
    save(icon(symbol, 1024, opaque=True), "app-icon-1024.png")
    save(icon(symbol, 432, maskable=True, safe_radius=0.302), "android-adaptive-foreground.png")
    save(icon(symbol, 512), "splash-icon.png")
    for density, size in (("mdpi", 48), ("hdpi", 72), ("xhdpi", 96), ("xxhdpi", 144), ("xxxhdpi", 192)):
        save(icon(symbol, size, opaque=True), f"android/mipmap-{density}/ic_launcher.png")
    icon(symbol, 256).save(
        OUTPUT / "favicon.ico",
        sizes=[(size, size) for size in (16, 24, 32, 48, 64, 128, 256)],
    )
    icon(symbol, 1024).save(OUTPUT / "nativesmart.icns")
    (ROOT / "public/favicon.ico").write_bytes((OUTPUT / "favicon.ico").read_bytes())
    # Flutter only bundles assets from inside its own package.
    flutter_logo = ROOT / "apps/mobile/flutter/assets/brand/nativesmart-logo.png"
    flutter_logo.parent.mkdir(parents=True, exist_ok=True)
    flutter_logo.write_bytes((OUTPUT / "icon-256.png").read_bytes())
    manifest = {
        "id": "./",
        "name": "NativeSmart",
        "short_name": "NativeSmart",
        "description": "A shared component ecosystem for web, mobile and desktop products.",
        "lang": "fr",
        "start_url": "./",
        "scope": "./",
        "display": "standalone",
        "background_color": BACKGROUND,
        "theme_color": THEME,
        "icons": [
            {"src": f"brand/icon-{size}.png", "sizes": f"{size}x{size}", "type": "image/png", "purpose": "any"}
            for size in (192, 512)
        ] + [
            {"src": f"brand/icon-maskable-{size}.png", "sizes": f"{size}x{size}", "type": "image/png", "purpose": "maskable"}
            for size in (192, 512)
        ],
    }
    (ROOT / "public/site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Exported NativeSmart brand assets to {OUTPUT}")


if __name__ == "__main__":
    main()
