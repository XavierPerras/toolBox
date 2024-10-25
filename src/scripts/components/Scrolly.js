// Class for the "Scrolly" component: animates elements as they enter the viewport during scrolling
export default class Scrolly {
  constructor(element) {
    this.element = element; // The main element containing items to animate
    this.optios = {
      rootMargin: '0px', // Defines the margin around the root to trigger animations slightly earlier or later
    };
    this.init(); // Initialize the observer setup
  }

  // Initializes the IntersectionObserver and observes each target item
  init() {
    const observer = new IntersectionObserver(
      this.watch.bind(this), // Bind the `watch` method to use it as a callback
      this.optios
    );

    const items = this.element.querySelectorAll('[data-scrolly]'); // Selects elements to animate on scroll
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer.observe(item); // Observe each target item to detect when it enters the viewport
    }
  }

  // Method to handle observed elements as they enter or leave the viewport
  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target; // Reference to the observed item

      if (entry.isIntersecting) {
        // If the element is in the viewport
        target.classList.add('is-active'); // Adds an active class to trigger animation

        const no = this.element.dataset.norepeat; // Check if the element should animate only once
        if (no == 'noRepeat') {
          observer.unobserve(target); // Stops observing to prevent repetitive animations
          console.log('no repeat'); // Logs to indicate no-repeat behavior
        }
      } else {
        target.classList.remove('is-active'); // Removes the active class when element leaves the viewport
      }
    }
  }
}
