/**
 * Ultra Basic Portfolio Filter
 * Simplified to just show and hide items
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and portfolio items
  const filterButtons = document.querySelectorAll('.filter-list button');
  const portfolioItems = document.querySelectorAll('.project-item');
  
  // Force all items to be visible immediately
  portfolioItems.forEach(item => {
    item.classList.add('active');
    item.classList.add('visible');
    // Reset inline styles that might be causing invisibility issues
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
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
  
  // Animation timing variables
  const ANIMATION_DURATION = 300; // ms
  
  // Filter function with simplified transitions
  function filterItems(filter) {
    console.log("Filtering items with filter:", filter);
    
    // First reset all items to ensure proper starting state
    portfolioItems.forEach(item => {
      // Reset transition to ensure smooth animations
      item.style.transition = `opacity ${ANIMATION_DURATION}ms ease, transform ${ANIMATION_DURATION}ms ease`;
    });
    
    // First fade out all items that will be hidden
    portfolioItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      const shouldShow = filter === 'all' || categories.includes(filter);
      
      // Items to hide: fade out first
      if (!shouldShow) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
      } else {
        // Items to show: ensure they're visible but wait for the right time to reveal
        item.style.display = 'block';
      }
    });
    
    // Wait for fadeout to complete
    setTimeout(() => {
      portfolioItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
          // Show this item - ensure it's displayed first
          item.style.display = 'block';
          
          // Set up for fade in
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            console.log("Showing item:", item.querySelector('.project-title')?.textContent);
          }, 20);
        } else {
          // Hide this item
          setTimeout(() => {
            item.style.display = 'none';
            console.log("Hiding item:", item.querySelector('.project-title')?.textContent);
          }, ANIMATION_DURATION);
        }
      });
    }, ANIMATION_DURATION + 20);
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