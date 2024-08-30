import Swiper from 'swiper/bundle';
// class du carousel: crée un element d'image ou texte qui defile
export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        type: 'bullets',
      },
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };
    this.init();
  }

  init() {
    console.log('CarouselOn');
    this.setOption();

    new Swiper(this.element, this.options);
  }
  //methode pour les options et les variants
  setOption() {
    // console.log('option');
    this.autoplay = this.element.dataset.autoplay;
    this.split = this.element.dataset.split;
    this.loop = this.element.dataset.loop;
    this.vert = this.element.dataset.vert;
    this.gap = this.element.dataset.gap;

    //split
    if (this.split == 'split') {
      if (this.split == 3) {
        this.options.slidesPerView = 3;
      }
      this.options.slidesPerView = 2;
      this.options.breakpoints = {
        768: {
          slidesPerView: 2.5,
        },
        1000: {
          slidesPerView: 2,
        },
      };
      console.log('variante split');
    }
    if (this.vert == 'vert') {
      this.options.direction = 'vertical';
      this.options.mousewheel = true;
      this.options.slidesPerView = 'auto';
      console.log('up and down');
    }

    //autoplay
    if (this.autoplay == 'autoplay') {
      this.options.autoplay = {
        autoplay: true,
        delay: 5000, //cree un delay
        disableOnInteraction: true, // emepche modification dans la page
        pauseOnMouseEnter: true, // lors du survole l'autoplay est off
      };

      console.log('variante autoplay');
    } //loop
    if (this.loop == 'loop') {
      this.options.loop = {
        loop: true,
      };
      console.log('variante loop');
    }
    //gap
    if (this.gap) {
      const gap = parseInt(this.gap);
      this.options.spaceBetween = gap;
      console.log('valeur du gap ', this.gap);
    }
  }
}
