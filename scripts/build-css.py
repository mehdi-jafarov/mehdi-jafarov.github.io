import os
import re

css_dir = 'css'
output_file = os.path.join(css_dir, 'styles.min.css')

files = [
    'base.css',
    'components.css',
    'layout.css',
    'landing.css',
    'loan-demo.css',
    'responsive-landing.css',
    'responsive-loan.css',
    'colors-light.css',
    'colors-dark.css',
    'theming.css'
]

# Read, merge, and minify CSS
with open(output_file, 'w', encoding='utf-8') as outfile:
    for filename in files:
        path = os.path.join(css_dir, filename)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as infile:
                css = infile.read()

                # Remove ALL /* comments */ (multiline + inline)
                css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)

                # Remove extra spaces, newlines, and tabs
                css = re.sub(r'\s+', ' ', css)

                outfile.write(css)
        else:
            print(f'** Skipping missing file: {filename}')

print(f'> CSS build complete -> {output_file}')
