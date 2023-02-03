export default class SnackBar {
  constructor(element) {
    this.element = element;
    this.scrollPosition = 0;
    this.scrollLimit = -0.1; // <--ici faire la modification pour la balise pour faire disparaitre
    this.html = document.documentElement;
    this.lastScrollPosition = 0;

    this.init();
  }
  init() {
    window.addEventListener('scroll', this.onScroll.bind(this)); //<-- faire un if ou supprimer pour empecher la disparition du header

    //if (Cache.get('opa')) {
    //this.open();
    //  } else {
    this.element.addEventListener('click', this.open.bind(this));
    // }
  }
  open(event) {
    //  Cache.set('active', 'opa');

    this.html.classList.add('opa');
  }

  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    this.setHeaderState();
    this.setDirectionState();
  }
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;
    if (this.element.dataset.fix) {
      if (this.scrollPosition > scrollHeight * this.scrollLimit) {
        this.html.classList.add('snackBar-is-hidden');
      } else {
        this.html.classList.remove('snackBar-is-hidden');
      }
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
}
