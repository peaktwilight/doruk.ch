// Single source of truth for category labels
export const categoryLabels: Record<string, string> = {
  webapp: 'Web App',
  music: 'Music',
  infrastructure: 'Infrastructure',
  fullstack: 'Full Stack'
}

export interface Project {
  id: string
  title: string
  category: 'webapp' | 'music' | 'infrastructure' | 'fullstack'
  image: string
  video?: string
  href?: string
  sourceUrl?: string
  description: string
  badges?: string[]
  tech?: string[]
  openSource?: boolean
  appStoreUrl?: string
  playStoreUrl?: string
}

export const projects: Project[] = [
  // Web Apps & Tools
  {
    id: 'migros-ai-search',
    title: 'Migros AI Product Search',
    category: 'webapp',
    image: '/assets/images/migros-ai-search.png',
    video: '/assets/images/migros-ai-search-video.mp4',
    href: 'https://aistuff.ch',
    description: 'AI-powered product search for Migros with intelligent shopping list creation. An AI agent helps you find products and build shopping lists directly on the website.',
    badges: ['Products Indexed', 'AI Agent'],
    tech: ['Next.js', 'TypeScript', 'AI']
  },
  {
    id: 'peakops',
    title: 'PeakOps Dashboard',
    category: 'infrastructure',
    image: '/assets/images/peakops-static.jpg',
    video: '/assets/images/peakops-video.mp4',
    href: 'https://sheesh.ch',
    description: 'Full infrastructure dashboard with real-time monitoring of all my 25+ services, system metrics, Docker containers, and operational status using Prometheus, Grafana, and Glances integration.',
    badges: ['Full Observability', '25+ Services'],
    tech: ['Docker', 'Grafana', 'Prometheus', 'Traefik']
  },
  {
    id: 'linear-algebra',
    title: 'Linear Algebra Calculator',
    category: 'webapp',
    image: '/assets/images/linear-algebra-calculator-static.jpg',
    video: '/assets/images/linear-algebra-calculator-video.mp4',
    href: 'https://lag.doruk.ch',
    sourceUrl: 'https://github.com/peaktwilight/linear-algebra-calculator',
    description: 'Comprehensive linear algebra toolkit with web app (Streamlit), CLI, and TUI interfaces. Features interactive visualizations, step-by-step explanations, and practice quizzes.',
    badges: ['Open Source', 'MIT License'],
    tech: ['Python', 'Streamlit', 'NumPy'],
    openSource: true
  },
  {
    id: 'bunzlimeter',
    title: 'BunzliMeter',
    category: 'webapp',
    image: '/assets/images/Bunzlimeter-static.jpg',
    video: '/assets/images/Bunzlimeter-video.mp4',
    href: 'https://bunzlimeter.ch',
    description: 'Viral Swiss culture quiz featured on SRF Radio. Uses Gemini AI to analyze how "Swiss" your responses are.',
    badges: ['9K+ Quiz Takers', 'SRF Radio Feature'],
    tech: ['Next.js', 'Firebase', 'Framer', 'AI']
  },
  {
    id: 'ttstats',
    title: 'TTStats',
    category: 'fullstack',
    image: '/assets/images/TTStats-static.jpg',
    video: '/assets/images/TTStats-video.mp4',
    href: 'https://ttstats.ch',
    description: 'Swiss Table Tennis statistics platform with web app + native iOS/Android apps (Kotlin Multiplatform). Tracking 5,500+ players, 69K+ matches across 249 clubs.',
    badges: ['1K+ Monthly Users', '2nd Place Swiss Startup Award'],
    tech: ['Kotlin Multiplatform', 'Next.js', 'Python', 'FastAPI'],
    appStoreUrl: 'https://apps.apple.com/ch/app/ttstats/id6744279609',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.peaktwilight.ttstats'
  },
  {
    id: 'fhnw-dashboard',
    title: 'FHNW Dashboard',
    category: 'webapp',
    image: '/assets/images/FHNW_Dashboard-static.jpg',
    video: '/assets/images/FHNW_Dashboard-video.mp4',
    href: 'https://fhnw.doruk.ch',
    sourceUrl: 'https://github.com/peaktwilight/fhnw-dashboard',
    description: 'Student dashboard for FHNW with i18n, dark mode, campus maps, and live transit info.',
    badges: ['Open Source', 'Multi-language'],
    tech: ['Next.js', 'Framer', 'Leaflet'],
    openSource: true
  },
  {
    id: 'witelli20',
    title: 'Witelli20',
    category: 'webapp',
    image: '/assets/images/Witelli20-static.jpg',
    video: '/assets/images/Witelli20-video.mp4',
    href: 'https://witelli20.ch',
    sourceUrl: 'https://github.com/peaktwilight/witelli20',
    description: 'Modern student housing portal with room reservations, transport info, and message board.',
    badges: ['Open Source', 'MIT License'],
    tech: ['Next.js', 'Firebase', 'TypeScript'],
    openSource: true
  },
  {
    id: 'thatsapp',
    title: 'ThatsApp MQTT Debugger',
    category: 'webapp',
    image: '/assets/images/ThatsAppMQTTDebugger-static.jpg',
    video: '/assets/images/ThatsAppMQTTDebugger-video.mp4',
    href: 'https://thatsapp.doruk.ch',
    sourceUrl: 'https://github.com/peaktwilight/ThatsAppMQTTDebugger',
    description: 'Feature-rich MQTT debugging tool for ThatsApp messaging protocol.',
    badges: ['Open Source', 'ISC License'],
    tech: ['Next.js', 'TypeScript', 'MQTT'],
    openSource: true
  },
  {
    id: 'galaxus',
    title: 'Galaxus Price Tracker',
    category: 'webapp',
    image: '/assets/images/galaxus_price_tracker-static.jpg',
    video: '/assets/images/galaxus_price_tracker-video.mp4',
    href: 'https://price.doruk.ch',
    description: 'Price tracking tool for Galaxus products, for educational purposes only.',
    badges: ['Price Tracking'],
    tech: ['Next.js', 'React', 'Tailwind']
  },
  {
    id: 'password-cleaner',
    title: 'CSV Password Cleaner',
    category: 'webapp',
    image: '/assets/images/Passwords_Manager_Doruk-static.jpg',
    video: '/assets/images/Passwords_Manager_Doruk-video.mp4',
    href: 'https://passwords.doruk.ch',
    sourceUrl: 'https://github.com/peaktwilight/csv-password-cleaner',
    description: 'Secure client-side tool to clean & manage browser password exports (CSV).',
    badges: ['Open Source', 'MIT License'],
    openSource: true
  },
  {
    id: 'unidocs',
    title: 'UniDocs',
    category: 'webapp',
    image: '/assets/images/unidocs-static.jpg',
    video: '/assets/images/unidocs-video.mp4',
    href: 'https://unidocs.ch',
    description: 'Swiss student platform providing exam summaries and study materials.',
    badges: ['Education', 'Community']
  },
  // Music & Labels
  {
    id: 'peak-plugins',
    title: 'Peak Plugins - Lofinator',
    category: 'music',
    image: '/assets/images/peak-plugins-lofinator.png',
    video: '/assets/images/peak-plugins-video.mp4',
    href: 'https://plugins.peaktwilight.com',
    description: 'Free VST/AU plugin that adds instant lofi sauce to any sound. One knob controls three effects: Saturate, Warmth, and Crush.',
    badges: ['Free VST', 'macOS'],
    tech: ['C++', 'React', 'Tailwind', 'Framer']
  },
  {
    id: 'dreamhop',
    title: 'Dreamhop Music',
    category: 'music',
    image: '/assets/images/Dreamhop_Website-static.jpg',
    video: '/assets/images/Dreamhop_Website-video.mp4',
    href: 'https://dreamhopmusic.com',
    description: 'Designed & built with WordPress, WooCommerce, Divi & custom code for the record label.',
    badges: ['WordPress', 'Divi Builder']
  },
  {
    id: 'studio-dreamhop',
    title: 'Studio Dreamhop',
    category: 'music',
    image: '/assets/images/Studio_Dreamhop-static.jpg',
    video: '/assets/images/Studio_Dreamhop-video.mp4',
    description: 'Designed & built with WordPress, WooCommerce, Divi & custom code.',
    badges: ['WordPress', 'Studio']
  },
  {
    id: 'soothe-records',
    title: 'Soothe Records',
    category: 'music',
    image: '/assets/images/Soothe_Records-static.jpg',
    video: '/assets/images/Soothe_Records-video.mp4',
    href: 'https://sootherecords.com',
    description: 'Co-founded record label focused on ambient lofi music. Designed & built the website with WordPress, Divi & custom code.',
    badges: ['Co-Founder', '30M+ Streams']
  },
  {
    id: 'soothe-studios',
    title: 'Soothe Studios',
    category: 'music',
    image: '/assets/images/Soothe_Studios-static.jpg',
    video: '/assets/images/Soothe_Studios-video.mp4',
    href: 'https://soothestudios.ch',
    description: 'First in-house mix & mastering studio for a lofi record label.',
    badges: ['Co-Founder', '150+ Mixed Tracks']
  },
  {
    id: 'peak-twilight-web',
    title: 'Peak Twilight Homepage',
    category: 'music',
    image: '/assets/images/peak-twilight-homepage.png',
    video: '/assets/images/Peak_Twilight_Website-video.mp4',
    href: 'https://peaktwilight.com',
    description: 'Personal artist homepage with live Spotify stats, animated backgrounds, and immersive music experience.',
    badges: ['100M+ Streams', 'Live Spotify Stats'],
    tech: ['Next.js', 'Tailwind', 'Framer', 'Supabase']
  },
  {
    id: 'peak-twilight-spotify',
    title: 'Peak Twilight Spotify',
    category: 'music',
    image: '/assets/images/Peak_Twilight_Spotify-static.jpg',
    video: '/assets/images/Peak_Twilight_Spotify-video.mp4',
    href: 'https://open.spotify.com/artist/25qDYhjZHVzZS6sOVzAVAx',
    description: 'Music production alias & Spotify Profile with over 100 million streams.',
    badges: ['100M+ Streams', 'SRF Video Feature']
  },
  // Infrastructure
  {
    id: 'uptime-kuma',
    title: 'Uptime Kuma',
    category: 'infrastructure',
    image: '/assets/images/uptime-kuma-static.jpg',
    video: '/assets/images/uptime-kuma-video.mp4',
    href: 'https://status.doruk.ch',
    description: 'Self-hosted uptime monitoring and status page for 20+ services.',
    badges: ['Monitoring', 'Production']
  },
  {
    id: 'glances',
    title: 'Glances Monitoring',
    category: 'infrastructure',
    image: '/assets/images/glances-static.jpg',
    video: '/assets/images/glances-video.mp4',
    href: 'https://glances.doruk.ch',
    description: 'Real-time system monitoring with CPU, memory, disk, network metrics.',
    badges: ['Real-time', 'System Metrics']
  },
  {
    id: 'portainer',
    title: 'Portainer',
    category: 'infrastructure',
    image: '/assets/images/portainer-static.jpg',
    video: '/assets/images/portainer-video.mp4',
    description: 'Self-hosted Docker management for my 20+ production containers. Internal tool - no public access for security reasons.',
    badges: ['Self-Hosted', 'Docker']
  },
  {
    id: 'traefik',
    title: 'Traefik',
    category: 'infrastructure',
    image: '/assets/images/traefik-static.jpg',
    video: '/assets/images/traefik-video.mp4',
    description: 'My reverse proxy handling SSL and routing for all services. Internal dashboard - no public access for security reasons.',
    badges: ['Self-Hosted', 'SSL/TLS']
  },
  {
    id: 'grafana',
    title: 'TTStats API Analytics',
    category: 'infrastructure',
    image: '/assets/images/grafana-ttstats-static.jpg',
    video: '/assets/images/grafana-doruk.mp4',
    href: 'https://grafana.doruk.ch/public-dashboards/682b9b0d5f6d495396ea45f1d967d2d0',
    description: 'Public Grafana dashboard showcasing TTStats.ch analytics.',
    badges: ['Public Dashboard', 'Real-time']
  },
  {
    id: 'watchtower',
    title: 'Watchtower',
    category: 'infrastructure',
    image: '/assets/images/watchtower-static.jpg',
    description: 'Keeps my Docker containers auto-updated with zero downtime. Runs internally on my infrastructure.',
    badges: ['Self-Hosted', 'Auto-update']
  },
  {
    id: 'nocodb',
    title: 'NocoDB',
    category: 'infrastructure',
    image: '/assets/images/nocodb-static.jpg',
    video: '/assets/images/nocodb-video.mp4',
    description: 'Self-hosted Airtable alternative I use for internal data management. No public access for security reasons.',
    badges: ['Self-Hosted', 'Database']
  },
  {
    id: 'soothe-bot',
    title: 'Soothe Discord Bot',
    category: 'infrastructure',
    image: '/assets/images/soothe-discord-bot-static.jpg',
    video: '/assets/images/soothe-discord-bot-video.mp4',
    description: 'Custom Discord bot I built for Soothe Records community. Runs on my infrastructure.',
    badges: ['Self-Hosted', 'Discord']
  },
  {
    id: 'playlist-rotator',
    title: 'Soothe Playlist Autorotator',
    category: 'infrastructure',
    image: '/assets/images/soothe-playlist-autorotator-static.jpg',
    video: '/assets/images/playlist-rotator-video.mp4',
    href: 'https://playlist.sootherecords.com',
    description: 'Automated Spotify playlist rotation service for Soothe Records.',
    badges: ['Automation', 'Spotify API']
  },
  {
    id: 'waha',
    title: 'Waha WhatsApp API',
    category: 'infrastructure',
    image: '/assets/images/waha-whatsapp-api-static.jpg',
    video: '/assets/images/waha-video.mp4',
    description: 'Self-hosted WhatsApp API I use for automations. Internal service - no public access for security reasons.',
    badges: ['Self-Hosted', 'REST API']
  }
]
