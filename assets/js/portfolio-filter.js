/**
 * Simple Portfolio Filter Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and portfolio items
  const filterButtons = document.querySelectorAll('.filter-list button');
  const portfolioItems = document.querySelectorAll('.project-item');
  
  // Initialize items with animation on page load
  setTimeout(() => {
    const activeItems = document.querySelectorAll('.project-item.active');
    activeItems.forEach(item => {
      item.classList.add('fade-in');
    });
  }, 100);
  
  // Make badges clickable
  portfolioItems.forEach(item => {
    // Handle Open Source projects
    const sourceUrl = item.getAttribute('data-modal-source-url');
    if (sourceUrl && sourceUrl.includes('github.com')) {
      // Add the open-source category
      const currentCategory = item.getAttribute('data-category');
      item.setAttribute('data-category', `${currentCategory} open-source`);

      // Make badge clickable
      const badge = item.querySelector('.open-source-badge');
      if (badge) {
        badge.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent modal from opening
          window.open(sourceUrl, '_blank');
        });
      }
    }
    
    // Handle App Store badges
    const appStoreUrl = item.getAttribute('data-appstore-url');
    if (appStoreUrl) {
      // Add the mobile-app category if not already added
      const currentCategory = item.getAttribute('data-category');
      if (!currentCategory.includes('mobile-app')) {
        item.setAttribute('data-category', `${currentCategory} mobile-app`);
      }

      // Make sure badge clicks don't trigger modal
      const badges = item.querySelectorAll('.app-store-badge');
      badges.forEach(badge => {
        badge.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent modal from opening
        });
      });
    }
  });

  // Track current filter to prevent unnecessary animations
  let currentFilter = 'all';
  let isAnimating = false;
  
  // Improved filter function with consistent animations
  function filterItems(filter) {
    // Skip if already using this filter or animation in progress
    if (filter === currentFilter || isAnimating) return;
    
    // Update current filter
    currentFilter = filter;
    isAnimating = true;
    
    // Determine which items will be shown and which will be hidden
    const itemsToShow = [];
    const itemsToHide = [];
    
    portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        itemsToShow.push(item);
      } else {
        itemsToHide.push(item);
      }
    });
    
    // Step 1: Hide items that need to be hidden
    itemsToHide.forEach(item => {
      // First remove the animation class
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.classList.remove('fade-in');
    });
    
    // Step 2: Wait for hide animation to complete, then update DOM classes
    setTimeout(() => {
      // Update active class based on filter
      itemsToHide.forEach(item => {
        item.classList.remove('active');
      });
      
      itemsToShow.forEach(item => {
        // Make sure it's marked as active
        item.classList.add('active');
        
        // Reset styles to prepare for animation
        if (!item.classList.contains('fade-in')) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
        }
      });
      
      // Force layout reflow to ensure animations work properly
      document.body.offsetHeight;
      
      // Step 3: Show all visible items with animation
      setTimeout(() => {
        itemsToShow.forEach((item, index) => {
          // Stagger animations slightly for a nicer effect
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('fade-in');
          }, index * 30); // Stagger by 30ms per item
        });
        
        // Reset animation flag after all animations complete
        const totalDelay = itemsToShow.length * 30 + 400; // Last item delay + animation duration
        setTimeout(() => {
          isAnimating = false;
          
          // Clean up inline styles after animations complete
          portfolioItems.forEach(item => {
            if (item.classList.contains('active')) {
              item.style.opacity = '';
              item.style.transform = '';
              item.style.transition = '';
            }
          });
        }, totalDelay);
      }, 50);
    }, 300);
  }
  
  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update button active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Get filter value and apply
      const filterValue = this.getAttribute('data-filter');
      filterItems(filterValue);
    });
  });
});