# Doruk Tan Öztürk - Portfolio Website

Personal portfolio website showcasing professional experience, projects, and technical expertise. Built with modern web technologies and optimized for performance across all devices.

Live at [cv.doruk.ch](https://cv.doruk.ch)

## Tech Stack

- **React 19** - Modern UI framework with latest features
- **TypeScript** - Type-safe development
- **Vite 6** - Next-generation build tool with instant HMR
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Production-ready animation library
- **GSAP** - Professional-grade animations (horizontal scroll)
- **Lucide React** - Beautiful, consistent icon set
- **NumberFlow** - Smooth animated counters

## Features

- **Modern Design** - Clean, professional aesthetic with gold accent colors
- **Responsive Layout** - Optimized for all devices from mobile to 4K displays
- **Interactive Animations** - Smooth transitions and engaging user interactions
- **Horizontal Scroll Projects** - GSAP-powered project showcase
- **Live Statistics** - Real-time animated counters
- **macOS-style Dock** - Floating navigation with scroll progress indicator
- **Project Modals** - Detailed project views with shared layout animations
- **Performance Optimized** - Lazy loading and efficient rendering
- **SEO Ready** - Meta tags, structured data, and social media previews

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/peaktwilight/CV-Card.git
cd CV-Card

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

Navigate to `http://localhost:5173` to view the site locally.

### Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Project Structure

```
├── index.html              # Entry HTML with meta tags and SEO
├── src/
│   ├── App.tsx             # Main app with layout and navigation
│   ├── main.tsx            # React entry point
│   ├── components/
│   │   ├── sections/       # Page sections
│   │   │   ├── Hero.tsx            # Landing with profile and CTAs
│   │   │   ├── About.tsx           # Personal story
│   │   │   ├── Projects.tsx        # Portfolio with horizontal scroll
│   │   │   ├── Experience.tsx      # Work and education timeline
│   │   │   ├── AboutStrip.tsx      # Languages and achievements
│   │   │   └── Footer.tsx          # Footer with social links
│   │   └── ui/             # Reusable components
│   │       ├── Dock.tsx            # Floating navigation dock
│   │       ├── ProjectModal.tsx    # Project detail modal
│   │       └── ScrollAura.tsx      # Particle scroll effects
│   ├── data/
│   │   ├── projects.ts     # Portfolio project definitions
│   │   └── resume.ts       # Education and experience data
│   ├── lib/
│   │   └── utils.ts        # Utilities (cn() helper)
│   └── styles/
│       └── main.css        # Global styles and Tailwind imports
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

## Key Components

### Section Components

- **Hero** - Landing section with profile image, name, and call-to-action buttons
- **About** - Personal background and story
- **Projects** - Interactive portfolio with horizontal scroll and bento grid layout
- **Experience** - Professional experience and education timeline
- **AboutStrip** - Languages marquee and achievement highlights
- **Footer** - Contact and social media links

### UI Components

- **Dock** - macOS-inspired floating navigation with scroll progress indicator
- **ProjectModal** - Detailed project views with smooth animations
- **ScrollAura** - Visual particle effects on scroll edges

## Customization

### Adding New Projects

Edit `src/data/projects.ts` and add a new project object:

```typescript
{
  id: 'unique-project-id',
  title: 'Project Name',
  description: 'Brief project description',
  image: '/assets/images/project-thumbnail.jpg',
  tech: ['React', 'TypeScript', 'Tailwind'],
  category: 'webapp', // webapp | music | infrastructure | fullstack
  href: 'https://project-url.com',
  sourceUrl: 'https://github.com/username/repo',
  badges: ['1K+ Users', 'Open Source']
}
```

### Updating Experience

Edit `src/data/resume.ts` to add work experience or education entries.

### Theme Customization

The main accent color (gold/amber) and other design tokens can be customized in `tailwind.config.js`. The site uses:

- **Display Font**: Fraunces
- **Body Font**: DM Sans
- **Monospace Font**: IBM Plex Mono
- **Background**: neutral-950 (dark theme)
- **Accent**: Gold/amber tones

## Deployment

The site is automatically deployed to [cv.doruk.ch](https://cv.doruk.ch) via Vercel with continuous deployment from the main branch.

### Deploy to Vercel

1. Push to main branch
2. Vercel automatically builds and deploys
3. Production site updates within minutes

## Architecture Highlights

- **Single Page Application** - Smooth scrolling between sections
- **Intersection Observer** - Tracks active section for navigation state
- **GSAP Horizontal Scroll** - Featured projects scroll horizontally on desktop
- **Shared Layout Animations** - Project cards smoothly animate into modals
- **Component-based Architecture** - Modular, maintainable code structure
- **TypeScript Strict Mode** - Type safety throughout the application

## Performance

- Optimized build with Vite's production mode
- Lazy loading for images and heavy components
- Efficient animations with GPU acceleration
- Lighthouse performance scores optimized
- Responsive from 320px to 4K displays

## License

ISC

## Author

**Doruk Tan Öztürk**
- Website: [cv.doruk.ch](https://cv.doruk.ch)
- GitHub: [@peaktwilight](https://github.com/peaktwilight)
- LinkedIn: [doruk-ozturk](https://linkedin.com/in/doruk-ozturk)
