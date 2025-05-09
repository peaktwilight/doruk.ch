# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Doruk Tan Öztürk built with HTML, CSS, and JavaScript. It features a responsive design that works on all device sizes and showcases the owner's skills, experience, and projects in a card-based layout.

## Repository Structure

- `index.html` - The main HTML file that structures the entire website
- `assets/` - Contains all static assets
  - `css/` - CSS files organized by component/functionality
  - `images/` - Images and icons used throughout the site
  - `js/` - JavaScript files that handle site functionality

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

- `base.css` - Base styles and variables
- `reset.css` - CSS reset for consistent rendering
- `reused.css` - Shared/reusable styles
- Component-specific files (navbar.css, sidebar.css, portfolio.css, etc.)
- `responsive.css` - Media queries for responsive design

### JavaScript Structure

The main script (`script.js`) handles:

1. Initial choice modal functionality
2. Sidebar toggle for mobile
3. Testimonials modal functionality 
4. Page navigation
5. Project details modal handling

### Main Components

1. **Choice Modal** - Initial welcome screen with navigation options
2. **Sidebar** - Profile information and contact details
3. **Main Content Area** - Contains tabbed sections:
   - About (bio, skills, languages, achievements)
   - Resume (education, experience)
   - Portfolio (projects with detailed modals)
   - Contact (location, contact form)

### Responsive Design Breakpoints

The site uses these responsive breakpoints:
- 450px+: Basic mobile layouts
- 580px+: Tablet layouts
- 768px+: Larger tablet layouts
- 1024px+: Desktop layouts
- 1250px+: Wide desktop layouts