# Uriage Journal

A blog-style cosmetics website built with HTML, CSS, JavaScript, and Vite.

The site focuses on product education instead of shopping. It includes a simple homepage, a balanced section about why people should and should not use cosmetics, a blog page, and one guide page for every product currently in the site.

## Features

- Green header with white navigation text
- Blog-style homepage and article pages
- Product guide index grouped by category
- 21 product guide pages
- Each product guide includes product description, brand name, ingredients, best uses, and cautions
- Responsive layout for mobile, tablet, and desktop
- Vite development and production build flow

## Product Guide Categories

- Hair Care: shampoo, conditioner, hair oil, hair mask
- Body Care: soap, body lotion, body scrub, body oil
- Skin Care: face cream, serum, toner, sunscreen
- Makeup: foundation, lipstick, eyeshadow, eyeliner, mascara, blush, concealer
- Personal Care and Fragrance: deodorant, perfume

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
cosmetics-website/
|-- index.html
|-- pages/
|   |-- products.html
|   |-- blog.html
|   |-- about.html
|   |-- contact.html
|   `-- products/
|-- blog/
|   |-- post.html
|   `-- posts/
|-- src/
|   |-- css/
|   |   |-- style.css
|   |   `-- animations.css
|   `-- js/
|       |-- main.js
|       |-- product-data.js
|       |-- product-page.js
|       |-- products-index.js
|       `-- blog.js
|-- package.json
`-- vite.config.js
```

## Editing Product Content

Product guide content lives in `src/js/product-data.js`. Update a product object there to change its brand name, description, ingredients, images, cautions, or related guides.

Existing product URLs stay in `pages/products/*.html`; each page loads its matching guide from the shared data module.
