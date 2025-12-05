import { useEffect, useState } from 'react'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { AboutStrip } from './components/sections/AboutStrip'
import { Footer } from './components/sections/Footer'
import { Dock, DockItem } from './components/ui/Dock'
import './styles/main.css'

declare global {
  interface Window {
    VANTA?: {
      WAVES: (config: Record<string, unknown>) => { destroy: () => void }
    }
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  // Initialize Vanta background
  useEffect(() => {
    if (window.VANTA) {
      const vantaEffect = window.VANTA.WAVES({
        el: '#vanta-bg',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0a0a0a,
        shininess: 15.0,
        waveHeight: 8.0,
        waveSpeed: 0.25,
        zoom: 0.65
      })
      return () => vantaEffect?.destroy()
    }
  }, [])

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'languages']
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Background */}
      <div id="vanta-bg" className="fixed inset-0 -z-10 opacity-60" />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Main Content */}
      <main id="hero">
        <Hero />
      </main>

      <About />

      <Projects />

      <Experience />

      <AboutStrip />

      <Footer />

      {/* Floating Dock Navigation */}
      {(() => {
        const sections = ['hero', 'about', 'projects', 'experience', 'languages']
        const activeIndex = sections.indexOf(activeSection)
        return (
          <Dock activeIndex={activeIndex >= 0 ? activeIndex : 0}>
            <DockItem active={activeSection === 'hero'} onClick={() => scrollTo('hero')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </DockItem>
            <DockItem active={activeSection === 'about'} onClick={() => scrollTo('about')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </DockItem>
            <DockItem active={activeSection === 'projects'} onClick={() => scrollTo('projects')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </DockItem>
            <DockItem active={activeSection === 'experience'} onClick={() => scrollTo('experience')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </DockItem>
            <DockItem active={activeSection === 'languages'} onClick={() => scrollTo('languages')}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </DockItem>

            {/* Divider */}
            <div className="w-px h-6 bg-white/10 mx-2" />

            {/* CTA - Email */}
            <a
              href="mailto:hello@doruk.ch"
              className="flex h-10 items-center gap-2 px-4 rounded-xl bg-amber-500 text-neutral-900 font-medium text-sm hover:bg-amber-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Say Hi</span>
            </a>
          </Dock>
        )
      })()}
    </div>
  )
}
