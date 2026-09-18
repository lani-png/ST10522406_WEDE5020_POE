# ST10522406_WEDE5020_POE_Part2

OffGrid Apparel - E-Commerce Website Proposal & Website Structure

## Student Information
* Student Name: Lindelani Matidza
* Student Number: ST10522406
* Module: Web Development (Introduction)
* Institutional Date: 18 September 2026

## Project Overview
OffGrid Apparel is a modern South African clothing brand and retail concept established in 2026. Inspired by contemporary streetwear and Y2K urban culture, the brand focuses on delivering high-quality, affordable, and accessible apparel that empowers young individuals to express their personal style. This project represents the development of a front-end e-commerce web platform for OffGrid Apparel. Part 1 established the semantic HTML5 base structure; Part 2 builds on that structure with a full CSS styling and responsive layout pass.

## Website Goals and Objectives
* Brand Showcase: Provide an attractive, clean digital storefront showcasing seasonal clothing lines, drops, and accessories.
* Customer Accessibility: Offer users clear navigation to explore products, view pricing, calculate cart estimates, and submit enquiries.
* Performance & Usability: Maintain responsive layout standards and high accessibility across mobile, tablet, and desktop viewports.

## Key Performance Indicators (KPIs)
* Total unique visitor count and browsing session durations.
* Page view distributions across core sections (index, shop, collection, about, contact, and cart).
* Enquiries submitted via the interactive contact form.
* Visitor movement from collection drop showcases to catalog browsing and cart checkout actions.

## Key Features and Functionality
* Homepage (index.html): Hero showcase banner, shop-by-category cards (Men, Women, Accessories, New Arrivals), and featured product grids.
* Shop Catalog (shop.html): Categorized product sections with pricing, image cards, and "Add to Cart" action buttons.
* Collection Page (collection.html): Specialized drop showcases for Y2K street style and accessory collections.
* About Page (about.html): Brand background, history, mission statement, vision, and core value props.
* Contact Page (contact.html): Business details (Sandton address, phone, email, operating hours) and an interactive customer message form.
* Shopping Cart (cart.html): Selected items overview, sizing and quantity previews, delivery fee breakdown, and checkout calls-to-action.
* Styling (css/style.css): Single external stylesheet applied across all six pages, covering typography, colour palette, layout, and responsive behaviour (see Part 2 Details below).

## Timeline and Milestones

**Date:** 14 August 2026
**Milestone:** Part 1: Proposal & HTML Boilerplate
**Deliverables & Tasks:** Finalize proposal documentation, construct initial HTML5 files (index, shop, collection, about, contact, cart), and establish initial Git tracking. — ✅ Complete

**Date:** 15–31 August 2026
**Milestone:** HTML Content & Internal Linking
**Deliverables & Tasks:** Implement detailed semantic sections, forms, image placeholders, alt attributes, and audit all relative hyperlinks. — ✅ Complete

**Date:** 1–17 September 2026
**Milestone:** Validation & Code Prep
**Deliverables & Tasks:** Perform HTML validation checks, correct file path case-sensitivity, and prepare document structure for CSS integration. — ✅ Complete

**Date:** 18–30 September 2026
**Milestone:** Part 2: CSS Layout & Styling
**Deliverables & Tasks:** Integrate custom stylesheet (css/style.css), establish colour palettes, typography rules, Flexbox layouts, CSS reset, pseudo-class interaction states, and responsive tablet/mobile media queries. — ✅ Complete (this submission)

**Date:** October 2026
**Milestone:** Part 3: Final Testing & Submission
**Deliverables & Tasks:** Implement interactive JavaScript (js/script.js), perform cross-browser testing, document final updates, and submit complete repository. — Pending

## Part 2 Details
Part 2 focuses on transforming the semantic HTML from Part 1 into a fully styled, responsive interface:

* **External Stylesheet:** A single `css/style.css` file linked identically from all six HTML pages, keeping styling centralised and consistent.
* **CSS Reset:** A reset block applied at the top of the stylesheet (box-sizing, margin/padding, list-style, image defaults, form-element normalisation) to remove inconsistent browser defaults before any custom styling is applied.
* **Default Style Code:** Global typography (font family, base colour palette, line-height) and layout tokens defined once in `:root` and reused across every page.
* **Layout Structure:** Flexbox-based layouts for the header, category grid, product grids, and cart, with page-specific rules scoped under a body class per page (`.page-home`, `.page-shop`, `.page-collection`, `.page-about`, `.page-contact`, `.page-cart`) so that shared HTML patterns across pages (e.g. `main section article`) cannot unintentionally override one another.
* **Decoration and Colour:** A restrained black/white/off-white palette with uppercase, letter-spaced headings consistent with the brand's streetwear identity, plus subtle hover-state opacity changes on product and category imagery.
* **Pseudo-Classes:** `:hover` on all links, cards, and buttons; `:focus-visible` on navigation links and form fields for keyboard accessibility; `:active` states on all buttons and CTAs.
* **Responsive Design:** Two consistent breakpoints applied throughout the stylesheet:
  * **768px (tablet):** navigation wraps, product/category grids reduce to two columns.
  * **480px (mobile):** layout collapses to a single column across all pages, hero section stacks vertically.
  * Images use `object-fit: cover` with `aspect-ratio` (rather than fixed pixel heights) so they scale proportionally at any screen width without distortion.

(Note: Part 3 JavaScript interactivity, e.g. functional cart and search, will follow in the next project deliverable.)

## Sitemap

```
               +-----------------------+
               |   Index / Homepage    |
               |     (index.html)      |
               +-----------+-----------+
                           |
     +---------------------+---------------------+---------------------+
     |                     |                     |                     |
+----+----+           +----+----+           +----+----+           +----+----+
| Shop    |           |Collection|          | About   |           | Contact |
|(shop.html)          |(collection.html)    |(about.html)         |(contact.html)
+----+----+           +---------+           +---------+           +----+----+
     |                                                                 |
+----+----+                                                       +----+----+
|  Cart   |                                                       | Enquiry |
|(cart.html)                                                      | Form    |
+---------+                                                       +---------+
```

## Changelog

### Version 2.0.0 (18 September 2026)
* **CSS Integration:** Created and linked `css/style.css` across all six HTML pages.
* **CSS Reset:** Added a reset block (box-sizing, margin/padding, list-style, image, and form-element defaults) at the top of the stylesheet.
* **Layout & Structure:** Built Flexbox-based layouts for header, hero, category grid, featured products, shop grid, collection grid, and cart; scoped page-specific rules under per-page body classes (`.page-home`, `.page-shop`, `.page-collection`, `.page-about`, `.page-contact`, `.page-cart`) to prevent shared selectors from overriding each other between pages.
* **Typography & Colour:** Established base typography, colour palette, and uppercase/letter-spaced heading treatment consistent with brand identity.
* **Responsive Design:** Implemented two standard breakpoints (768px tablet, 480px mobile) applied consistently across every page; header/nav collapses and wraps, product/category grids reduce to two then one column, hero section stacks on smaller screens.
* **Image Handling:** Replaced fixed pixel image heights with `aspect-ratio` and `object-fit: cover` so imagery scales cleanly at any width; fixed a hero image distortion bug caused by `object-fit: fill`.
* **Pseudo-Classes:** Added `:hover`, `:focus-visible`, and `:active` states to navigation links, buttons, and CTAs across all pages.
* **Documentation:** Updated README to Part 2 scope; added Part 2 Details section documenting the CSS approach.

### Version 1.0.0 (14 August 2026)
* **Brand Pivot:** Transitioned project branding from Cash Crusaders to OffGrid Apparel (Y2K / Streetwear retail platform).
* **HTML Architecture:** Initialized 6 semantic HTML pages (index.html, shop.html, collection.html, about.html, contact.html, cart.html).
* **Code Standardization:** Enforced lower-case naming conventions across all files, assets, and navigation relative hyperlinks.
* **Accessibility:** Added descriptive code comments and alt attributes across all image placeholder elements.
* **Documentation:** Initialized project proposal and repository README.md.

## References

### Brand & Industry References
* OffGrid Apparel. (2026). Brand Vision, Products, and Catalog Structure. Sandton, Johannesburg, South Africa.

### Technical Documentation
* MDN Web Docs. (n.d.). HTML: HyperText Markup Language. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML (Accessed: 14 August 2026).
* MDN Web Docs. (n.d.). CSS: Cascading Style Sheets. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: 14 August 2026).
* MDN Web Docs. (n.d.). JavaScript. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript (Accessed: 14 August 2026).
* W3C. (n.d.). Web Content Accessibility Guidelines (WCAG) Overview. Available at: https://www.w3.org/WAI/standards-guidelines/wcag/ (Accessed: 14 August 2026).
* MDN Web Docs. (n.d.). CSS Flexible Box Layout. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout (Accessed: 18 September 2026).
* MDN Web Docs. (n.d.). object-fit. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit (Accessed: 18 September 2026).
* MDN Web Docs. (n.d.). Using Media Queries. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries (Accessed: 18 September 2026).
* CSS-Tricks. (n.d.). A Complete Guide to Flexbox. Available at: https://css-tricks.com/snippets/css/a-guide-to-flexbox/ (Accessed: 18 September 2026).
