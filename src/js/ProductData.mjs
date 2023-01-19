function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `https://raw.githubusercontent.com/Jeremy-Diamond/CIT330_Winter2023/main/src/json/${this.category}.json`;
  }
  
  async getData() {
    const res = await fetch(this.path);
    const data = await convertToJson(res);
    return data;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
} 
