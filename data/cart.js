export const cart = [];

 export function addToCart(productId, qty){
    let matchingItem;
  
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem =cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += Number(qty);
      } else {
        cart.push({
          productId: productId,
          quantity: Number(qty),
        });
      }
  }

  export function updateCartQty() {
    let cartQuantity = 0;
  
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }