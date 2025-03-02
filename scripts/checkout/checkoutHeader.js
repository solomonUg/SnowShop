import { calculateCartQty } from "../../data/cart.js";


calculateCartQty()
export function renderCheckoutHeader() {
    

    const checkoutHeaderHTML = `
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/snowmartlog2.jpg">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-cart-quantity"
            href="amazon.html"></a>)
        </div>
        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
      document.querySelector(".js-cart-quantity").innerHTML = `${calculateCartQty()} items`;    

}