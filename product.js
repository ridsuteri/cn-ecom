// const cart = [];
// [
// {name: product1Name, description: product1Description, quantity: 1},
// {name: product2Name, description: product2escription, quantity: 1},
// ]

const productContainer = document.querySelector("#product-list");

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
  // ************* 1. getting selected product
  const selectedProduct = JSON.parse(e.target?.getAttribute("data-product"));
  // get the closest sibling for this element
  const selectedCard = e.target.closest(".card-body");
  const quantity = parseInt(
    selectedCard.querySelector(".quantity-input").value
  );

  // *********** 2. check localStorage cart
  let updatedCartItems = [];
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // ********* 3. check if selected product exists or not
  
  let productAdded = false;
  updatedCartItems = cartItems.map((product) => {
    // if product already existed, just increment the quantity
    if (product.name === selectedProduct.name) {
      product.quantity += quantity;
      productAdded = true;
    }
    return product;
  });

  // if product doesn't exits, simply add the new product along with its quantity
  if (!productAdded) {
    updatedCartItems = [...cartItems, { ...selectedProduct, quantity }];
  }

  // ********** 4. update the cart
  localStorage.setItem("cart", JSON.stringify(updatedCartItems));
}

function applyFilters(query, min, max){

  console.log('<<<<FILTERS BEING APPLIED>>>')

  const filteredProducts = window.allProducts.filter((product) =>
    (product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)) && (product.price >= min && product.price <= max)
  );
  displayProducts(filteredProducts);

}

function displayProducts(products){

  productContainer.innerHTML = '';
  products.map((product) => {
    const productDiv = document.createElement("div");
    productDiv.setAttribute("class", "col-lg-3 col-md-4 col-sm-6 mb-4");
    productDiv.innerHTML = `
                <div class=" card h-100">
                    <img src="${
                      product.image
                    }" class="card-img-top" alt="product image">
                     <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text font-weight-bold">${
                          product.price
                        }</p>
                        <div class="d-flex align-items-center">
                            <input type="number" class="quantity-input" value="1" min="1">
                            <a href="#" class="btn btn-primary add-to-cart" data-product='${JSON.stringify(
                              product
                            )}'>Add to Cart</a>
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
}

(async function init() {
  const searchBar = document.querySelector('#search');
  const priceFilter = document.querySelector('#price-range');
  
  const debouncedFilter = _.debounce(applyFilters, 200)
  
  searchBar.addEventListener('input', ()=>{
    let min = 0;
    let max = Infinity;
    const query = searchBar.value?.toLowerCase();
    if(priceFilter.value!=''){
      [min, max] = priceFilter.value?.split('-');
    }

    debouncedFilter(query, min, max)
  });

  priceFilter.addEventListener('change', ()=>{
    let min = 0;
    let max = Infinity;
    const query = searchBar.value?.toLowerCase();
    if(priceFilter.value!=''){
      [min, max] = priceFilter.value?.split('-');
    }

    debouncedFilter(query, min, max)
  })

  window.allProducts = await fetchJson();
  displayProducts(window.allProducts);

})();
