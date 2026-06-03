# Uriage Journal - Project Summary

## Completed

The site has been converted from a shopping-style cosmetics site into a blog-style cosmetics journal while keeping the Vite build and static multi-page structure.

## Main Changes

- Reworked the homepage into a simple cosmetics journal page.
- Added a balanced section about why people should and should not use cosmetics.
- Replaced ecommerce language, prices, cart controls, and buying flows with article-style content.
- Added a green site header with white navigation text.
- Updated the normal website pages: Home, Guides, Blog, About, and Contact.
- Converted all 21 existing product URLs into product guide pages.
- Added shared product data in `src/js/product-data.js`.
- Added guide rendering for individual products in `src/js/product-page.js`.
- Added guide index rendering in `src/js/products-index.js`.
- Updated Vite config so all HTML pages are included in production builds.

## Product Guide Coverage

Each product guide includes:

- Product description
- Brand name
- Ingredients
- Best uses
- Cautions
- Related reading

Product guide pages:

- Shampoo
- Conditioner
- Hair Oil
- Hair Mask
- Soap
- Body Lotion
- Body Scrub
- Body Oil
- Face Cream
- Serum
- Toner
- Sunscreen
- Foundation
- Lipstick
- Eyeshadow
- Eyeliner
- Mascara
- Blush
- Concealer
- Perfume
- Deodorant

## Verification

Use:

```bash
npm run build
npm run dev
```

The Vite dev server serves the site at `http://localhost:3000` by default.
