import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const htmlItemsTotal = cartItems.map((item) => cartTotalTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".product-total").innerHTML = htmlItemsTotal.join("");

  // Add listeners to buttons

  let removeFromCartListener = document.querySelectorAll(".cart-card__remove");
  removeFromCartListener.forEach((element) =>
    element.addEventListener("click", function (e) {
      removeFromCart(e.target.dataset.id);
    })
  );

  let changeItemQuantity = document.querySelectorAll(".item-quantity");
  changeItemQuantity.forEach((element) =>
    element.addEventListener("change", function (e) {
      updateItemQuantity(e.target.dataset.id, e.target.value);
    })
  );
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <img
  src="${item.Image}"
  alt="${item.Name}"
  />
  
  </a>
  <a href="#">
  <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div>
  Qty:  
  <input class="item-quantity" type="number" value=${item.Qty} min=1 data-id=${
    item.Id
  }>
  </div>
  <p class="cart-card__price">$${(item.FinalPrice * item.Qty).toFixed(2)}</p>
  <span class="cart-card__remove" type="button" data-id=${item.Id}> ❌</span>
  </li>`;

  return newItem;
}

function removeFromCart(id) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.splice(
    cartItems.findIndex((item) => item.Id === id),
    1
  );
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function updateItemQuantity(id, value) {
  const cartItems = getLocalStorage("so-cart");
  cartItems[cartItems.findIndex((item) => item.Id === id)].Qty = value;
  cartItems[cartItems.findIndex((item) => item.Id === id)].Qty = value;
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function cartTotalTemplate(item) {
  const newItem = `<div class="cart-footer hide">
  <p class="cart-total">Total: </p>
  </div>`;

  return newItem;
}

renderCartContents();
