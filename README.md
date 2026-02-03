# Reader App

An elegant reader application built with **Astro + React + Tailwind CSS 4 + Convex**.

## Tech Stack

- **Astro 5.0** - Modern web framework with SSR/SSG support
- **React 19** - Latest UI library
- **TypeScript 5.7** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Convex** - Real-time database and backend services
- **Bun** - Fast JavaScript runtime
- **Playfair Display & Inter** - Elegant typography fonts

## Features

### Core Pages

- 🏠 **Home** - Welcome page displaying reading progress
- 📡 **Subscriptions** - Manage content sources (GitHub repos, more coming soon)
- 📰 **Feed** - View collected articles from your subscriptions
- 🔖 **Bookmarks** - Save and manage favorite articles

### Subscription Management (Phase 1)

- **GitHub Integration** - Subscribe to repositories to track releases and issues
- **Automatic Collection** - Hourly cron jobs collect new content
- **Feed View** - Real-time updates from all subscriptions
- **Organization** - Categorize and filter collected articles

### Design Philosophy

- 📱 **Mobile-First** - Fully responsive design with touch-friendly interface
- 🎨 **Elegant Typography** - Italic serif headings with clean sans-serif body text
- 🎭 **Monochromatic** - Single-tone color scheme for focused reading
- ⚡ **Performance** - Fast loading with Astro SSR and optimized rendering

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Convex account (free tier works)

### Installation

```bash
# Install dependencies
bun install

# Start Convex dev server (in a separate terminal)
bun dev:convex

# Start web application
bun dev
```

Visit [http://localhost:4321](http://localhost:4321) to view the application.

### Environment Variables

Create `.env.local`:

```bash
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=anonymous:anonymous-web

CONVEX_URL=http://127.0.0.1:3210
PUBLIC_CONVEX_URL=http://127.0.0.1:3210

CONVEX_SITE_URL=http://127.0.0.1:3211
```

### Build for Production

```bash
bun build
```

### Preview Production Build

```bash
bun preview
```

## Project Structure

```
reader/
├── src/
│   ├── components/
│   │   ├── reader/              # Core reader components
│   │   │   ├── Header.tsx       # Desktop top navigation
│   │   │   ├── MobileBottomNav.tsx  # Mobile bottom navigation
│   │   │   ├── HomePage.tsx     # Home page
│   │   │   ├── SubscriptionsPage.tsx  # Subscription management
│   │   │   ├── FeedPage.tsx      # Article feed
│   │   │   ├── BookmarksPage.tsx     # Bookmarks management
│   │   │   ├── ArticleDetailPage.tsx # Article reading
│   │   │   └── AddSubscriptionModal.tsx # Add subscription modal
│   │   ├── ui/                  # UI base components
│   │   │   ├── button.tsx       # Button component
│   │   │   └── badge.tsx        # Badge component
│   │   └── ReaderApp.tsx        # Main app with routing
│   ├── layouts/
│   │   └── Layout.astro         # Page layout
│   ├── lib/
│   │   └── convex.tsx           # Convex client setup
│   ├── pages/
│   │   └── index.astro          # App entry
│   └── styles/
│       └── global.css           # Global styles
├── convex/                     # Backend (Convex)
│   ├── schema.ts               # Database schema
│   ├── subscriptions/
│   │   ├── queries.ts          # Subscription queries
│   │   └── mutations.ts        # Subscription mutations
│   ├── articles/
│   │   ├── queries.ts          # Article queries
│   │   └── mutations.ts        # Article mutations
│   ├── collections/
│   │   └── github.ts           # GitHub collector
│   ├── crons.ts                # Cron job logic
│   └── crons.ts                # Cron configuration
├── public/                     # Static assets
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Design System

### Colors

- **Primary**: Black (#000000)
- **Grays**: #CCCCCC, #888888, #666666, #E0E0E0
- **Border**: Subtle gray for separation

### Typography

- **Headings**: Playfair Display (italic)
- **Body**: Inter (clean and readable)

### Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Desktop**: `md:` breakpoint (≥ 768px)

## Development

### Available Scripts

```bash
bun dev          # Start all services (web + convex)
bun dev:web      # Start web server only
bun dev:convex   # Start Convex dev server only
bun build        # Build for production
bun preview      # Preview production build
```

### Type Checking

```bash
astro check      # Astro type check
tsc --noEmit     # TypeScript type check
```

## Architecture

### Client-Side Routing

The app uses state-based routing (not URL-based) managed by `ReaderApp.tsx`:
- `Tab`: 'home' | 'subscriptions' | 'feed' | 'bookmarks'
- `View`: Tab | 'article-detail'

### Backend (Convex)

**Database Tables**:
- `subscriptions` - Content source subscriptions
- `articles` - Collected articles from sources
- `collectionJobs` - Collection job history

**API Structure**: Functions follow filesystem paths
- `api.subscriptions.queries.listAll`
- `api.subscriptions.mutations.create`
- `api.articles.queries.listRecent`

## Roadmap

### Phase 1: Foundation ✅
- [x] GitHub subscription support
- [x] Basic feed view
- [x] Automatic content collection
- [x] Bookmark management

### Phase 2: More Sources (Planned)
- [ ] HackerNews integration
- [ ] Product Hunt integration
- [ ] WeChat article collection
- [ ] Advanced filtering

### Phase 3: AI Agent (Planned)
- [ ] Natural language subscription management
- [ ] Chat interface for content control
- [ ] AI-powered content summarization

### Phase 4: Digests (Planned)
- [ ] Daily/weekly curated digests
- [ ] AI-generated summaries
- [ ] Personalized recommendations

## Contributing

See [CLAUDE.md](./CLAUDE.md) for detailed development documentation.

## License

MIT
