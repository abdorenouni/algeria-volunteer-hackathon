import os
import pymupdf

# 1. Extract high-res pixel-perfect crops from the official brand identity PDF
doc = pymupdf.open(r'C:\Users\abdou\Downloads\Ibtikar-tatawo3 event.pdf')

os.makedirs('public/logos', exist_ok=True)

# Page 1 has the Horizontal Logo (Mark + Typography)
# Page 2 has the Vertical Logo
# Page 0 has the full emblem

page1 = doc[1]
# We can render at 300 DPI (scale ~4.16x)
zoom = 300 / 72
mat = pymupdf.Matrix(zoom, zoom)

# Let's inspect rect of Page 1
rect = page1.rect
print('Page 1 rect:', rect)

# In Page 1, the horizontal logo is around x: 320 to 695, y: 220 to 375
# Let's crop rect: pymupdf.Rect(320, 220, 695, 375)
crop_horizontal = pymupdf.Rect(325, 225, 695, 372)
pix_horizontal = page1.get_pixmap(matrix=mat, clip=crop_horizontal, alpha=True)
pix_horizontal.save('public/logos/figma_logo_horizontal.png')
print(f'Saved figma_logo_horizontal.png: {pix_horizontal.width}x{pix_horizontal.height}')

# Crop Logo mark alone
crop_mark = pymupdf.Rect(550, 225, 695, 372)
pix_mark = page1.get_pixmap(matrix=mat, clip=crop_mark, alpha=True)
pix_mark.save('public/logos/figma_logo_mark.png')
print(f'Saved figma_logo_mark.png: {pix_mark.width}x{pix_mark.height}')

# Page 2 has the vertical logo
page2 = doc[2]
# In Page 2, the vertical logo is centered
crop_vertical = pymupdf.Rect(375, 180, 650, 520)
pix_vertical = page2.get_pixmap(matrix=mat, clip=crop_vertical, alpha=True)
pix_vertical.save('public/logos/figma_logo_vertical.png')
print(f'Saved figma_logo_vertical.png: {pix_vertical.width}x{pix_vertical.height}')

# Page 4 has Typography
# Page 5 has Color Palette
