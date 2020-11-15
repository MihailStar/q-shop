import { EventEmitter, formatPrice } from '../../../scripts/utilities';
import Card from '../../card/card';

class Goods extends EventEmitter {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    super();
    this.cards = Array.prototype.map.call(
      element.querySelectorAll('.js-card'),
      (card) => {
        return new Card(card);
      }
    );
    this.cards.forEach((card) => {
      card.on('change', () => {
        const { totalPrice } = this;
        if (totalPrice <= 0) {
          this.totalContainer.textContent = '—';
        } else {
          this.totalContainer.textContent = `Итого ${formatPrice(totalPrice)}₽`;
        }
        this.emit('change', this.get());
      });
    });
    this.totalContainer = element.querySelector('.js-goods-total');
  }

  /**
   * @returns {number}
   */
  get totalPrice() {
    return this.cards.reduce((accumulator, card) => {
      return accumulator + card.totalPrice;
    }, 0);
  }

  /**
   * @returns {Object}
   */
  get() {
    return {
      cards: this.cards.filter((card) => card.counter.value > 0),
      totalPrice: this.totalPrice,
    };
  }
}

export default Goods;
