import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
    src="${product.Image}"
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
        // this.filterList(list);
        this.renderList(list);
        
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    filterList(list){

        list.forEach(item => {
            if(!["880RR","985RF","985PR","344YJ"].includes(item.Id)){
                list.splice(
                    list.findIndex((i)=> item.Id === i.Id),1)
            }
        });
    }
}

/*
cartItems.splice(
    cartItems.findIndex((item) => item.Id === id),
    1
  );*/