/**
 * Ultra-Optimized Portfolio Image Loader
 * Adds minimalistic loading animations to GIFs with maximum performance
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
    log('Portfolio loader initialized');

    // Cache DOM elements
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

  // Handler for portfolio tab clicks
  function handlePortfolioClick() {
    log('Portfolio tab clicked');
    // Clear any existing timeouts
    timeouts.forEach(clearTimeout);
    timeouts.length = 0;

    // Reset layout state immediately for smoother transition
    const projectItems = document.querySelectorAll('.project-item.active');
    projectItems.forEach(item => {
      // Force a clean animation state
      item.style.animation = 'none';
      item.style.opacity = '0';
    });

    // Process images after a delay to allow for clean page transition
    const timeout = setTimeout(() => {
      // Ensure DOM is updated before processing
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

    // Reset all project items to a consistent starting state
    const projectItems = portfolioPage.querySelectorAll('.project-item');
    projectItems.forEach(item => {
      // Reset animation completely
      item.style.animation = 'none';
      item.style.opacity = '0';
    });

    // Force reflow
    portfolioPage.offsetHeight;

    // Re-enable animations with a consistent state
    setTimeout(() => {
      projectItems.forEach(item => {
        item.style.animation = '';
      });
      portfolioPage.classList.remove('optimizing-layout');
    }, 80);

    // Use IntersectionObserver to prioritize visible images if supported
    if ('IntersectionObserver' in window) {
      log('Using IntersectionObserver for prioritization');

      // Track which images have been processed
      const processedContainers = new Set();

      // Process visible images first, then others
      const observer = new IntersectionObserver((entries) => {
        // Process visible images immediately
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        visibleEntries.forEach(entry => {
          const container = entry.target;
          if (!processedContainers.has(container)) {
            processedContainers.add(container);
            processImageContainer(container);
            observer.unobserve(container);
          }
        });

        // If all are processed, disconnect observer
        if (processedContainers.size === imgContainers.length) {
          observer.disconnect();
        }
      }, {
        rootMargin: '200px' // Start loading slightly before they come into view
      });

      // Observe all image containers
      imgContainers.forEach(container => observer.observe(container));

      // Process remaining images in a low-priority way after a delay
      setTimeout(() => {
        imgContainers.forEach(container => {
          if (!processedContainers.has(container)) {
            processedContainers.add(container);
            processImageContainer(container);
            observer.unobserve(container);
          }
        });
        observer.disconnect();
      }, 1000);
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

    // Skip already processed images
    const imageId = img.src;
    if (processedImages.has(imageId) || img.complete) return;

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

    // Mark as processed
    processedImages.add(imageId);

    // Create loader with minimal DOM operations
    const loader = document.createElement('div');
    loader.className = 'shimmer-container';

    // Use minimal HTML for better performance
    const shimmer = document.createElement('div');
    shimmer.className = 'shimmer';

    const shimmerCenter = document.createElement('div');
    shimmerCenter.className = 'shimmer-center';

    // Append with minimal reflows
    loader.appendChild(shimmer);
    loader.appendChild(shimmerCenter);
    container.appendChild(loader);

    // Once image loads, remove loader
    function removeLoader() {
      if (!loader.parentNode) return;

      // Use opacity transition for smooth removal
      loader.classList.add('hidden');

      // Remove from DOM after transition
      const timeout = setTimeout(() => {
        if (loader.parentNode) loader.remove();
        // Remove from set when done
        processedImages.delete(imageId);
      }, 300);

      timeouts.push(timeout);
    }

    // Handle image load events - using passive and once for optimal performance
    img.addEventListener('load', removeLoader, { once: true, passive: true });
    img.addEventListener('error', removeLoader, { once: true, passive: true });

    // Fallback timeout - shorter for better performance
    const timeout = setTimeout(removeLoader, 5000);
    timeouts.push(timeout);
  }
})();