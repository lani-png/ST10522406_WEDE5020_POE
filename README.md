# ST10522406_WEDE5020_POE_Part3

OffGrid Apparel - E-Commerce Website Proposal, Structure & Interactive Specification

## Student Information
- **Student Name:** Lindelani Matidza
- **Student Number:** ST10522406
- **Module:** Web Development (Introduction) - WEDE5020
- **Institutional Date:** 30 October 2026

---

## Project Overview
OffGrid Apparel is a modern South African clothing brand and retail concept established in 2026. Inspired by contemporary streetwear and Y2K urban culture, the brand delivers high-quality, affordable apparel empowering young individuals to express their personal style. 

This project represents the complete development of a front-end e-commerce platform for OffGrid Apparel across three structured submission phases:
1. **Part 1:** Established the semantic HTML5 base structure, site navigation, and accessibility standards.
2. **Part 2:** Built a responsive CSS3 design system (`css/style.css`), layout tokens, Flexbox architecture, and breakpoint media queries.
3. **Part 3 (Final):** Implemented client-side JavaScript interactivity (`js/script.js`), dynamic product search, live catalog filtering/sorting, an interactive image lightbox, real-time contact form validation, interactive Google Maps integration, and an end-to-end persistent Shopping Cart system powered by `localStorage`.

---

## Website Goals and Objectives
- **Brand Showcase:** Deliver an engaging digital storefront showcasing seasonal drops, streetwear categories, and accessories.
- **Interactive Functionality:** Provide seamless catalog searching, live price/category filtering, and interactive media viewviews without page reloads.
- **Shopping Experience:** Enable persistent item cart management, quantity adjustments, live delivery fee calculation, and feedback-rich checkout workflows.
- **Performance & Usability:** Maintain high responsive layout standards, ARIA-compliant accessibility, and instant user input feedback across mobile, tablet, and desktop viewports.

---

## Key Performance Indicators (KPIs)
- **Session Browsing Durations & Engagement:** Evaluated via interactive elements like image lightboxes and dynamic filter usage.
- **Search & Filter Utilization:** Tracked via header live search queries and product catalog filter adjustments.
- **Form Completion Rate:** Contact and enquiry form submissions successfully processed with client-side validation.
- **Cart Conversion Rate:** User movement from product card "Add to Cart" triggers to final checkout actions on `cart.html`.

---

## Key Features and Functionality

### 1. Header & Global Navigation
- **Dynamic Search Panel:** Glass-morphic toggle drawer featuring live query filtering and contextual page suggestions (`script.js`).
- **Real-Time Cart Badge:** Header cart icon dynamically displays total item count synchronized via `localStorage`.

### 2. Homepage (`index.html`)
- Hero banner showcasing brand taglines and CTA triggers.
- Category cards (Men, Women, Accessories, New Arrivals) with hover transitions.
- Best Sellers grid with direct "Add to Cart" triggers.

### 3. Shop Catalog (`shop.html`)
- **Live Filtering:** Sidebar filters for categories (Men, Women, Accessories), price range slider (R200–R800+), and quick toggle ("Under R400").
- **Dynamic Sorting:** Instant client-side sorting by Featured, Price (Low-to-High / High-to-Low), and Name (A–Z).
- **Responsive Drawer:** Mobile-optimized filter slide-over panel.

### 4. Collection Drop Gallery (`collection.html`)
- **Interactive Lightbox:** Modal viewer with full-screen image preview, caption metadata, item count, keyboard shortcuts (`Escape`, `Arrow Keys`), focus trapping, and touch-swipe gestures.
- **Category Filter Chips:** Dynamic filter buttons built directly from section headings to isolate collection drops.

### 5. About Page (`about.html`)
- Brand background, mission statement, vision, and core values formatted with structured semantic sections.

### 6. Contact & Enquiry Page (`contact.html`)
- **Real-Time Form Validation (`FormKit`):** Immediate inline validation for email syntax, South African phone numbers (`011...` / `+27...`), and order numbers (`OG-12345`).
- **Conditional Fields & Character Counter:** Dynamic order number input toggling based on message topic and live character counter on message area.
- **Interactive Email Preview:** Generates a review card before launching the client's mail application with option to copy text to clipboard.
- **Interactive Google Map:** Embedded Sandton flagship store location map iframe.

### 7. Shopping Cart Engine (`cart.html`)
- **Persistent State:** Cart items stored and updated using browser `localStorage`.
- **Dynamic Cart Management:** Rendered dynamically with image previews, quantity modifiers, item removal, delivery fee breakdowns (R80 standard fee), and an inline checkout success screen.
- **Toast Notifications:** Instant visual toast alerts when adding items from any page.

---

## Timeline and Milestones

- **14 August 2026 — Part 1: Proposal & HTML Boilerplate**
  - Finalized proposal documentation, initial HTML5 structure across all six pages, and Git repo tracking. — ✅ *Complete*

- **15–31 August 2026 — Content Architecture & Linking**
  - Implemented detailed semantic markup, form controls, image alt attributes, and hyperlinking audits. — ✅ *Complete*

- **18 September 2026 — Part 2: CSS Layout & Styling**
  - Applied single external stylesheet (`css/style.css`), CSS reset, custom streetwear design tokens, Flexbox layouts, and responsive breakpoints (768px tablet, 480px mobile). — ✅ *Complete*

- **30 October 2026 — Part 3: JavaScript Interactivity & Final POE Delivery**
  - Integrated `js/script.js`, implemented search panel, shop catalog filters, collection lightbox, contact form validation engine, embedded Google Maps, SEO metadata, and `localStorage` cart functionality. — ✅ *Complete (this submission)*

---

## Part 3 Technical Implementation Details

### JavaScript Architecture (`js/script.js`)
- **Modular Event-Driven Design:** Built using pure vanilla JavaScript (ES6+) for optimal loading speed and zero external dependencies.
- **Web Storage API:** Utilized `localStorage` under key `offgrid_cart` to maintain cart state across page refreshes and navigation.
- **DOM API & Accessibility:** Dynamic node creation for lightboxes and toasts with full ARIA attributes (`aria-expanded`, `aria-live`, `aria-modal`) and keyboard focus management.
- **Form Validation Module (`FormKit`):** Custom validation engine tapping into HTML5 `ValidityState` to render accessible, user-friendly error messages and inline state styling.

### SEO & Standards Compliance
- **Root Language Attributes:** Standardized `<html lang="en">` across all six HTML documents.
- **Meta Tags:** Comprehensive `<meta name="description">` and `<meta name="keywords">` tags integrated into every page head.
- **Semantic HTML & Media:** Descriptive `alt` tags and structured heading hierarchies maintained throughout the site.

---

## Sitemap
