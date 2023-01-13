import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  const currentCart = getLocalStorage("so-cart");

  let updatedCart;
  if (currentCart === null) {
    updatedCart = product;
  } else {
    updatedCart = [product].concat(currentCart);
  }
  addProductToCart(updatedCart);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
