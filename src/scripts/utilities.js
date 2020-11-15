class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  on(type, listener) {
    this.events[type] = (this.events[type] || []).concat(listener);
  }

  /**
   * @param {string} type
   * @param {Function} listener
   * @returns {void}
   */
  off(type, listener) {
    this.events[type] = (this.events[type] || []).filter(
      (func) => func !== listener
    );
  }

  /**
   * @param {string} type
   * @param {Object} arg
   * @returns {void}
   */
  emit(type, arg) {
    (this.events[type] || []).forEach((listener) => listener(arg));
  }
}

/**
 * @param {number} price
 * @returns {string}
 */
const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

export { EventEmitter, formatPrice };
