# 🔥 Flint Form

**The simplest form SDK ever.** Just add one script tag and you're done.

## ⚡ Quick Start

### Super Simple (Auto-initialize)
```html
<script src="https://unpkg.com/flint-form@latest/dist/flint-form.js"></script>
<div id="flint-form-root"></div>
```

That's it! The form appears automatically. No React, no Tailwind CDN, no configuration needed.

## 🎯 Features

- ✅ **Zero Dependencies** - Everything bundled (React + Tailwind CSS)
- ✅ **Auto-Initialize** - Just add a div with `id="flint-form-root"`
- ✅ **Production Ready** - Optimized, minified bundle
- ✅ **Fully Validated** - Built-in Zod validation
- ✅ **Type Safe** - Written in TypeScript

## 📖 Usage Examples

### Option 1: Auto-Initialize (Simplest)
```html
<script src="flint-form.js"></script>
<div id="flint-form-root"></div>
```

### Option 2: Custom Container
```html
<div id="my-form"></div>
<script src="flint-form.js"></script>
<script>
  new FlintForm().init({ containerId: 'my-form' });
</script>
```

### Option 3: Custom Submit Handler
```html
<div id="my-form"></div>
<script src="flint-form.js"></script>
<script>
  new FlintForm().init({
    containerId: 'my-form',
    onSubmit: async (data) => {
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    }
  });
</script>
```

## 📦 Installation

### Via CDN
```html
<script src="https://unpkg.com/flint-form@latest/dist/flint-form.js"></script>
```

### Via npm
```bash
npm install flint-form
```

## 🚀 Bundle Size

- **Full bundle**: ~450KB (includes React + Tailwind CSS)
- **Gzipped**: ~120KB

## 🛠️ API Reference

### `FlintForm`

#### `init(config?: FlintFormConfig)`

Initialize the form with optional configuration.

**Config Options:**
- `containerId?: string` - Element ID where form renders (default: `'flint-form-root'`)
- `onSubmit?: (data: FormData) => void | Promise<void>` - Custom submit handler
- `onError?: (error: Error) => void` - Error handler

#### `destroy()`

Remove the form and clean up resources.

## 📄 License

MIT © Flint Form
