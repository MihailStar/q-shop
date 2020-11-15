import { EventEmitter } from '../../scripts/utilities';

class Delivery extends EventEmitter {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    super();
    element.addEventListener('change', () => {
      this.emit('change', this.get());
    });
    this.price = Number(element.dataset.price);
    this.id = element.dataset.id;
    this.title = element.value;
  }

  /**
   * @returns {void}
   */
  get() {
    return {
      price: this.price,
      id: this.id,
      title: this.title,
    };
  }
}

export default Delivery;
