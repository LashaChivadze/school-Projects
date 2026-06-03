import{a as n,b as o}from"./product-data-COEVJ0bN.js";const s=document.getElementById("product-root"),r=document.body.dataset.product||window.location.pathname.split("/").pop().replace(".html",""),e=n(r),i=t=>t.map(a=>`<li>${a}</li>`).join("");s&&e?(document.title=`${e.name} Guide - Uriage Journal`,s.innerHTML=`
    <section class="article-hero" style="--page-image: url('${e.image}')">
      <div class="container">
        <p class="hero-kicker">${e.category}</p>
        <h1>${e.name}</h1>
        <p>${e.summary}</p>
      </div>
    </section>

    <section class="section">
      <div class="container article-layout">
        <article class="article-main">
          <p class="section-kicker">Product Description</p>
          <h2>What This Product Does</h2>
          ${e.description.map(t=>`<p>${t}</p>`).join("")}

          <h2>Brand Name</h2>
          <p><strong>${e.brand}</strong> is the guide brand listed for this product page. The page is written in a blog style so readers can learn what the product is for before deciding whether it belongs in a routine.</p>

          <h2>Ingredients</h2>
          <p>Ingredient lists can change by country and batch, so always check the label on the exact product you own. This guide highlights the ingredients presented for this site page.</p>
          <ul class="ingredient-grid">
            ${i(e.ingredients)}
          </ul>

          <h2>When It Makes Sense</h2>
          <ul class="simple-list">
            ${i(e.bestFor)}
          </ul>

          <h2>When To Be Careful</h2>
          <ul class="simple-list">
            ${i(e.cautions)}
          </ul>

          <div class="note-box">
            Cosmetics can be useful, but they are optional. The best routine is the one that supports your skin, hair, budget, and comfort without pressure to use more than you need.
          </div>

          <div class="related-guides">
            <p class="section-kicker">Related Reading</p>
            <div class="product-grid">
              ${o(e).map(t=>`
                <article class="guide-card">
                  <img src="${t.image}" alt="${t.name}" loading="lazy">
                  <div class="guide-card-body">
                    <p class="eyebrow">${t.category}</p>
                    <h3>${t.name}</h3>
                    <p>${t.summary}</p>
                    <a class="btn btn-outline" href="/pages/products/${t.slug}.html">Read Guide</a>
                  </div>
                </article>
              `).join("")}
            </div>
          </div>
        </article>

        <aside class="article-aside" aria-label="Product facts">
          <h2>Guide Facts</h2>
          <ul class="fact-list">
            <li><strong>Product</strong>${e.name}</li>
            <li><strong>Brand Name</strong>${e.brand}</li>
            <li><strong>Category</strong>${e.category}</li>
            <li><strong>Ingredient Count</strong>${e.ingredients.length} listed ingredients</li>
          </ul>
          <a class="btn btn-primary mt-3" href="/pages/products.html">All Guides</a>
        </aside>
      </div>
    </section>
  `):s&&(s.innerHTML=`
    <section class="page-hero">
      <div class="container">
        <h1>Guide Not Found</h1>
        <p>This product guide is not available yet.</p>
        <a class="btn btn-light" href="/pages/products.html">Back To Guides</a>
      </div>
    </section>
  `);
