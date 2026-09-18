# Changelog

This file records the main changes made to the project, with the newest changes listed first.

## [Unreleased]

### Added

* Added a CSS reset at the beginning of `style.css` to provide consistent default styling.
* Added responsive breakpoints for tablet screens (`768px`) and mobile screens (`480px`).
* Added `:focus-visible` and `:active` states to navigation links, buttons, and other clickable elements.

### Changed

* Separated page-specific CSS using body classes such as `.page-home`, `.page-shop`, `.page-collection`, `.page-about`, `.page-contact`, and `.page-cart`.
* Changed fixed image heights to `aspect-ratio` so images resize better on different screen sizes.
* Reorganised `style.css` into clearly labelled sections for each page to make the stylesheet easier to read and maintain.

### Fixed

* Fixed the home page hero image so it uses `object-fit: cover` instead of stretching the image with `object-fit: fill`.
* Improved the header and navigation so they adjust correctly on smaller screens.
* Removed three duplicate footer CSS sections.

## [0.2.0] — Initial Styling

### Added

* Created the external `css/style.css` stylesheet and linked it to all six pages.
* Added the main typography, colours, spacing, and layout styles for the header, hero section, category section, featured products, and footer.
* Added individual layout styles for the Shop, Collection, About, Contact, and Cart pages.

### Known Issues

The following issues were identified and addressed in the Unreleased version:

* No CSS reset was being used.
* The website did not have responsive breakpoints.
* Shared CSS selectors were causing styling conflicts between different pages.

## [0.1.0] — Initial HTML Structure

### Added

* Created the basic HTML structure for all six pages:

  * `index.html`
  * `shop.html`
  * `collection.html`
  * `about.html`
  * `contact.html`
  * `cart.html`
* Added a shared header containing the logo, navigation menu, search bar, and cart icon.
* Added a shared footer to all pages.

