import Modal from './components/Modal';
import Carousel from './components/Carousel';
import Header from './components/Header';
import Scrolly from './components/Scrolly';
import Cursor from './components/Cursor';
import Form from './components/Form';
import SnackBar from './components/snackBar';
import Cache from './components/Cache';

export default class ComponentFactory {
  constructor() {
    this.componentList = {
      Modal,
      Carousel,
      Scrolly,
      Header,
      Cursor,
      Form,
      Cache,
      SnackBar,
    };
    this.init();
  }
  init() {
    const components = document.querySelectorAll('[data-component]');
    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
