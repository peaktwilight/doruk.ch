/**
 * Optimized Image Loader
 * Adds minimalistic loading animations to all images with maximum performance
 */

// Use a self-executing function for encapsulation
(function() {
  // Remove logging in production for performance
  const DEBUG = false;
  const log = DEBUG ? console.log : function(){};

  // Cache DOM queries for performance
  let portfolioPage;
  let portfolioLinks;

  // Track which images already have loaders to prevent duplication
  const processedImages = new Set();

  // Store any active timeouts to be able to clear them
  const timeouts = [];

  // Initialize the loader once DOM is ready - use passive listener for better performance
  document.addEventListener('DOMContentLoaded', initialize, { passive: true });

  // Setup event listeners and initial state
  function initialize() {
    log('Image loader initialized');

    // Process all images with lazy loading
    processAllLazyImages();

    // Cache DOM elements for portfolio-specific functionality
    portfolioPage = document.querySelector('.portfolio');
    portfolioLinks = Array.from(document.querySelectorAll('[data-nav-link]'))
      .filter(link => link.textContent.trim().toLowerCase() === 'portfolio');

    // Set up portfolio tab click handler with passive listeners
    if (portfolioLinks.length) {
      portfolioLinks.forEach(link => {
        link.addEventListener('click', handlePortfolioClick, { passive: true });
      });
    }

    // Check if portfolio is active immediately
    if (portfolioPage && portfolioPage.classList.contains('active')) {
      // Delay slightly to ensure all resources have been fetched
      setTimeout(processImages, 100);
    }
  }

  // Process all lazy-loaded images on the page
  function processAllLazyImages() {
    const allImages = document.querySelectorAll('img[loading="lazy"]:not(.project-img img)');
    log(`Found ${allImages.length} lazy-loaded images outside the portfolio`);

    allImages.forEach(img => {
      // Skip if already processed or in the portfolio section
      const imageId = img.src;
      if (processedImages.has(imageId) || img.closest('.project-img')) return;

      // Add loading animation if the image isn't in portfolio section
      if (!img.closest('.portfolio')) {
        const container = img.parentElement;
        if (container) {
          addLoaderToImage(img, container);
        }
      }
    });
  }
  // Add loading effect to any image
  function addLoaderToImage(img, container) {
    // Mark as processed
    const imageId = img.src;
    processedImages.add(imageId);

    // If image is already loaded, make it visible but don't add loader
    if (img.complete) {
      img.classList.add('loaded');
      return;
    }

    // Add relative positioning to container if needed
    const currentPosition = window.getComputedStyle(container).position;
    if (currentPosition === 'static') {
      container.style.position = 'relative';
    }

    // Create loader with minimal DOM operations
    const loader = document.createElement('div');
    loader.className = 'shimmer-container';

    // Create shimmer effect
    const shimmer = document.createElement('div');
    shimmer.className = 'shimmer';

    const shimmerCenter = document.createElement('div');
    shimmerCenter.className = 'shimmer-center';
    
    // Create percentage display
    const percentageDisplay = document.createElement('div');
    percentageDisplay.className = 'loader-percentage';
    percentageDisplay.textContent = '0%';
    
    // Create progress indicator bar
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'progress-indicator';
    
    // Add both elements to the shimmer center
    shimmerCenter.appendChild(progressIndicator);
    shimmerCenter.appendChild(percentageDisplay);

    // Add loader to DOM
    loader.appendChild(shimmer);
    loader.appendChild(shimmerCenter);
    container.appendChild(loader);

    // Set up progress tracking for the image
    let loadStartTime = Date.now();
    let lastPercentage = 0;
    
    // Improved progress tracking with better parallelization
    try {
      // Only track progress for GIFs (which tend to be larger animations)
      if (img.src.toLowerCase().endsWith('.gif')) {
        // Create a new XMLHttpRequest to track progress
        const xhr = new XMLHttpRequest();
        xhr.open('GET', img.src, true);
        xhr.responseType = 'blob';
        
        // Higher priority for GIFs
        if (typeof xhr.setRequestHeader === 'function') {
          xhr.setRequestHeader('X-Priority', 'high');
        }
        
        // Throttle UI updates for better performance when loading many images in parallel
        let lastUpdateTime = Date.now();
        
        // When data is received, update the percentage
        xhr.onprogress = function(event) {
          // Limit UI updates to once per 100ms to reduce DOM overhead during parallel loading
          const now = Date.now();
          if (now - lastUpdateTime < 100 && lastPercentage > 0) return;
          
          if (event.lengthComputable && event.total > 0) {
            const percent = Math.min(Math.round((event.loaded / event.total) * 100), 100);
            
            // Only update if percentage has changed significantly 
            if (percent >= lastPercentage + 5 || percent === 100) {
              lastPercentage = percent;
              percentageDisplay.textContent = percent + '%';
              progressIndicator.style.width = percent + '%';
              lastUpdateTime = now;
            }
          } else {
            // If length is not computable, use time-based estimation
            const elapsed = Date.now() - loadStartTime;
            // Simple time-based percentage (max 20s, matching our timeout)
            const percent = Math.min(Math.round((elapsed / 20000) * 100), 95);
            if (percent >= lastPercentage + 5) {
              lastPercentage = percent;
              percentageDisplay.textContent = percent + '%';
              progressIndicator.style.width = percent + '%';
              lastUpdateTime = now;
            }
          }
        };
        
        // When download completes
        xhr.onload = function() {
          if (xhr.status === 200) {
            percentageDisplay.textContent = '100%';
            progressIndicator.style.width = '100%';
            
            // Create an object URL from the downloaded blob
            const url = URL.createObjectURL(xhr.response);
            
            // Set the image src to the object URL
            img.src = url;
            
            // Clean up the object URL when the image loads but store it for modal reuse
            img.onload = function() {
              removeLoader();
              img.classList.add('loaded');
            };
          } else {
            // Fallback to original src if XHR fails
            img.onload = function() {
              removeLoader();
              img.classList.add('loaded');
            };
          }
        };
        
        // Handle errors
        xhr.onerror = function() {
          log('XHR error loading image:', img.src);
          // Let the native img loading handle it
          img.onload = function() {
            removeLoader();
            img.classList.add('loaded');
          };
        };
        
        xhr.send();
      } else {
        // For smaller non-GIF images, use a simplified timer-based approach
        const updatePercentage = () => {
          if (!loader.parentNode) return; // Stop if loader was removed
          
          const elapsed = Date.now() - loadStartTime;
          // Simple time-based percentage (max 5s for small images)
          const percent = Math.min(Math.round((elapsed / 5000) * 100), 95);
          
          if (percent >= lastPercentage + 10) {
            lastPercentage = percent;
            percentageDisplay.textContent = percent + '%';
            progressIndicator.style.width = percent + '%';
          }
          
          if (percent < 95) {
            const timerId = setTimeout(updatePercentage, 500);
            timeouts.push(timerId);
          }
        };
        
        updatePercentage();
      }
    } catch (e) {
      log('Error setting up progress tracking:', e);
      // If there's an error, just hide the percentage display
      percentageDisplay.style.display = 'none';
    }

    // Handle image load/error events
    function removeLoader() {
      if (!loader.parentNode) return;

      // Show 100% before removing
      if (percentageDisplay) {
        percentageDisplay.textContent = '100%';
        if (progressIndicator) {
          progressIndicator.style.width = '100%';
        }
      }

      // Fade out loader after a brief delay to show 100%
      setTimeout(() => {
        loader.classList.add('hidden');

        // Remove from DOM after transition
        const timeout = setTimeout(() => {
          if (loader.parentNode) loader.remove();
          processedImages.delete(imageId);

          // Reset container position if we changed it
          if (currentPosition === 'static') {
            container.style.position = '';
          }
        }, 300);

        timeouts.push(timeout);
      }, 200);
    }

    // Use passive and once for optimal performance
    img.addEventListener('load', () => {
      // Show 100% on load
      percentageDisplay.textContent = '100%';
      progressIndicator.style.width = '100%';
      setTimeout(() => {
        removeLoader();
        img.classList.add('loaded');
      }, 200);
    }, { once: true, passive: true });

    img.addEventListener('error', () => {
      percentageDisplay.textContent = 'Error';
      // Show error state in progress bar
      progressIndicator.style.width = '100%';
      progressIndicator.style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
      removeLoader();
      // Try to recover by forcing src reload
      if (img.src) {
        const originalSrc = img.src;
        img.src = '';
        setTimeout(() => {
          img.src = originalSrc;
        }, 500);
      }
    }, { once: true, passive: true });

    // Fallback timeout for safety (increased to 20 seconds)
    const timeout = setTimeout(() => {
      percentageDisplay.textContent = '100%';
      if (progressIndicator) {
        progressIndicator.style.width = '100%';
      }
      removeLoader();
    }, 20000);
    timeouts.push(timeout);
  }

  // Handler for portfolio tab clicks
  function handlePortfolioClick() {
    log('Portfolio tab clicked');
    // Clear any existing timeouts
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;

    // Reset animation state immediately for smoother transition
    document.querySelectorAll('.project-item.active').forEach(item => {
      item.style.animation = 'none';
      item.style.opacity = '0';
    });

    // Process images on next animation frame
    const timeout = setTimeout(() => {
      requestAnimationFrame(processImages);
    }, 100);
    timeouts.push(timeout);
  }

  // Process all images in the portfolio section
  function processImages() {
    if (!portfolioPage || !portfolioPage.classList.contains('active')) return;

    // Optimize layout performance by disabling animations during loading
    // This significantly reduces layout thrashing
    portfolioPage.classList.add('optimizing-layout');

    // Get all project image containers
    const imgContainers = Array.from(portfolioPage.querySelectorAll('.project-img'));
    log(`Found ${imgContainers.length} image containers`);

    // Skip if no images found
    if (!imgContainers.length) {
      portfolioPage.classList.remove('optimizing-layout');
      return;
    }

    // Set up animation for all project items
    const projectItems = portfolioPage.querySelectorAll('.project-item');

    // Prepare all items for animation in a single batch
    requestAnimationFrame(() => {
      // First reset all animations to a consistent starting state
      projectItems.forEach(item => {
        item.style.animation = 'none';
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) translateZ(0)';
        
        // Make sure items are visible and have active class
        item.classList.add('active');
        item.style.display = 'block';
      });

      // Force reflow to ensure reset is applied
      portfolioPage.offsetHeight;

      // Remove the optimization class
      portfolioPage.classList.remove('optimizing-layout');

      // Enable animations after a minimal delay
      setTimeout(() => {
        projectItems.forEach((item, index) => {
          // Apply staggered animation with proper visibility
          setTimeout(() => {
            // Reset transform and set opacity to 1 for fade in
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) translateZ(0)';
            item.classList.add('visible');
          }, index * 50); // Stagger items by 50ms each
        });
      }, 100);
    });

    // Process all images immediately in parallel for fastest loading
    // But keep the visual animation sequence for better UX
    log('Processing all images in parallel');
    
    // Start all image loads immediately
    imgContainers.forEach(container => {
      processImageContainer(container);
    });
    
    // Use IntersectionObserver only for visual animations as user scrolls
    if ('IntersectionObserver' in window) {
      // This observer only handles the visual animation timing, not loading
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const container = entry.target;
            const projectItem = container.closest('.project-item');
            
            if (projectItem) {
              // Enhance animation when scrolling into view
              projectItem.style.opacity = '1';
              projectItem.style.transform = 'translateY(0) translateZ(0)';
            }
            
            animationObserver.unobserve(container);
          }
        });
      }, {
        rootMargin: '100px',
        threshold: 0.1
      });
      
      // Observe for animation purposes only
      imgContainers.forEach(container => {
        animationObserver.observe(container);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        // Process in batches of 3 at a time for better performance
        let processed = 0;

        function processBatch() {
          for (let i = 0; i < 3 && processed < imgContainers.length; i++, processed++) {
            const container = imgContainers[processed];
            processImageContainer(container);
          }

          if (processed < imgContainers.length) {
            // Process next batch in next animation frame
            requestAnimationFrame(processBatch);
          }
        }

        // Start processing
        processBatch();
      });
    }
  }

  // Process a single image container
  function processImageContainer(container) {
    // Get the image inside this container
    const img = container.querySelector('img');
    if (!img) return;

    // Skip already processed images, but ensure cached images are properly shown
    const imageId = img.src;
    if (processedImages.has(imageId)) return;

    // Check if image is already loaded (cached)
    if (img.complete) {
      img.classList.add('loaded');

      // Force layout recalculation for masonry
      const projectList = container.closest('.project-list');
      if (projectList) {
        setTimeout(() => projectList.offsetHeight, 100);
      }
      return;
    }

    // Optimize masonry layout with minimal reflows
    img.addEventListener('load', function() {
      // Mark image as loaded (for CSS targeting if needed)
      img.classList.add('loaded');

      // Store loaded images count for optimization
      if (!window.loadedPortfolioImages) window.loadedPortfolioImages = 0;
      window.loadedPortfolioImages++;

      // Only trigger reflow after multiple images have loaded (batch processing)
      if (window.loadedPortfolioImages % 3 === 0) {
        const projectList = container.closest('.project-list');
        if (projectList) {
          // Minimal reflow by just touching offsetHeight property
          projectList.offsetHeight;
        }
      }
    }, { once: true, passive: true });

    // Handle image load errors more robustly
    img.addEventListener('error', function() {
      log('Image failed to load:', img.src);
      // Try to reload the image
      if (img.src) {
        const originalSrc = img.src;
        setTimeout(() => {
          img.src = originalSrc + '?reload=' + new Date().getTime();
        }, 1000);
      }
    }, { once: true, passive: true });

    // Use the reusable loader function to add shimmer effect
    addLoaderToImage(img, container);
  }
})();