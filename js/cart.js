"use strict";
const cartCounterEl = document.querySelector('.header-cart-box span');
const cartTotalEl = document.querySelector('.cart-box-total');
const cartTotalNumberEl = document.querySelector('.cartTotalNumber');
// Открываем по клику окно корзины
const cartBtnOpen = document.querySelector('.cart-box-menu');
document.querySelector('.header-cart-box').addEventListener('click', event => {
    if (cartBtnOpen.style.visibility !== 'visible') {
        cartBtnOpen.style.visibility = 'visible';
    } else {
        cartBtnOpen.style.visibility = 'hidden';
    }
});
// Здесь в корзине будут храниться количество товара (id, name, price)
const cart = {};
// Получаем данные от ближайшего родителя о товаре если клик был по кнопке
// addToCart, если нет то возвращаемся.
document.querySelector('.items-box').addEventListener('click', event => {
    if (!event.target.classList.contains('addToCart')) {
      return;
    }
    const itemEl = event.target.closest('.futureItem');
    const id = +itemEl.dataset.id;
    const name = itemEl.dataset.name;
    const price = +itemEl.dataset.price;
    addToCart(id, name, price);
});
// Если товара небыло в корзине, то добавляем его, если был то добавляем
// единицу. Ставим новое количество товара в значке корзины и новую общую
// стоимость товаров в корзине.
function addToCart(id, name, price) {
    if (!(id in cart)) {
      cart[id] = {id: id, name: name, price: price, count: 0};
    }
    cart[id].count++;
    cartCounterEl.textContent = getTotalCartCount().toString();
    cartTotalNumberEl.textContent = getTotalCartPrice().toFixed(2);
    renderProductInCart(id);
};
// Считает и возвращает количество продуктов в корзине.
function getTotalCartCount() {
    return Object.values(cart).reduce((acc, product) => acc + product.count, 0);
};
// Считает и возвращает итоговую цену по всем добавленным продуктам.
function getTotalCartPrice() {
    return Object
      .values(cart)
      .reduce((acc, product) => acc + product.price * product.count, 0);
};
// Отрисовывает в корзину информацию о продукте.
function renderProductInCart(productId) {
    const cartBoxEl = document
    .querySelector(`.cartBoxMenu[data-productId="${productId}"]`);
    if (!cartBoxEl) {
        renderNewProductInCart(productId);
        return;
    };
     // Получаем данные о продукте из объекта корзины, где хранятся данные о
     // всех добавленных продуктах.
    const product = cart[productId];
  // Ставим новое количество в строке продукта корзины.
    cartRowEl.querySelector('.productCount').textContent = product.count;
    cartRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
};
// Функция отрисовывает новый товар в корзине.
function renderNewProductInCart(productId) {
    const productRow = `
      <div class="basketRow" data-productId="${productId}">
        <div>${cart[productId].name}</div>
        <div>
          <span class="productCount">${cart[productId].count}</span> шт.
        </div>
        <div>$${cart[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(cart[productId].price * cart[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
};



//------------------------------------------------------------------------------
