import { menuArray } from "./data.js";

const menuContainer = document.getElementById("menu-container");

const renderMenuHTML = function () {
  return menuArray.map((menuItem) => {
    const { name, ingredients, price, emoji } = menuItem;
    return `<div class="menu__item">
          <span class="menu__item--icon">${emoji}</span>
          <div class="menu__item--container">
            <div class="menu__item--content">
              <h2 class="menu__item--name">${name}</h2>
              <p class="menu__item--ingredients">${ingredients.join(", ")}</p>
              <p class="menu__item--price">$${price}</p>
            </div>
            <button class="menu__item-btn">+</button>
          </div>
        </div>`;
  });
};

menuContainer.innerHTML = renderMenuHTML();
