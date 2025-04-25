'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


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

// Open modal on page load
window.addEventListener('load', openChoiceModal);

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


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


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


// Add this inside the DOMContentLoaded listener if not already there
document.addEventListener('DOMContentLoaded', (event) => {
  // ... (keep existing DOMContentLoaded code) ...

  // Initial choice modal logic (keep this)
  const choiceModal = document.getElementById('choiceModal');
  const showCVButton = document.getElementById('showCV');
  if (choiceModal && showCVButton) {
    // Show the modal automatically
    choiceModal.style.display = 'flex'; 

    showCVButton.onclick = function() {
      choiceModal.style.display = 'none';
    }
  } else {
    console.error('Choice modal or button not found');
  }

  // ... (potentially other existing code)
});

