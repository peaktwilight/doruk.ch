/**
 * Ultra Simple Portfolio Filter
 * No animations, just simple instant show/hide
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and portfolio items
  const filterButtons = document.querySelectorAll('.filter-list button');
  const portfolioItems = document.querySelectorAll('.project-item');
  
  // Make all items visible immediately on page load
  portfolioItems.forEach(item => {
    item.classList.add('active');
    item.style.display = 'block';
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
  
  // Filter function - simple direct show/hide with no animations
  function filterItems(filter) {
    portfolioItems.forEach(item => {
      // Get the categories for this item
      const categories = item.getAttribute('data-category').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      // Apply display property directly - no animations
      if (shouldShow) {
        item.style.display = 'block';
        item.classList.add('active');
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
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