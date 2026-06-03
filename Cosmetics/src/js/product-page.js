import { getProductBySlug, getRelatedProducts } from './product-data.js';

const productRoot = document.getElementById('product-root');
const slug = document.body.dataset.product || window.location.pathname.split('/').pop().replace('.html', '');
const product = getProductBySlug(slug);

const renderList = (items) => items.map((item) => `<li>${item}</li>`).join('');

if (productRoot && product) {
  document.title = `${product.name} Guide - Uriage Journal`;

  productRoot.innerHTML = `
    <section class="article-hero" style="--page-image: url('${product.image}')">
      <div class="container">
        <p class="hero-kicker">${product.category}</p>
        <h1>${product.name}</h1>
        <p>${product.summary}</p>
      </div>
    </section>

    <section class="section">
      <div class="container article-layout">
        <article class="article-main">
          <p class="section-kicker">Product Description</p>
          <h2>What This Product Does</h2>
          ${product.description.map((paragraph) => `<p>${paragraph}</p>`).join('')}

          <h2>Brand Name</h2>
          <p><strong>${product.brand}</strong> is the guide brand listed for this product page. The page is written in a blog style so readers can learn what the product is for before deciding whether it belongs in a routine.</p>

          <h2>Ingredients</h2>
          <p>Ingredient lists can change by country and batch, so always check the label on the exact product you own. This guide highlights the ingredients presented for this site page.</p>
          <ul class="ingredient-grid">
            ${renderList(product.ingredients)}
          </ul>

          <h2>When It Makes Sense</h2>
          <ul class="simple-list">
            ${renderList(product.bestFor)}
          </ul>

          <h2>When To Be Careful</h2>
          <ul class="simple-list">
            ${renderList(product.cautions)}
          </ul>

          <div class="note-box">
            Cosmetics can be useful, but they are optional. The best routine is the one that supports your skin, hair, budget, and comfort without pressure to use more than you need.
          </div>

          <div class="related-guides">
            <p class="section-kicker">Related Reading</p>
            <div class="product-grid">
              ${getRelatedProducts(product).map((related) => `
                <article class="guide-card">
                  <img src="${related.image}" alt="${related.name}" loading="lazy">
                  <div class="guide-card-body">
                    <p class="eyebrow">${related.category}</p>
                    <h3>${related.name}</h3>
                    <p>${related.summary}</p>
                    <a class="btn btn-outline" href="/pages/products/${related.slug}.html">Read Guide</a>
                  </div>
                </article>
              `).join('')}
            </div>
          </div>
        </article>

        <aside class="article-aside" aria-label="Product facts">
          <h2>Guide Facts</h2>
          <ul class="fact-list">
            <li><strong>Product</strong>${product.name}</li>
            <li><strong>Brand Name</strong>${product.brand}</li>
            <li><strong>Category</strong>${product.category}</li>
            <li><strong>Ingredient Count</strong>${product.ingredients.length} listed ingredients</li>
          </ul>
          <a class="btn btn-primary mt-3" href="/pages/products.html">All Guides</a>
        </aside>
      </div>
    </section>
  `;
} else if (productRoot) {
  productRoot.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>Guide Not Found</h1>
        <p>This product guide is not available yet.</p>
        <a class="btn btn-light" href="/pages/products.html">Back To Guides</a>
      </div>
    </section>
  `;
}
