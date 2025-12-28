# Ragi CSS

**Modern Classless CSS Framework using 2024-2025 CSS Features**

> Currently in development - Week 1 complete (Reset & Variables)

## What is Ragi CSS?

Ragi CSS is a classless CSS framework that styles semantic HTML automatically. Write `<button>` and it looks great - no classes needed.

Unlike other classless frameworks (Pico, MVP, Water), Ragi uses cutting-edge CSS features:

- ✅ **Cascade Layers** - Guaranteed user override safety
- ✅ **Container Queries** - Responsive components
- ✅ **@property** - Type-safe design tokens
- ✅ **:has()** - Smart conditional styling
- ✅ **Native CSS Nesting** - No preprocessor needed
- ✅ **color-mix()** - Dynamic color variations
- ✅ **:focus-visible** - Keyboard-only focus states

## Browser Support

- Chrome 113+
- Firefox 117+
- Safari 16.6+
- Edge 113+

(78-96% global coverage depending on feature)

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="dist/ragi.css">
</head>
<body>
  <main>
    <h1>Hello World</h1>
    <p>No classes needed!</p>
    <button>Click me</button>
  </main>
</body>
</html>
```

## Development Status

### Week 1: Reset & Variables ✅ COMPLETE
- [x] Project structure
- [x] Build pipeline (PostCSS)
- [x] Reset layer (normalize browsers)
- [x] Variables layer with @property
- [x] Color system with color-mix()
- [x] Spacing scale
- [x] Basic test page

### Week 2: Typography ✅ COMPLETE
- [x] Fluid typography with clamp()
- [x] Modular scale headings (1.25 ratio)
- [x] Headings, paragraphs, lists
- [x] Code blocks (inline, kbd, samp, pre)
- [x] Links with :focus-visible
- [x] Blockquotes, hr, inline elements
- [x] Typography examples page

### Week 3: Forms ✅ COMPLETE
- [x] All input types (text, email, password, number, etc.)
- [x] Textarea, select (single & multiple)
- [x] Checkboxes & radio buttons with custom styling
- [x] Range sliders, file uploads, color picker
- [x] Date/time inputs
- [x] Buttons with color-mix() hover states
- [x] :has() conditional form validation (no JS!)
- [x] :focus-visible for keyboard navigation
- [x] Smart validation states
- [x] Progress & meter elements
- [x] Forms examples page

### Coming Soon
- Week 4: Layout with container queries
- Week 5-6: Components and themes
- Week 7: Accessibility layer
- Week 8: Dark mode with color-mix()

## Build

```bash
# Install dependencies
npm install

# Build CSS
npm run build

# Build minified version
npm run build:min

# Build all versions
npm run build:all

# Watch mode
npm watch
```

## Project Structure

```
ragi.css/
├── src/
│   ├── 1-reset.css          ✅ Week 1
│   ├── 2-variables.css      ✅ Week 1-2
│   ├── 3-typography.css     ✅ Week 2
│   ├── 4-forms.css          ✅ Week 3
│   ├── 5-layout.css         ⏳ Week 3-4
│   ├── 6-components.css     ⏳ Week 5-6
│   ├── 7-accessibility.css  ⏳ Week 7
│   └── 8-themes.css         ⏳ Week 8
├── dist/
│   ├── ragi.css
│   ├── ragi.min.css
│   └── ragi-core.css
├── examples/
│   ├── basic.html           ✅ Week 1
│   ├── typography.html      ✅ Week 2
│   └── forms.html           ✅ Week 3
├── docs/
│   ├── RESEARCH.md          ✅ Complete research
│   └── PLAN.md              ✅ Implementation plan
└── tests/
```

## Features

### Cascade Layers (Killer Feature)

User styles **always** override framework without `!important`:

```css
/* Framework uses layers */
@layer reset, variables, base, components;

/* Your CSS (no layer) automatically wins */
button {
  border-radius: 9999px; /* Just works! */
}
```

### Type-Safe Design Tokens (@property)

```css
@property --color-primary {
  syntax: '<color>';
  inherits: true;
  initial-value: #3b82f6;
}

/* Browser validates types */
--color-primary: #ff0000;  /* ✅ Valid */
--color-primary: 20px;     /* ❌ Rejected */
```

### Dynamic Colors (color-mix())

```css
/* Define once, generate variations */
--color-primary: #3b82f6;
--color-primary-hover: color-mix(in srgb, var(--color-primary) 85%, black);
--color-primary-light: color-mix(in srgb, var(--color-primary) 20%, white);
```

## Customization

Override any CSS variable:

```html
<style>
  :root {
    --color-primary: rebeccapurple;
    --space-unit: 1.5rem;
    --font-sans: 'Inter', system-ui, sans-serif;
  }
</style>
<link rel="stylesheet" href="ragi.css">
```

## Documentation

- [Complete Research](./RESEARCH.md) - Why this framework is needed
- [Implementation Plan](./PLAN.md) - Week-by-week roadmap
- [Getting Started](./docs/getting-started.md) - Coming soon
- [Customization Guide](./docs/customization.md) - Coming soon
- [API Reference](./docs/api.md) - Coming soon

## Why Ragi?

**"Ragi"** is a nutritious grain (finger millet) - small but powerful, just like this framework.

Also: **R**esponsive **A**ccessible **G**eneric **I**nterface

## License

MIT © Rahul Ragi

## Contributing

Coming soon - accepting contributions after Week 8 completion.

## Roadmap

- **v0.1** - Week 1-2 (Reset, Variables, Typography)
- **v0.2** - Week 3-4 (Forms, Layout)
- **v0.3** - Week 5-6 (Components, Themes)
- **v0.4** - Week 7-8 (Accessibility, Dark mode)
- **v1.0** - Week 9-12 (Testing, Documentation, Launch)

---

**Status:** 🚧 In Development (Week 1-3 Complete)
**Next:** Week 4 - Layout with container queries
