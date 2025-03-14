// Enhanced Cursor Follower Script
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is touch-enabled
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    };

    // Only initialize custom cursor for non-touch devices
    if (!isTouchDevice()) {
        // Create cursor element
        const cursor = document.createElement('div');
        
        // Set initial styles - exactly as original
        cursor.style.position = 'fixed';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'var(--vegas-gold)';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.opacity = '0.6';
        cursor.style.mixBlendMode = 'difference';
        cursor.style.transition = 'width 0.3s ease-out, height 0.3s ease-out, opacity 0.2s ease-out, transform 0.1s ease-out';
        cursor.style.transform = 'translate(-50%, -50%)';
        
        // Add cursor to body
        document.body.appendChild(cursor);
        
        // Track positions and velocity
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let lastX = 0;
        let lastY = 0;
        let velocityX = 0;
        let velocityY = 0;
        let isClicking = false;
        let isHovering = false;
        
        // Interactive elements
        const interactiveElements = 'a, button, .project-item, .navbar-link, .social-link, .timeline-item, .skill-item, .contact-link, .testimonials-item';
        
        // Update mouse position and calculate velocity
        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          
          // Calculate velocity for both X and Y axes
          velocityX = mouseX - lastX;
          velocityY = mouseY - lastY;
          lastX = mouseX;
          lastY = mouseY;
        });
        
        // Handle interactive elements - exactly as original
        document.querySelectorAll(interactiveElements).forEach(element => {
          element.addEventListener('mouseenter', () => {
            isHovering = true;
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.opacity = '1';
            cursor.style.backgroundColor = 'var(--vegas-gold)';
            element.style.cursor = 'none';
          });
          
          element.addEventListener('mouseleave', () => {
            isHovering = false;
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.opacity = '0.6';
            cursor.style.backgroundColor = 'var(--vegas-gold)';
            element.style.cursor = 'auto';
          });
        });
        
        // Handle click animations - exactly as original
        document.addEventListener('mousedown', () => {
          isClicking = true;
          cursor.style.transform = `translate(-50%, -50%) scale(0.7)`;
          
          if (isHovering) {
            cursor.style.width = '35px';
            cursor.style.height = '35px';
            cursor.style.opacity = '1';
          } else {
            cursor.style.width = '15px';
            cursor.style.height = '15px';
            cursor.style.opacity = '0.6';
          }
        });
        
        document.addEventListener('mouseup', () => {
          isClicking = false;
          cursor.style.transform = `translate(-50%, -50%) scale(1)`;
          
          if (isHovering) {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.opacity = '1';
          } else {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.opacity = '0.4';
          }
        });
        
        // Animation loop with smooth easing
        function animate() {
          const ease = 0.15;
          
          // Smooth position
          cursorX += (mouseX - cursorX) * ease;
          cursorY += (mouseY - cursorY) * ease;
          
          // Apply position
          cursor.style.left = `${cursorX}px`;
          cursor.style.top = `${cursorY}px`;
          
          // Calculate overall movement speed
          const speedX = Math.abs(velocityX);
          const speedY = Math.abs(velocityY);
          const combinedSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
          
          // Calculate rotation based on velocity
          const rotation = velocityX * 0.2;
          
          // Calculate squish factor
          const squishX = Math.min(speedX * 0.05, 0.5);
          const scale = isClicking ? 0.7 : 1;
          
          // Enhanced diagonal movement
          if (combinedSpeed > 5 && Math.abs(velocityY) > 3) {
            // For significant diagonal movement
            const movementAngle = Math.atan2(velocityY, velocityX);
            const stretchFactor = Math.min(combinedSpeed * 0.02, 0.5);
            
            cursor.style.transform = `translate(-50%, -50%) rotate(${movementAngle * (180/Math.PI)}deg) scale(${scale}) scaleX(${1 + stretchFactor}) scaleY(${1 - stretchFactor * 0.5})`;
          } else {
            // For horizontal movement, use original behavior
            cursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale}) scaleX(${1 + squishX}) scaleY(${1 - squishX * 0.5})`;
          }
          
          // Decay velocities
          velocityX *= 0.9;
          velocityY *= 0.9;
          
          requestAnimationFrame(animate);
        }
        
        animate();
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Handle cursor visibility when leaving/entering the window
        document.addEventListener('mouseleave', () => {
          cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
          cursor.style.opacity = '0.6';
        });
    }
});