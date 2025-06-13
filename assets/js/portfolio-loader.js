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
      log('Portfolio is active on page load, processing images');
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

  // Get video URL from GitHub releases - updated for v2.0.0-all-videos
  function getVideoUrl(originalSrc) {
    const filename = originalSrc.split('/').pop();
    
    // GitHub releases URL pattern (updated to v2.0.0-all-videos)
    const baseUrl = 'https://github.com/peaktwilight/CV-Card/releases/download/v2.0.0-all-videos/';
    
    // Handle special naming cases
    const specialMappings = {
      'soothe-playlist-autorotator-static.jpg': 'playlist-rotator-video.mp4',
      'grafana-ttstats-static.jpg': 'grafana-doruk.mp4'
    };
    
    if (specialMappings[filename]) {
      return baseUrl + specialMappings[filename];
    }
    
    // Convert static JPG filename to video filename
    // e.g., "project-static.jpg" -> "project-video.mp4"
    const videoName = filename.replace(/\-static\.(jpg|png)$/i, '-video.mp4');
    
    return baseUrl + videoName;
  }

  // Load video progressively for all portfolio projects
  function loadVideoInBackground(img, originalSrc, onVideoReady) {
    const videoUrl = getVideoUrl(originalSrc);
    log('Loading video in background:', videoUrl);
    
    // Create video element to preload
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    
    video.oncanplaythrough = function() {
      log('Video ready:', videoUrl);
      if (onVideoReady) onVideoReady(video);
    };
    
    video.onerror = function() {
      log('Video load failed:', videoUrl);
      // Keep the static frame if video fails
    };
    
    video.src = videoUrl;
    video.load();
  }

  // Setup video interaction (hover to play, click to toggle)
  function setupVideoInteraction(img, video, container) {
    log('Setting up video interaction for:', img.src);
    
    let isVideoActive = false;
    let hoverTimeout;
    
    // Store original image src
    const originalImgSrc = img.src;
    
    // Find the entire project item for hover interactions
    const projectItem = container.closest('.project-item');
    
    // Add video indicator
    const videoIndicator = document.createElement('div');
    videoIndicator.className = 'video-indicator';
    videoIndicator.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
    container.appendChild(videoIndicator);
    
    // Auto-play video on hover over entire project item (immediate)
    if (projectItem) {
      projectItem.addEventListener('mouseenter', function() {
        log('Mouse entered project item, isVideoActive:', isVideoActive);
        if (!isVideoActive) {
          playVideo();
        }
      });
      
      projectItem.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
        if (!isVideoActive) {
          stopVideo();
        }
      });
    }
    
    // Click video indicator to toggle video
    videoIndicator.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      isVideoActive = !isVideoActive;
      
      if (isVideoActive) {
        playVideo();
        videoIndicator.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
      } else {
        stopVideo();
        videoIndicator.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
      }
    });
    
    function playVideo() {
      log('Playing video for:', img.src);
      // Replace image with video
      const imgParent = img.parentNode;
      if (imgParent && video) {
        // Copy image attributes and classes to video
        video.alt = img.alt;
        video.className = img.className;
        video.loading = img.loading;
        
        imgParent.replaceChild(video, img);
        video.play().then(() => {
          log('Video started playing successfully');
        }).catch(err => {
          log('Video play failed:', err);
        });
        img.classList.add('video-loaded');
        videoIndicator.style.opacity = '0.7';
      } else {
        log('Cannot play video - missing parent or video element');
      }
    }
    
    function stopVideo() {
      // Replace video with image
      const videoParent = video.parentNode;
      if (videoParent) {
        videoParent.replaceChild(img, video);
      }
      video.pause();
      video.currentTime = 0;
      img.src = originalImgSrc;
      videoIndicator.style.opacity = '1';
    }
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

    // Progressive loading for all portfolio projects (now uniform)
    const isPortfolioProject = container.closest('.project-item');
    
    log('Processing image:', img.src, 'isPortfolioProject:', !!isPortfolioProject);
    
    if (isPortfolioProject) {
      // All portfolio projects now use static JPG + MP4 video pattern
      const originalSrc = img.src;
      
      log('Portfolio project detected, loading video for:', originalSrc);
      
      // Static frame is already loaded (since HTML now uses static JPGs)
      img.classList.add('static-frame');
      img.classList.add('loaded');
      
      // Load video in background for interactive playback
      loadVideoInBackground(img, originalSrc, function(video) {
        log('Video loaded successfully, setting up interactions');
        // Set up hover interactions (immediate play, no delay)
        setupVideoInteraction(img, video, container);
      });
    } else {
      // For non-portfolio images, show loader immediately
      log('Non-portfolio image, showing loader');
      showLoaderAndLoadImage(img, container, currentPosition, imageId);
    }
  }

  // Show loader and load image (for cases where we need loading animation)
  function showLoaderAndLoadImage(img, container, currentPosition, imageId) {
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

    // Use simplified timer-based loading for all images
    let loadStartTime = Date.now();
    let lastPercentage = 0;
    
    const updatePercentage = () => {
      if (!loader.parentNode) return; // Stop if loader was removed
      
      const elapsed = Date.now() - loadStartTime;
      // Simple time-based percentage (max 5s for images)
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
      
      // Still set up video interactions for cached portfolio images
      const isPortfolioProject = container.closest('.project-item');
      if (isPortfolioProject) {
        log('Cached portfolio image detected, setting up video interactions:', img.src);
        
        // Mark as processed to avoid duplicates
        processedImages.add(imageId);
        
        // Set up video interactions
        const originalSrc = img.src;
        img.classList.add('static-frame');
        
        // Load video in background for interactive playback
        loadVideoInBackground(img, originalSrc, function(video) {
          log('Video loaded for cached image, setting up interactions');
          setupVideoInteraction(img, video, container);
        });
      }

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