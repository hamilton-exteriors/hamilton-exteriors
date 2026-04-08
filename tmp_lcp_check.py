import re

html = open('C:/Users/admin/hamilton-exteriors/tmp_homepage.html', encoding='utf-8', errors='ignore').read()

# Find preload tags
preloads = re.findall(r'<link[^>]+rel=["\']preload["\'][^>]*>', html, re.IGNORECASE)
print('PRELOAD tags:', len(preloads))
for p in preloads:
    print(' ', p[:150])

# Find first image (likely LCP candidate)
imgs = re.findall(r'<img[^>]*>', html)
print()
print('First 5 images:')
for img in imgs[:5]:
    print(' ', img[:180])

# Check for font preloads
font_preloads = [p for p in preloads if 'font' in p.lower()]
print()
print('Font preloads:', len(font_preloads))

# CSS files
css_links = re.findall(r'<link[^>]+rel=["\']stylesheet["\'][^>]*>', html, re.IGNORECASE)
print()
print('CSS stylesheet links:', len(css_links))
for c in css_links:
    print(' ', c[:120])

# Check for render-blocking resources
# scripts in head without defer/async
head_match = re.search(r'<head[^>]*>(.*?)</head>', html, re.DOTALL|re.IGNORECASE)
if head_match:
    head = head_match.group(1)
    blocking_scripts = re.findall(r'<script[^>]+src=["\'][^"\']+["\'][^>]*(?<!defer)(?<!async)>', head)
    print()
    print('Potentially blocking scripts in head:', len(blocking_scripts))
    for s in blocking_scripts:
        if 'defer' not in s.lower() and 'async' not in s.lower():
            print(' BLOCKING:', s[:100])
        else:
            print(' DEFERRED:', s[:100])

# Inline CSS/fonts
inline_styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)
total_inline_css = sum(len(s) for s in inline_styles)
print()
print(f'Inline style blocks: {len(inline_styles)}, total size: {total_inline_css//1024} KB')

# Check for background-image in CSS (could be LCP element)
bg_images = re.findall(r'background-image:\s*url\([^)]+\)', html)
print()
print('Background images (CSS):', len(bg_images))
for bg in bg_images[:5]:
    print(' ', bg[:100])

# Hero video or background
video_tags = re.findall(r'<video[^>]*>', html, re.IGNORECASE)
print()
print('Video tags:', len(video_tags))
if video_tags:
    for v in video_tags[:3]:
        print(' ', v[:100])
