# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Doruk Tan Öztürk built with React, TypeScript, Vite, and Tailwind CSS v4. It features a modern, responsive design with smooth animations using Framer Motion and GSAP, an animated Vanta.js background, and a clean component-based architecture.

## Repository Structure

```
├── index.html          # Entry HTML with meta tags and Vanta.js scripts
├── src/
│   ├── App.tsx         # Main app component with layout and navigation
│   ├── main.tsx        # React entry point
│   ├── components/
│   │   ├── layout/     # Layout components (Navbar, Sidebar, ChoiceModal)
│   │   ├── sections/   # Page sections (Hero, Projects, Experience, TechStack, Footer)
│   │   └── ui/         # Reusable UI components (Dock, BentoGrid, Marquee, etc.)
│   ├── data/           # Static data (projects.ts, resume.ts)
│   ├── lib/            # Utilities (utils.ts with cn() helper)
│   └── styles/         # Global CSS (main.css)
├── assets/
│   └── images/         # Static images and project thumbnails
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite build configuration
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
- **GSAP** - Advanced animations
- **Lenis** - Smooth scrolling
- **Vanta.js** - Animated background (WAVES effect)
- **Lucide React** - Icons

### Key Components

**Layout Components (`src/components/layout/`)**
- `Navbar.tsx` - Top navigation bar
- `Sidebar.tsx` - Profile sidebar with contact info
- `ChoiceModal.tsx` - Initial welcome modal

**Section Components (`src/components/sections/`)**
- `Hero.tsx` - Landing section with profile and intro
- `Projects.tsx` - Portfolio projects grid
- `Experience.tsx` - Work experience timeline
- `TechStack.tsx` - Skills and technologies marquee
- `Footer.tsx` - Footer with social links

**UI Components (`src/components/ui/`)**
- `Dock.tsx` - Floating navigation dock (macOS-style)
- `BentoGrid.tsx` - Grid layout for cards
- `Marquee.tsx` - Infinite scrolling marquee
- `SpotlightCard.tsx` - Card with spotlight hover effect
- `TextReveal.tsx` - Animated text reveal
- `AnimatedGradientText.tsx` - Gradient text animation

### Styling

- Uses Tailwind CSS v4 with custom configuration
- Main accent color: gold/amber tones
- Dark theme with neutral-950 background
- Custom fonts: Fraunces (display), DM Sans (body), IBM Plex Mono (code)

### Data Files

- `src/data/projects.ts` - Portfolio project definitions
- `src/data/resume.ts` - Resume/experience data

### Key Patterns

1. **Section-based Layout** - Single page with scrollable sections
2. **Intersection Observer** - Tracks active section for navigation
3. **Smooth Scroll** - Native smooth scrolling to sections
4. **Image Optimization** - Static images in `/assets/images/`

### Adding New Projects

Edit `src/data/projects.ts` and add a new project object:

```typescript
{
  title: 'Project Name',
  description: 'Brief description',
  image: '/assets/images/project-static.jpg',
  tech: ['React', 'TypeScript'],
  category: 'development',
  liveUrl: 'https://example.com',
  sourceUrl: 'https://github.com/...',
  status: 'live'
}
```
