/**
 * Tech Showcase Animation Controller
 * Handles horizontal infinite scrolling tech tags with marquee effect
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', initTechShowcase);

  function initTechShowcase() {
    const techShowcase = document.querySelector('.tech-showcase');
    const achievementsShowcase = document.querySelector('.achievements-showcase');
    const marquees = document.querySelectorAll('.marquee');
    
    if ((!techShowcase && !achievementsShowcase) || !marquees.length) return;

    // Duplicate tags for seamless infinite scroll
    marquees.forEach(marquee => {
      const techTags = marquee.querySelectorAll('.tech-tag');
      const achievementTags = marquee.querySelectorAll('.achievement-tag');
      const tags = [...techTags, ...achievementTags];
      
      tags.forEach(tag => {
        const clone = tag.cloneNode(true);
        marquee.appendChild(clone);
      });
    });

    // Pause/resume animation based on visibility and hover
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      marquees.forEach(marquee => {
        marquee.style.animationPlayState = isVisible ? 'running' : 'paused';
      });
    };

    // Add hover handlers for both sections
    [techShowcase, achievementsShowcase].forEach(showcase => {
      if (!showcase) return;
      
      showcase.addEventListener('mouseenter', () => {
        const showcaseMarquees = showcase.querySelectorAll('.marquee');
        showcaseMarquees.forEach(marquee => {
          marquee.style.animationPlayState = 'paused';
        });
      });

      showcase.addEventListener('mouseleave', () => {
        if (!document.hidden) {
          const showcaseMarquees = showcase.querySelectorAll('.marquee');
          showcaseMarquees.forEach(marquee => {
            marquee.style.animationPlayState = 'running';
          });
        }
      });
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Add click handlers for both tech tags and achievement tags
    const allTags = document.querySelectorAll('.tech-tag, .achievement-tag');
    allTags.forEach(tag => {
      tag.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Performance optimization: reduce animation frequency when not in view
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const showcaseMarquees = entry.target.querySelectorAll('.marquee');
          showcaseMarquees.forEach(marquee => {
            marquee.style.animationPlayState = 'running';
          });
        } else {
          const showcaseMarquees = entry.target.querySelectorAll('.marquee');
          showcaseMarquees.forEach(marquee => {
            marquee.style.animationPlayState = 'paused';
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe both showcases
    if (techShowcase) observer.observe(techShowcase);
    if (achievementsShowcase) observer.observe(achievementsShowcase);
  }

  // Add ripple animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();