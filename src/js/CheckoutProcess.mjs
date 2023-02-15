import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
      this.quantity = 0;
    }
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
      this.calculateOrdertotal();
      
    }
    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        
        for (let i = 0; i < this.list.length; i++) {
            this.itemTotal += parseFloat(this.list[i].FinalPrice * this.list[i].Qty);
            this.quantity += parseInt(this.list[i].Qty);           
          }
          
    }
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.shipping = (10 + ((this.quantity - 1) * 2)).toFixed(2);
        this.orderTotal = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);
        // display the totals.
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        console.log(this.itemTotal);
        console.log(this.quantity); 
        console.log(this.tax);
        console.log(this.shipping);
        console.log(this.orderTotal);
        let orderSummary = document.querySelector(".order-details");
        
        orderSummary.innerHTML = `
        <div><p>Item Subtotal (${this.quantity}) $${this.itemTotal}</p>
        <p>Tax $${this.tax}</p>
        <p>Shipping Estimate $${this.shipping}</p>
        <p><strong>Order Total $${this.orderTotal}</strong></p>
        <div/>`;
        localStorage.setItem("so-ss", 0);
    }
    
    }
    
    let test = new CheckoutProcess("so-cart", ".order-details");
    test.init()
    
