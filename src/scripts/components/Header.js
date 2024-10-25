// Class for an animated and responsive header component
export default class Header {
  constructor(element) {
    this.element = element; // Reference to the header element
    this.scrollPosition = 0; // Tracks the current scroll position

    // Optional scroll limit for hiding header
    const lImit = document.querySelector('[data-scroll-limit]');
    console.log(lImit);
    if (lImit) {
      const rect = lImit.getBoundingClientRect();
      this.scrollLimit = rect.height / 100; // Sets scroll limit based on element height
      console.log(this.scrollLimit);
    } else {
      this.scrollLimit = 0.1; // Default scroll limit if no custom limit is set
      console.log('default');
    }

    this.html = document.documentElement; // Reference to the root HTML element
    this.lastScrollPosition = 0; // Tracks previous scroll position

    this.init(); // Initialize header scroll event listener
    this.initNavMobile(); // Initialize mobile navigation functionality
  }

  // Sets up the header scroll listener
  init() {
    console.log('header initialized');
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  // Method to detect and respond to scroll events
  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    this.setHeaderState(); // Hide or show header based on scroll position
    this.setDirectionState(); // Set scroll direction (up or down)
  }

  // Method to hide the header based on scroll position and set scroll limit
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;
    const noHiding = this.element.dataset.notHiding; // Checks if header should not be hidden

    if (noHiding == 'not-hiding') {
      console.log('Header hiding disabled');
    } else {
      if (this.scrollPosition > scrollHeight * this.scrollLimit) {
        this.html.classList.add('header-is-hidden'); // Add class to hide header
      } else {
        this.html.classList.remove('header-is-hidden'); // Remove class to show header
      }
    }
  }

  // Method to detect scroll direction (up or down)
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  // Method to set up mobile navigation functionality
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle'); // Selects mobile nav toggle button
    toggle.addEventListener('click', this.onToggleNav.bind(this)); // Add click listener for toggle
  }

  // Method to open and close the responsive mobile menu
  onToggleNav() {
    this.html.classList.toggle('nav-is-active'); // Toggles class to show/hide navigation
  }
}
