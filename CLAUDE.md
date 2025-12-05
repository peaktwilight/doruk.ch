# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Doruk Tan Öztürk built with React, TypeScript, Vite, and Tailwind CSS v4. It features a modern, responsive design with smooth animations using Framer Motion and GSAP, and a clean component-based architecture.

## Repository Structure

```
├── index.html          # Entry HTML with meta tags
├── src/
│   ├── App.tsx         # Main app component with layout and navigation
│   ├── main.tsx        # React entry point
│   ├── components/
│   │   ├── sections/   # Page sections (Hero, About, Projects, Experience, AboutStrip, Footer)
│   │   └── ui/         # Reusable UI components (Dock, ProjectModal, ScrollAura)
│   ├── data/           # Static data (projects.ts, resume.ts)
│   ├── lib/            # Utilities (utils.ts with cn() helper)
│   └── styles/         # Global CSS (main.css)
├── assets/
│   └── images/         # Static images and project thumbnails
└── tsconfig.json       # TypeScript configuration
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Deployment

The site is automatically published to cv.doruk.ch via Vercel. Pushing to main triggers deployment.

## Architecture Details

### Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **GSAP** - Advanced animations (horizontal scroll)
- **Lucide React** - Icons
- **NumberFlow** - Animated number counters

### Key Components

**Section Components (`src/components/sections/`)**
- `Hero.tsx` - Landing section with profile, name, and CTAs
- `About.tsx` - Personal story and background
- `Projects.tsx` - Portfolio projects with horizontal scroll and bento grid
- `Experience.tsx` - Work experience and education timeline
- `AboutStrip.tsx` - Languages marquee and achievements
- `Footer.tsx` - Footer with social links

**UI Components (`src/components/ui/`)**
- `Dock.tsx` - Floating navigation dock (macOS-style) with scroll progress
- `ProjectModal.tsx` - Project detail modal with animations
- `ScrollAura.tsx` - Particle effect on scroll edges

### Styling

- Uses Tailwind CSS v4 with custom configuration
- Main accent color: gold/amber tones
- Dark theme with neutral-950 background
- Custom fonts: Fraunces (display), DM Sans (body), IBM Plex Mono (code)

### Data Files

- `src/data/projects.ts` - Portfolio project definitions
- `src/data/resume.ts` - Education and experience data

### Key Patterns

1. **Section-based Layout** - Single page with scrollable sections
2. **Intersection Observer** - Tracks active section for navigation
3. **GSAP Horizontal Scroll** - Featured projects scroll horizontally
4. **Live Counters** - Animated real-time statistics using NumberFlow
5. **Shared Layout Animations** - Project cards animate into modals

### Adding New Projects

Edit `src/data/projects.ts` and add a new project object:

```typescript
{
  id: 'project-id',
  title: 'Project Name',
  description: 'Brief description',
  image: '/assets/images/project-static.jpg',
  tech: ['React', 'TypeScript'],
  category: 'webapp', // webapp | music | infrastructure | fullstack
  href: 'https://example.com',
  sourceUrl: 'https://github.com/...',
  badges: ['1K+ Users']
}
```
