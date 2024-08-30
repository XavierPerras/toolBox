//class pour la composante scrolly: faire animer des element lors du defilement de la page
export default class Scrolly {
  constructor(element) {
    this.element = element;
    this.optios = {
      rootMargin: '0px',
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      this.watch.bind(this),
      this.optios
    );

    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer.observe(item);
    }
  }
  //methode qui detect si l'élement est regarder ou non
  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;
      if (entry.isIntersecting) {
        target.classList.add('is-active');
        const no = this.element.dataset.norepeat;

        if (no == 'noRepeat') {
          observer.unobserve(target); //empeche infinte animation
          console.log('no repeat');
        }
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
