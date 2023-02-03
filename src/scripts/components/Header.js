export default class Header {
  constructor(element) {
    this.element = element;
    this.scrollPosition = 0;
    this.scrollLimit = 0.1; // <--ici faire la modification pour la balise pour faire disparaitre
    this.html = document.documentElement;
    this.lastScrollPosition = 0;

    this.init();
    this.initNavMobile();
  }
  init() {
    window.addEventListener('scroll', this.onScroll.bind(this)); //<-- faire un if ou supprimer pour empecher la disparition du header
  }

  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    this.setHeaderState();
    this.setDirectionState();
  }
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;
    if (this.scrollPosition > scrollHeight * this.scrollLimit) {
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');

    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
