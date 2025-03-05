import { cart, addToCart, calculateCartQty } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let productsHTML = "";
calculateCartQty();

document.querySelector(".js-header-cart-quantity").innerHTML = calculateCartQty();

// Function to render products
function renderProducts(productsToRender) {

  let productsHTML = ""; // Reset the productsHTML variable
  productsToRender.forEach((product) => {
    productsHTML +=
      `<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ${formatCurrency(product.priceCents)}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart js-add-visible-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-ID="${
              product.id
            }">
              Add to Cart
            </button>
          </div>`;
  });

  // Update the DOM with the new productsHTML
  document.querySelector(".js-products").innerHTML = productsHTML;

  // Re-attach event listeners to the "Add to Cart" buttons
  const addToCartBtn = document.querySelectorAll(".js-add-to-cart");
  addToCartBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;

      const qty = document.querySelector(
        `.js-quantity-selector-${productId}`
      ).value;

      document
        .querySelector(`.js-add-visible-${productId}`)
        .classList.add("visible");
      setTimeout(() => {
        document
          .querySelector(`.js-add-visible-${productId}`)
          .classList.remove("visible");
      }, 2000);

      addToCart(productId, qty);
      calculateCartQty();
      document.querySelector(".js-header-cart-quantity").innerHTML = calculateCartQty();
    });
  });
}

// Initial render of all products
renderProducts(products);

// Search bar functionality
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('keyup', (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    const filteredProducts = products.filter(
      (product) => product.name.toLowerCase().includes(value)
    );
    renderProducts(filteredProducts);
  } else {
    renderProducts(products);
  }
});