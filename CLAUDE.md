# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Doruk Tan Öztürk built with HTML, CSS, and JavaScript. It features a responsive design that works on all device sizes and showcases the owner's skills, experience, and projects in a card-based layout. The site includes animated backgrounds using Vanta.js, interactive modals, and optimized image loading.

## Repository Structure

- `index.html` - The main HTML file that structures the entire website
- `assets/` - Contains all static assets
  - `css/` - CSS files organized by component/functionality
  - `images/` - Images and icons used throughout the site
  - `js/` - JavaScript files that handle site functionality
    - `script.js` - Core functionality including modals, navigation, and animations
    - `portfolio-loader.js` - Optimized loading for portfolio images

## Development Commands

### Local Development

To preview the website locally, you can use any static file server:

```bash
# Using Python's built-in HTTP server
python -m http.server

# Using Node.js http-server (if installed)
http-server

# Using PHP's built-in server
php -S localhost:8000
```

### Deployment

The site is automatically published to cv.doruk.ch via Vercel:

```bash
# If you need to manually deploy to Vercel
vercel
```

## Architecture Details

### CSS Organization

The CSS is modular and organized into multiple files by component/functionality:

- `variables.css` - CSS variables for colors, typography, and transitions
- `base.css` - Base styles and structure
- `reset.css` - CSS reset for consistent rendering
- `reused.css` - Shared/reusable styles
- `animations.css` - Animation definitions including shimmer effects for loading
- `background.css` - Styles for the animated background
- Component-specific files (navbar.css, sidebar.css, portfolio.css, etc.)
- `responsive.css` - Media queries for responsive design (applied last)

All styles use a consistent color scheme defined in variables.css with the main accent color being a gold tone (--vegas-gold: hsl(45, 54%, 58%)).

### JavaScript Architecture

#### Core Functionality (script.js)
- **Background Animations**: Uses Vanta.js to create dynamic animated backgrounds
  - Main background: NET effect with gold lines
  - Modal background: BIRDS effect with animated gold birds
- **Choice Modal**: Initial welcome screen that appears on page load
- **Sidebar Toggle**: Mobile-friendly toggle for the sidebar
- **Page Navigation**: Handles tab switching between sections
- **Modal System**: Controls for testimonials and project detail modals
- **Project Details**: Handles displaying project information in modal dialogs

#### Image Loading (portfolio-loader.js)
- **Optimized Image Loading**: Uses IntersectionObserver to prioritize loading visible images
- **Loading Effects**: Adds shimmer animations while images load
- **Performance Optimizations**: Batched processing, minimal DOM operations, and cleanup

### Main Components

1. **Choice Modal** - Initial welcome screen with navigation options to:
   - Business vCard (current site)
   - Ubuntu PC Simulator
   - Music Producer Website
   
2. **Sidebar** - Profile information and contact details including:
   - Profile picture
   - Name and title
   - Contact information (hidden by default on mobile)
   - Social media links

3. **Main Content Area** - Contains tabbed sections:
   - **About**: Bio, technical skills, language skills, and achievements
   - **Resume**: Education and work experience
   - **Portfolio**: Interactive project cards with detailed modals
   - **Contact**: Location and contact information

4. **Project Cards** - Each project card in the portfolio section:
   - Shows animated GIF preview (with optimized loading)
   - Displays project title and technologies used
   - Shows live/offline status
   - Opens detailed modal with links to live site and source code

### Animation and Visual Effects

1. **Background Animation**: Uses Vanta.js to create interactive animated backgrounds
2. **Loading Animations**: Shimmer effects for loading project images
3. **Transition Effects**: Smooth transitions between modals and sections

### Responsive Design Breakpoints

The site uses these responsive breakpoints:
- 450px+: Basic mobile layouts
- 580px+: Tablet layouts
- 768px+: Larger tablet layouts
- 1024px+: Desktop layouts
- 1250px+: Wide desktop layouts

### Key Features to Maintain

1. **Consistent Visual Design**: Maintain the gold accent color scheme and dark background
2. **Responsive Layouts**: Ensure all new components work at all breakpoints
3. **Optimized Loading**: Follow the performance patterns in portfolio-loader.js
4. **Interactive Elements**: Preserve the animated backgrounds and modal interactions
5. **Component-Based Organization**: Keep CSS modular and organized by component