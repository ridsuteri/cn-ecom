const cartContainer = document.querySelector(".cart-items-container");
const cartTotalValue = document.querySelector('#cart-total-value');
const cart = JSON.parse(localStorage.getItem("cart")) || [];


loadCart();



function loadCart() {
  if (cart.length > 0) {
    cart.map((cartItem) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.setAttribute("class", "cart-item");
      cartItemDiv.innerHTML = `
               <img src="${cartItem.image}" alt="">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${cartItem.name}</h3>
                    <p class="cart-item-price">$${cartItem.price}</p>
                    <div class="cart-item-actions">
                        <input type="number" value="${cartItem.quantity}" min="1" class="quantity-input">
                        <button class="remove-button">Remove</button>
                    </div>
                </div>
        `;

      cartContainer.appendChild(cartItemDiv);
    });

    const cartTotal = getCartTotal();
    cartTotalValue.innerHTML = cartTotal;
  } else {
    // show cart is empty
    cartContainer.innerHTML = `<h2>Cart is empty</h2>`;
  }
}

function getCartTotal() {
    const total = cart.reduce((acc, product)=>{
        return acc += product.price * product.quantity;
    },0)
    return total;
}
