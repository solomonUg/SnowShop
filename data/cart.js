export let cart = JSON.parse(localStorage.getItem('cart')) 

  if (!cart) {
   cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
      },
    ];
  }

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId, qty) {
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
  console.log("matching product:", matchingProduct)
  matchingProduct.quantity = newQuantity;
  console.log("new quantity:", newQuantity)
  console.log(matchingProduct)
  
  saveToLocalStorage()
}



export function removeFromCart (productId) {
  const newCart = cart.filter((cartItem)=>(cartItem.productId !== productId))

  cart = newCart;
  saveToLocalStorage();
}

