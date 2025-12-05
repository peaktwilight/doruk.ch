import { useEffect, useRef, useState, useCallback } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  drift: number
}

export function ScrollAura() {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null)
  const rightCanvasRef = useRef<HTMLCanvasElement>(null)
  const leftParticlesRef = useRef<Particle[]>([])
  const rightParticlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const lastScrollRef = useRef(0)
  const velocityRef = useRef(0)

  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Initialize particles for both sides
  useEffect(() => {
    const createParticles = () => {
      const particles: Particle[] = []
      for (let i = 0; i < 20; i++) {
        particles.push({
          id: i,
          x: Math.random() * 50,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.4 + 0.1,
          drift: (Math.random() - 0.5) * 0.2
        })
      }
      return particles
    }
    leftParticlesRef.current = createParticles()
    rightParticlesRef.current = createParticles()
  }, [])

  // Canvas animation for both sides
  useEffect(() => {
    const leftCanvas = leftCanvasRef.current
    const rightCanvas = rightCanvasRef.current
    if (!leftCanvas || !rightCanvas) return

    const leftCtx = leftCanvas.getContext('2d')
    const rightCtx = rightCanvas.getContext('2d')
    if (!leftCtx || !rightCtx) return

    const resize = () => {
      leftCanvas.width = 60
      leftCanvas.height = window.innerHeight
      rightCanvas.width = 60
      rightCanvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drawParticles = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      particles: Particle[],
      isRight: boolean
    ) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const velocity = Math.abs(velocityRef.current)
      const intensity = Math.min(velocity / 50, 1)

      // Draw ambient glow based on scroll velocity
      if (intensity > 0.05) {
        const gradient = ctx.createLinearGradient(
          isRight ? canvas.width : 0,
          0,
          isRight ? 0 : canvas.width,
          0
        )
        gradient.addColorStop(0, `rgba(245, 158, 11, ${intensity * 0.08})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Update and draw particles
      particles.forEach(particle => {
        // Move particles based on scroll velocity
        particle.y -= velocityRef.current * particle.speed * 0.08
        particle.x += particle.drift

        // Wrap around
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.x < 0) particle.x = 50
        if (particle.x > 50) particle.x = 0

        // Draw particle
        const particleIntensity = particle.opacity * (0.6 + intensity * 0.4)

        ctx.beginPath()
        ctx.arc(
          isRight ? canvas.width - particle.x : particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = `rgba(245, 158, 11, ${particleIntensity})`
        ctx.fill()

        // Add glow effect when scrolling fast
        if (intensity > 0.2) {
          ctx.beginPath()
          ctx.arc(
            isRight ? canvas.width - particle.x : particle.x,
            particle.y,
            particle.size * 2.5,
            0,
            Math.PI * 2
          )
          ctx.fillStyle = `rgba(245, 158, 11, ${particleIntensity * 0.15})`
          ctx.fill()
        }
      })
    }

    const animate = () => {
      drawParticles(leftCtx, leftCanvas, leftParticlesRef.current, false)
      drawParticles(rightCtx, rightCanvas, rightParticlesRef.current, true)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY

    // Calculate velocity
    velocityRef.current = scrollTop - lastScrollRef.current
    lastScrollRef.current = scrollTop

    setIsScrolling(true)

    // Clear scrolling state after delay
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
      velocityRef.current = 0
    }, 150)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      {/* Particle canvas on left edge */}
      <canvas
        ref={leftCanvasRef}
        className="fixed left-0 top-0 pointer-events-none z-30 hidden md:block"
        style={{ opacity: 0.7 }}
      />

      {/* Particle canvas on right edge */}
      <canvas
        ref={rightCanvasRef}
        className="fixed right-0 top-0 pointer-events-none z-30 hidden md:block"
        style={{ opacity: 0.7 }}
      />

    </>
  )
}
