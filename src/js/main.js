import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
//console.log(dataSource);

const listElement = document.querySelector(".product-list");

const productList = new ProductList(dataSource, "tents", listElement);
//console.log(productList);

productList.init();
