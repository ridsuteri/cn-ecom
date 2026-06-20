// const cart = [];
// [
// {name: product1Name, description: product1Description, quantity: 1},
// {name: product2Name, description: product2escription, quantity: 1},
// ]

async function fetchJson() {
  try {
    const response = await fetch("./products.json");
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("error fetching products");
  }
}


function addToCart(e) {
    const selectedProduct = JSON.parse(e.target?.getAttribute('data-product'));
    // get the closest sibling for this element
    const selectedCard = e.target.closest('.card-body')
    const quantity = parseInt(selectedCard.querySelector('.quantity-input').value);

    const cartItems = localStorage.getItem('cart');
    console.log(cartItems);

    // 1. now we have the existing state of cart with us
    // 2. find if the current product already exists 
    // 3. if yes, simply make the quantity = existing + current
    // 4. if not, simply append this product to cart

    // localStorage.setItem('cart', JSON.stringify([{...selectedProduct, quantity}]))

}


(async function init() {
  const productContainer = document.querySelector("#product-list");

  const products = await fetchJson();
  products.map((product) => {
    const productDiv = document.createElement("div");
    productDiv.setAttribute("class", "col-lg-3 col-md-4 col-sm-6 mb-4");
    productDiv.innerHTML = `
                <div class=" card h-100">
                    <img src="${product.image}" class="card-img-top" alt="product image">
                     <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text font-weight-bold">${product.price}</p>
                        <div class="d-flex align-items-center">
                            <input type="number" class="quantity-input" value="1" min="1">
                            <a href="#" class="btn btn-primary add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</a>
                        </div>
                    </div>
                </div>
                  `;
    productContainer.appendChild(productDiv);
  });

  //  get all buttons and attach an event listener to all
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
})();


