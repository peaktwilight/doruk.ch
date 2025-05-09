/**
 * Portfolio Image Loader
 * Simple loader for portfolio GIFs with minimal operations
 */

console.log("Portfolio loader script loaded");

// Add loaders to portfolio images when needed
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, setting up portfolio image loaders");

  // Add click handler to the portfolio tab
  const portfolioLinks = Array.from(document.querySelectorAll('[data-nav-link]'))
    .filter(link => link.textContent.trim().toLowerCase() === 'portfolio');
    
  if (portfolioLinks.length > 0) {
    portfolioLinks.forEach(link => {
      link.addEventListener('click', function() {
        console.log("Portfolio link clicked");
        // Wait for page transition
        setTimeout(addLoadersToImages, 200);
      });
    });
  }
  
  // If portfolio is active on load
  if (document.querySelector('.portfolio.active')) {
    console.log("Portfolio is active on page load");
    setTimeout(addLoadersToImages, 200);
  }
});

// Add loaders to images
function addLoadersToImages() {
  console.log("Adding loaders to portfolio images");
  
  try {
    // Get all portfolio images
    const images = document.querySelectorAll('.project-img img');
    console.log(`Found ${images.length} images`);
    
    // Process each image
    images.forEach((img, index) => {
      // Skip if image is already loaded
      if (img.complete) {
        console.log(`Image ${index} already loaded`);
        return;
      }
      
      // Get the parent container
      const imgContainer = img.closest('.project-img');
      if (!imgContainer) return;
      
      // Check if a loader already exists
      if (imgContainer.querySelector('.shimmer-container')) return;
        
      // Create a simple loader
      const loader = document.createElement('div');
      loader.className = 'shimmer-container';
      loader.innerHTML = `
        <div class="shimmer"></div>
        <div class="shimmer-center"></div>
      `;
      
      // Add the loader
      imgContainer.appendChild(loader);
      console.log(`Added loader to image ${index}`);
      
      // Handle image loaded event
      const handleLoad = () => {
        loader.classList.add('hidden');
        setTimeout(() => {
          if (loader.parentNode) loader.remove();
        }, 500);
        img.removeEventListener('load', handleLoad);
      };
      
      // Add event listeners
      img.addEventListener('load', handleLoad);
      
      // Fallback - remove loader after 8 seconds
      setTimeout(() => {
        if (loader.parentNode) {
          loader.classList.add('hidden');
          setTimeout(() => {
            if (loader.parentNode) loader.remove();
          }, 500);
        }
      }, 8000);
    });
  } catch (error) {
    console.error("Error adding loaders:", error);
  }
}