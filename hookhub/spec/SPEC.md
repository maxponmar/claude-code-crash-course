# HookHub MVP Specification

## Executive Summary

**HookHub** is a curated catalog platform for discovering and browsing open-source Claude Code hooks. It serves as a centralized, display-only repository where developers can find pre-built hooks to enhance their Claude Code workflows.

**MVP Goal**: Launch a simple, functional website that displays a curated collection of Claude Code hooks in an attractive, searchable grid layout.

## Project Scope

### MVP Features (In Scope)
✅ **Display-only catalog** - Browse existing hooks (no submission/editing)  
✅ **Grid-based gallery** - Responsive card layout  
✅ **Basic categorization** - 8 predefined categories  
✅ **GitHub integration** - Direct links to repositories  
✅ **Search functionality** - Filter by name/description  
✅ **Featured hooks** - Highlight popular/recommended hooks  
✅ **Responsive design** - Mobile, tablet, and desktop support  

### Not in MVP (Future Features)
❌ User authentication/accounts  
❌ Hook submission forms  
❌ Rating/review system  
❌ Comments/discussions  
❌ Hook installation features  
❌ Analytics tracking  
❌ API endpoints  

## Data Model

### Hook Entity
```typescript
interface Hook {
  id: string;                 // Unique identifier
  name: string;               // Display name
  category: HookCategory;     // Category enum
  description: string;        // Brief description (max 200 chars)
  githubUrl: string;          // GitHub repository URL
  author: string;             // GitHub username
  stars?: number;             // GitHub stars count
  language: string;           // Primary language (Python, JS, etc.)
  hookTypes: HookType[];      // Hook events implemented
  featured?: boolean;         // Featured hook flag
}
```

### Categories
```typescript
enum HookCategory {
  MONITORING = "Monitoring & Observability",
  SECURITY = "Security & Validation", 
  WORKFLOW = "Workflow Automation",
  TESTING = "Testing & Quality",
  INTEGRATION = "External Integration",
  UTILITY = "Utilities & Helpers",
  LEARNING = "Learning & Examples",
  TEAM = "Team Collaboration"
}
```

### Hook Types
```typescript
enum HookType {
  PRE_TOOL_USE = "PreToolUse",
  POST_TOOL_USE = "PostToolUse",
  USER_PROMPT_SUBMIT = "UserPromptSubmit",
  NOTIFICATION = "Notification",
  STOP = "Stop",
  SUBAGENT_START = "SubagentStart",
  SUBAGENT_STOP = "SubagentStop",
  SUBAGENT_STREAM = "SubagentStream"
}
```

## UI/UX Requirements

### Page Layout

```
┌─────────────────────────────────────────┐
│            HEADER                       │
│  [Logo] HookHub    [Search Bar]        │
├─────────────────────────────────────────┤
│            HERO SECTION                 │
│  "Discover Claude Code Hooks"           │
│  Brief description + CTA button         │
├─────────────────────────────────────────┤
│         CATEGORY FILTERS                │
│  [All] [Monitoring] [Security] [...]    │
├─────────────────────────────────────────┤
│         FEATURED HOOKS                  │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ Card │ │ Card │ │ Card │           │
│  └──────┘ └──────┘ └──────┘           │
├─────────────────────────────────────────┤
│         ALL HOOKS GRID                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ Card │ │ Card │ │ Card │ │ Card │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ Card │ │ Card │ │ Card │ │ Card │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
└─────────────────────────────────────────┘
```

### Hook Card Design

```
┌────────────────────────────┐
│ [Category Badge]           │
│                            │
│ Hook Name                  │
│ by @author                 │
│                            │
│ Description text that      │
│ explains what this hook... │
│                            │
│ [Python] ⭐ 234            │
│                            │
│ [PreToolUse] [PostToolUse] │
│                            │
│ [→ View on GitHub]         │
└────────────────────────────┘
```

### Responsive Breakpoints
- **Mobile** (< 640px): 1 column
- **Tablet** (640-1024px): 2 columns  
- **Desktop** (> 1024px): 3-4 columns

### Color Scheme
- Use category-specific colors for badges
- Support light/dark mode
- Consistent with Tailwind defaults

## Technical Architecture

### Tech Stack
```yaml
Framework: Next.js 15+ (App Router)
Language: TypeScript
Styling: TailwindCSS v4
Components: Custom React components
Icons: Lucide React
Data: Static JSON file
Deployment: Vercel
```

### File Structure
```
hookhub/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── HookCard.tsx    # Hook card component
│   ├── types/
│   │   └── hook.ts         # TypeScript types
│   └── data/
│       └── hooks.json      # Static hook data
├── public/                 # Static assets
├── package.json
└── SPEC.md                # This file
```

### Data Management
- **Source**: Static `hooks.json` file
- **Updates**: Manual via Git commits
- **No Backend**: Pure static site for MVP
- **Caching**: Browser caching for assets

## Implementation Checklist

### Phase 1: Core Setup ✅
- [x] Next.js project initialized
- [x] TypeScript configured
- [x] TailwindCSS setup
- [x] Basic file structure

### Phase 2: Components
- [x] HookCard component
- [x] Category badges
- [x] Language indicators
- [ ] Search bar component
- [ ] Category filter buttons

### Phase 3: Features
- [x] Display hooks from JSON
- [x] Featured hooks section
- [ ] Search functionality
- [ ] Category filtering
- [x] Responsive grid layout

### Phase 4: Polish
- [x] Dark mode support
- [ ] Loading states
- [ ] Empty states
- [ ] Error handling
- [ ] SEO meta tags

### Phase 5: Deployment
- [ ] Build optimization
- [ ] Deploy to Vercel
- [ ] Custom domain setup
- [ ] Performance testing

## Success Metrics

### MVP Launch Criteria
- ✅ Display 10+ curated hooks
- ✅ Grid layout responsive on all devices
- ⏳ Search functionality operational
- ⏳ Category filtering works
- ✅ All GitHub links functional
- ✅ Page loads in < 2 seconds
- ⏳ Deployed and publicly accessible

### Quality Metrics
- Lighthouse score > 90
- No console errors
- WCAG 2.1 AA compliant
- Works on latest Chrome, Firefox, Safari
- Mobile-friendly (Google test pass)

## Sample Hook Data

```json
{
  "id": "claude-code-hooks-mastery",
  "name": "Claude Code Hooks Mastery",
  "category": "WORKFLOW",
  "description": "Complete hook lifecycle implementation with deterministic control",
  "githubUrl": "https://github.com/disler/claude-code-hooks-mastery",
  "author": "disler",
  "stars": 234,
  "language": "Python",
  "hookTypes": ["PRE_TOOL_USE", "POST_TOOL_USE"],
  "featured": true
}
```

## User Stories

### Essential Stories (MVP)

1. **As a developer, I want to browse all available hooks**
   - See grid of hook cards
   - View key details at a glance

2. **As a developer, I want to search for specific hooks**
   - Type in search bar
   - See filtered results instantly

3. **As a developer, I want to filter hooks by category**
   - Click category button
   - See only hooks in that category

4. **As a developer, I want to visit the hook's GitHub repo**
   - Click "View on GitHub"
   - Open repo in new tab

5. **As a mobile user, I want to browse hooks on my phone**
   - Responsive single-column layout
   - Touch-friendly interface

## Future Enhancements

### Version 2.0
- User submissions via GitHub PR
- Live GitHub stats updates
- Code preview snippets
- Installation instructions
- Hook compatibility matrix

### Version 3.0
- User accounts and favorites
- Rating and review system
- Hook collections/bundles
- API for programmatic access
- Hook playground/testing

## Notes

- Keep it simple for MVP - focus on display only
- Prioritize mobile experience
- Use existing Next.js/React best practices
- Leverage TailwindCSS for rapid styling
- Static JSON allows quick iteration without backend

## References

- [Claude Code Hooks Documentation](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)