# Customization Guide

Ragi CSS is designed to be easily customizable while maintaining its classless philosophy. Thanks to **cascade layers**, your custom CSS always takes priority over framework styles.

## How Cascade Layers Work

Ragi CSS uses cascade layers to organize styles:

```css
@layer reset, variables, base, layout, components, accessibility, themes;
```

**Priority (low to high):**
1. `reset` - Browser normalization
2. `variables` - Design tokens
3. `base` - Typography
4. `layout` - Layout primitives
5. `components` - Forms, cards, etc.
6. `accessibility` - Focus states
7. `themes` - Dark mode, color schemes
8. **Your CSS (no layer)** - ⭐ HIGHEST PRIORITY

**This means your CSS always wins without `!important`!**

---

## Method 1: CSS Variables (Easiest)

Override design tokens by setting CSS variables **before** loading Ragi:

```html
<style>
  :root {
    /* Override colors */
    --color-primary: rebeccapurple;
    --color-secondary: teal;
    --color-success: #22c55e;

    /* Override typography */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-mono: 'Fira Code', monospace;
    --line-height-normal: 1.7;

    /* Override spacing */
    --space-unit: 1.5rem; /* All spacing scales from this */

    /* Override border radius */
    --radius-md: 0.5rem;
    --radius-lg: 1rem;
  }
</style>
<link rel="stylesheet" href="ragi.min.css">
```

**All color variations regenerate automatically!**

Thanks to `color-mix()`, when you change `--color-primary`, these update too:
- `--color-primary-hover`
- `--color-primary-light`
- `--color-primary-bg`

---

## Method 2: Direct Style Overrides

Override any element styles directly (no `!important` needed):

```css
/* Your CSS file */

/* Make buttons pill-shaped */
button {
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Larger headings */
h1 {
  font-size: clamp(3rem, 2.5rem + 3vw, 5rem);
  font-weight: 800;
}

/* Different link style */
a {
  text-decoration: none;
  border-bottom: 2px solid currentColor;
}

/* Custom Card class */
.card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
}
```

**Because your CSS has no layer, it automatically overrides Ragi!**

---

## Method 3: Extend with Custom Layers

Add your own cascade layer for organization:

```css
@layer ragi, custom;

@import 'ragi.css' layer(ragi);

@layer custom {
  /* Your organized custom styles */
  .special-button {
    background: linear-gradient(to right, purple, pink);
    color: white;
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
```

---

## Common Customizations

### Change Primary Color

```css
:root {
  --color-primary: #8b5cf6; /* Purple */
}
```

**All derived colors update automatically:**
- Buttons use new primary
- Links use new primary
- Focus rings use new primary
- Light/dark variations generated with `color-mix()`

### Use Custom Font

```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}
```

Or load from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
  :root {
    --font-sans: 'Inter', system-ui, sans-serif;
  }
</style>
```

### Adjust Spacing Scale

```css
:root {
  --space-unit: 1.25rem; /* Increase from 1rem to 1.25rem */
}

/* ALL spacing scales proportionally:
   --space-xs, --space-sm, --space-md, etc. */
```

### Change Border Radius

```css
:root {
  /* Make everything more rounded */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

/* Or make everything sharp */
:root {
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-xl: 0;
}
```

### Fluid Typography Adjustments

```css
/* Larger body text */
body {
  font-size: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
}

/* Much larger headings */
h1 {
  font-size: clamp(2.5rem, 2rem + 4vw, 5rem);
}

h2 {
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
}
```

### Dark Background Site

```css
:root {
  --color-bg: #0a0a0a;
  --color-text: #f5f5f5;
  --color-border: #333;
  --color-bg-secondary: #1a1a1a;
}
```

---

## Advanced Customizations

### Add Gradient Buttons

```css
button,
input[type="submit"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

button:hover,
input[type="submit"]:hover {
  background: linear-gradient(135deg, #667eea 20%, #764ba2 120%);
}
```

### Custom Card Hover Effect

```css
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Glassmorphism Effect

```css
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Animated Underlines for Links

```css
a {
  position: relative;
  text-decoration: none;
}

a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### Custom Input Focus Glow

```css
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  box-shadow:
    0 0 0 3px rgba(59, 130, 246, 0.1),
    0 0 20px rgba(59, 130, 246, 0.2),
    0 0 40px rgba(59, 130, 246, 0.1);
}
```

---

## Theming

### Create Multiple Themes

```html
<style>
  /* Default theme */
  :root {
    --color-primary: #3b82f6;
    --color-bg: #ffffff;
    --color-text: #1a202c;
  }

  /* Purple theme */
  [data-theme="purple"] {
    --color-primary: #8b5cf6;
    --color-secondary: #ec4899;
  }

  /* Green theme */
  [data-theme="green"] {
    --color-primary: #10b981;
    --color-secondary: #14b8a6;
  }

  /* Dark theme */
  [data-theme="dark"] {
    --color-bg: #111827;
    --color-text: #f3f4f6;
    --color-border: #374151;
  }
</style>

<body data-theme="purple">
  <!-- Content uses purple theme -->
</body>
```

**JavaScript theme switcher:**

```javascript
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}
```

### Automatic Dark Mode

```css
/* Respect user's system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #111827;
    --color-text: #f3f4f6;
    --color-border: #374151;
    --color-bg-secondary: #1f2937;
  }
}
```

### Manual Dark Mode Toggle

```html
<style>
  /* Light mode (default) */
  :root {
    --color-bg: #ffffff;
    --color-text: #1a202c;
    --color-border: #e2e8f0;
  }

  /* Dark mode */
  .dark {
    --color-bg: #111827;
    --color-text: #f3f4f6;
    --color-border: #374151;
  }
</style>

<script>
  // Toggle dark mode
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode',
      document.documentElement.classList.contains('dark'));
  }

  // Load saved preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  }
</script>

<button onclick="toggleDarkMode()">Toggle Dark Mode</button>
```

---

## Responsive Customization

### Override Grid Breakpoints

Container queries adapt automatically, but you can customize:

```css
/* Smaller breakpoint for cards */
@container (min-width: 350px) {
  .card:has(img) {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}

/* Larger breakpoint for sidebar */
@container viewport (min-width: 1200px) {
  body:has(aside) {
    grid-template-columns: 1fr 25rem;
  }
}
```

### Custom Grid Columns

```css
/* Always 2 columns minimum */
.grid {
  grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
}

/* Always 4 columns on desktop */
@media (min-width: 1200px) {
  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Adjust Fluid Spacing

```css
/* Tighter spacing */
main {
  padding-inline: clamp(0.5rem, 3vw, 2rem);
}

/* More generous spacing */
.region {
  padding-block: clamp(3rem, 8vw, 8rem);
}
```

---

## Typography Customization

### Font Pairing

```css
:root {
  /* Serif headings, sans-serif body */
  --font-serif: 'Merriweather', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
}

body {
  font-family: var(--font-sans);
}
```

### Tighter Line Height

```css
:root {
  --line-height-tight: 1.1;
  --line-height-normal: 1.5;
  --line-height-loose: 1.7;
}
```

### Different Heading Scale

```css
/* Larger scale (1.5 ratio instead of 1.25) */
h1 {
  font-size: clamp(2.5rem, 2rem + 3vw, 4.5rem);
}

h2 {
  font-size: clamp(1.67rem, 1.5rem + 2vw, 3rem);
}

h3 {
  font-size: clamp(1.11rem, 1rem + 1vw, 2rem);
}
```

---

## Layout Customization

### Wider Main Content

```css
main {
  max-width: 90rem; /* Instead of 70rem */
}
```

### Always Show Sidebar

```css
/* Remove container query, always show sidebar */
body:has(aside) {
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: var(--space-xl);
}
```

### Center Everything

```css
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
```

### Full-Width Sections

```css
.full-width {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding-inline: clamp(1rem, 5vw, 3rem);
}
```

---

## Form Customization

### Larger Form Inputs

```css
input,
textarea,
select {
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
}
```

### Different Validation Colors

```css
:root {
  --color-success: #22c55e;
  --color-danger: #f43f5e;
}

input:valid:not(:placeholder-shown) {
  border-color: var(--color-success);
  background: rgba(34, 197, 94, 0.05);
}

input:invalid:not(:placeholder-shown) {
  border-color: var(--color-danger);
  background: rgba(244, 63, 94, 0.05);
}
```

### Custom Checkbox Style

```css
input[type="checkbox"]:checked {
  background: var(--color-success); /* Green instead of primary */
}

input[type="checkbox"] {
  border-radius: var(--radius-full); /* Round instead of square */
}
```

---

## Performance Optimization

### Load Subset of Framework

If you're not using certain features, remove them:

```css
/* Copy src/ files and remove unneeded imports */
@layer reset, variables, base, layout, components;

@import './1-reset.css';
@import './2-variables.css';
@import './3-typography.css';
/* Skip forms if you don't have any */
/* @import './4-forms.css'; */
@import './5-layout.css';
```

### Inline Critical CSS

For better performance, inline minimal styles:

```html
<style>
  /* Critical CSS - above the fold styles */
  body { font-family: system-ui; line-height: 1.6; }
  h1 { font-size: clamp(2rem, 5vw, 3rem); }
  /* ... minimal styles ... */
</style>

<!-- Load full framework after -->
<link rel="stylesheet" href="ragi.min.css" media="print" onload="this.media='all'">
```

---

## Complete Example: Custom Theme

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Ragi Theme</title>

  <!-- Custom theme BEFORE Ragi -->
  <style>
    :root {
      /* Brand colors */
      --color-primary: #8b5cf6;
      --color-secondary: #ec4899;

      /* Custom font */
      --font-sans: 'Inter', system-ui, sans-serif;

      /* Tighter spacing */
      --space-unit: 0.875rem;

      /* Rounder corners */
      --radius-md: 0.75rem;
      --radius-lg: 1rem;
    }

    /* Custom button style */
    button {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    }

    /* Card customization */
    .card {
      border: 2px solid var(--color-border);
      transition: all 0.3s ease;
    }

    .card:hover {
      border-color: var(--color-primary);
      transform: translateY(-4px);
    }
  </style>

  <!-- Load Inter font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Ragi CSS -->
  <link rel="stylesheet" href="ragi.min.css">
</head>
<body>
  <main>
    <h1>My Custom Site</h1>
    <p>With custom theme based on Ragi CSS!</p>

    <div class="grid">
      <article class="card">
        <h3>Feature 1</h3>
        <p>Custom styled card</p>
        <button>Learn More</button>
      </article>

      <article class="card">
        <h3>Feature 2</h3>
        <p>With gradient buttons</p>
        <button>Learn More</button>
      </article>
    </div>
  </main>
</body>
</html>
```

---

## Tips & Best Practices

### 1. Use CSS Variables First

Start with CSS variables before overriding styles directly:

```css
/* ✅ Good: Override variables */
:root {
  --color-primary: rebeccapurple;
}

/* ⚠️ Okay but more work: Override styles */
button {
  background: rebeccapurple;
}
```

### 2. Leverage color-mix()

Let Ragi generate color variations:

```css
/* Just set base color */
:root {
  --color-primary: #8b5cf6;
}

/* These are auto-generated:
   --color-primary-hover (darker)
   --color-primary-light (lighter)
   --color-primary-bg (very light background) */
```

### 3. Keep Semantic HTML

Don't add classes just for styling, unless you are defining a custom component:

```html
<!-- ✅ Good: Semantic HTML -->
<article>
  <h3>Title</h3>
  <p>Content</p>
</article>

<!-- ❌ Bad: Too many classes -->
<div class="card card-primary card-elevated card-rounded">
  <div class="card-title">Title</div>
  <div class="card-content">Content</div>
</div>
```

### 4. Test in Multiple Browsers

Ensure your customizations work in all target browsers:
- Chrome 113+
- Firefox 117+
- Safari 16.6+

### 5. Document Your Customizations

Keep a separate `custom.css` file:

```css
/**
 * Custom Theme for MyApp
 * Based on Ragi CSS with brand colors
 */

:root {
  --color-primary: #8b5cf6;  /* Brand purple */
  --color-secondary: #ec4899; /* Brand pink */
  /* ... */
}
```

---

## Troubleshooting

### My styles aren't applying

**Problem:** Framework styles override your custom styles.

**Solution:** Make sure your CSS comes AFTER Ragi:

```html
<link rel="stylesheet" href="ragi.min.css">
<link rel="stylesheet" href="custom.css"> <!-- Your CSS after -->
```

Or use higher specificity (though usually not needed):

```css
body button {
  /* More specific than just 'button' */
}
```

### Colors aren't changing

**Problem:** CSS variable override not working.

**Solution:** Set variables BEFORE importing Ragi, or use more specific selector:

```html
<!-- Option 1: Before Ragi -->
<style>
  :root { --color-primary: blue; }
</style>
<link rel="stylesheet" href="ragi.min.css">

<!-- Option 2: After Ragi with higher specificity -->
<link rel="stylesheet" href="ragi.min.css">
<style>
  :root { --color-primary: blue !important; }
</style>
```

### Container queries not working

**Problem:** Browser doesn't support container queries.

**Solution:** Check browser version. Requires Chrome 107+, Firefox 110+, Safari 16.6+.

Use feature detection:

```css
@supports (container-type: inline-size) {
  /* Container query styles */
}
```

---

## Next Steps

- **[API Reference](./api.md)** - Complete list of CSS variables
- **[Examples](./examples.md)** - Real-world customization examples
- **[Getting Started](./getting-started.md)** - Back to basics

---

**Questions?** Open an issue on [GitHub](https://github.com/rahulragi/ragi-css/issues)!
