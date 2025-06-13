'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Initialize Vanta.js background effects
// Check for low performance mode preference in localStorage
const prefersLowPerformance = localStorage.getItem('lowPerformanceMode') === 'true';

// Initialize the background effects based on performance preference
window.addEventListener('load', function() {
  // Set up the toggle based on saved preference
  const performanceToggle = document.getElementById('performance-toggle');
  if (performanceToggle) {
    performanceToggle.checked = prefersLowPerformance;

    // Add event listener for toggle changes
    performanceToggle.addEventListener('change', function() {
      // Save preference to localStorage
      localStorage.setItem('lowPerformanceMode', this.checked);

      // Get the modal background element
      const modalBg = document.getElementById('modal-bg');

      // Clean up existing effects if they exist
      if (window.vantaEffects) {
        if (window.vantaEffects.main) window.vantaEffects.main.destroy();
        if (window.vantaEffects.modal) window.vantaEffects.modal.destroy();
        window.vantaEffects = null;
      }

      // If the modal background exists, remove it so we can create a new one
      if (modalBg) {
        modalBg.remove();
      }

      // Re-initialize backgrounds with the new setting
      initializeBackgrounds(this.checked);

      // If turning off low performance mode, make sure we set up the proper event handlers
      if (!this.checked) {
        // Re-setup modal transitions for high performance mode
        setupModalTransitions();
      } else {
        // Setup transitions for low performance mode
        setupLowPerfModalTransitions();
      }
    });
  }

  // Initialize backgrounds based on current preference
  initializeBackgrounds(prefersLowPerformance);
});

function initializeBackgrounds(lowPerformanceMode) {
  // Skip background effects in low performance mode
  if (lowPerformanceMode) {
    console.log("Low performance mode enabled - skipping background effects");
    // Add simple static background colors instead
    document.body.style.backgroundColor = '#0C0C0C';

    // Add static background to modal container if it exists
    const modalBg = document.getElementById('modal-bg');
    if (modalBg) {
      modalBg.style.backgroundColor = '#121212';
    } else {
      // Create a simple static background for the modal
      const modalBgContainer = document.createElement('div');
      modalBgContainer.id = 'modal-bg';
      modalBgContainer.style.position = 'fixed';
      modalBgContainer.style.top = '0';
      modalBgContainer.style.left = '0';
      modalBgContainer.style.width = '100%';
      modalBgContainer.style.height = '100%';
      modalBgContainer.style.zIndex = '9999';
      modalBgContainer.style.backgroundColor = '#121212';
      modalBgContainer.style.opacity = '1';
      modalBgContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      modalBgContainer.style.pointerEvents = 'none';
      document.body.appendChild(modalBgContainer);
    }

    // Set up modal transition handlers for low performance mode
    setupLowPerfModalTransitions();

    return;
  }

  // Only initialize if VANTA and THREE are available
  if (typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
    try {
      // Create background effect for the main site - this will be visible after the modal closes
      let vantaEffect = VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xD4B455, // Brighter gold color
        backgroundColor: 0x0C0C0C, // Deeper black background for contrast
        points: 12,
        maxDistance: 25.00,
        spacing: 18.00,
        showDots: true
      });

      // Create a separate modal background container for the BIRDS effect
      const modalBgContainer = document.getElementById('modal-bg') || document.createElement('div');
      modalBgContainer.id = 'modal-bg';
      modalBgContainer.style.position = 'fixed';
      modalBgContainer.style.top = '0';
      modalBgContainer.style.left = '0';
      modalBgContainer.style.width = '100%';
      modalBgContainer.style.height = '100%';
      modalBgContainer.style.zIndex = '9999'; // Just below the modal's z-index
      // Start with the modal background visible since the choice modal opens on load
      modalBgContainer.style.opacity = '1';
      modalBgContainer.style.transform = 'scale(1)';
      modalBgContainer.style.transformOrigin = 'center center';
      modalBgContainer.style.transition = 'opacity 1.5s cubic-bezier(0.19, 1, 0.22, 1), transform 2s cubic-bezier(0.165, 0.84, 0.44, 1)';
      modalBgContainer.style.pointerEvents = 'none';

      if (!document.getElementById('modal-bg')) {
        document.body.appendChild(modalBgContainer);
      }

      // Initialize BIRDS effect for the modal background
      let modalEffect = VANTA.BIRDS({
        el: "#modal-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x121212, // Very dark background
        color1: 0xBD9A4D, // Rich gold, slightly darker than vegas-gold
        color2: 0x967A39, // Deeper, more amber gold for contrast
        colorMode: "variance",
        birdSize: 1.20, // Slightly smaller for elegance
        wingSpan: 22.00, // Adjusted wingspan
        speedLimit: 3.00, // Slower for more elegance
        separation: 35.00, // More space between birds
        alignment: 40.00, // More ordered movement
        cohesion: 35.00, // Better grouping behavior
        quantity: 4.00 // More birds for better visual impact
      });

      // Store the effects for later reference or cleanup
      window.vantaEffects = {
        main: vantaEffect,
        modal: modalEffect
      };

      console.log("Vanta.js effects initialized");

      // Set up modal transition event handlers
      setupModalTransitions();

    } catch (error) {
      console.error("Failed to initialize Vanta.js:", error);
    }
  } else {
    console.warn("Vanta.js or Three.js library not loaded");
  }
}

// Set up event handlers for modal transitions
function setupModalTransitions() {
  // Get references to modal elements
  const choiceModalContainer = document.querySelector("[data-choice-modal-container]");
  const modalBgContainer = document.getElementById('modal-bg');

  if (!choiceModalContainer || !modalBgContainer) return;

  // Function to handle modal closing transition
  const handleModalClose = function() {
    // First slightly dim the birds as they begin their transformation
    modalBgContainer.style.opacity = '0.9';
    // Start a subtle expansion
    modalBgContainer.style.transform = 'scale(1.05)';

    // Then after a short delay, begin the main transition
    setTimeout(() => {
      // Fade out completely while expanding
      modalBgContainer.style.opacity = '0';
      modalBgContainer.style.transform = 'scale(1.6)';
    }, 150);
  };

  // Add listeners for all ways to close the modal
  const closeChoiceBtn = document.querySelector("[data-choice-modal-close-btn]");
  if (closeChoiceBtn) {
    closeChoiceBtn.addEventListener('click', handleModalClose);
  }

  const showCVButton = document.getElementById('showCV');
  if (showCVButton) {
    showCVButton.addEventListener('click', handleModalClose);
  }

  const choiceModalOverlay = document.querySelector("[data-choice-modal-overlay]");
  if (choiceModalOverlay) {
    choiceModalOverlay.addEventListener('click', handleModalClose);
  }

  // Handle escape key press
  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      handleModalClose();
    }
  });
}

// Set up event handlers for modal transitions in low performance mode
function setupLowPerfModalTransitions() {
  // Get references to modal elements
  const choiceModalContainer = document.querySelector("[data-choice-modal-container]");
  const modalBgContainer = document.getElementById('modal-bg');

  if (!choiceModalContainer || !modalBgContainer) return;

  // Function to handle modal closing transition without animations
  const handleModalClose = function() {
    // Simple fade out for performance mode
    modalBgContainer.style.opacity = '0';

    // Make sure the background is fully hidden and doesn't block content
    setTimeout(() => {
      modalBgContainer.style.display = 'none';
      modalBgContainer.style.zIndex = '-1'; // Move it behind content
    }, 500);
  };

  // Add listeners for all ways to close the modal
  const closeChoiceBtn = document.querySelector("[data-choice-modal-close-btn]");
  if (closeChoiceBtn) {
    closeChoiceBtn.addEventListener('click', handleModalClose);
  }

  const showCVButton = document.getElementById('showCV');
  if (showCVButton) {
    showCVButton.addEventListener('click', handleModalClose);
  }

  const choiceModalOverlay = document.querySelector("[data-choice-modal-overlay]");
  if (choiceModalOverlay) {
    choiceModalOverlay.addEventListener('click', handleModalClose);
  }

  // Handle escape key press
  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      handleModalClose();
    }
  });
}

// Initial Choice Modal Functionality
const choiceModalContainer = document.querySelector("[data-choice-modal-container]");
const choiceModalOverlay = document.querySelector("[data-choice-modal-overlay]");
const choiceModalCloseBtn = document.querySelector("[data-choice-modal-close-btn]");
const showCVButton = document.getElementById('showCV'); // Keep reference to the specific button

// Function to close the choice modal
const closeChoiceModal = () => {
  if (choiceModalContainer) {
    choiceModalContainer.classList.remove("active");
  }
}

// Function to open the choice modal
const openChoiceModal = () => {
  if (choiceModalContainer) {
    choiceModalContainer.classList.add("active");
  }
}

// Open modal on page load - ensure this runs after Vanta
window.addEventListener('load', function() {
  // Small delay to ensure background is initialized first
  setTimeout(openChoiceModal, 300);

  // Initialize image loaders for portfolio page if it's visible
  if (document.querySelector('.portfolio.active')) {
    /* image loading handled by portfolio-loader.js */
  }
});

// Close modal via Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    closeChoiceModal();
  }
});

// Close modal via CV button click
if (showCVButton) {
  showCVButton.addEventListener('click', closeChoiceModal);
}

// Close modal via overlay click
if (choiceModalOverlay) {
  choiceModalOverlay.addEventListener('click', closeChoiceModal);
}

// Close modal via close button click
if (choiceModalCloseBtn) {
  choiceModalCloseBtn.addEventListener('click', closeChoiceModal);
}

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables - using proper selectors with more specificity
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
}

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    // Get data from testimonial item
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;

    // Update time element if it exists in the modal
    const timeElement = modalContainer.querySelector("time");
    const clickedTime = this.querySelector("time");
    if (timeElement && clickedTime) {
      timeElement.textContent = clickedTime.textContent;
      timeElement.setAttribute("datetime", clickedTime.getAttribute("datetime"));
    }

    // Update text content
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    // Show modal
    testimonialsModalFunc();
  });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// REMOVED - this functionality is now in image-loader.js

// Add event to all nav links with performance optimizations
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    // Check if we're going to the portfolio section
    const isPortfolioClick = targetPage === 'portfolio';

    // If we're going to portfolio, prepare the DOM for smoother transitions
    if (isPortfolioClick) {
      // Find portfolio section
      const portfolioSection = document.querySelector('.portfolio');
      if (portfolioSection) {
        // Pre-calculate height to avoid layout thrashing
        portfolioSection.style.minHeight = window.innerHeight + 'px';

        // Remove any existing active animations to start clean
        const projectItems = portfolioSection.querySelectorAll('.project-item');
        projectItems.forEach(item => {
          item.style.willChange = 'opacity';

          // Reset animations for smoother entrance
          item.style.animation = 'none';
          // Force reflow
          void item.offsetWidth;
          item.style.animation = '';
        });
      }
    }

    // Apply page changes with requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      for (let j = 0; j < pages.length; j++) {
        if (targetPage === pages[j].dataset.page) {
          pages[j].classList.add("active");
          navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }
      }
    });
  });
}

// REMOVED - Function moved to image-loader.js

// Portfolio filtering has been moved to portfolio-filter.js
// Only handle adding open-source category to items with GitHub links
window.addEventListener('load', function() {
  // Add open-source category to items with GitHub links
  const portfolioItems = document.querySelectorAll('.project-item');
  portfolioItems.forEach(item => {
    const sourceUrl = item.getAttribute('data-modal-source-url');
    if (sourceUrl && sourceUrl.includes('github.com')) {
      const currentCategories = item.getAttribute('data-category');
      item.setAttribute('data-category', currentCategories + ' open-source');
    }
  });
});

// Project Details Modal Functionality
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectModalOverlay = document.querySelector("[data-project-modal-overlay]");

// Modal content elements
const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalLiveBtn = document.querySelector("[data-project-modal-live-btn]");
const projectModalSourceBtn = document.querySelector("[data-project-modal-source-btn]");
const projectModalStatus = document.querySelector("[data-project-modal-status]");
const projectModalAppStoreBtn = document.querySelector("[data-project-modal-appstore-btn]");
const projectModalPlayStoreBtn = document.querySelector("[data-project-modal-playstore-btn]");

// Select all project items with the trigger attribute
const projectItems = document.querySelectorAll("[data-modal-trigger]");

// Function to open and populate the modal
const openProjectModal = function (item) {
  // Find elements within the clicked item
  const imgElement = item.querySelector('.project-img img');
  const videoElement = item.querySelector('.project-img video');
  const titleElement = item.querySelector('.project-title');
  const categoryElement = item.querySelector('.project-category');

  // Extract image source - prefer img element, fallback to converting video URL to static image
  let imgSrc = '';
  if (imgElement) {
    imgSrc = imgElement.getAttribute('data-original-src') || imgElement.src || '';
  } else if (videoElement) {
    // Convert video URL back to static image URL
    const videoSrc = videoElement.src;
    
    // Extract filename from video URL and convert to static JPG
    const videoFilename = videoSrc.split('/').pop();
    
    // Handle special cases for video-to-static mapping
    let staticFilename;
    if (videoFilename === 'grafana-doruk.mp4') {
      staticFilename = 'grafana-ttstats-static.jpg';
    } else if (videoFilename === 'playlist-rotator-video.mp4') {
      staticFilename = 'soothe-playlist-autorotator-static.jpg';
    } else if (videoFilename === 'waha-video.mp4') {
      staticFilename = 'waha-whatsapp-api-static.jpg';
    } else {
      // Regular conversion: "project-video.mp4" -> "project-static.jpg"
      staticFilename = videoFilename.replace('-video.mp4', '-static.jpg');
    }
    
    imgSrc = `./assets/images/${staticFilename}`;
  }

  const title = titleElement ? titleElement.textContent : 'Project Title';
  const category = categoryElement ? categoryElement.textContent : '';
  const liveUrl = item.dataset.modalUrl;
  const sourceUrl = item.dataset.modalSourceUrl;
  const liveStatus = item.dataset.liveStatus;
  const statusReason = item.dataset.statusReason;
  const appStoreUrl = item.dataset.appstoreUrl;
  const playStoreUrl = item.dataset.playstoreUrl;

  // Populate modal content - ensure the image source is valid
  if (imgSrc && imgSrc !== '') {
    // Get the image wrapper and make sure it's visible
    const imgWrapper = projectModalImg.closest('.project-modal-img-wrapper');
    if (imgWrapper) {
      imgWrapper.style.display = 'flex';
    }
    
    // Clear any existing loaders and videos
    const existingLoaders = imgWrapper.querySelectorAll('.shimmer-container');
    existingLoaders.forEach(loader => loader.remove());
    const existingVideos = imgWrapper.querySelectorAll('video');
    existingVideos.forEach(video => video.remove());
    
    // Check if this is a portfolio project (has static image)
    const isPortfolioProject = imgSrc.includes('-static.jpg');
    
    if (isPortfolioProject) {
      // For portfolio projects, show video instead of static image
      showVideoInModal(imgSrc, imgWrapper);
      // Skip the regular image loading logic for portfolio projects
    } else {
      // Continue with regular image loading logic
      
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
    imgWrapper.appendChild(loader);
    
    // Reset image to prepare for loading
    projectModalImg.style.display = 'block';
    projectModalImg.style.opacity = '0';
    projectModalImg.classList.remove('loaded');
    
    // Set up progress tracking for the image
    let loadStartTime = Date.now();
    let lastPercentage = 0;
    
    // Handle image load/error events
    function removeLoader() {
      if (!loader.parentNode) return;

      // Show 100% before removing
      percentageDisplay.textContent = '100%';
      progressIndicator.style.width = '100%';

      // Fade out loader after a brief delay to show 100%
      setTimeout(() => {
        loader.classList.add('hidden');

        // Remove from DOM after transition
        setTimeout(() => {
          if (loader.parentNode) loader.remove();
        }, 300);
      }, 200);
    }
    
    // Set src directly using the original source path
    projectModalImg.src = imgSrc;
    
    // Track progress
    if (imgSrc.toLowerCase().endsWith('.gif')) {
      // Create a new XMLHttpRequest to track progress for GIFs
      const xhr = new XMLHttpRequest();
      xhr.open('GET', imgSrc, true);
      xhr.responseType = 'blob';
      
      // Throttle UI updates for better performance
      let lastUpdateTime = Date.now();
      
      // When data is received, update the percentage
      xhr.onprogress = function(event) {
        // Limit UI updates to once per 100ms
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
          const percent = Math.min(Math.round((elapsed / 10000) * 100), 95);
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
          projectModalImg.src = url;
          
          // When the image loads
          projectModalImg.onload = function() {
            removeLoader();
            projectModalImg.style.opacity = '1';
            projectModalImg.classList.add('loaded');
          };
        } else {
          // Fallback to original src if XHR fails
          projectModalImg.onload = function() {
            removeLoader();
            projectModalImg.style.opacity = '1';
            projectModalImg.classList.add('loaded');
          };
        }
      };
      
      // Handle errors
      xhr.onerror = function() {
        console.error('XHR error loading image:', imgSrc);
        projectModalImg.onload = function() {
          removeLoader();
          projectModalImg.style.opacity = '1';
          projectModalImg.classList.add('loaded');
        };
      };
      
      xhr.send();
    } else {
      // For non-GIF images, use a simplified timer-based approach
      const updatePercentage = () => {
        if (!loader.parentNode) return; // Stop if loader was removed
        
        const elapsed = Date.now() - loadStartTime;
        // Simple time-based percentage (max 3s for normal images)
        const percent = Math.min(Math.round((elapsed / 3000) * 100), 95);
        
        if (percent >= lastPercentage + 10) {
          lastPercentage = percent;
          percentageDisplay.textContent = percent + '%';
          progressIndicator.style.width = percent + '%';
        }
        
        if (percent < 95) {
          setTimeout(updatePercentage, 300);
        }
      };
      
      updatePercentage();
      
      // Handle normal image loading
      projectModalImg.onload = function() {
        // Show 100% on load
        percentageDisplay.textContent = '100%';
        progressIndicator.style.width = '100%';
        setTimeout(() => {
          removeLoader();
          projectModalImg.style.opacity = '1';
          projectModalImg.classList.add('loaded');
        }, 200);
      };
    }
    
    projectModalImg.onerror = function() {
      console.error('Failed to load image:', imgSrc);
      percentageDisplay.textContent = 'Error';
      // Show error state in progress bar
      progressIndicator.style.width = '100%';
      progressIndicator.style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
      setTimeout(() => {
        removeLoader();
        projectModalImg.style.opacity = '1';
      }, 500);
    };
    
    // Fallback timeout for safety (10 seconds)
    setTimeout(() => {
      if (loader.parentNode) {
        percentageDisplay.textContent = '100%';
        progressIndicator.style.width = '100%';
        removeLoader();
        projectModalImg.style.opacity = '1';
      }
    }, 10000);
    }
  } else {
    // If no image, hide the image container
    const imgWrapper = projectModalImg.closest('.project-modal-img-wrapper');
    if (imgWrapper) {
      imgWrapper.style.display = 'none';
    }
    projectModalImg.style.display = 'none';
  }
  
  projectModalImg.alt = title;
  projectModalTitle.textContent = title;
  projectModalCategory.textContent = category;
  
  projectModalLiveBtn.href = liveUrl;

  // Populate Status Indicator
  if (liveStatus && statusReason) {
    projectModalStatus.innerHTML = 
      `<span class="status-dot"></span><span class="status-text">${statusReason}</span>`;
    projectModalStatus.className = 'project-status-modal';
    projectModalStatus.classList.add(liveStatus === 'live' ? 'status-live' : 'status-offline');
    projectModalStatus.style.display = 'flex';
  } else {
    projectModalStatus.style.display = 'none';
  }

  // Show/hide source button based on URL
  if (sourceUrl && sourceUrl !== "") {
    projectModalSourceBtn.href = sourceUrl;
    projectModalSourceBtn.style.display = 'flex';
  } else {
    projectModalSourceBtn.style.display = 'none';
  }
  
  // Show/hide App Store button based on URL
  if (appStoreUrl && appStoreUrl !== "") {
    projectModalAppStoreBtn.href = appStoreUrl;
    projectModalAppStoreBtn.style.display = 'flex';
  } else {
    projectModalAppStoreBtn.style.display = 'none';
  }

  // Show/hide Play Store button based on URL
  if (playStoreUrl && playStoreUrl !== "") {
    projectModalPlayStoreBtn.href = playStoreUrl;
    projectModalPlayStoreBtn.style.display = 'flex';
  } else {
    projectModalPlayStoreBtn.style.display = 'none';
  }

  // Show the modal
  projectModalContainer.classList.add("active");
}

// Function to close the modal
const closeProjectModal = function () {
  projectModalContainer.classList.remove("active");
}

// Add click listener to all project items
projectItems.forEach(item => {
  // We listen on the item itself now
  item.addEventListener("click", (event) => {
    // Prevent modal opening if the click was on the title link or github link
    if (event.target.closest('.project-title-link') || event.target.closest('.github-link')) {
        return; // Don't open modal if specific links are clicked
    }
    
    // If the click wasn't on a specific link, open the modal
    event.preventDefault(); // Prevent default anchor behavior if any remains
    openProjectModal(item);
  });
});

// Add click listener to overlay and close button
projectModalOverlay.addEventListener("click", closeProjectModal);
projectModalCloseBtn.addEventListener("click", closeProjectModal);

// Set up observer to watch for new images being added
function setupImageLoadObserver() {
  // Create a new observer
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // If nodes were added
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          // Check if the portfolio is active
          if (document.querySelector('.portfolio.active')) {
            // Initialize loaders for any new project images
            /* image loading handled by portfolio-loader.js */
          }
        });
      }
    });
  });

  // Start observing the portfolio container for changes
  const portfolioContainer = document.querySelector('.portfolio');
  if (portfolioContainer) {
    observer.observe(portfolioContainer, {
      childList: true,
      subtree: true
    });
  }
}

// Call the setup function when the page loads
window.addEventListener('load', setupImageLoadObserver);

// Function to show video in modal for portfolio projects
function showVideoInModal(staticImageSrc, imgWrapper) {
  // Make sure the image wrapper is visible
  if (imgWrapper) {
    imgWrapper.style.display = 'flex';
  }
  
  // Hide the original image
  const modalImg = imgWrapper.querySelector('[data-project-modal-img]');
  if (modalImg) {
    modalImg.style.display = 'none';
  }
  
  // Get video URL using the same logic as portfolio-loader.js
  function getVideoUrl(originalSrc) {
    const filename = originalSrc.split('/').pop();
    const baseUrl = 'https://github.com/peaktwilight/CV-Card/releases/download/v2.0.0-all-videos/';
    
    // Handle special naming cases
    const specialMappings = {
      'soothe-playlist-autorotator-static.jpg': 'playlist-rotator-video.mp4',
      'grafana-ttstats-static.jpg': 'grafana-doruk.mp4',
      'waha-whatsapp-api-static.jpg': 'waha-video.mp4'
    };
    
    if (specialMappings[filename]) {
      return baseUrl + specialMappings[filename];
    }
    
    // Convert static JPG filename to video filename
    const videoName = filename.replace(/\-static\.(jpg|png)$/i, '-video.mp4');
    return baseUrl + videoName;
  }
  
  // Create video element
  const video = document.createElement('video');
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.objectFit = 'cover';
  video.style.borderRadius = 'inherit';
  
  const videoUrl = getVideoUrl(staticImageSrc);
  
  // Load video
  video.oncanplaythrough = function() {
    // Video is ready to play
    video.style.opacity = '1';
  };
  
  video.onerror = function() {
    // If video fails to load, fallback to static image
    console.log('Video failed to load, showing static image instead');
    if (modalImg) {
      modalImg.style.display = 'block';
      modalImg.src = staticImageSrc;
      modalImg.style.opacity = '1';
    }
    video.remove();
  };
  
  video.src = videoUrl;
  video.style.opacity = '0';
  video.style.transition = 'opacity 0.3s ease';
  
  // Add video to wrapper
  imgWrapper.appendChild(video);
  
  // Start loading
  video.load();
}