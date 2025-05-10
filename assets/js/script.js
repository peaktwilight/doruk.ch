'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Initialize Vanta.js background effects
window.addEventListener('load', function() {
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

      // Create a separate modal background container for the HALO effect
      const modalBgContainer = document.createElement('div');
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
      document.body.appendChild(modalBgContainer);

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

      // Get references to modal elements
      const choiceModalContainer = document.querySelector("[data-choice-modal-container]");

      // Add event listeners to update the background when the modal state changes
      if (choiceModalContainer) {
        // Add a listener to the close button to hide the HALO effect
        const closeChoiceBtn = document.querySelector("[data-choice-modal-close-btn]");
        if (closeChoiceBtn) {
          closeChoiceBtn.addEventListener('click', function() {
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
          });
        }

        // Add a listener to the CV button to hide the HALO effect
        const showCVButton = document.getElementById('showCV');
        if (showCVButton) {
          showCVButton.addEventListener('click', function() {
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
          });
        }

        // Add a listener to the modal overlay to hide the HALO effect
        const choiceModalOverlay = document.querySelector("[data-choice-modal-overlay]");
        if (choiceModalOverlay) {
          choiceModalOverlay.addEventListener('click', function() {
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
          });
        }

        // Handle escape key press
        document.addEventListener('keydown', function(event) {
          if (event.key === "Escape" || event.keyCode === 27) {
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
          }
        });
      }

      // Store the effects for later reference or cleanup
      window.vantaEffects = {
        main: vantaEffect,
        modal: modalEffect
      };

      console.log("Vanta.js effects initialized");
    } catch (error) {
      console.error("Failed to initialize Vanta.js:", error);
    }
  } else {
    console.warn("Vanta.js or Three.js library not loaded");
  }
});

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
const modalImg = document.querySelector(".testimonials-modal [data-modal-img]");
const modalTitle = document.querySelector(".testimonials-modal [data-modal-title]");
const modalText = document.querySelector(".testimonials-modal [data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

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

// Select all project items with the trigger attribute
const projectItems = document.querySelectorAll("[data-modal-trigger]");

// Function to open and populate the modal
const openProjectModal = function (item) {
  // Find elements within the clicked item
  const imgElement = item.querySelector('.project-img img');
  const titleElement = item.querySelector('.project-title');
  const categoryElement = item.querySelector('.project-category');

  // Extract data from elements and item's dataset for URLs and status
  const imgSrc = imgElement ? imgElement.src : '';
  const title = titleElement ? titleElement.textContent : 'Project Title';
  const category = categoryElement ? categoryElement.textContent : '';
  const liveUrl = item.dataset.modalUrl;
  const sourceUrl = item.dataset.modalSourceUrl;
  const liveStatus = item.dataset.liveStatus;
  const statusReason = item.dataset.statusReason;
  const appStoreUrl = item.dataset.appstoreUrl;

  // Populate modal content
  projectModalImg.src = imgSrc;
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