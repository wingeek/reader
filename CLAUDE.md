# Reader App - Claude AI Development Guide

## Project Overview

Reader is an elegant reader application with a monochromatic design language, focused on providing an immersive reading experience. The project is fully responsive with mobile-first design, built with a modern tech stack.

### Core Features

- 📱 **Fully Responsive Design** - Mobile-first, perfect for desktop and mobile
- 🎨 **Elegant Visual Design** - Monochromatic color scheme, italic serif fonts, clean typography
- 🏃 **High Performance** - Astro SSR + React 19 + Tailwind CSS 4
- 🔒 **Type Safety** - Full TypeScript support
- 📐 **Design System** - Unified component and style standards

---

## Tech Stack

### Core Frameworks
- **Astro 5.0** - Modern web framework with SSR/SSG support
- **React 19** - Latest UI library
- **TypeScript 5.7** - Type-safe development

### Styling System
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Radix UI Themes** - High-quality UI component library
- **tw-animate-css** - CSS animation enhancements

### Backend Services
- **Convex** - Real-time database and backend services

### Development Tools
- **Bun** - Fast JavaScript runtime
- **Lucide React** - Icon library
- **Concurrently** - Run multiple dev commands concurrently

---

## Project Architecture

### Directory Structure

```
reader/
├── src/
│   ├── components/
│   │   ├── reader/              # Core reader components
│   │   │   ├── Header.tsx       # Desktop top nav + mobile logo
│   │   │   ├── MobileBottomNav.tsx  # Mobile bottom navigation
│   │   │   ├── HomePage.tsx     # Home page (welcome + reading progress)
│   │   │   ├── LibraryPage.tsx  # Article library page
│   │   │   ├── BookmarksPage.tsx # Bookmarks management page
│   │   │   └── ArticleDetailPage.tsx # Article reading page
│   │   ├── ui/                  # UI base components
│   │   │   ├── button.tsx       # Button component (shadcn/ui)
│   │   │   └── badge.tsx        # Badge component (shadcn/ui)
│   │   └── ReaderApp.tsx        # Main app component (routing + state)
│   ├── layouts/
│   │   └── Layout.astro         # Astro page layout
│   ├── pages/
│   │   └── index.astro          # App entry page
│   └── styles/
│       └── global.css           # Global styles + CSS variables
├── public/                      # Static assets
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

### Application Architecture

#### Routing System

The project uses **client-side state routing** (not URL-based), managed by `ReaderApp.tsx`:

```typescript
type Tab = 'home' | 'library' | 'bookmarks';
type View = Tab | 'article-detail';

// State management
const [currentView, setCurrentView] = useState<View>('home');
const [previousTab, setPreviousTab] = useState<Tab>('home');
```

#### Component Hierarchy

```
Layout.astro
└── ReaderApp
    ├── Header (desktop nav)
    ├── MobileBottomNav (mobile nav)
    └── Main Content
        ├── HomePage
        ├── LibraryPage
        ├── BookmarksPage
        └── ArticleDetailPage
```

---

## Mobile Adaptation Strategy

### Responsive Breakpoints

Project uses Tailwind CSS default breakpoints:

- **Mobile**: Default (< 768px)
- **Desktop**: `md:` breakpoint (≥ 768px)

### Design Patterns

#### 1. Dual Navigation System

- **Desktop**: Top Header navigation (`Header.tsx`)
- **Mobile**: Bottom Tab bar navigation (`MobileBottomNav.tsx`)

```typescript
{/* Desktop nav - show on md: and up */}
<Header className="hidden md:flex" />

{/* Mobile nav - show below md: */}
<MobileBottomNav className="md:hidden" />
```

#### 2. Content Width Management

**Mobile** (< 768px):
- Text content width limit: `max-w-[335px]`
- Prevent horizontal overflow
- Maintain readability

**Desktop** (≥ 768px):
- Full width display: `md:max-w-none`
- Max width constraint: `md:max-w-2xl`
- Center alignment

#### 3. List Item Design

**Mobile**:
- Card style: `rounded-lg border bg-gray-50 p-4`
- Full padding: padding on all sides

**Desktop**:
- Separator style: `md:border-b md:rounded-none md:bg-transparent md:px-0`
- Horizontal padding only: `md:px-4` (inside button)
- Hover effect: `hover:bg-gray-50`

#### 4. Safe Area Support

Reserve space for iPhone notch and bottom indicator:

```css
/* global.css */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .safe-area-inset-bottom {
    padding-bottom: calc(env(safe-area-inset-bottom));
  }
}
```

Apply in `MobileBottomNav`:

```typescript
<nav className="... safe-area-inset-bottom">
```

#### 5. Bottom Padding Strategy

**Tab pages** (Home/Library/Bookmarks):
- Mobile: `pb-20` (80px) - Prevent content from being hidden by bottom nav
- Desktop: `md:pb-16` (64px)

**Article detail page**:
- No bottom navigation shown, no extra bottom padding needed
- Mobile: `pb-20` for visual balance only

---

## Design System

### Color Specifications

#### Primary Colors
```css
--color-black: #000000;
--color-gray-400: #CCCCCC;
--color-gray-500: #888888;
--color-gray-600: #666666;
--color-gray-200: #E0E0E0;
```

#### Semantic Colors (Shadcn UI)
```css
--color-background: oklch(1 0 0);           /* Background */
--color-foreground: oklch(0.129 0.042 264.695);  /* Foreground */
--color-border: oklch(0.929 0.013 255.508); /* Border */
--color-primary: oklch(0.208 0.042 265.755); /* Primary */
```

### Typography System

#### Font Families
```css
--font-playfair: 'Playfair Display', serif;  /* Headings font */
--font-inter: 'Inter', sans-serif;           /* Body font */
```

#### Typography Specifications

**Headings** (Playfair Display):
- H1 (desktop): `text-6xl font-normal italic tracking-tighter`
- H1 (mobile): `text-[44px] font-normal italic leading-tight`
- H2 (desktop): `text-3xl font-normal italic`
- H2 (mobile): `text-[28px] font-normal italic`

**Body** (Inter):
- Desktop: `text-base leading-[1.8]` or `text-sm`
- Mobile: `text-base leading-[1.8]`

**Metadata**:
- Desktop: `text-sm` or `text-xs`
- Mobile: `text-xs`

### Spacing System

Spacing based on 4px base unit:

| Purpose | Mobile | Desktop |
|---------|--------|---------|
| Page horizontal padding | `px-5` (20px) | `md:px-14` (56px) |
| Page vertical padding | `py-6` ~ `py-8` | `md:py-16` |
| Component spacing | `gap-2` ~ `gap-4` | `md:gap-8` |
| List item spacing | `gap-4` | `md:gap-8` |

### Border Radius System

```css
--radius: 0.625rem; /* 10px */
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

---

## Component Details

### ReaderApp.tsx

**Responsibility**: Main app container, manages routing and navigation state

**Props**: None

**State**:
- `currentView: View` - Current active view
- `previousTab: Tab` - Tab before entering article page

**Core Methods**:
```typescript
handleTabChange(tab: Tab)      // Switch tab
handleViewArticle()            // Enter article detail
handleBackFromArticle()        // Return to previous tab
```

**Navigation Rules**:
- Tab views show Header + MobileBottomNav
- ArticleDetail view shows only back button

---

### Header.tsx

**Responsibility**: Desktop top navigation bar

**Props**:
```typescript
interface HeaderProps {
  activeTab: 'home' | 'library' | 'bookmarks';
  onTabChange: (tab: Tab) => void;
}
```

**Responsive Behavior**:
- Mobile: Show only Logo + user avatar
- Desktop: Full navigation links + user info

**Active State Styles**:
- Active: `font-playfair text-base font-semibold italic text-black`
- Inactive: `font-inter text-sm font-normal text-gray-500`

---

### MobileBottomNav.tsx

**Responsibility**: Mobile bottom tab navigation bar

**Props**:
```typescript
interface MobileBottomNavProps {
  currentView: Tab;
  onViewChange: (view: Tab) => void;
}
```

**Features**:
- Fixed positioning: `fixed bottom-0 left-0 right-0`
- Height: `h-[50px]`
- Icons: Semantic emoji (🏠 📚 🔖)
- Safe Area support

**Active State**:
- No visual difference (per design requirement)
- Click triggers `onViewChange`

---

### HomePage.tsx

**Responsibility**: Welcome page, displays reading progress

**Structure**:
1. Hero Section - "Welcome back"
2. Continue Reading - Progress cards
3. Footer (desktop only)

**Responsive Features**:
- Progress cards: Mobile `bg-gray-50`, Desktop `md:bg-white`
- Bottom padding: `pb-20` (mobile) / `md:pb-16` (desktop)

---

### LibraryPage.tsx

**Responsibility**: Article library page

**Props**:
```typescript
interface LibraryPageProps {
  onViewArticle: () => void;
}
```

**Structure**:
1. Hero Section - Title + button group (desktop) + filter tags
2. Recent Articles - Article list
3. Footer (desktop only)

**Data Structure**:
```typescript
{
  id: number;
  tag: string;        // Category tag
  time: string;       // Reading time
  title: string;
  excerpt: string;    // Summary
  author: string;
  date: string;
}
```

---

### BookmarksPage.tsx

**Responsibility**: Bookmarks management page

**Props**:
```typescript
interface BookmarksPageProps {
  onViewArticle: () => void;
}
```

**Structure**:
1. Hero Section - Title + statistics
2. Bookmarks List - Bookmarks list
3. Footer (desktop only)

**Differences from LibraryPage**:
- Shows "saved date" instead of "author"
- "Remove" button on right side of each item
- No filter tags

---

### ArticleDetailPage.tsx

**Responsibility**: Article reading page

**Props**:
```typescript
interface ArticleDetailPageProps {
  onBack: () => void;
}
```

**Structure**:
1. Back Navigation - Back button
2. Article Header - Breadcrumb (mobile) + metadata + title + author
3. Progress Bar - Reading progress bar
4. Article Content - Article body
5. Article Actions (desktop only)
6. Footer (desktop only)

**Special Handling**:
- Progress bar bottom margin: `pb-6` (mobile) / `md:pb-8` (desktop)
- Text width limit: `max-w-[335px]` (mobile) / `md:max-w-none` (desktop)
- No bottom navigation shown

---

## Development Guide

### Adding New Pages

#### 1. Create Page Component

```typescript
// src/components/reader/NewPage.tsx
interface NewPageProps {
  // Define props
}

export default function NewPage({ ...props }: NewPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Page content */}
      {/* Mobile bottom padding */}
      <section className="px-5 pb-20 md:px-14 md:pb-16">
        {/* Content */}
      </section>
    </div>
  );
}
```

#### 2. Update ReaderApp.tsx

```typescript
// 1. Add to View type
type View = 'home' | 'library' | 'bookmarks' | 'new-page' | 'article-detail';

// 2. Import component
import NewPage from './reader/NewPage';

// 3. Add route rendering
{currentView === 'new-page' && <NewPage />}

// 4. If navigation needed, add nav items in Header.tsx and MobileBottomNav.tsx
```

#### 3. Add Navigation

**Header.tsx**:
```typescript
const navItems = [
  // ...
  { id: 'new-page' as const, label: 'New Page', icon: Star },
];
```

**MobileBottomNav.tsx**:
```typescript
const navItems = [
  // ...
  { id: 'new-page' as Tab, icon: '⭐', label: 'New', lucideIcon: Star },
];
```

---

### Responsive Component Development Patterns

#### Pattern 1: Mobile Card / Desktop Separator

```tsx
<article className="rounded-lg border border-gray-200 bg-gray-50 p-4
                    md:border-b md:rounded-none md:bg-transparent
                    md:px-0 md:py-8">
  {/* Content */}
</article>
```

#### Pattern 2: Desktop Hide / Mobile Show

```tsx
<div className="md:hidden">
  {/* Mobile only */}
</div>

<div className="hidden md:block">
  {/* Desktop only */}
</div>
```

#### Pattern 3: Width Constraints

```tsx
{/* Mobile width limit, desktop full width */}
<p className="max-w-[335px] md:max-w-none">
  {/* Content */}
</p>

{/* Desktop max width */}
<div className="md:max-w-2xl">
  {/* Content */}
</div>
```

#### Pattern 4: Button Padding Handling

```tsx
<article className="p-4 md:px-0">
  {/* Mobile: article has padding, button negative margin to offset */}
  {/* Desktop: article no padding, button has padding */}
  <button className="-mx-4 px-0 md:mx-0 md:px-4">
    {/* Content */}
  </button>
</article>
```

---

### Styling Best Practices

#### 1. Class Name Ordering

Organize Tailwind class names in this order:

1. Layout: `flex`, `grid`, `block`
2. Position: `relative`, `absolute`, `fixed`
3. Box model: `w-`, `h-`, `m-`, `p-`
4. Typography: `text-`, `font-`
5. Colors: `bg-`, `text-`, `border-`
6. Responsive: `md:`, `lg:`
7. States: `hover:`, `focus:`

```tsx
❌ <div className="text-black flex bg-white hover:bg-gray-50 md:text-lg">
✅ <div className="flex bg-white text-black hover:bg-gray-50 md:text-lg">
```

#### 2. Use Class Variance Authority

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        outline: "border border-gray-200",
      },
    },
  }
);
```

#### 3. Type-Safe Event Handlers

```typescript
interface ButtonProps {
  onClick: () => void;  // ✅ Explicit function signature
  // onClick: any;       // ❌ Avoid using any
}
```

---

### Data Flow Patterns

#### Parent-Child Communication

**Parent Component**:
```typescript
const [currentView, setCurrentView] = useState<View>('home');

const handleTabChange = (tab: Tab) => {
  setCurrentView(tab);
};

<Header activeTab={currentView} onTabChange={handleTabChange} />
```

**Child Component**:
```typescript
interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <button onClick={() => onTabChange('home')}>
      Home
    </button>
  );
}
```

#### Cross-Level Communication

For deeply nested components, consider using Context or state management libraries (current project state is simple, no need to introduce yet).

---

## Common Tasks

### Change Theme Colors

Edit `src/styles/global.css`:

```css
:root {
  --color-black: #YOUR_COLOR;
  /* Or modify Shadcn UI variables */
  --primary: oklch(YOUR_VALUES);
}
```

### Adjust Mobile Bottom Navigation Height

Edit `src/components/reader/MobileBottomNav.tsx`:

```typescript
<div className="flex h-[YOUR_HEIGHT] items-center...">
```

Adjust page bottom padding accordingly:

```typescript
<section className="... pb-[YOUR_HEIGHT + ADDITIONAL_PADDING]">
```

### Add New Icons

1. Install icons (e.g., using Lucide):
```bash
# Lucide React already installed, use directly
import { IconName } from 'lucide-react';
```

2. Use emoji:
```typescript
const icon = '🎨';  // Direct Unicode emoji
```

### Adjust Breakpoints

Edit `tailwind.config.mjs`:

```javascript
export default {
  theme: {
    screens: {
      'md': '768px',  // Default value
      // Add custom breakpoints
      'tablet': '640px',
    },
  },
};
```

---

## Debugging & Testing

### Development Server

```bash
# Start development server (with Convex)
bun dev

# Start web server only
bun dev:web

# Preview production build
bun preview
```

### Type Checking

```bash
# Astro type check
astro check

# TypeScript type check
tsc --noEmit
```

### Build Production Version

```bash
bun build
```

### Test Responsive Design

1. **Chrome DevTools**:
   - F12 → Toggle device toolbar
   - Test common device sizes (iPhone 14 Pro, iPad, Desktop)

2. **Manual Testing Checklist**:
   - [ ] iPhone SE (375px)
   - [ ] iPhone 14 Pro (393px)
   - [ ] iPad (768px) - Test breakpoint switching
   - [ ] Desktop (1920px)
   - [ ] Check safe-area adaptation (notched devices)

---

## Performance Optimization

### Astro Optimization

- **Islands Architecture**: Use React only for interactive components
- **Partial Hydration**: By default, Astro minimizes client-side JavaScript

### React Optimization

```typescript
// Use memo to avoid unnecessary re-renders
export default memo(function MyComponent({ prop }) {
  // ...
});

// Use useCallback to stabilize function references
const handleClick = useCallback(() => {
  // ...
}, [dependency]);
```

### Style Optimization

```css
/* Use CSS variables for theme switching */
:root {
  --color-primary: oklch(0.208 0.042 265.755);
}

/* Instead of */
.my-class {
  color: #1a1a1a;
}
```

---

## Troubleshooting

### Issue: Styles Not Applied

**Cause**: Tailwind CSS 4 uses new compilation method

**Solution**:
1. Ensure `@import "tailwindcss"` is used
2. Check class name spelling
3. View actual class names in browser DevTools

### Issue: Mobile Content Hidden by Bottom Navigation

**Cause**: Missing bottom padding

**Solution**:
```typescript
<section className="px-5 py-4 pb-20 md:px-14 md:py-12 md:pb-16">
```

Ensure `pb-20` (80px) or larger value.

### Issue: Type Errors

**Cause**: Type definition mismatch

**Solution**:
```typescript
// Ensure using exported types
import type { Tab, View } from '../ReaderApp';

// Or define consistent types within component
type Tab = 'home' | 'library' | 'bookmarks';
```

### Issue: Convex Connection Failed

**Cause**: Convex dev service not running

**Solution**:
```bash
# Start Convex development server
bun dev:convex

# Or use full command (auto-start)
bun dev
```

---

## Convex Best Practices

### API Path Structure

Convex uses filesystem structure as API paths. Function call format: `api.{folder}.{file}.{function}`

**Examples**:
```typescript
// File: convex/subscriptions/queries.ts
export const listAll = query({ ... });

// Call
api.subscriptions.queries.listAll

// File: convex/subscriptions/mutations.ts
export const remove = mutation({ ... });

// Call
api.subscriptions.mutations.remove({ subscriptionId: id })
```

**Rules**:
- Folder name = first level path
- File name (without extension) = second level path
- Exported function name = third level path

### Client Setup

Must wrap application root with `ConvexProvider`:

```typescript
// src/lib/convex.tsx
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL!);

export default function AppWithConvex() {
  return (
    <ConvexProvider client={convex}>
      <ReaderApp />
    </ConvexProvider>
  );
}
```

### Environment Variables

Client-accessible variables require `PUBLIC_` prefix:

```bash
# .env.local
CONVEX_URL=http://127.0.0.1:3210          # Server-side use
PUBLIC_CONVEX_URL=http://127.0.0.1:3210   # Client-side use
```

### Type Imports

Use `type` keyword when importing Convex types (compile-time only):

```typescript
import type { Id } from '../../../convex/_generated/dataModel';

const id: Id<"subscriptions"> = ...;  // ✅ For type annotations only
```

### Query Method Chain

Correct query method chaining order:

```typescript
// ✅ Correct
const articles = await ctx.db
  .query("articles")
  .withIndex("by_collected_desc")
  .order("desc")
  .filter((q) => q.eq(q.field("isRead"), false))
  .take(limit);

// ❌ Wrong - order() inside withIndex callback
.withIndex("by_collected_desc", (q) => q.order("desc"))
```

**Method chain order**:
1. `query(tableName)` - Start query
2. `withIndex(indexName)` or `withIndex(indexName, (q) => q.eq(...))` - Use index
3. `order("asc" | "desc")` - Sort (optional)
4. `filter((q) => ...)` - Client-side filter (optional)
5. `take(n)` or `paginate(opts)` or `collect()` - Fetch results

### Public vs Internal Functions

**Public functions** - Accessible from client:
```typescript
export const listAll = query({ ... });        // Client-accessible
export const create = mutation({ ... });      // Client-accessible
```

**Internal functions** - Server-side only:
```typescript
export const collectFromSubscriptions = internalMutation({
  // Only callable by cron or other server functions
});
```

Use `internal` reference in `crons.ts`:
```typescript
import { internal } from "./_generated/api";

crons.interval(
  "collect from subscriptions",
  { hours: 1 },
  internal.subscriptions.cron.collectFromSubscriptions  // internal path
);
```

### Cron Configuration

Cron jobs config file: `convex/crons.ts`

```typescript
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Hourly execution
crons.interval(
  "job name",
  { hours: 1 },
  internal.module.functionName
);

// Daily at specific time
crons.cron(
  "daily job",
  "0 8 * * *",  // cron expression
  internal.module.functionName
);

export default crons;
```

### Common Errors

#### "Could not find public function"
**Cause**: Incorrect API path or function not deployed
**Solution**:
- Check path format: `api.{folder}.{file}.{function}`
- Ensure Convex dev is running and sync is complete

#### "useQuery must be used under ConvexProvider"
**Cause**: Component not wrapped in ConvexProvider
**Solution**: Wrap app entry with ConvexProvider

#### "Failed to load url .../dataModel"
**Cause**: Runtime import instead of type import
**Solution**: Use `import type { Id } from ...`

---

## Future Extensions

### Possible Feature Enhancements

1. **Theme Switching**: Add dark mode support
2. **Internationalization**: Add multi-language support
3. **Offline Support**: Use Service Workers for PWA
4. **State Management**: Introduce Zustand or Jotai for complex state
5. **Animation Enhancement**: Add page transition animations

### Performance Optimization Directions

1. **Image Optimization**: Use Astro's Image component
2. **Code Splitting**: Lazy load components by route
3. **CDN Deployment**: Deploy to Vercel/Netlify

---

## Resources

- [Astro Documentation](https://docs.astro.build)
- [React 19 Documentation](https://react.dev)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Radix UI Themes](https://www.radix-ui.com/themes)
- [Lucide Icons](https://lucide.dev)
- [Convex Documentation](https://docs.convex.dev)

---

## Maintainers

This document is designed by the project architecture and updated continuously as the project evolves.

**Last Updated**: 2026-02-03 (Added Convex Best Practices)
