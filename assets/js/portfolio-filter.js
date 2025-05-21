/**
 * Simplified Portfolio Filter
 * Optimized grid-based filtering without animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and portfolio items
  const filterButtons = document.querySelectorAll('.filter-list button');
  const portfolioItems = document.querySelectorAll('.project-item');
  const projectList = document.querySelector('.project-list');
  
  // Flag to track if we're currently filtering
  let isFiltering = false;
  
  // Ensure all items are initially visible
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
  
  // Masonry-optimized filtering function with height preservation
  function filterItems(filter) {
    // Skip if already filtering
    if (isFiltering) return;
    isFiltering = true;
    
    // First determine which items to show/hide
    const toShow = [];
    const toHide = [];
    
    portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        toShow.push(item);
      } else {
        toHide.push(item);
      }
    });
    
    // Store original styles to restore later
    const projectListStyle = window.getComputedStyle(projectList);
    const originalHeight = projectListStyle.height;
    
    // Temporarily freeze the container height to prevent jumping
    projectList.style.height = originalHeight;
    
    // Batch DOM operations for better performance
    requestAnimationFrame(() => {
      // First hide all items that need to be hidden
      toHide.forEach(item => {
        item.classList.remove('active');
        item.style.display = 'none';
      });
      
      // Force reflow to apply changes
      void projectList.offsetHeight;
      
      // Then show all items that need to be visible
      toShow.forEach(item => {
        item.classList.add('active');
        item.style.display = 'block';
      });
      
      // Wait a bit for masonry layout to recalculate
      setTimeout(() => {
        // Release the fixed height to allow natural flow
        projectList.style.height = '';
        
        // Reset filtering flag
        isFiltering = false;
      }, 150); // Give a bit more time for masonry layout
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