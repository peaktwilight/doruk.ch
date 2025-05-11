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
  
  // Simple filter function
  function filterItems(filter) {
    // Skip if already using this filter or animation in progress
    if (filter === currentFilter || isAnimating) return;
    
    // Update current filter
    currentFilter = filter;
    isAnimating = true;
    
    // First, remove fade-in class from items that will be hidden
    portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      if (!(filter === 'all' || categories.includes(filter))) {
        item.classList.remove('fade-in');
      }
    });
    
    // Short delay to allow fade-out to start
    setTimeout(() => {
      // Then update active class based on filter
      portfolioItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          item.classList.add('active');
          // Short delay before fade in
          setTimeout(() => {
            item.classList.add('fade-in');
          }, 50);
        } else {
          item.classList.remove('active');
        }
      });
      
      // Reset animation flag
      setTimeout(() => {
        isAnimating = false;
      }, 500);
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