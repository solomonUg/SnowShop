export let cart = JSON.parse(localStorage.getItem('cart')) 

  if (!cart) {
   cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId : '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId : '2'

      },
    ];
  }

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId, qty, deliveryId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += Number(qty);
  } else {
    cart.push({
      productId: productId,
      quantity: Number(qty),
      deliveryOptionId: '1',
    });
  }
  saveToLocalStorage();
}

export function calculateCartQty() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  saveToLocalStorage();
  document.querySelector(".js-cart-quantity").textContent = cartQuantity;
}


export function updateCartQuantity (productID, newQuantity) {
  let matchingProduct;
  
  cart.forEach((cartItem)=>{
    
    if (cartItem.productId===productID){
      matchingProduct = cartItem;
    }
  })
  matchingProduct.quantity = newQuantity;  
  saveToLocalStorage()
}



export function removeFromCart (productId) {
  const newCart = cart.filter((cartItem)=>(cartItem.productId !== productId))

  cart = newCart;
  saveToLocalStorage();
}

 export function validateInputQty( productId, updatedQty) {
  if (updatedQty > 0 && updatedQty <= 1000) {
    updateCartQuantity(productId, updatedQty);
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
    updatedQty;
    calculateCartQty();
    document.querySelector(`.js-invalid-text-${productId}`).classList.remove('quantity-invalid')
  } else {
    document.querySelector(`.js-invalid-text-${productId}`).classList.add('quantity-invalid')
    alert('Quantity must be at least 0 and less than 1000');
    return;
  }
};

export function updateDelivertOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToLocalStorage();
}

