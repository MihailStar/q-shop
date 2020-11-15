import { EventEmitter, formatPrice } from '../../scripts/utilities';
import Counter from '../counter/counter';

class Card extends EventEmitter {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    super();
    this.counter = new Counter(element.querySelector('.js-counter'));
    this.counter.on('change', () => {
      if (this.counter.value <= this.counter.min) {
        this.totalContainer.textContent = '—';
      } else {
        this.totalContainer.textContent = `${formatPrice(this.totalPrice)}₽`;
      }
      this.emit('change', this.get());
    });
    this.totalContainer = element.querySelector('.js-card-total');
    this.price = Number(element.querySelector('.js-card-price').dataset.price);
    this.id = element.dataset.id;
    this.title = element.querySelector('.js-card-title').textContent;
  }

  /**
   * @returns {number}
   */
  get totalPrice() {
    return this.counter.value * this.price;
  }

  /**
   * @returns {Object}
   */
  get() {
    return {
      counter: this.counter.get(),
      price: this.price,
      id: this.id,
      title: this.title,
      totalPrice: this.totalPrice,
    };
  }
}

export default Card;
