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
  
  // Improved masonry filtering with overflow prevention
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
    const originalWidth = projectListStyle.width;
    
    // Add filtering class to prevent layout shifts
    projectList.classList.add('filtering');
    
    // Set explicit width and height to prevent layout shifts
    projectList.style.width = originalWidth;
    projectList.style.height = originalHeight;
    projectList.style.overflow = 'hidden'; // Prevent items from showing outside container
    
    // Hide all items that need to be hidden first
    toHide.forEach(item => {
      item.classList.remove('active');
      item.style.display = 'none';
    });
    
    // Force a reflow before showing items
    void projectList.offsetHeight;
    
    // Then show all items that should be visible
    toShow.forEach(item => {
      item.classList.add('active');
      item.style.display = 'block';
    });
    
    // Use a short timeout to let the browser recalculate the layout
    setTimeout(() => {
      // Release the constraints in sequence for smoother transition
      projectList.style.overflow = '';
      projectList.style.width = '';
      projectList.style.height = '';
      projectList.classList.remove('filtering');
      
      // Reset filtering flag
      isFiltering = false;
    }, 100); // Shorter timeout for better responsiveness
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