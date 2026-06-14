(async function init() {
  const productContainer = document.querySelector("#product-container");

  async function fetchProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error("error fetching products");
    }
  }

  const products = await fetchProducts();
  console.log(products)

  products.map((product) => {
    // 1. prepare a product div
    const productDiv = document.createElement("div");
    productDiv.setAttribute("class", "product");

    // 2. fill in product info
    productDiv.innerHTML = `
                    <img src="${product.image}" alt="">
                    <h3>${product.title}</h3>
                    <p>$ ${product.price}</p>
                  `;
    // 3. append it to product container
    productContainer.appendChild(productDiv);
  });
})();

// 1. DOMContentLoad - event
// 2. IIFE init function
