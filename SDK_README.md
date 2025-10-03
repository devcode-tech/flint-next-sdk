# Dynamic Form SDK

A powerful, schema-driven form builder SDK that works everywhere - React, Next.js, Vue, or plain HTML.

## 🚀 Quick Start

### Using via Script Tag (Pure HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="./dist/dynamic-form-sdk.umd.js"></script>
</head>
<body>
  <div id="my-form"></div>
  
  <script>
    const sdk = new DynamicFormSDK();
    sdk.init({
      containerId: 'my-form',
      schema: yourFormSchema,
      onSubmit: (data) => {
        console.log('Form submitted:', data);
      }
    });
  </script>
</body>
</html>
```

### Using in React/Next.js

```bash
npm install dynamic-form-sdk
```

```tsx
import { DynamicForm } from 'dynamic-form-sdk';
import type { FormSchema } from 'dynamic-form-sdk';

function MyForm() {
  const schema: FormSchema = {
    // your schema here
  };

  const handleSubmit = (data) => {
    console.log(data);
  };

  return <DynamicForm schema={schema} onSubmit={handleSubmit} />;
}
```

## 📦 Building the SDK

```bash
# Install dependencies
npm install

# Build the SDK
npm run build:sdk

# Watch mode for development
npm run build:watch

# Test the example
npm run serve:example
# Open http://localhost:3001/example.html
```

## 📖 API Reference

### DynamicFormSDK Class

#### `init(config)`
Initialize and render the form.

```javascript
sdk.init({
  containerId: 'my-form',     // Required: DOM element ID
  schema: formSchema,          // Required: Form schema object
  onSubmit: (data) => {},      // Required: Submit handler
  onError: (error) => {},      // Optional: Error handler
  isSubmitting: false          // Optional: Submit state
});
```

#### `update(schema, onSubmit?)`
Update the form with a new schema.

```javascript
sdk.update(newSchema);
```

#### `destroy()`
Unmount and clean up the form.

```javascript
sdk.destroy();
```

## 🎨 Form Schema Structure

```typescript
{
  id: "form_id",
  name: "form_name",
  title: "Form Title",
  description: "Form description",
  fields: [
    {
      id: "field_1",
      name: "field_name",
      type: "text" | "email" | "date" | "postal" | "file" | "checkbox" | "dropdown" | "terms",
      label: "Field Label",
      placeholder: "Placeholder text",
      required: true,
      width: "w-full" | "w-1/2",
      validation: {
        requiredMessage: "This field is required"
      },
      style: {
        label: { /* CSS properties */ },
        input: { /* CSS properties */ }
      }
    }
  ],
  design: {
    "background-color": "#ffffff",
    "font-family": "system-ui",
    padding: "p-8",
    "max-width": "max-w-4xl",
    "border-radius": "rounded-lg",
    "submit-button": {
      text: "Submit",
      "background-color": "#3B82F6",
      "text-color": "#ffffff",
      padding: "12px 24px",
      "border-radius": "8px",
      alignment: "center"
    }
  }
}
```

## 🎯 Field Types

- **text**: Text input
- **email**: Email input with validation
- **date**: Date picker with format validation
- **postal**: Postal code with country format
- **file**: File upload with type/size validation
- **checkbox**: Single checkbox
- **dropdown**: Select dropdown
- **terms**: Terms and conditions with links

## 📄 License

MIT
