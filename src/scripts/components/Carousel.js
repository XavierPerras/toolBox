// Import Swiper from the Swiper library
import Swiper from 'swiper/bundle';

// Carousel class: Creates an element for displaying images or text in a sliding carousel format
export default class Carousel {
  constructor(element) {
    // Initialize the carousel element and options
    this.element = element;
    this.options = {
      slidesPerView: 1, // Default number of slides to show at once
      spaceBetween: 20, // Default space between slides
      pagination: {
        el: this.element.querySelector('.swiper-pagination'), // Pagination element for slide indicators
        type: 'bullets', // Bullet-style pagination
      },
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'), // Element for next button
        prevEl: this.element.querySelector('.swiper-button-prev'), // Element for previous button
      },
    };
    this.init(); // Initialize the carousel with provided options
  }

  // Initialize the Swiper instance
  init() {
    console.log('CarouselOn'); // Log to indicate initialization
    this.setOption(); // Configure additional options based on dataset attributes

    new Swiper(this.element, this.options); // Create a new Swiper instance with the carousel element and options
  }

  // Method to set options and variants based on dataset attributes
  setOption() {
    // Fetch and assign dataset attributes for carousel customization
    this.autoplay = this.element.dataset.autoplay;
    this.split = this.element.dataset.split;
    this.loop = this.element.dataset.loop;
    this.vert = this.element.dataset.vert;
    this.gap = this.element.dataset.gap;

    // Split variant: Adjusts the number of slides per view based on the split attribute
    if (this.split == 'split') {
      if (this.split == 3) {
        this.options.slidesPerView = 3; // Show 3 slides if split is set to '3'
      }
      this.options.slidesPerView = 2; // Show 2 slides per view by default if split is enabled
      this.options.breakpoints = {
        // Breakpoints to control slides per view at specific widths
        768: {
          slidesPerView: 2.5,
        },
        1000: {
          slidesPerView: 2,
        },
      };
      console.log('variante split'); // Log for the split variant
    }

    // Vertical variant: Switches the carousel to vertical scrolling mode
    if (this.vert == 'vert') {
      this.options.direction = 'vertical'; // Set direction to vertical
      this.options.mousewheel = true; // Enable mousewheel control for vertical scrolling
      this.options.slidesPerView = 'auto'; // Show slides based on content height
      console.log('up and down'); // Log for vertical variant
    }

    // Autoplay variant: Enables automatic sliding of the carousel
    if (this.autoplay == 'autoplay') {
      this.options.autoplay = {
        delay: 5000, // Delay of 5 seconds between each slide
        disableOnInteraction: true, // Pause autoplay if the user interacts with the carousel
        pauseOnMouseEnter: true, // Pause autoplay when hovering over the carousel
      };
      console.log('variante autoplay'); // Log for autoplay variant
    }

    // Loop variant: Enables continuous looping of the slides
    if (this.loop == 'loop') {
      this.options.loop = true; // Set loop to true for infinite scroll
      console.log('variante loop'); // Log for loop variant
    }

    // Gap adjustment: Sets the space between slides based on the gap attribute
    if (this.gap) {
      const gap = parseInt(this.gap); // Convert gap value to an integer
      this.options.spaceBetween = gap; // Set the gap space between slides
      console.log('valeur du gap ', this.gap); // Log for gap value
    }
  }
}
