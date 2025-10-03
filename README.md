# Dynamic Form SDK

A comprehensive Dynamic Form SDK for Next.js with TypeScript, Radix UI, and Tailwind CSS. This SDK allows you to generate fully functional, validated forms from JSON schema definitions.

## 🚀 Features

- **Dynamic Form Generation**: Create forms from JSON schema definitions
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Validation**: Built-in validation with Zod schema validation
- **UI Components**: Beautiful UI components using Radix UI primitives
- **Styling**: Responsive design with Tailwind CSS
- **Field Types**: Support for multiple field types:
  - Text input
  - Email input  
  - Date picker with age validation
  - Canadian postal code validation
  - File upload with type and size validation
  - Checkboxes
  - Dropdown/Select
  - Terms and conditions (with links)
- **Form Management**: Powered by React Hook Form
- **Customizable**: Extensive styling and layout options

## 📦 Installation

```bash
npm install dynamic-form-sdk

# Install peer dependencies
npm install react react-dom @hookform/resolvers @radix-ui/react-checkbox @radix-ui/react-icons @radix-ui/react-select clsx react-hook-form tailwind-merge zod
```

## 🎯 Quick Start

### 1. Basic Usage

```tsx
"use client";

import { DynamicForm } from 'dynamic-form-sdk';
import type { FormSchema, FormData } from 'dynamic-form-sdk';

const formSchema: FormSchema = {
  id: "contact_form",
  name: "contact_form", 
  title: "Contact Us",
  description: "Get in touch with our team",
  fields: [
    {
      id: "name_field",
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
      validation: {
        requiredMessage: "Name is required"
      },
      width: "w-full",
      style: {
        label: { color: "#374151", "font-weight": "500" },
        input: { "border-color": "#d1d5db", "border-radius": "6px" }
      }
    }
  ],
  design: {
    "background-color": "#ffffff",
    "font-family": "Inter",
    padding: "p-6",
    "max-width": "max-w-2xl",
    "border-radius": "rounded-lg",
    "submit-button": {
      text: "Submit",
      "background-color": "#3b82f6", 
      "text-color": "#ffffff",
      padding: "12px 24px",
      "border-radius": "6px"
    }
  }
};

function MyForm() {
  const handleSubmit = async (data: FormData) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <DynamicForm 
      schema={formSchema}
      onSubmit={handleSubmit}
    />
  );
}
```

### 2. Advanced Usage with All Field Types

```tsx
const advancedSchema: FormSchema = {
  id: "advanced_form",
  name: "advanced_form",
  title: "Advanced Form Example", 
  fields: [
    // Text field
    {
      id: "first_name",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      required: true,
      width: "w-1/2"
    },
    
    // Email field
    {
      id: "email",
      name: "email", 
      type: "email",
      placeholder: "Email Address",
      required: true,
      validation: {
        emailMessage: "Please enter a valid email"
      },
      width: "w-1/2"
    },
    
    // Date field with age validation
    {
      id: "dob", 
      name: "dateOfBirth",
      type: "date",
      placeholder: "Date of Birth",
      required: true,
      validation: {
        minAge: 18,
        minAgeMessage: "You must be at least 18 years old"
      },
      dateFormat: "MM/DD/YYYY",
      width: "w-1/2"
    },
    
    // Canadian postal code
    {
      id: "postal",
      name: "postalCode",
      type: "postal", 
      placeholder: "Postal Code",
      required: true,
      validation: {
        postalFormat: "CA"
      },
      width: "w-1/2"
    },
    
    // File upload
    {
      id: "document",
      name: "document",
      type: "file",
      placeholder: "Upload Document",
      required: true,
      validation: {
        maxFileSize: 5,
        fileTypes: ["pdf", "doc", "docx"],
        fileSizeMessage: "File must be under 5MB",
        fileTypeMessage: "Only PDF and Word documents allowed"
      },
      width: "w-full"
    },
    
    // Checkbox
    {
      id: "newsletter",
      name: "subscribeNewsletter", 
      type: "checkbox",
      placeholder: "Subscribe to newsletter",
      required: false,
      width: "w-full"
    },
    
    // Dropdown
    {
      id: "country",
      name: "country",
      type: "dropdown",
      placeholder: "Select Country",
      required: true,
      options: [
        { id: "ca", label: "Canada", value: "canada" },
        { id: "us", label: "United States", value: "usa" }
      ],
      width: "w-full"
    },
    
    // Terms with links  
    {
      id: "terms",
      name: "acceptTerms",
      type: "terms",
      required: true,
      mode: "checkbox",
      content: "I agree to the Terms of Service and Privacy Policy",
      links: [
        { id: "terms", text: "Terms of Service", url: "/terms" },
        { id: "privacy", text: "Privacy Policy", url: "/privacy" }
      ],
      width: "w-full"
    }
  ],
  design: {
    // Design configuration...
  }
};
```

## 🎨 Styling

The SDK supports extensive styling options through the `style` property on each field:

```tsx
{
  style: {
    label: {
      color: "#374151",
      "font-weight": "600", 
      "font-size": "14px",
      "text-align": "left"
    },
    input: {
      "background-color": "#f9fafb",
      "border-color": "#d1d5db", 
      "border-radius": "8px",
      "border-width": "1px",
      padding: "12px 16px",
      "font-size": "16px"
    }
  }
}
```

## 🔧 Configuration

### Form Schema Structure

```typescript
interface FormSchema {
  id: string;
  name: string; 
  title: string;
  description: string;
  fields: FormField[];
  design: FormDesign;
}
```

### Field Types

| Type | Description | Validation Options |
|------|-------------|-------------------|
| `text` | Text input | `requiredMessage` |
| `email` | Email input | `requiredMessage`, `emailMessage` |
| `date` | Date picker | `dateFormat`, `minAge`, `maxDate` |
| `postal` | Postal code | `postalFormat` ("CA" for Canadian) |
| `file` | File upload | `maxFileSize`, `fileTypes`, `fileSizeMessage`, `fileTypeMessage` |
| `checkbox` | Checkbox | `requiredMessage` |
| `dropdown` | Select dropdown | `requiredMessage` + `options` array |
| `terms` | Terms/conditions | `mode` ("checkbox" or "text") + `content` + `links` |

### Layout Classes

Use Tailwind width classes for responsive layouts:
- `w-full` - Full width
- `w-1/2` - Half width  
- `w-1/3` - One third width
- `w-2/3` - Two thirds width
- `w-1/4` - Quarter width

## 📚 API Reference

### DynamicForm Props

```typescript
interface DynamicFormProps {
  schema: FormSchema;           // Form configuration
  onSubmit: (data: FormData) => void | Promise<void>;
  isSubmitting?: boolean;       // Loading state
  className?: string;           // Additional CSS classes
}
```

### Utility Functions

```typescript
// Create validation schema
const validationSchema = createFormValidationSchema(formSchema);

// Format file sizes
const sizeString = formatFileSize(1024576); // "1 MB"

// Validate Canadian postal code  
const isValid = validateCanadianPostalCode("K1A 0A6"); // true

// Check file type
const validType = isValidFileType("document.pdf", ["pdf", "doc"]); // true
```

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd dynamic-form-sdk

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building

```bash
# Build the library
npm run build-lib

# Build Next.js app
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality  
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review example usage in `/src/app/page.tsx`

---

Built with ❤️ by the Windsurf Engineering Team
