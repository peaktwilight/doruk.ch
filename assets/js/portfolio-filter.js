/**
 * Simple Portfolio Filter
 * Smooth and minimal animation for portfolio items
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and portfolio items
  const filterButtons = document.querySelectorAll('.filter-list button');
  const portfolioItems = document.querySelectorAll('.project-item');
  
  // Make all items visible immediately on page load
  portfolioItems.forEach(item => {
    item.classList.add('active');
    item.style.display = 'block';
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
  });
  
  // Add badge click handlers
  portfolioItems.forEach(item => {
    // Handle GitHub links
    const sourceUrl = item.getAttribute('data-modal-source-url');
    if (sourceUrl && sourceUrl.includes('github.com')) {
      const badge = item.querySelector('.open-source-badge');
      if (badge) {
        badge.addEventListener('click', function(e) {
          e.stopPropagation(); 
          window.open(sourceUrl, '_blank');
        });
      }
    }
    
    // Handle App Store badges
    const appStoreUrl = item.getAttribute('data-appstore-url');
    if (appStoreUrl) {
      const badges = item.querySelectorAll('.app-store-badge');
      badges.forEach(badge => {
        badge.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      });
    }
  });
  
  // Filter function - simple show/hide approach
  function filterItems(filter) {
    // Apply changes to each portfolio item
    portfolioItems.forEach(item => {
      // Get the categories for this item
      const categories = item.getAttribute('data-category').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      // Apply appropriate display and animation properties
      if (shouldShow) {
        // Show this item
        item.style.display = 'block';
        // Use a timeout to ensure display takes effect first
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          item.classList.add('active');
        }, 10);
      } else {
        // Hide this item
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.classList.remove('active');
        // Wait for transition to complete before removing from layout
        setTimeout(() => {
          item.style.display = 'none';
        }, 300); // Match this to your CSS transition time
      }
    });
  }
  
  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Skip if this button is already active
      if (this.classList.contains('active')) return;
      
      // Update button active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Apply filter
      const filterValue = this.getAttribute('data-filter');
      filterItems(filterValue);
    });
  });
});