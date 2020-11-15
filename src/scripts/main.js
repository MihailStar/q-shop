/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import { formatPrice } from './utilities';
import Goods from '../blocks/pages/goods/goods';
import Order from '../blocks/pages/order/order';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

const goods = new Goods(document.querySelector('.js-page-goods'));
const order = new Order(document.querySelector('.js-page-order'));
const cardDescriptions = document.querySelectorAll('.js-card-description');
const cardPrices = document.querySelectorAll('.js-card-price');
const cardOldPrices = document.querySelectorAll('.js-card-old-price');
const demandSwich = document.querySelector('.js-demand-switch');
const demandTarget = document.querySelector('.js-demand-target');
const termsSwitch = document.querySelector('.js-terms-switch');
const termsTarget = document.querySelector('.js-terms-target');
const goodsButtons = document.querySelectorAll('.js-goods-button');
const pages = document.querySelectorAll(
  '[class*="js-page-"]:not(.js-page-switch)'
);
const pageSwitchs = document.querySelectorAll('.js-page-switch');

/**
 * @param {number} cardsInRow
 * @returns {void}
 */
const alignHeightCardDescriptions = (cardsInRow) => {
  cardDescriptions.forEach((cardDescription) => {
    cardDescription.style.height = '';
  });

  if (cardsInRow > 1) {
    for (let i = 0; i < cardDescriptions.length; i += cardsInRow) {
      const row = Array.prototype.slice.call(
        cardDescriptions,
        i,
        i + cardsInRow
      );
      const maxHeight = Math.max.apply(
        null,
        row.map((cardDescription) => {
          return cardDescription.offsetHeight;
        })
      );

      row.forEach((cardDescription) => {
        cardDescription.style.height = `${maxHeight}px`;
      });
    }
  }
};

[
  { query: '(max-width: 575px)', cardsInRow: 1 },
  { query: '(min-width: 576px) and (max-width: 767px)', cardsInRow: 2 },
  { query: '(min-width: 768px) and (max-width: 991px)', cardsInRow: 2 },
  { query: '(min-width: 992px) and (max-width: 1199px)', cardsInRow: 3 },
  { query: '(min-width: 1200px)', cardsInRow: 3 },
].forEach(({ query, cardsInRow }) => {
  if (matchMedia(query).matches) {
    alignHeightCardDescriptions(cardsInRow);
  }
  matchMedia(query).addListener(({ matches }) => {
    if (matches) {
      alignHeightCardDescriptions(cardsInRow);
    }
  });
});

cardPrices.forEach((cardPrice) => {
  cardPrice.textContent = `${formatPrice(
    cardPrice.textContent.trim().slice(0, -1)
  )}₽`;
});

cardOldPrices.forEach((cardOldPrice) => {
  cardOldPrice.textContent = `${formatPrice(
    cardOldPrice.textContent.trim().slice(0, -1)
  )}₽`;
});

demandSwich.addEventListener('change', () => {
  demandTarget.classList.toggle('input_hidden');
});

termsSwitch.addEventListener('change', () => {
  termsTarget.classList.toggle('button_disabled');
  termsTarget.disabled = !termsTarget.disabled;
});

/**
 * @param {HTMLElement} container
 * @returns {void}
 */
const renderTable = (container = document.querySelector('.js-table')) => {
  const inputs = [];
  const table = [];
  const { totalPrice } = goods.get();
  const { price: deliveryPrice } = order.get().delivery;

  table.push('<table class="order__table">');
  goods.get().cards.forEach((card) => {
    inputs.push(
      `<input class="input input_hidden" name="${card.id}" value="${card.counter.value}" type="hidden">`
    );
    table.push(
      `<tr><td>${card.title}</td><td>х${
        card.counter.value
      }</td><td>${formatPrice(card.price)}₽</td></tr>`
    );
  });
  table.push(
    `<tr><td>Доставка</td><td></td><td>${formatPrice(deliveryPrice)}₽</td></tr>`
  );
  table.push(
    `<tr><td>Итого</td><td></td><td>${formatPrice(
      totalPrice + deliveryPrice
    )}₽</td></tr>`
  );
  table.push('</table>');
  container.innerHTML = inputs.concat(table).join('');
};

goods.on('change', (goodsData) => {
  if (goodsData.totalPrice <= 0) {
    goodsButtons.forEach((goodsButton) => {
      goodsButton.classList.add('button_disabled');
      goodsButton.setAttribute('tabindex', '-1');
    });
  } else {
    goodsButtons.forEach((goodsButton) => {
      goodsButton.classList.remove('button_disabled');
      goodsButton.removeAttribute('tabindex');
    });
  }
});
goods.on('change', () => {
  renderTable();
});

order.on('change', () => {
  renderTable();
});

pageSwitchs.forEach((pageSwitch) => {
  pageSwitch.addEventListener('click', (event) => {
    event.preventDefault();
    pages.forEach((page) => {
      page.setAttribute('hidden', true);
    });
    document
      .querySelector(pageSwitch.dataset.pageTarget)
      .removeAttribute('hidden');
  });
});
