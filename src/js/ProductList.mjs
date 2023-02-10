import { renderListWithTemplate, setProperCase } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
    <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`
}

export default class ProductList {
    constructor(dataSource, category, listElement) {
        this.dataSource = dataSource;
        this.category = category;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        document.querySelector("#products-crumb").innerHTML = `${setProperCase(this.category)} (${list.length} Items)`
        this.renderList(list);
        document.querySelector(".title").innerHTML = setProperCase(this.category);
        


        document.querySelector("#sort-options")
        .addEventListener("change", this.sortList);
        }

        

      
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}




function sortList() {
    console.log(this.list)
            switch (this.list) {
                case "name-asc":
                this.list.sort((a, b) => (a.Name > b.Name ? 1 : -1));
                break;
                case "name-desc":
                this.list.sort((a, b) => (a.Name < b.Name ? 1 : -1));
                break;
                case "price-asc":
                this.list.sort((a, b) => a.age - b.age);
                break;
                case "price-desc":
                this.list.sort((a, b) => b.age - a.age);
                break;
            }
        };
