import Carousel from './components/Carousel';
import Scrolly from './components/Scrolly';
import Header from './components/Header';
import Form from './components/Form';
import Youtube from './components/YouTube';

export default class ComponentFactory {
  constructor() {
    this.componentList = {
      Carousel,
      Scrolly,
      Header,
      Form,
      Youtube,
    };
    this.init();
  }
  init() {
    const components = document.querySelectorAll('[data-component]');
    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        new this.componentList[componentName](element);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
