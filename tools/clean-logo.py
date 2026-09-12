from collections import deque
from pathlib import Path
from PIL import Image
import colorsys
import shutil


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "brand" / "logo.png"
BACKUP = ROOT / "assets" / "brand" / "logo-original.png"


def is_background(pixel):
    r, g, b, _ = pixel
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    # The supplied file is a browser screenshot crop. Its outer frame consists
    # of connected white/grey pixels (plus slightly blue anti-aliasing).
    return (s < 0.42 and v > 0.32) or (s < 0.58 and v > 0.72)


def main():
    if not BACKUP.exists():
        shutil.copy2(SOURCE, BACKUP)

    image = Image.open(BACKUP).convert("RGBA")
    width, height = image.size
    pixels = image.load()
    queue = deque()
    seen = set()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in seen or not is_background(pixels[x, y]):
            continue
        seen.add((x, y))
        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        if x:
            queue.append((x - 1, y))
        if x + 1 < width:
            queue.append((x + 1, y))
        if y:
            queue.append((x, y - 1))
        if y + 1 < height:
            queue.append((x, y + 1))

    alpha = image.getchannel("A")
    box = alpha.getbbox()
    if not box:
        raise RuntimeError("Logo cleanup removed all pixels")
    cleaned = image.crop(box)
    cleaned.save(SOURCE, optimize=True)
    print(f"cleaned {width}x{height} -> {cleaned.width}x{cleaned.height}; transparent pixels={len(seen)}")


if __name__ == "__main__":
    main()
