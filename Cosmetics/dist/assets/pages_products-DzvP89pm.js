import"./main-CpknuqbQ.js";import{p as d,c as i,g as o}from"./product-data-COEVJ0bN.js";const t=document.getElementById("products-grid"),a=document.getElementById("product-count"),n=document.getElementById("category-list");a&&(a.textContent=`${d.length} product guides`);n&&(n.innerHTML=i.map(e=>`<span class="tag">${e}</span>`).join(""));t&&(t.innerHTML=i.map(e=>{const c=o(e);return`
        <section class="section" aria-labelledby="${e.toLowerCase().replace(/\s+/g,"-")}-heading">
          <div class="section-header">
            <p class="section-kicker">${e}</p>
            <h2 id="${e.toLowerCase().replace(/\s+/g,"-")}-heading">${e} </h2>
          </div>
          <div class="product-grid">
            ${c.map(s=>`
              <article class="guide-card scroll-reveal">
                <img src="${s.image}" alt="${s.name}" loading="lazy">
                <div class="guide-card-body">
                  <p class="eyebrow">${s.brand}</p>
                  <h3>${s.name}</h3>
                  <p>${s.summary}</p>
                  <a class="btn btn-outline" href="/pages/products/${s.slug}.html">Read Guide</a>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      `}).join(""),document.dispatchEvent(new Event("products-rendered")));
