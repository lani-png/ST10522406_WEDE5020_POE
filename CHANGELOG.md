# Changelog

This file records the main changes made to the project, with the newest changes listed first.

## [Unreleased]

### Added

- **Working Shopping Cart System:** Implemented a full shopping cart system utilizing `localStorage` to save items across sessions (`js/script.js`).
- **Header Cart Badge & Toast Notifications:** Added a real-time item counter badge to the header cart icon across all pages, along with confirmation toast notifications when adding products.
- **Dynamic Cart Page:** Upgraded `cart.html` to dynamically render items, allow quantity adjustments, calculate subtotals and delivery fees (R80), handle removals, and display an inline order confirmation success state.
- **Advanced Shop Filters & Sorting:** Added a live filtering sidebar on `shop.html` with category checkboxes, a maximum price range slider, a quick filter for items under R400, sorting controls (price, name, featured), and a responsive mobile filter drawer.
- **Interactive Image Lightbox:** Built a fully interactive JavaScript lightbox modal for `collection.html` supporting image zoom, captions, keyboard navigation (arrow keys, escape), section filtering chips, and touch-swipe gestures.
- **Interactive Map:** Embedded an interactive Google Maps iframe block into `contact.html` under a new "Find Us" section.
- **Form Validation & Email Preview:** Upgraded the contact form (`FormKit` module) with real-time inline error checking, live character counters, South African phone number validation (`011...` or `+27...`), conditional order number inputs, and an interactive email preview pane with copy-to-clipboard functionality.
- **SEO Enhancements:** Added explicit `lang="en"` attributes and comprehensive `<meta name="keywords">` tags to all HTML pages.
- **CSS Reset & Responsive Framework:** Added a CSS reset at the beginning of `style.css` and responsive breakpoints for mobile and tablet screens.
- **Focus & Active States:** Added accessibility `:focus-visible` and `:active` styles to navigation links, buttons, and form controls.

### Changed

- **Brand Color Palette:** Overhauled `style.css` with OffGrid custom CSS color tokens (`--off-white`, `--card-bg`, `--accent`, etc.) for a cohesive streetwear brand design.
- **Page-Specific Styling:** Separated page-specific CSS using body classes (`.page-home`, `.page-shop`, `.page-collection`, `.page-about`, `.page-contact`, `.page-cart`).
- **Responsive Media:** Replaced fixed image heights with `aspect-ratio` and `object-fit: cover` for smoother resizing across screen sizes.
- **Form Layouts:** Redesigned form inputs, textareas, and buttons into structured grid rows with error styling states.

### Fixed

- Fixed image stretching issues across hero sections and product grids.
- Resolved styling conflicts caused by overlapping shared CSS selectors.
- Cleaned up duplicate footer CSS sections.

## [0.2.0] — Initial Styling

### Added

- Created the external `css/style.css` stylesheet and linked it to all six pages.
- Added the main typography, colours, spacing, and layout styles for the header, hero section, category section, featured products, and footer.
- Added individual layout styles for the Shop, Collection, About, Contact, and Cart pages.

### Known Issues

The following issues were identified and addressed in the Unreleased version:

- No CSS reset was being used.
- The website did not have responsive breakpoints.
- Shared CSS selectors were causing styling conflicts between different pages.

## [0.1.0] — Initial HTML Structure

### Added

- Created the basic HTML structure for all six pages:
  * `index.html`
  * `shop.html`
  * `collection.html`
  * `about.html`
  * `contact.html`
  * `cart.html`
- Added a shared header containing the logo, navigation menu, search bar, and cart icon.
- Added a shared footer to all pages.
