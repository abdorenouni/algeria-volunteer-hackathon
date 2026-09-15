import xml.etree.ElementTree as ET
import os

with open('public/figma_assets/pdf_svg/page_1.svg', 'r', encoding='utf-8') as f:
    text = f.read()

root = ET.fromstring(text)

# Let's find all path elements with the logo colors
logo_paths = []
for el in root.iter('{http://www.w3.org/2000/svg}path'):
    fill = el.attrib.get('fill', '')
    if fill in ['#cc3e4e', '#478363', '#e6a23c', '#1f1a26']:
        logo_paths.append(ET.tostring(el, encoding='unicode'))

print(f'Found {len(logo_paths)} logo paths')

# Let's construct a standalone SVG
os.makedirs('public/logos', exist_ok=True)

# The coordinates in page_1.svg:
# Mark is from x~565 to 680, y~230 to 370
# Text is from x~330 to 500, y~230 to 370
svg_content = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="325 225 365 150" width="365" height="150">\n'
for p in logo_paths:
    svg_content += '  ' + p + '\n'
svg_content += '</svg>\n'

with open('public/logos/figma_logo_horizontal.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('Saved public/logos/figma_logo_horizontal.svg')

# Mark alone:
svg_mark_content = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="560 225 130 150" width="130" height="150">\n'
for p in logo_paths:
    if '#1f1a26' not in p: # exclude text
        svg_mark_content += '  ' + p + '\n'
svg_mark_content += '</svg>\n'

with open('public/logos/figma_logo_mark.svg', 'w', encoding='utf-8') as f:
    f.write(svg_mark_content)

print('Saved public/logos/figma_logo_mark.svg')
