import { categories, getProductsByCategory, products } from './product-data.js';

const grid = document.getElementById('products-grid');
const count = document.getElementById('product-count');
const categoryList = document.getElementById('category-list');

if (count) {
  count.textContent = `${products.length} product guides`;
}

if (categoryList) {
  categoryList.innerHTML = categories
    .map((category) => `<span class="tag">${category}</span>`)
    .join('');
}

if (grid) {
  grid.innerHTML = categories
    .map((category) => {
      const categoryProducts = getProductsByCategory(category);

      return `
        <section class="section" aria-labelledby="${category.toLowerCase().replace(/\s+/g, '-')}-heading">
          <div class="section-header">
            <p class="section-kicker">${category}</p>
            <h2 id="${category.toLowerCase().replace(/\s+/g, '-')}-heading">${category} </h2>
          </div>
          <div class="product-grid">
            ${categoryProducts.map((product) => `
              <article class="guide-card scroll-reveal">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="guide-card-body">
                  <p class="eyebrow">${product.brand}</p>
                  <h3>${product.name}</h3>
                  <p>${product.summary}</p>
                  <a class="btn btn-outline" href="/pages/products/${product.slug}.html">Read Guide</a>
                </div>
              </article>
            `).join('')}
          </div>
        </section>
      `;
    })
    .join('');

  document.dispatchEvent(new Event('products-rendered'));
}
