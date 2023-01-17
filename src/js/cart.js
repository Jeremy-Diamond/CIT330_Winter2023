import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add listeners to buttons

  let removeFromCartListener = document.querySelectorAll(".cart-card__remove");
  removeFromCartListener.forEach((element) =>
    element.addEventListener("click", function (e) {
      removeFromCart(e.target.dataset.id);
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
  <p class="cart-card__quantity">qty: ${item.Qty}</p>
  <p class="cart-card__price">$${item.FinalPrice * item.Qty}</p>
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

renderCartContents();
