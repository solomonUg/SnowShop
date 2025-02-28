import {
  cart,
  calculateCartQty,
  validateInputQty,
  updateDelivertOption,
} from "../../data/cart.js";
import { products, getMatchingProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { removeFromCart } from "../../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    calculateCartQty();

    const productId = cartItem.productId;

    const matchingProduct = getMatchingProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    const matchingDeliveryOption = getDeliveryOption(deliveryOptionId);

    

    
    const deliveryDate = calculateDeliveryDate(matchingDeliveryOption);
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML =
      cartSummaryHTML +
      `<div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
              <div class="delivery-date">
                Delivery date: ${dateString}
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
                      Quantity: <span class="quantity-label js-quantity-label-${
                        matchingProduct.id
                      }">${cartItem.quantity}</span>
                      
                    </span>
                    <span class="update-quantity-link link-primary js-update-link update-visibity" data-product-Id="${
                      matchingProduct.id
                    }">
                      Update
                    </span> 
                    <input type="number" class="quantity-input  js-quantity-input-${
                      matchingProduct.id
                    }" data-product-id="${matchingProduct.id}"/> 
                    <span class=" invalid-text js-invalid-text-${
                      matchingProduct.id
                    }">invalid input</span>
                    <span class="save-quantity-link link-primary" data-product-Id="${
                      matchingProduct.id
                    }">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                      matchingProduct.id
                    }">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;

    function deliveryOptionHTML(matchingProduct, cartItem) {
      let HTML = "";

      deliveryOptions.forEach((option) => {

        const deliveryDate = calculateDeliveryDate(option);

        const dateString = deliveryDate.format("dddd, MMMM D");

        const isChecked = option.id === cartItem.deliveryOptionId;

        HTML += `<div class="delivery-option js-delivery-option" data-product-id ='${
          matchingProduct.id
        }'  data-delivery-option-id ="${option.id}">
                    <input type="radio" ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">
                      
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                      ${
                        option.deliveryPriceCents === 0
                          ? "FREE"
                          : `$${formatCurrency(option.deliveryPriceCents)}`
                      } - Shipping
                        
                      </div>
                    </div>
                  </div>`;
      });
      return HTML;
    }

    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    // get the save link and remove the is-editing event listener
    document.querySelectorAll(".save-quantity-link").forEach((saveLink) => {
      saveLink.addEventListener("click", () => {
        const productId = saveLink.dataset.productId;
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-editing-quantity");
        const updatedQty = Number(
          document.querySelector(`.js-quantity-input-${productId}`).value
        );

        // validates the input to ensure it is not less than 0 or greater than 1000
        validateInputQty(productId, updatedQty);
        renderPaymentSummary();
        renderCheckoutHeader();
        
      });
    });

    // key down event
    document.querySelectorAll(".quantity-input").forEach((inputLink) => {
      inputLink.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const productId = inputLink.dataset.productId;
          const updatedQty = Number(
            document.querySelector(`.js-quantity-input-${productId}`).value
          );
          // validates the input to ensure it is not less than 0 or greater than 1000
          validateInputQty(productId, updatedQty);
        }
      });
    });

    const deleteLinkEls = document.querySelectorAll(".js-delete-link");
    deleteLinkEls.forEach((delLink) => {
      delLink.addEventListener("click", () => {
        const productId = delLink.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        calculateCartQty();
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      });
    });

    document.querySelectorAll(".js-update-link").forEach((updateLink) => {
      updateLink.addEventListener("click", () => {
        const productId = updateLink.dataset.productId;
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.add("is-editing-quantity");
      });
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDelivertOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();
