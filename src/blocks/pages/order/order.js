import { EventEmitter } from '../../../scripts/utilities';
import Delivery from '../../delivery/delivery';

class Order extends EventEmitter {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    super();
    this.currentDelivery = null;
    this.delivery = Array.prototype.map.call(
      element.querySelectorAll('.js-delivery'),
      (delivery, index) => {
        if (delivery.checked) {
          this.index = index;
        }
        return new Delivery(delivery);
      }
    );
    this.currentDelivery = this.delivery[this.index || 0];
    delete this.index;
    this.delivery.forEach((delivery) => {
      delivery.on('change', (deliveryData) => {
        this.currentDelivery = deliveryData;
        this.emit('change', deliveryData);
      });
    });
  }

  /**
   * @returns {Object}
   */
  get() {
    return {
      delivery: this.currentDelivery,
    };
  }
}

export default Order;
