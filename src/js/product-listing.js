import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
console.log("🚀 ~ file: product-listing.js:8 ~ category", category)
const dataSource = new ProductData();
console.log(dataSource);

const listElement = document.querySelector(".product-list");

const productList = new ProductList(dataSource, category, listElement);
console.log(productList);

productList.init();