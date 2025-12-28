# Ragi.css Implementation Plan

**Framework:** Modern Classless CSS Framework
**Timeline:** 12 weeks
**Target Size:** < 15KB uncompressed, ~5KB gzipped
**Browser Support:** Chrome 113+, Firefox 117+, Safari 16.6+ (78-96% coverage)

---

## Project Setup

### Repository Structure
```
ragi.css/
├── src/
│   ├── 1-reset.css
│   ├── 2-variables.css
│   ├── 3-typography.css
│   ├── 4-forms.css
│   ├── 5-layout.css
│   ├── 6-components.css
│   ├── 7-accessibility.css
│   └── 8-themes.css
├── dist/
│   ├── ragi.css           # Full build with layers
│   ├── ragi.min.css       # Minified
│   └── ragi-core.css      # Without themes
├── examples/
│   ├── basic.html
│   ├── forms.html
│   ├── layout.html
│   └── theming.html
├── tests/
│   ├── contrast-check.js
│   ├── size-check.js
│   └── browser-test.html
├── docs/
│   ├── getting-started.md
│   ├── customization.md
│   ├── migration.md
│   └── api.md
├── package.json
├── README.md
├── RESEARCH.md
└── PLAN.md
```

### Build Pipeline

**PostCSS Configuration:**
```json
{
  "plugins": {
    "postcss-import": {},
    "postcss-nesting": {},
    "cssnano": {
      "preset": ["default", {
        "discardComments": { "removeAll": true }
      }]
    }
  }
}
```

**package.json scripts:**
```json
{
  "scripts": {
    "build": "postcss src/index.css -o dist/ragi.css",
    "build:min": "postcss src/index.css -o dist/ragi.min.css --env production",
    "build:core": "postcss src/core.css -o dist/ragi-core.css",
    "watch": "postcss src/index.css -o dist/ragi.css --watch",
    "test:size": "node tests/size-check.js",
    "test:contrast": "node tests/contrast-check.js",
    "test:lint": "stylelint 'src/**/*.css'"
  }
}
```

---

## Week-by-Week Implementation

### Week 1: Setup & Reset

**Deliverables:**
- [x] GitHub repository created
- [ ] npm package initialized
- [ ] Build pipeline configured
- [ ] `1-reset.css` complete
- [ ] `2-variables.css` complete (base colors only)
- [ ] Basic test HTML file

**1-reset.css:**
```css
@layer reset {
  /* Box sizing */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  * {
    margin: 0;
  }

  /* Body defaults */
  body {
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Form elements inherit font */
  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  /* Prevent overflow */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /* Remove list styles on ul, ol with list role */
  ul[role='list'],
  ol[role='list'] {
    list-style: none;
    padding: 0;
  }

  /* Remove default button styles */
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  /* Remove link underline */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Table defaults */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
}
```

**2-variables.css (Week 1 - Base only):**
```css
@layer variables {
  /* Typed properties for runtime validation */
  @property --color-primary {
    syntax: '<color>';
    inherits: true;
    initial-value: #3b82f6;
  }

  @property --color-secondary {
    syntax: '<color>';
    inherits: true;
    initial-value: #8b5cf6;
  }

  @property --space-unit {
    syntax: '<length>';
    inherits: true;
    initial-value: 1rem;
  }

  :root {
    /* Base colors */
    --color-text: #1a202c;
    --color-bg: #ffffff;
    --color-border: #e2e8f0;

    /* Font stacks */
    --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
  }
}
```

**Test file (examples/basic.html):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ragi CSS - Basic Test</title>
  <link rel="stylesheet" href="../dist/ragi.css">
</head>
<body>
  <main>
    <h1>Ragi CSS Framework</h1>
    <p>Testing basic styles.</p>
  </main>
</body>
</html>
```

---

### Week 2: Typography

**Deliverables:**
- [ ] `3-typography.css` complete
- [ ] Fluid typography with clamp()
- [ ] Typography examples page
- [ ] Modular scale implemented

**3-typography.css:**
```css
@layer base {
  /* Body text */
  :where(body) {
    font-family: var(--font-sans);
    font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
    line-height: 1.6;
    color: var(--color-text);
    background: var(--color-bg);
  }

  /* Headings base */
  :where(h1, h2, h3, h4, h5, h6) {
    line-height: 1.2;
    font-weight: 600;
    margin-block-end: 0.5em;

    & + * {
      margin-block-start: 0;
    }
  }

  /* Heading scale (1.25 ratio - Major Third) */
  :where(h1) {
    font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
  }

  :where(h2) {
    font-size: clamp(1.6rem, 1.3rem + 1.5vw, 2.4rem);
  }

  :where(h3) {
    font-size: clamp(1.28rem, 1.15rem + 1vw, 1.92rem);
  }

  :where(h4) {
    font-size: clamp(1.024rem, 1rem + 0.5vw, 1.536rem);
  }

  :where(h5) {
    font-size: clamp(0.9rem, 0.85rem + 0.25vw, 1.23rem);
  }

  :where(h6) {
    font-size: 1rem;
    font-weight: 500;
  }

  /* Paragraphs */
  :where(p) {
    margin-block: 1em;
    max-width: 70ch;
  }

  /* Links */
  :where(a) {
    color: var(--color-primary);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;

    &:hover {
      text-decoration-thickness: 2px;
    }
  }

  /* Lists */
  :where(ul, ol) {
    padding-inline-start: 1.5em;
    margin-block: 1em;

    & li {
      margin-block: 0.5em;
    }

    & ul, & ol {
      margin-block: 0.5em;
    }
  }

  /* Inline code */
  :where(code) {
    font-family: var(--font-mono);
    font-size: 0.9em;
    padding: 0.125em 0.375em;
    background: color-mix(in srgb, var(--color-primary) 10%, var(--color-bg));
    border: 1px solid color-mix(in srgb, var(--color-primary) 20%, var(--color-bg));
    border-radius: 0.25em;
  }

  /* Code blocks */
  :where(pre) {
    overflow-x: auto;
    padding: 1em;
    background: color-mix(in srgb, var(--color-text) 5%, var(--color-bg));
    border: 1px solid var(--color-border);
    border-radius: 0.5em;
    margin-block: 1em;

    & code {
      padding: 0;
      background: none;
      border: none;
    }
  }

  /* Blockquotes */
  :where(blockquote) {
    margin-block: 1em;
    margin-inline: 0;
    padding-inline-start: 1.5em;
    border-inline-start: 4px solid var(--color-primary);
    font-style: italic;
    color: color-mix(in srgb, var(--color-text) 80%, var(--color-bg));
  }

  /* Horizontal rule */
  :where(hr) {
    border: none;
    border-block-start: 1px solid var(--color-border);
    margin-block: 2em;
  }

  /* Small text */
  :where(small) {
    font-size: 0.875em;
  }

  /* Mark/highlight */
  :where(mark) {
    background: color-mix(in srgb, yellow 40%, white);
    padding: 0.125em 0.25em;
  }
}
```

**Variables to add to 2-variables.css:**
```css
:root {
  /* Typography scale (Major Third - 1.25) */
  --font-size-xs: 0.64rem;
  --font-size-sm: 0.8rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.563rem;
  --font-size-2xl: 1.953rem;
  --font-size-3xl: 2.441rem;

  /* Line heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;
  --line-height-loose: 1.8;
}
```

**Example page (examples/typography.html):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Typography - Ragi CSS</title>
  <link rel="stylesheet" href="../dist/ragi.css">
</head>
<body>
  <main>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <p>This is a paragraph with <a href="#">a link</a> and <code>inline code</code>.</p>

    <blockquote>
      This is a blockquote. It should be styled differently from regular paragraphs.
    </blockquote>

    <pre><code>function hello() {
  console.log('Code block');
}</code></pre>

    <ul>
      <li>Unordered list item 1</li>
      <li>Unordered list item 2
        <ul>
          <li>Nested item</li>
        </ul>
      </li>
    </ul>

    <ol>
      <li>Ordered list item 1</li>
      <li>Ordered list item 2</li>
    </ol>
  </main>
</body>
</html>
```

---

### Week 3: Forms Part 1

**Deliverables:**
- [ ] `4-forms.css` started (inputs, textarea, select)
- [ ] `:focus-visible` implementation
- [ ] Form validation styles with `:has()`
- [ ] Examples page

**4-forms.css (Part 1):**
```css
@layer components {
  /* Base input styles */
  :where(input, textarea, select) {
    width: 100%;
    padding: 0.625em 0.875em;
    border: 1px solid var(--color-border);
    border-radius: 0.375rem;
    background: var(--color-bg);
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: color-mix(in srgb, var(--color-text) 50%, var(--color-bg));
    }

    &:focus-visible {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: color-mix(in srgb, var(--color-text) 5%, var(--color-bg));
    }

    &:invalid {
      border-color: var(--color-danger);
    }

    &:valid:not(:placeholder-shown) {
      border-color: var(--color-success);
    }
  }

  /* Specific input types */
  :where(input[type="checkbox"],
         input[type="radio"]) {
    width: auto;
    margin-inline-end: 0.5em;
    cursor: pointer;
  }

  :where(input[type="range"]) {
    padding: 0;
  }

  :where(input[type="file"]) {
    padding: 0.5em;
    border-style: dashed;
  }

  /* Textarea specific */
  :where(textarea) {
    resize: vertical;
    min-height: 8em;
  }

  /* Select specific */
  :where(select) {
    cursor: pointer;
    padding-inline-end: 2em;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75em center;
    background-size: 0.75em;
    appearance: none;
  }

  /* Labels */
  :where(label) {
    display: block;
    margin-block-end: 0.375em;
    font-weight: 500;
    font-size: 0.9em;
    color: var(--color-text);

    & input[type="checkbox"],
    & input[type="radio"] {
      margin-inline-end: 0.5em;
    }
  }

  /* Fieldset */
  :where(fieldset) {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 1em;
    margin-block: 1em;

    & legend {
      padding-inline: 0.5em;
      font-weight: 600;
    }
  }

  /* Form with invalid inputs - disable submit */
  :where(form:has(input:invalid)) {
    & button[type="submit"],
    & input[type="submit"] {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
}
```

**Variables to add to 2-variables.css:**
```css
@property --color-success {
  syntax: '<color>';
  inherits: true;
  initial-value: #10b981;
}

@property --color-danger {
  syntax: '<color>';
  inherits: true;
  initial-value: #ef4444;
}

@property --color-warning {
  syntax: '<color>';
  inherits: true;
  initial-value: #f59e0b;
}
```

---

### Week 4: Forms Part 2 & Layout Start

**Deliverables:**
- [ ] `4-forms.css` complete (buttons)
- [ ] `5-layout.css` started (container queries, grid)
- [ ] Layout examples

**4-forms.css (Part 2 - Buttons):**
```css
@layer components {
  /* Button base */
  :where(button,
         input[type="submit"],
         input[type="button"],
         input[type="reset"]) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625em 1.25em;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    text-decoration: none;

    &:hover {
      background: color-mix(in srgb, var(--color-primary) 85%, black);
    }

    &:active {
      transform: translateY(1px);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  /* Reset button */
  :where(input[type="reset"]) {
    background: color-mix(in srgb, var(--color-text) 20%, var(--color-bg));
    color: var(--color-text);

    &:hover {
      background: color-mix(in srgb, var(--color-text) 30%, var(--color-bg));
    }
  }

  /* Button group */
  :where(form) {
    & :where(button, input[type="submit"], input[type="reset"]) + :where(button, input[type="submit"], input[type="reset"]) {
      margin-inline-start: 0.5em;
    }
  }
}
```

**5-layout.css (Part 1):**
```css
@layer layout {
  /* Container */
  :where(body) {
    container-type: inline-size;
    container-name: viewport;
  }

  :where(main, article, section) {
    container-type: inline-size;
  }

  /* Main content area */
  :where(main) {
    max-width: 70rem;
    margin-inline: auto;
    padding-inline: clamp(1rem, 5vw, 3rem);
    padding-block: clamp(1rem, 3vw, 2rem);
  }

  /* Article with responsive layout using container queries */
  :where(article) {
    @container (min-width: 600px) {
      & :where(header) {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1.5rem;
        align-items: start;
      }
    }
  }

  /* Responsive grid */
  :where([role="list"]) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
    gap: clamp(1rem, 3vw, 2rem);
  }

  /* Header, nav, footer */
  :where(header, nav, footer) {
    padding-block: clamp(1rem, 2vw, 1.5rem);
  }

  :where(nav) {
    & ul {
      display: flex;
      flex-wrap: wrap;
      gap: 1em 2em;
      list-style: none;
      padding: 0;
    }
  }
}
```

---

### Week 5: Layout Complete & Components Start

**Deliverables:**
- [ ] `5-layout.css` complete (subgrid, flexbox utils)
- [ ] `6-components.css` started (table, details)
- [ ] Component examples

**5-layout.css (Complete):**
```css
@layer layout {
  /* ... previous code ... */

  /* Subgrid support (progressive enhancement) */
  @supports (grid-template-rows: subgrid) {
    :where(.grid > *) {
      display: grid;
      grid-template-rows: subgrid;
      grid-row: span 3; /* Adjust based on content structure */
    }
  }

  /* Flexbox utilities for common layouts */
  :where(header > *, footer > *) {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  /* Stack layout (default for most content) */
  :where(main > *, article > *, section > *) {
    & + & {
      margin-block-start: 1.5em;
    }
  }

  /* Sidebar layout with container query */
  @container (min-width: 900px) {
    :where(body:has(aside)) {
      display: grid;
      grid-template-columns: 1fr 20rem;
      gap: 2rem;

      & > main {
        max-width: none;
      }
    }
  }
}
```

**6-components.css (Part 1):**
```css
@layer components {
  /* Table */
  :where(table) {
    width: 100%;
    border-collapse: collapse;
    margin-block: 1.5em;
    font-size: 0.9em;

    & caption {
      font-weight: 600;
      text-align: left;
      margin-block-end: 0.75em;
    }

    & thead th {
      text-align: left;
      padding: 0.75em 1em;
      border-block-end: 2px solid var(--color-border);
      font-weight: 600;
      background: color-mix(in srgb, var(--color-text) 3%, var(--color-bg));
    }

    & tbody td {
      padding: 0.75em 1em;
      border-block-end: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
    }

    & tbody tr:hover {
      background: color-mix(in srgb, var(--color-primary) 5%, var(--color-bg));
    }

    & tbody tr:last-child td {
      border-block-end: none;
    }
  }

  /* Details/Summary (disclosure widget) */
  :where(details) {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 1em;
    margin-block: 1em;

    & summary {
      cursor: pointer;
      font-weight: 600;
      user-select: none;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 0.5em;

      &::before {
        content: '▶';
        display: inline-block;
        transition: transform 0.2s ease;
      }

      &:hover {
        color: var(--color-primary);
      }
    }

    &[open] summary::before {
      transform: rotate(90deg);
    }

    &[open] summary {
      margin-block-end: 1em;
      padding-block-end: 1em;
      border-block-end: 1px solid var(--color-border);
    }
  }
}
```

---

### Week 6: Components Complete

**Deliverables:**
- [ ] `6-components.css` complete (dialog, progress, meter)
- [ ] All component examples

**6-components.css (Complete):**
```css
@layer components {
  /* ... previous table and details code ... */

  /* Dialog */
  :where(dialog) {
    border: none;
    border-radius: 0.75rem;
    padding: 0;
    max-width: min(90vw, 40rem);
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);

    &::backdrop {
      background: rgb(0 0 0 / 0.5);
      backdrop-filter: blur(4px);
    }

    & > * {
      padding: 1.5rem;
    }

    & header {
      border-block-end: 1px solid var(--color-border);
      font-weight: 600;
      font-size: 1.25em;
    }

    & footer {
      border-block-start: 1px solid var(--color-border);
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }
  }

  /* Progress */
  :where(progress) {
    appearance: none;
    width: 100%;
    height: 0.75rem;
    border-radius: 9999px;
    overflow: hidden;
    background: color-mix(in srgb, var(--color-text) 10%, var(--color-bg));

    &::-webkit-progress-bar {
      background: color-mix(in srgb, var(--color-text) 10%, var(--color-bg));
    }

    &::-webkit-progress-value {
      background: var(--color-primary);
      border-radius: 9999px;
    }

    &::-moz-progress-bar {
      background: var(--color-primary);
      border-radius: 9999px;
    }
  }

  /* Meter */
  :where(meter) {
    appearance: none;
    width: 100%;
    height: 0.75rem;
    border-radius: 9999px;

    &::-webkit-meter-bar {
      background: color-mix(in srgb, var(--color-text) 10%, var(--color-bg));
      border-radius: 9999px;
    }

    &::-webkit-meter-optimum-value {
      background: var(--color-success);
      border-radius: 9999px;
    }

    &::-webkit-meter-suboptimum-value {
      background: var(--color-warning);
      border-radius: 9999px;
    }

    &::-webkit-meter-even-less-good-value {
      background: var(--color-danger);
      border-radius: 9999px;
    }

    &::-moz-meter-bar {
      border-radius: 9999px;
    }
  }

  /* Figure */
  :where(figure) {
    margin-inline: 0;
    margin-block: 1.5em;

    & img {
      border-radius: 0.5rem;
    }

    & figcaption {
      margin-block-start: 0.75em;
      font-size: 0.9em;
      color: color-mix(in srgb, var(--color-text) 70%, var(--color-bg));
      text-align: center;
    }
  }
}
```

---

### Week 7: Accessibility

**Deliverables:**
- [ ] `7-accessibility.css` complete
- [ ] Focus states, reduced motion, high contrast
- [ ] Accessibility testing (keyboard nav)

**7-accessibility.css:**
```css
@layer accessibility {
  /* Focus-visible (keyboard-only focus) */
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Remove focus for mouse/touch */
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Skip to main content link */
  :where(a[href="#main"]) {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1em;
    background: var(--color-primary);
    color: white;
    font-weight: 600;
    transform: translateY(-100%);
    transition: transform 0.2s ease;

    &:focus {
      transform: translateY(0);
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    :root {
      --color-text: #000000;
      --color-bg: #ffffff;
      --color-border: currentColor;
    }

    button, input, select, textarea {
      border-width: 2px;
    }
  }

  /* Dark mode preference (basic) */
  @media (prefers-color-scheme: dark) {
    :root {
      --color-text: #e5e7eb;
      --color-bg: #111827;
      --color-border: #374151;
    }
  }

  /* Screen reader only class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Focus within (for form containers) */
  :where(form):focus-within {
    outline: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
    outline-offset: 4px;
    border-radius: 0.5rem;
  }

  /* Improve tap targets on mobile */
  @media (pointer: coarse) {
    button, a, input, select {
      min-block-size: 44px;
      min-inline-size: 44px;
    }
  }
}
```

---

### Week 8: Theming

**Deliverables:**
- [ ] `8-themes.css` complete
- [ ] Dark mode implementation
- [ ] Theme toggle example
- [ ] Custom theme guide

**8-themes.css:**
```css
@layer themes {
  /* Dark mode (system preference) */
  @media (prefers-color-scheme: dark) {
    :root {
      --color-text: #f3f4f6;
      --color-bg: #111827;
      --color-border: #374151;
    }
  }

  /* Manual theme override with data-theme attribute */
  [data-theme="light"] {
    --color-text: #1a202c;
    --color-bg: #ffffff;
    --color-border: #e2e8f0;
  }

  [data-theme="dark"] {
    --color-text: #f3f4f6;
    --color-bg: #111827;
    --color-border: #374151;
  }

  /* Auto theme (respects system preference) */
  [data-theme="auto"] {
    @media (prefers-color-scheme: light) {
      --color-text: #1a202c;
      --color-bg: #ffffff;
      --color-border: #e2e8f0;
    }

    @media (prefers-color-scheme: dark) {
      --color-text: #f3f4f6;
      --color-bg: #111827;
      --color-border: #374151;
    }
  }

  /* Example: High contrast theme */
  [data-theme="high-contrast"] {
    --color-text: #000000;
    --color-bg: #ffffff;
    --color-primary: #0000ff;
    --color-border: #000000;
  }

  /* Example: Custom brand theme */
  [data-theme="brand"] {
    --color-primary: #8b5cf6;
    --color-secondary: #ec4899;
  }
}
```

**Theme toggle example (examples/theme-toggle.html):**
```html
<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="UTF-8">
  <title>Theme Toggle - Ragi CSS</title>
  <link rel="stylesheet" href="../dist/ragi.css">
  <script>
    // Simple theme toggle
    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'auto';
    document.documentElement.setAttribute('data-theme', savedTheme);
  </script>
</head>
<body>
  <main>
    <h1>Theme Toggle</h1>
    <fieldset>
      <legend>Choose theme:</legend>
      <label>
        <input type="radio" name="theme" value="light" onchange="setTheme('light')">
        Light
      </label>
      <label>
        <input type="radio" name="theme" value="dark" onchange="setTheme('dark')">
        Dark
      </label>
      <label>
        <input type="radio" name="theme" value="auto" onchange="setTheme('auto')" checked>
        Auto
      </label>
    </fieldset>
  </main>
</body>
</html>
```

---

### Week 9: Testing & Quality Assurance

**Deliverables:**
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Performance testing (bundle size)
- [ ] WCAG AA compliance audit
- [ ] Fix critical issues

**Test Checklist:**

**Browser Testing:**
- [ ] Chrome 113+ (desktop & mobile)
- [ ] Firefox 117+ (desktop & mobile)
- [ ] Safari 16.6+ (desktop & iOS)
- [ ] Edge 113+

**Accessibility Testing:**
- [ ] Keyboard navigation (Tab, Enter, Space, Arrows)
- [ ] Screen reader (NVDA on Windows, VoiceOver on Mac/iOS)
- [ ] Color contrast (WCAG AA 4.5:1 for text)
- [ ] Focus indicators visible
- [ ] Form validation announces to screen readers
- [ ] Reduced motion respected

**Performance Testing:**
```bash
npm run build
npm run test:size

# Expected output:
# ragi.css: ~12-14KB (uncompressed)
# ragi.min.css: ~12-14KB (minified), ~4-5KB (gzipped)
# ragi-core.css: ~10KB (without themes)
```

**Contrast Testing:**
```bash
npm run test:contrast

# Should verify:
# - All text meets WCAG AA (4.5:1)
# - Large text meets WCAG AAA (3:1)
# - Focus indicators meet 3:1
# - Interactive elements have sufficient contrast
```

---

### Week 10: Documentation

**Deliverables:**
- [ ] README with quick start
- [ ] Getting started guide
- [ ] Customization guide
- [ ] Migration guides (from Pico, MVP, etc.)
- [ ] API reference (all CSS variables)
- [ ] AI prompts template

**docs/getting-started.md:**
```markdown
# Getting Started with Ragi CSS

## Installation

### CDN (Quickest)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ragi-css@1.0.0/dist/ragi.min.css">
```

### npm
```bash
npm install ragi-css
```

```css
@import 'ragi-css';
```

### Download
Download from [GitHub Releases](https://github.com/you/ragi-css/releases)

## Usage

Write semantic HTML and it's automatically styled:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Site</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ragi-css">
</head>
<body>
  <main>
    <h1>Welcome</h1>
    <p>No classes needed!</p>
    <button>Click me</button>
  </main>
</body>
</html>
```

That's it! No build step, no configuration required.

## Next Steps
- [Customization Guide](./customization.md) - Change colors, fonts, spacing
- [Components](./components.md) - See all styled elements
- [Migration Guide](./migration.md) - Coming from Pico, MVP, Water, etc.
```

**docs/customization.md:**
```markdown
# Customization Guide

## Override Colors

```html
<style>
  :root {
    --color-primary: #8b5cf6;
    --color-secondary: #ec4899;
  }
</style>
<link rel="stylesheet" href="ragi.css">
```

## Override Typography

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --space-unit: 1.25rem;
}

h1 {
  font-size: clamp(2.5rem, 2rem + 2vw, 4rem);
}
```

## Add Custom Classes

```css
@import 'ragi.css' layer(ragi);

@layer custom {
  .special-button {
    background: linear-gradient(to right, purple, pink);
  }
}
```

## Layer with Tailwind

```css
@layer ragi, tailwind, custom;

@import 'ragi.css' layer(ragi);
@import 'tailwind.css' layer(tailwind);
```

```html
<button>Ragi styled</button>
<button class="bg-blue-500">Tailwind styled</button>
```

## All CSS Variables

See [API Reference](./api.md) for complete list.
```

**docs/ai-prompts.md:**
```markdown
# Using Ragi CSS with AI Tools

## Claude/GPT Prompt Template

```
I'm using the Ragi CSS framework, a classless CSS framework that styles semantic HTML automatically.

Rules:
1. Write semantic HTML only (<button>, <article>, <section>)
2. Do NOT add any CSS classes for styling
3. Use appropriate HTML5 tags (use <nav> for navigation, <main> for main content, etc.)
4. Forms should use proper <label>, <input>, <button> elements

Example:
✅ Good: <button>Submit</button>
❌ Bad: <button class="btn btn-primary">Submit</button>

Generate a [describe what you want] using only semantic HTML.
```

## Example Outputs

### Landing Page
```html
<main>
  <header>
    <h1>Product Name</h1>
    <p>Tagline goes here</p>
  </header>

  <section>
    <h2>Features</h2>
    <ul role="list">
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </section>

  <section>
    <h2>Get Started</h2>
    <button>Sign Up</button>
  </section>
</main>
```

All styled automatically, zero classes needed.
```

---

### Week 11: Polish & Examples

**Deliverables:**
- [ ] 10+ example pages (blog, dashboard, form, landing, etc.)
- [ ] CodePen/JSFiddle demos
- [ ] Fix minor bugs
- [ ] Performance optimizations
- [ ] Final accessibility audit

**Example Pages:**
1. Blog post layout
2. Documentation page
3. Landing page
4. Form page (contact, signup)
5. Dashboard layout (with sidebar)
6. E-commerce product page
7. Pricing table
8. FAQ (with details/summary)
9. Gallery
10. Settings page

---

### Week 12: Launch

**Deliverables:**
- [ ] GitHub repository polished
- [ ] npm package published
- [ ] CDN setup (jsDelivr, unpkg)
- [ ] Documentation website live
- [ ] Blog post written
- [ ] Social media posts
- [ ] Submit to directories (awesome-css, etc.)

**Launch Checklist:**

**GitHub:**
- [ ] Repository description and topics
- [ ] LICENSE file (MIT)
- [ ] CONTRIBUTING.md
- [ ] CODE_OF_CONDUCT.md
- [ ] Issue templates
- [ ] PR template
- [ ] GitHub Actions (CI for tests)

**npm:**
```json
{
  "name": "ragi-css",
  "version": "1.0.0",
  "description": "Modern classless CSS framework using 2024-2025 CSS features",
  "main": "dist/ragi.css",
  "files": ["dist/"],
  "keywords": ["css", "framework", "classless", "semantic", "accessible"],
  "author": "Your Name",
  "license": "MIT"
}
```

```bash
npm publish
```

**CDN:**
- jsDelivr: `https://cdn.jsdelivr.net/npm/ragi-css@1.0.0/dist/ragi.min.css`
- unpkg: `https://unpkg.com/ragi-css@1.0.0/dist/ragi.min.css`

**Documentation Site:**
- Deploy to Netlify/Vercel/GitHub Pages
- Include all guides, examples, API reference
- Interactive theme toggle
- Copy-paste code examples

**Blog Post:**
Title: "Introducing Ragi CSS: A Modern Classless Framework"

Outline:
1. The problem (existing frameworks use old CSS)
2. Modern CSS features (container queries, cascade layers, @property)
3. Why classless CSS matters (semantic HTML, accessibility, AI-friendly)
4. How Ragi is different (comparison table)
5. Getting started (quick example)
6. What's next (community, roadmap)

**Social Media:**
- Tweet thread
- Reddit posts (r/webdev, r/css, r/frontend)
- Hacker News submission
- Dev.to article
- Product Hunt launch

---

## Success Metrics

### Technical
- ✅ Size < 15KB uncompressed, ~5KB gzipped
- ✅ WCAG 2.1 AA compliant
- ✅ Lighthouse 100 accessibility score
- ✅ Works in Chrome 113+, Firefox 117+, Safari 16.6+

### Adoption (Year 1)
- 1000+ GitHub stars
- 10k+ npm downloads/month
- 50+ community contributions
- 10+ blog posts/mentions

### Community
- Active discussions in GitHub issues
- Pull requests from community
- Documentation improvements
- Real-world usage examples

---

## Post-Launch Roadmap

### v1.1 (3 months)
- [ ] Community feedback incorporated
- [ ] Additional themes
- [ ] More examples
- [ ] Performance improvements

### v1.2 (6 months)
- [ ] Container style queries (when browser support improves)
- [ ] Additional CSS features as they reach 80%+ support
- [ ] Better TypeScript support for custom properties
- [ ] Figma/Sketch design tokens

### v2.0 (12 months)
- [ ] Breaking changes if needed
- [ ] New CSS features from 2026
- [ ] Complete redesign if warranted
- [ ] Enterprise features

---

## Risk Mitigation

### Scope Creep
**Risk:** Users request utility classes, component variants
**Mitigation:**
- Clear documentation of boundaries
- Firm "no" to requests outside scope
- Suggest alternatives (Tailwind, custom CSS)

### Browser Support Changes
**Risk:** New browser versions break features
**Mitigation:**
- Monitor browser releases
- Test in preview builds (Canary, Nightly)
- Use @supports for progressive enhancement

### Performance Regression
**Risk:** Framework grows beyond size budget
**Mitigation:**
- Automated size tests in CI
- Regular audits for unused code
- Tree-shakable architecture

### Accessibility Issues
**Risk:** Framework violates WCAG
**Mitigation:**
- Automated contrast testing
- Regular screen reader testing
- Community accessibility audits

---

## Conclusion

This plan provides a clear, week-by-week roadmap to build and launch Ragi CSS in 12 weeks.

**Key Principles:**
- Start small, iterate
- Test early and often
- Document everything
- Engage community
- Stay within scope

**Success Criteria:**
- Framework launches on time
- Meets all technical requirements
- Community adoption begins
- Documentation is excellent
- Real-world usage examples exist

**Next Steps:**
1. Review and approve this plan
2. Set up project repository
3. Begin Week 1: Reset & Variables

Let's build this! 🚀
