# Getting Started with Ragi CSS

**Ragi CSS** is a modern classless CSS framework that styles semantic HTML automatically using cutting-edge CSS features from 2024-2025.

## What is Classless CSS?

Classless CSS frameworks style HTML elements directly without requiring class names. Write `<button>` and it looks great automatically - no need for `<button class="btn btn-primary">`.

**Benefits:**
- ✅ Write semantic HTML without memorizing classes
- ✅ Better accessibility (enforces proper HTML structure)
- ✅ Smaller HTML files (no class bloat)
- ✅ Perfect for AI-generated content
- ✅ Faster development (no CSS decisions)

---

## Installation

### Option 1: CDN (Quickest)

Add one line to your HTML `<head>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Site</title>

  <!-- Ragi CSS from CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ragi-css@latest/dist/ragi.min.css">
</head>
<body>
  <main>
    <h1>Hello World!</h1>
    <p>No classes needed!</p>
    <button>Click Me</button>
  </main>
</body>
</html>
```

**That's it!** Your page is now styled.

### Option 2: npm

Install via npm:

```bash
npm install ragi-css
```

Import in your CSS or JavaScript:

```css
/* In your CSS file */
@import 'ragi-css';
```

```javascript
// In your JavaScript (with a bundler)
import 'ragi-css/dist/ragi.min.css';
```

### Option 3: Download

Download the latest release from [GitHub](https://github.com/rahulragi/ragi-css/releases) and include it in your project:

```html
<link rel="stylesheet" href="path/to/ragi.min.css">
```

---

## Quick Start

### 1. Create a Basic Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Ragi Page</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ragi-css@latest/dist/ragi.min.css">
</head>
<body>
  <main>
    <h1>Welcome to My Site</h1>
    <p>This paragraph is automatically styled with optimal line length and spacing.</p>

    <h2>Features</h2>
    <ul>
      <li>Semantic HTML only</li>
      <li>No classes required</li>
      <li>Modern CSS features</li>
    </ul>

    <button>Get Started</button>
  </main>
</body>
</html>
```

**Preview:** Open in browser - everything is styled!

### 2. Add a Form

Forms work automatically with smart validation:

```html
<form>
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" placeholder="John Doe" required>
  </div>

  <div>
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="john@example.com" required>
  </div>

  <div>
    <label for="message">Message</label>
    <textarea id="message" placeholder="Your message..."></textarea>
  </div>

  <button type="submit">Send Message</button>
</form>
```

**Features:**
- Submit button auto-disables when form is invalid (using `:has()`)
- Focus rings only show for keyboard navigation (`:focus-visible`)
- Validation states show automatically (valid/invalid)
- No JavaScript needed!

---

## Core Concepts

### 1. Semantic HTML First

Ragi styles HTML elements directly. Use proper semantic tags:

```html
<!-- ✅ Good: Semantic HTML -->
<article>
  <header>
    <h2>Article Title</h2>
    <time>December 29, 2025</time>
  </header>
  <p>Article content...</p>
  <footer>
    <small>Tags: CSS, Web Design</small>
  </footer>
</article>

<!-- ❌ Bad: Generic divs -->
<div class="article">
  <div class="article-header">
    <div class="article-title">Article Title</div>
    <div class="article-date">December 29, 2025</div>
  </div>
  <div class="article-content">Article content...</div>
  <div class="article-footer">Tags: CSS, Web Design</div>
</div>
```

**Key semantic elements:**
- `<header>`, `<main>`, `<footer>` - Page structure
- `<article>`, `<section>`, `<aside>` - Content sections
- `<nav>` - Navigation
- `<h1>` to `<h6>` - Headings
- `<p>`, `<ul>`, `<ol>`, `<dl>` - Text content
- `<button>`, `<a>` - Interactive elements
- `<form>`, `<input>`, `<label>` - Forms

### 2. Zero Classes

Most elements need **zero classes**:

```html
<!-- No classes needed! -->
<button>Primary Button</button>
<input type="email" placeholder="your@email.com">
<blockquote>This is a quote</blockquote>
```

### 3. Container Queries

Components respond to their **container's** width, not the viewport:

```html
<!-- Article adapts based on its container -->
<article>
  <img src="image.jpg" alt="...">
  <h3>Title</h3>
  <p>Content</p>
</article>
```

**Wide container:** Card goes horizontal (image + text side-by-side)
**Narrow container:** Card stays vertical (image on top)

**No media queries needed!** The component adapts automatically.

### 4. Modern CSS Features

Ragi uses CSS features from 2024-2025:

- **Container Queries** - Responsive components
- **Cascade Layers** - Guaranteed override safety
- **@property** - Type-safe CSS variables
- **:has()** - Parent selector (form validation)
- **:focus-visible** - Keyboard-only focus
- **color-mix()** - Dynamic color generation
- **clamp()** - Fluid sizing
- **Subgrid** - Perfect alignment

**Browser support:** Chrome 113+, Firefox 117+, Safari 16.6+ (82-96% global coverage)

---

## Common Patterns

### Blog Post Layout

```html
<main>
  <article class="container-narrow">
    <header>
      <h1>Article Title</h1>
      <div class="cluster">
        <small>By Author Name</small>
        <small>•</small>
        <time>December 29, 2025</time>
        <small>•</small>
        <small>5 min read</small>
      </div>
    </header>

    <div class="ratio-16-9">
      <img src="hero.jpg" alt="Hero image">
    </div>

    <div class="flow">
      <p class="lead">Introduction paragraph...</p>

      <h2>Section Heading</h2>
      <p>Content...</p>

      <blockquote>
        <p>A quote from someone...</p>
        <cite>Author Name</cite>
      </blockquote>

      <h2>Another Section</h2>
      <p>More content...</p>
    </div>
  </article>
</main>
```

**Classes used:**
- `.container-narrow` - 50rem max-width for reading
- `.cluster` - Inline metadata grouping
- `.ratio-16-9` - 16:9 aspect ratio for hero image
- `.flow` - Consistent spacing between elements
- `.lead` - Larger intro paragraph (optional)

### Contact Form

```html
<main>
  <div class="container-narrow">
    <h1>Get in Touch</h1>
    <p>Fill out the form below and we'll get back to you shortly.</p>

    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" required>
      </div>

      <div>
        <label for="email">Email</label>
        <input type="email" id="email" required>
      </div>

      <div>
        <label for="subject">Subject</label>
        <select id="subject" required>
          <option value="">Choose...</option>
          <option value="general">General Inquiry</option>
          <option value="support">Support</option>
        </select>
      </div>

      <div>
        <label for="message">Message</label>
        <textarea id="message" rows="6" required></textarea>
      </div>

      <div>
        <label>
          <input type="checkbox" required>
          I agree to the privacy policy
        </label>
      </div>

      <button type="submit">Send Message</button>
    </form>
  </div>
</main>
```

**Features:**
- Submit button disables when form is invalid (`:has()`)
- Validation messages appear automatically
- Keyboard navigation with `:focus-visible`
- All responsive automatically

### Dashboard Layout

```html
<main class="container-wide">
  <header class="cluster-between">
    <h1>Dashboard</h1>
    <div class="cluster">
      <button>Export</button>
      <button>Settings</button>
    </div>
  </header>

  <!-- Stats cards -->
  <div class="grid-3">
    <article class="card">
      <h3>1,234</h3>
      <p>Total Users</p>
    </article>
    <article class="card">
      <h3>$12,345</h3>
      <p>Revenue</p>
    </article>
    <article class="card">
      <h3>56</h3>
      <p>Pending Orders</p>
    </article>
  </div>

  <!-- Content grid -->
  <div class="grid-2">
    <article class="card">
      <header><h3>Recent Activity</h3></header>
      <ul>
        <li>User signed up - 2 min ago</li>
        <li>Order completed - 5 min ago</li>
      </ul>
    </article>

    <article class="card">
      <header><h3>Quick Actions</h3></header>
      <div class="stack">
        <button>Create User</button>
        <button>View Reports</button>
      </div>
    </article>
  </div>
</main>
```

**Classes used:**
- `.container-wide` - 90rem max-width
- `.cluster-between` - Space between header items
- `.grid-3` - 3-column auto-responsive grid
- `.grid-2` - 2-column auto-responsive grid
- `.card` - Card component with border and hover
- `.stack` - Vertical spacing

---

## Customization Basics

### Override Colors

```html
<style>
  :root {
    --color-primary: rebeccapurple;
    --color-secondary: teal;
  }
</style>
<link rel="stylesheet" href="ragi.min.css">
```

**Note:** Put your custom CSS **before** importing Ragi for colors, **after** for everything else.

### Override Typography

```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --line-height-normal: 1.7;
}

h1 {
  font-size: clamp(2.5rem, 2rem + 3vw, 4rem);
}
```

### Override Spacing

```css
:root {
  --space-unit: 1.5rem; /* Default is 1rem */
}

/* All spacing scales proportionally! */
```

### Add Custom Styles

Because Ragi uses cascade layers, your CSS always wins:

```css
/* Your CSS (no layer = highest priority) */
button {
  border-radius: 9999px; /* Pill buttons */
  text-transform: uppercase;
}

/* Overrides framework styles without !important */
```

**See [Customization Guide](./customization.md) for more details.**

---

## Browser Support

**Modern browsers (2024-2025):**
- ✅ Chrome 113+ (released April 2023)
- ✅ Firefox 117+ (released August 2023)
- ✅ Safari 16.6+ (released July 2023)
- ✅ Edge 113+ (released May 2023)

**Coverage:** 82-96% of global users (depending on feature)

**Progressive Enhancement:**
- Container queries: 82% (Chrome 107+, Firefox 110+, Safari 16.6+)
- Subgrid: 78% (fallback to regular grid)
- Other features: 90%+ support

**Not supported:**
- ❌ Internet Explorer (discontinued)
- ❌ Chrome < 113
- ❌ Firefox < 117
- ❌ Safari < 16.6

**Graceful degradation:** Older browsers get basic styling without modern features.

---

## File Size

**Production builds:**
- `ragi.min.css` - 25 KB (5.44 KB gzipped)
- `ragi-core.css` - Coming soon (without themes)

**What you get for 5.44 KB:**
- Complete reset layer
- Type-safe design tokens
- Fluid responsive typography
- All form elements styled
- Container query layouts
- Grid systems
- Layout primitives
- Card components
- Zero JavaScript

**Comparison:**
- Ragi: 5.44 KB gzipped
- Pico CSS: 7-10 KB gzipped
- Tailwind: ~10-50 KB gzipped (depending on usage)
- Bootstrap: ~25 KB gzipped

---

## Next Steps

### Learn More

- **[Customization Guide](./customization.md)** - Override colors, fonts, spacing
- **[API Reference](./api.md)** - All CSS variables and classes
- **[Examples](./examples.md)** - Real-world page templates

### Explore Examples

View the example pages in your browser:

```bash
# Clone the repo
git clone https://github.com/rahulragi/ragi-css.git
cd ragi-css

# Open examples
open examples/typography.html
open examples/forms.html
open examples/layout.html
```

### Get Help

- **GitHub Issues:** [Report bugs or ask questions](https://github.com/rahulragi/ragi-css/issues)
- **Discussions:** [Community discussions](https://github.com/rahulragi/ragi-css/discussions)
- **Documentation:** [Full docs](https://ragi-css.com) (coming soon)

### Contribute

Contributions are welcome! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

## FAQs

### Can I use Ragi with Tailwind?

Yes! Ragi uses cascade layers, so you can layer Tailwind on top:

```css
@layer ragi, tailwind;

@import 'ragi.css' layer(ragi);
@import 'tailwind.css' layer(tailwind);
```

Semantic HTML gets Ragi styles, Tailwind classes work when you need them.

### Can I use Ragi with React/Vue/Svelte?

Yes! Just import the CSS:

```javascript
// In your app entry point
import 'ragi-css/dist/ragi.min.css';
```

Or link it in your HTML template.

### Do I need a build step?

No! Ragi is pure CSS. Just link the stylesheet:

```html
<link rel="stylesheet" href="ragi.min.css">
```

No npm, no webpack, no build required. (Though npm is supported if you want it.)

### Can I override framework styles?

Yes! Because Ragi uses cascade layers, your CSS automatically overrides framework styles:

```css
/* Your CSS (no layer) always wins */
button {
  background: hotpink; /* Overrides framework */
}
```

No `!important` needed!

### What about dark mode?

Dark mode is coming in Week 8 (Themes layer). For now, you can add it yourself:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f3f4f6;
    --color-bg: #111827;
    --color-border: #374151;
  }
}
```

### Is Ragi production-ready?

The core framework (Weeks 1-4) is complete and ready for production:
- ✅ Reset, Variables, Typography, Forms, Layout
- ✅ Tested in modern browsers
- ✅ Semantic HTML support
- ✅ Accessible by default

Components and themes (Weeks 5-8) are optional enhancements.

### How is this different from Pico CSS?

**Similarities:**
- Both are classless/minimal class frameworks
- Both style semantic HTML
- Both are lightweight

**Ragi advantages:**
- ✅ Container queries (Pico doesn't have)
- ✅ Cascade layers for guaranteed overrides (Pico doesn't have)
- ✅ @property for type-safe variables (Pico doesn't have)
- ✅ :has() for smart validation (Pico doesn't have)
- ✅ Native CSS nesting (Pico doesn't have)
- ✅ Subgrid support (Pico doesn't have)

**When to use Pico:**
- Need older browser support
- Want a more conservative approach
- Prefer class-based version

**When to use Ragi:**
- Want cutting-edge CSS features
- Need container queries
- Want guaranteed override safety with cascade layers
- Building for modern browsers only

---

## Quick Reference

### Key CSS Variables

**Colors:**
```css
--color-primary: #3b82f6;
--color-secondary: #8b5cf6;
--color-success: #10b981;
--color-danger: #ef4444;
--color-warning: #f59e0b;
```

**Typography:**
```css
--font-sans: system-ui, sans-serif;
--font-mono: 'SF Mono', monospace;
--line-height-normal: 1.6;
```

**Spacing:**
```css
--space-unit: 1rem; /* Base unit, all spacing scales from this */
```

**See [API Reference](./api.md) for complete list.**

---

## License

MIT © Rahul Ragi

---

**Ready to build?** Start with semantic HTML and let Ragi handle the styling! 🚀
