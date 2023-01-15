import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = {
    ...(await dataSource.findProductById(e.target.dataset.id)),
    Qty: 1,
  };
  const currentCart = getLocalStorage("so-cart");

  //Add Product if cart is empty
  let updatedCart;
  if (currentCart === null) {
    updatedCart = product;
  } else if (!Array.isArray(currentCart)) {
    // If cart has one item

    // if product matches update Qty
    if (product.Id === currentCart.Id) {
      currentCart.Qty += 1;
      updatedCart = currentCart;
    } // if not add line
    else updatedCart = [product].concat(currentCart);
  } else if (currentCart.map((item) => item.Id).includes(product.Id)) {
    // is id in array?

    currentCart[
      currentCart.findIndex((item) => item.Id === product.Id)
    ].Qty += 1;
    updatedCart = currentCart;

    // updatedCart = [product].concat(currentCart);
  } else {
    updatedCart = [product].concat(currentCart);
  }
  addProductToCart(updatedCart);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
