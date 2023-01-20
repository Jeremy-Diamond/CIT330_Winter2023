import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productTemplate(product) {
  return `<section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.Name}</h2>

        <img
          class="divider"
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />

        <p class="product-card__price">$${product.FinalPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">${product.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product.
    //findProductById will return a promise! use await or .then() to process it

    this.product = await this.dataSource.findProductById(this.productId);
    //console.log("🚀 ~ file: ProductDetails.mjs:8 ~ ProductDetails ~ constructor ~ this.product",this.product);

    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button

    this.renderProductDetails("main");

    // Notice the .bind(this). Our callback will not work if we don't include that line.
    // Review the readings from this week on 'this' to understand why.

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cart = getLocalStorage("so-cart");
    let cartIcon = document.querySelector(".cardIcon");
    cartIcon.classList.add("animateIcon");
    setTimeout(function(){
      cartIcon.classList.remove("animateIcon");
  }, 1000);
    //Add Product if cart is empty
    if (cart === null) {
      cart = this.product;
      cart.Qty = 1; // I set the qty to one for later steps
    } else if (!Array.isArray(cart)) {
      // If cart has only one item
      if (this.product.Id === cart.Id) {
        // See if this.id is the same as what is in the cart
        cart.Qty += 1;
        
      } else {
        this.product.Qty = 1;
        cart = [this.product].concat(cart);
      } // I set the qty to one for later steps   // if not add line to the cart
    } else if (cart.map((item) => item.Id).includes(this.product.Id)) {
      // is id in array?
      cart[cart.findIndex((item) => item.Id === this.product.Id)].Qty += 1;
    } else {
      this.product.Qty = 1;
      cart = [this.product].concat(cart);
    }
    setLocalStorage("so-cart", cart);
  }
  
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML("afterBegin", productTemplate(this.product));
  }
}
