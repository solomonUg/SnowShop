import { cart, calculateCartQty, updateCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { removeFromCart } from "../data/cart.js";

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  
  calculateCartQty();

  const productId = cartItem.productId;

  let matchingProduct;
  
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  
  cartSummaryHTML =
    cartSummaryHTML +
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link update-visibity" data-product-Id="${matchingProduct.id}">
                    Update
                  </span> 
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}"/> 
                  <span class="save-quantity-link link-primary" data-product-Id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    const deleteLinkEls = document.querySelectorAll('.js-delete-link');
    deleteLinkEls.forEach((delLink)=>{
      delLink.addEventListener('click', ()=>{
        const productId = delLink.dataset.productId
        removeFromCart(productId);      
        
       const container = document.querySelector(`.js-cart-item-container-${productId}`);
       container.remove();
       calculateCartQty();
      })

    })

    document.querySelectorAll('.js-update-link').forEach((updateLink)=>{
      updateLink.addEventListener('click', ()=>{
        const productId = updateLink.dataset.productId
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add("is-editing-quantity")
      })
    })
    
    // get the save link and remove the is-editing event listener

    document.querySelectorAll('.save-quantity-link').forEach((saveLink)=>{
      saveLink.addEventListener('click', ()=>{
        const productId = saveLink.dataset.productId
        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove("is-editing-quantity")
        const updatedQty = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        updateCartQuantity(productId, updatedQty)
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML= updatedQty;
        calculateCartQty()
      })
    })

});





