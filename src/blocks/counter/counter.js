import { EventEmitter } from '../../scripts/utilities';

class Counter extends EventEmitter {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    super();
    this.minusButton = element.querySelector('.js-counter-minus-button');
    this.minusButton.addEventListener('click', () => {
      this.set(String(this.value - this.step));
    });
    this.input = element.querySelector('.js-counter-input');
    this.input.addEventListener('input', (event) => {
      if (event.target.value === '') {
        return;
      }
      this.set(event.target.value);
    });
    this.input.addEventListener('change', (event) => {
      if (event.target.value === '') {
        this.set('0');
      }
      this.set(event.target.value);
    });
    this.plusButton = element.querySelector('.js-counter-plus-button');
    this.plusButton.addEventListener('click', () => {
      this.set(String(this.value + this.step));
    });
    this.value = Number(this.input.value);
    this.min = Number(this.input.min);
    this.max = Number(this.input.max);
    this.step = Number(this.input.step);
  }

  /**
   * @returns {Object}
   */
  get() {
    return {
      value: this.value,
      min: this.min,
      max: this.max,
      step: this.step,
    };
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  set(value) {
    if (this.validate(value)) {
      this.value = Number(value);
      this.input.value = String(value);
      this.emit('change', this.get());
    } else {
      this.input.value = String(this.value);
    }
  }

  /**
   * @param {string} value
   * @returns {boolean}
   */
  validate(value) {
    if (
      /\d/g.test(value) &&
      Number(value) >= this.min &&
      Number(value) <= this.max
    ) {
      return true;
    }
    return false;
  }
}

export default Counter;
