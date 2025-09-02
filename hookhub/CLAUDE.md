# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HookHub is a Next.js 15.4.6 application showcasing Claude Code hooks. It displays a curated catalog of community-driven hooks with categorization, featured items, and GitHub integration.

## Essential Commands

```bash
# Development
npm run dev         # Start development server on http://localhost:3000

# Production
npm run build       # Create production build
npm run start       # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## Architecture

### Core Technology Stack
- **Framework**: Next.js 15.4.6 with App Router
- **TypeScript**: Strict mode enabled with path aliases (`@/*` → `./src/*`)
- **Styling**: Tailwind CSS v4 (using defaults, no custom config)
- **Package Manager**: npm (with pnpm-lock.yaml also present)

### Project Structure
```
hookhub/
├── src/
│   ├── app/          # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with Geist font
│   │   ├── page.tsx      # Homepage displaying hooks catalog
│   │   └── globals.css   # Global styles and Tailwind directives
│   ├── components/
│   │   └── HookCard.tsx  # Card component for displaying hooks
│   ├── types/
│   │   └── hook.ts       # TypeScript interfaces and enums
│   └── data/
│       └── hooks.json    # Static hooks data
└── memory/           # Testing artifacts
    ├── frontend/
    └── spec/

```

### Key Data Models

The application centers around the `Hook` interface with:
- Categories: Monitoring, Security, Workflow, Testing, Integration, Utility, Learning, Team
- Hook Types: PreToolUse, PostToolUse, UserPromptSubmit, Notification, Stop, SubagentStart/Stop/Stream
- Each hook includes: name, description, category, GitHub URL, author, stars, language, and featured flag

### Component Architecture

- **HookCard**: Displays individual hooks with category-specific color coding, language indicators, and GitHub links
- **Homepage**: Filters and displays featured hooks separately from regular hooks
- Dark mode support throughout with Tailwind's dark: modifiers

## Development Notes

- No test framework currently configured
- ESLint configured with Next.js defaults
- Responsive design with mobile-first approach using Tailwind breakpoints (sm, md, lg, xl)
- Color-coded categories with light/dark mode variants
- Language-specific indicators for Python, JavaScript, TypeScript, PHP, Go

## Testing Strategy

- Use Playwright MCP for UI testing
- Save screenshots in `/memory/screenshots` directory