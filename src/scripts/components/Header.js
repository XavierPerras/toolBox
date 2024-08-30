// class pour la composant header: un header animer et reactif
export default class Header {
  constructor(element) {
    this.element = element;
    this.scrollPosition = 0;

    const lImit = document.querySelector('[data-scroll-limit]');
    console.log(lImit);
    if (lImit) {
      const rect = lImit.getBoundingClientRect();

      this.scrollLimit =  rect.height / 100;
      console.log(this.scrollLimit);
    } else {
      this.scrollLimit = 0.1;
      console.log('default');
    }

    this.html = document.documentElement;
    this.lastScrollPosition = 0;

    this.init();
    this.initNavMobile();
  }
  init() {
    console.log('header');
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
// cette methode detect le scroll
  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    this.setHeaderState();
    this.setDirectionState();
  }
  //cette methode permet de cacher le header
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;
    const noHiding = this.element.dataset.notHiding; //querySelector('[data-not-hiding]'); 

    if (noHiding == 'not-hiding') {
      console.log(noRepeat);
    } else {
      if (this.scrollPosition > scrollHeight * this.scrollLimit) {
        this.html.classList.add('header-is-hidden');
      } else {
        this.html.classList.remove('header-is-hidden');
      }
    }
  }
  //cette methode detecte la direction du scroll
  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }
  //cette methode detect si on est en menu destop ou mobile
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');

    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }
  //cette methode ouvre et ferme le menue en responsive
  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
