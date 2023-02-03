export default class Scrolly {
  constructor(element) {
    console.log('start');
    this.element = element;
    //l'option plus bas
    this.options = {
      rootMargin: '0px 0px 0px 0px',
    };
    this.init();
  }
  init() {
    this.observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options
    );

    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      this.observer.observe(item);
    }
    console.log(items);
  }
  watch(entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;
      console.log(target);

      if (entry.isIntersecting) {
        target.classList.add('is-active');
        console.log('isActive');

        this.observer.unobserve(target); // retirer cet ligne pour que chaque fois que lon passe sur l'objet il effectue l'Animation.
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
