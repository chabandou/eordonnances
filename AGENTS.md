# eOrdonnances - Agent Development Guide

This guide provides conventions and patterns for contributing to the eOrdonnances codebase.

## Build & Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Note:** No test framework is currently configured. If implementing tests, set up testing first.

## Project Structure

```
/app
  ├── api/           # API routes (Next.js route handlers)
  ├── diseases/      # Disease-related pages
  ├── ui/            # UI components
  │   ├── icons/     # SVG icon components
  │   ├── details/   # Detail view components
  │   └── index/     # Index page components
  └── libs/          # Utility functions (mongodb, mail, utils)
/models              # Mongoose database models
/public              # Static assets
```

## Code Style Guidelines

### File Conventions
- `.jsx` for React components (client and server)
- `.js` for API routes, models, and utility files
- PascalCase for component files: `DiseaseForm.jsx`, `SpecialtyCards.jsx`
- Lowercase for API routes: `route.js`

### Imports
- Use absolute imports with `@/` alias: `import Disease from "@/models/diseaseModel";`
- Import order: React/Next.js → third-party libraries → local imports
- Place `"use client";` at line 1 for client components (before imports)

```jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Disease from "@/models/diseaseModel";
```

### Naming Conventions
- Components: PascalCase (`DiseaseCard`, `Search`, `Modal`)
- Functions/Variables: camelCase (`getDiseases`, `handleSearch`, `medications`)
- Constants: UPPER_SNAKE_CASE (`ITEMS_PER_PAGE`, `DB_URL`)
- Models: PascalCase (`Disease`, `Medication`, `DxModel`)
- Props: camelCase (`handleClick`, `className`)

### React Components
- Server components by default (no directive)
- Client components: add `"use client";` at top line
- Export default function for main component
- Use clsx for conditional Tailwind classes
- Use async/await for data fetching in server components
- Use useState/useEffect for interactivity in client components

```jsx
"use client";

export default function DiseaseForm() {
  // Component logic
}
```

### API Routes
- Use Next.js route handlers (GET, POST, DELETE, PUT)
- Always call `await connectToMongoDB();` as first operation
- Return `NextResponse.json({ data }, { status })`
- Use try-catch for error handling
- Extract request body with `await request.json()`

```javascript
import Disease from "@/models/diseaseModel";
import { connectToMongoDB } from "@/app/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectToMongoDB();
  const diseases = await Disease.find({});
  return NextResponse.json({ diseases }, { status: 200 });
}
```

### Database & Models
- Use Mongoose models from `/models`
- Define schemas in model files
- Use `Schema.Types.Mixed` for flexible/polymorphic fields
- Connect via `connectToMongoDB()` utility before queries
- Use aggregation for complex queries
- Use `$regex` for case-insensitive searches: `{ $regex: query, $options: "i" }`

```javascript
const diseaseSchema = new Schema({
  disease: {
    name: { type: String, required: true },
    specialty: { type: Schema.Types.Mixed, required: true },
  },
  Rx: Schema.Types.Mixed,
});

const Disease = mongoose.models.Disease || mongoose.model("Disease", diseaseSchema);
```

### Styling (TailwindCSS)
- Use utility classes for styling
- Responsive: mobile-first, breakpoints: `sm`, `md`, `lg`
- Use clsx for conditional classes
- Framer Motion for animations: `<motion.div whileHover={{ scale: 1.1 }} />`
- Accessibility: use `sr-only` class for hidden labels
- Custom classes in globals.css for special effects

```jsx
<div className={clsx(
  "p-4 rounded-lg",
  isActive && "bg-primary",
  !isActive && "bg-gray-100"
)} />
```

### Error Handling
- Use `console.log()` for debugging (development)
- Return error responses in API routes: `NextResponse.json({ error }, { status: 500 })`
- Minimal production error logging
- Check for null/undefined before accessing properties

### Page Configuration
- Add `export const revalidate = 60;` for ISR (incremental static regeneration)
- Add `export const dynamic = 'force-dynamic';` for dynamic pages
- Default: static generation where possible

```javascript
export const revalidate = 60;  // Revalidate every 60 seconds
export const dynamic = 'force-dynamic';
```

### Language & Localization
- Code and comments: English
- UI text and user-facing content: French
- Disease names: French medical terminology
- Component names: English (DiseaseCard, Search)

### Forms & Validation
- Use `react-hook-form` for form management
- Use `useFieldArray` for dynamic form fields (medication lists)
- Client-side validation: required, minLength patterns
- Form submission: fetch API with POST to `/api/...` endpoints

### Accessibility
- Use semantic HTML elements
- Include `sr-only` labels for screen readers
- ARIA attributes for interactive components
- Keyboard navigation support for all interactive elements

### Code Quality
- Run `npm run lint` before committing
- Follow ESLint configuration (extends next/core-web-vitals)
- Avoid commented-out code (delete it instead)
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks or utility functions

### MongoDB Connection
- Never hardcode database URLs
- Use `process.env.DB_URL` for connection string
- Import `connectToMongoDB()` from `/app/libs/mongodb`
- Call before any database operation

### Email (Nodemailer)
- Use `/app/libs/mail.js` for email sending
- Environment variables: `EMAIL_HOST`, `EMAIL_PORT`, `SMTP_EMAIL`, `SMTP_PASSWORD`
- Used for notifications when new diseases are added

## Development Workflow
1. Run `npm run dev` to start dev server
2. Make changes following conventions above
3. Test manually in browser
4. Run `npm run lint` to check for issues
5. No automated tests - manual testing required

## Common Patterns

### Search with Debounce
```jsx
import { useDebouncedCallback } from "use-debounce";

const handleSearch = useDebouncedCallback((term) => {
  // Update URL params
}, 400);
```

### Pagination
- Use `ITEMS_PER_PAGE = 25` constant
- Calculate offset: `(currentPage - 1) * ITEMS_PER_PAGE`
- Use `.skip(offset).limit(ITEMS_PER_PAGE)` in queries

### Dynamic Imports
- For client-side only: `"use client"` directive
- For conditional rendering: check for array/object types
- Handle both Rx as array or object: `Array.isArray(Rx) ? <RxArray /> : <RxObject />`
