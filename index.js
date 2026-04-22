import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu-container");
const orderSection = document.querySelector(".order__section");
const orderList = document.querySelector(".order__list");
const totalPriceSection = document.querySelector(".total__price");
const payBtn = document.querySelector(".pay__btn");
const orderBtn = document.querySelector(".order__btn");
const modal = document.querySelector(".modal");
const successMessage = document.querySelector(".success__message");
const paymentNameInput = document.querySelector("#payment-name");

let totalPrice = 0;

const renderMenuHTML = function () {
  return menuArray
    .map((menuItem) => {
      const { name, ingredients, price, emoji, id } = menuItem;
      return `<div class="menu__item">
          <span class="menu__item-icon">${emoji}</span>
          <div class="menu__item-container">
            <div class="menu__item-content">
              <h2 class="menu__item-name">${name}</h2>
              <p class="menu__item-ingredients">${ingredients.join(", ")}</p>
              <p class="menu__item-price">$${price}</p>
            </div>
            <button class="menu__item-btn" data-item-id="${id}">+</button>
          </div>
        </div>`;
    })
    .join("");
};

menuContainer.innerHTML = renderMenuHTML();

menuContainer.addEventListener("click", function (e) {
  if (e.target.dataset.itemId) {
    const targetItem = menuArray.find(
      (menuItem) => menuItem.id == e.target.dataset.itemId,
    );
    targetItem.orderQuantity++;
    if (orderSection.classList.contains("hidden")) {
      orderSection.classList.remove("hidden");
    }

    orderList.innerHTML += `<div class="order__list-item">
                                <p class="order__item-name">${targetItem.name} <span class="remove__btn">remove</span></p>
                                <p class="order__item-price">$${targetItem.price}</p>
                            </div>`;

    totalPrice += targetItem.price;
    totalPriceSection.textContent = `$${totalPrice}`;
  }
});

orderList.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove__btn")) {
    const targetItem = e.target.closest(".order__list-item");

    const targetItemPrice = Number(
      targetItem.querySelector(".order__item-price").textContent.slice(1),
    );

    totalPrice -= targetItemPrice;

    totalPriceSection.textContent = `$${totalPrice}`;

    targetItem.remove();

    if (totalPrice === 0) {
      orderSection.classList.add("hidden");
    }
  }
});

orderBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

payBtn.addEventListener("click", function (e) {
  e.preventDefault();

  successMessage.textContent = `Thanks, ${paymentNameInput.value}! Your order is on its way!`;

  modal.classList.add("hidden");
  orderSection.classList.add("hidden");
});
