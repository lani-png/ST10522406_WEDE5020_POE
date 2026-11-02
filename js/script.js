// search box
document.addEventListener("DOMContentLoaded", function () {
    const search = document.querySelector(".header-search");
    const toggle = document.querySelector(".search-toggle");
    const input = document.querySelector("#site-search");
    const suggestions = document.querySelectorAll(
        "#search-suggestions a"
    );

    toggle.addEventListener("click", function () {
        const isOpen = search.classList.toggle("is-open");

        toggle.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            input.focus();
        }
    });

    input.addEventListener("input", function () {
        const query = input.value.trim().toLowerCase();

        suggestions.forEach(function (link) {
            const text = (
                link.textContent + " " +
                link.dataset.search
            ).toLowerCase();

            link.hidden = query !== "" && !text.includes(query);
        });
    });

    function closeSearch(returnFocus) {
        if (!search.classList.contains("is-open")) return;

        search.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");

        if (returnFocus) {
            toggle.focus();
        }
    }

    // Escape only does something when the search is actually open
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSearch(true);
        }
    });

    // Click anywhere outside the search to close it
    document.addEventListener("click", function (event) {
        if (!search.contains(event.target)) {
            closeSearch(false);
        }
    });
});



/* =========================================
   OFFGRID SHOP — FILTERS & SORTING
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const shop = document.querySelector(".page-shop");

    if (!shop) return;

    const grid = document.getElementById("product-grid");
    const cards = Array.from(grid.querySelectorAll(".product-card"));
    const count = document.getElementById("product-count");
    const noProducts = document.getElementById("no-products");

    const categoryInputs = Array.from(
        shop.querySelectorAll('input[name="category"]')
    );

    const priceRange = document.getElementById("price-range");
    const priceValue = document.getElementById("price-value");
    const under400 = document.getElementById("under-400");
    const sortSelect = document.getElementById("sort-products");

    const clearButton = document.getElementById("clear-filters");
    const resetButton = document.getElementById("reset-no-products");

    const filterToggle = document.getElementById("filter-toggle");
    const filterClose = document.getElementById("filter-close");
    const filterBackdrop = document.getElementById("filter-backdrop");

    function openFilters() {
        shop.classList.add("filters-open");
        filterToggle.setAttribute("aria-expanded", "true");
        filterClose.focus();
    }

    function closeFilters() {
        shop.classList.remove("filters-open");
        filterToggle.setAttribute("aria-expanded", "false");
        filterToggle.focus();
    }

    filterToggle.addEventListener("click", () => {
        if (shop.classList.contains("filters-open")) {
            closeFilters();
        } else {
            openFilters();
        }
    });

    filterClose.addEventListener("click", closeFilters);
    filterBackdrop.addEventListener("click", closeFilters);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && shop.classList.contains("filters-open")) {
            closeFilters();
        }
    });

    function updatePriceLabel() {
        const value = Number(priceRange.value);
        priceValue.textContent =
            value >= Number(priceRange.max) ? `R${value}+` : `R${value}`;
    }

    function applyFilters() {
        const selectedCategories = categoryInputs
            .filter(input => input.checked)
            .map(input => input.value);

        // slider at its maximum means "R800+", i.e. no upper limit
        const maximumPrice =
            Number(priceRange.value) >= Number(priceRange.max)
                ? Infinity
                : Number(priceRange.value);
        const under400Only = under400.checked;

        cards.forEach(card => {
            const category = card.dataset.category;
            const price = Number(card.dataset.price);

            const categoryMatches =
                selectedCategories.length === 0 ||
                selectedCategories.includes(category);

            const priceMatches = price <= maximumPrice;
            const quickFilterMatches = !under400Only || price < 400;

            card.hidden = !(
                categoryMatches &&
                priceMatches &&
                quickFilterMatches
            );
        });

        const sortMode = sortSelect.value;

        const sortedCards = [...cards].sort((a, b) => {
            const priceA = Number(a.dataset.price);
            const priceB = Number(b.dataset.price);
            const nameA = a.dataset.name.toLowerCase();
            const nameB = b.dataset.name.toLowerCase();

            switch (sortMode) {
                case "price-low":
                    return priceA - priceB;
                case "price-high":
                    return priceB - priceA;
                case "name":
                    return nameA.localeCompare(nameB);
                default:
                    return cards.indexOf(a) - cards.indexOf(b);
            }
        });

        sortedCards.forEach(card => grid.appendChild(card));

        const visibleCount = cards.filter(card => !card.hidden).length;

        count.textContent =
            `${visibleCount} ${visibleCount === 1 ? "product" : "products"}`;

        noProducts.hidden = visibleCount !== 0;
        grid.hidden = visibleCount === 0;
    }

    function clearFilters() {
        categoryInputs.forEach(input => {
            input.checked = false;
        });

        priceRange.value = priceRange.max;
        under400.checked = false;
        sortSelect.value = "featured";

        updatePriceLabel();
        applyFilters();
    }

    categoryInputs.forEach(input => {
        input.addEventListener("change", applyFilters);
    });

    priceRange.addEventListener("input", () => {
        updatePriceLabel();
        applyFilters();
    });

    under400.addEventListener("change", applyFilters);
    sortSelect.addEventListener("change", applyFilters);
    clearButton.addEventListener("click", clearFilters);
    resetButton.addEventListener("click", clearFilters);

    updatePriceLabel();
    applyFilters();
});


/* =========================================
   OFFGRID COLLECTION — ANIMATIONS, FILTERS & LIGHTBOX
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".page-collection");

    if (!page) return;

    const main = page.querySelector("main");
    const sections = Array.from(main.querySelectorAll("section"));
    const links = Array.from(main.querySelectorAll(".gallery-link"));
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- 1. Scroll reveal (IntersectionObserver) ---------- */

    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target); // animate once, then stop watching
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        sections.forEach(section => {
            const items = section.querySelectorAll("h2, :scope > p, article");

            items.forEach((item, index) => {
                // stagger each item a little after the one before it
                item.style.setProperty("--delay", `${index * 90}ms`);
                item.classList.add("reveal");
                observer.observe(item);
            });
        });
    }

    /* ---------- 2. Filter chips built from the page's own sections ---------- */

    const filterBar = document.createElement("div");
    filterBar.className = "collection-filters";
    filterBar.setAttribute("role", "group");
    filterBar.setAttribute("aria-label", "Filter collection");

    const options = [
        { label: "All", id: "all" },
        ...sections.map((section, index) => {
            section.dataset.group = `group-${index}`;
            return {
                label: section.querySelector("h2").textContent.trim(),
                id: section.dataset.group
            };
        })
    ];

    options.forEach(option => {
        const chip = document.createElement("button");

        chip.type = "button";
        chip.className = "filter-chip";
        chip.textContent = option.label;
        chip.dataset.filter = option.id;
        chip.setAttribute("aria-pressed", String(option.id === "all"));
        filterBar.appendChild(chip);
    });

    sections[0].before(filterBar);

    function toggleSection(section, show) {
        clearTimeout(section.leaveTimer);

        if (show) {
            section.hidden = false;
            section.querySelectorAll(".reveal").forEach(el => {
                el.classList.add("is-visible");
            });
            void section.offsetWidth; // force reflow so the fade-in runs
            section.classList.remove("is-leaving");
        } else {
            section.classList.add("is-leaving");
            section.leaveTimer = setTimeout(() => {
                section.hidden = true;
            }, reduceMotion ? 0 : 300);
        }
    }

    filterBar.addEventListener("click", event => {
        const chip = event.target.closest(".filter-chip");

        if (!chip) return;

        filterBar.querySelectorAll(".filter-chip").forEach(other => {
            other.setAttribute("aria-pressed", String(other === chip));
        });

        sections.forEach(section => {
            toggleSection(
                section,
                chip.dataset.filter === "all" ||
                section.dataset.group === chip.dataset.filter
            );
        });
    });

    /* ---------- 3. Lightbox (built entirely with the DOM API) ---------- */

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>
        <p class="lightbox-count" aria-live="polite"></p>
        <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>
        <figure class="lightbox-figure">
            <img class="lightbox-img" alt="">
            <figcaption class="lightbox-caption"></figcaption>
        </figure>
        <button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>
    `;
    document.body.appendChild(lightbox);

    const lbImage = lightbox.querySelector(".lightbox-img");
    const lbCaption = lightbox.querySelector(".lightbox-caption");
    const lbCount = lightbox.querySelector(".lightbox-count");
    const lbClose = lightbox.querySelector(".lightbox-close");
    const lbPrev = lightbox.querySelector(".lightbox-prev");
    const lbNext = lightbox.querySelector(".lightbox-next");

    let visibleLinks = [];
    let current = 0;
    let lastFocused = null;
    let closeTimer;

    const isOpen = () => lightbox.classList.contains("is-open");

    function showImage(index) {
        current = (index + visibleLinks.length) % visibleLinks.length;

        const link = visibleLinks[current];
        const thumb = link.querySelector("img");
        const article = link.closest("article");

        const title = document.createElement("strong");
        title.textContent = article.querySelector("h3")?.textContent.trim() ?? "";

        const text = document.createElement("span");
        text.textContent = article.querySelector("p")?.textContent.trim() ?? "";

        lbCaption.replaceChildren(title, text);
        lbCount.textContent = `${current + 1} / ${visibleLinks.length}`;
        lbPrev.hidden = lbNext.hidden = visibleLinks.length < 2;

        // fade out, preload the large image, then fade the new one in
        lbImage.classList.add("is-switching");

        const preload = new Image();
        const finish = src => {
            lbImage.src = src;
            lbImage.alt = thumb.alt;
            lbImage.classList.remove("is-switching");
        };

        preload.onload = () => finish(link.href);
        preload.onerror = () => finish(thumb.currentSrc || thumb.src);
        preload.src = link.href;
    }

    function openLightbox(link) {
        clearTimeout(closeTimer);

        // only cycle through images that are currently showing
        visibleLinks = links.filter(item => !item.closest("section").hidden);
        lastFocused = document.activeElement;

        // lock page scroll without the layout jumping sideways
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbar}px`;
        document.body.classList.add("lightbox-open");

        lightbox.hidden = false;
        void lightbox.offsetWidth;
        lightbox.classList.add("is-open");

        showImage(visibleLinks.indexOf(link));
        lbClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
        document.body.style.paddingRight = "";

        closeTimer = setTimeout(() => {
            lightbox.hidden = true;
            lbImage.removeAttribute("src");
        }, reduceMotion ? 0 : 250);

        if (lastFocused) lastFocused.focus();
    }

    // one delegated listener handles every thumbnail
    main.addEventListener("click", event => {
        const link = event.target.closest(".gallery-link");

        if (!link) return;

        event.preventDefault();
        openLightbox(link);
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", () => showImage(current - 1));
    lbNext.addEventListener("click", () => showImage(current + 1));

    // clicking the dark backdrop closes it
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
        if (!isOpen()) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(current - 1);
        if (event.key === "ArrowRight") showImage(current + 1);

        // keep keyboard focus inside the dialog
        if (event.key === "Tab") {
            const focusable = Array.from(
                lightbox.querySelectorAll("button")
            ).filter(button => !button.hidden);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    // swipe left / right on touch screens
    let touchStartX = 0;

    lightbox.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", event => {
        const distance = event.changedTouches[0].clientX - touchStartX;

        if (Math.abs(distance) < 50) return;

        showImage(distance > 0 ? current - 1 : current + 1);
    }, { passive: true });
});


/* =========================================
   OFFGRID FORMS — SHARED VALIDATION
   ========================================= */

const FormKit = {
    // small helper: create an element with a class and text
    el(tag, className, text) {
        const node = document.createElement(tag);

        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;

        return node;
    },

    niceDate(date) {
        return date.toLocaleDateString("en-ZA", {
            weekday: "long", day: "numeric", month: "long", year: "numeric"
        });
    },

    label(field) {
        if (field.type === "radio") {
            const legend = field.closest("fieldset")?.querySelector("legend");
            if (legend) return legend.textContent.replace(/[*:]/g, "").trim();
        }

        const raw = field.labels?.[0]?.textContent ?? "This field";

        return raw.replace(/\(.*?\)|[*:]/g, "").trim();
    },

    // turn the browser's ValidityState into a friendly message
    message(field) {
        const v = field.validity;
        const name = FormKit.label(field);

        if (v.valid) return "";
        if (v.customError) return field.validationMessage;

        if (v.valueMissing) {
            if (field.dataset.requiredMessage) return field.dataset.requiredMessage;
            if (field.type === "radio" || field.tagName === "SELECT") {
                return `Please choose an option for ${name}.`;
            }
            return `${name} is required.`;
        }

        if (v.typeMismatch) {
            return field.type === "email"
                ? "Enter a valid email address, e.g. name@example.com."
                : `${name} is not valid.`;
        }

        if (v.patternMismatch) {
            return field.dataset.patternMessage || `${name} is not in the right format.`;
        }

        if (v.tooShort) {
            return `${name} must be at least ${field.minLength} characters (you have ${field.value.length}).`;
        }

        if (v.tooLong) return `${name} can be at most ${field.maxLength} characters.`;

        if (v.rangeUnderflow || v.rangeOverflow) {
            const under = v.rangeUnderflow;
            const limit = under ? field.min : field.max;

            if (field.type === "date") {
                const when = FormKit.niceDate(new Date(`${limit}T00:00:00`));
                return `${name} must be ${under ? "on or after" : "on or before"} ${when}.`;
            }

            return `${name} must be ${under ? "at least" : "at most"} ${limit}.`;
        }

        if (v.stepMismatch) return `${name} must be a whole number.`;
        if (v.badInput) return `${name} is not valid.`;

        return field.validationMessage;
    },

    // add / remove an id from aria-describedby without losing other hints
    describe(field, id, on) {
        const ids = new Set(
            (field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean)
        );

        if (on) ids.add(id); else ids.delete(id);

        if (ids.size) {
            field.setAttribute("aria-describedby", Array.from(ids).join(" "));
        } else {
            field.removeAttribute("aria-describedby");
        }
    },

    // show (or clear) the inline error under a field
    showError(field, message) {
        const holder = field.closest(".field") || field.parentElement;
        let error = holder.querySelector(".field-error");

        if (!error) {
            error = FormKit.el("p", "field-error");
            error.id = `${field.name || field.id}-error`;
            error.hidden = true;
            holder.appendChild(error);
        }

        error.textContent = message;
        error.hidden = !message;
        holder.classList.toggle("has-error", Boolean(message));

        const group = field.type === "radio"
            ? holder.querySelectorAll(`input[name="${field.name}"]`)
            : [field];

        group.forEach(item => {
            item.setAttribute("aria-invalid", message ? "true" : "false");
            FormKit.describe(item, error.id, Boolean(message));
        });
    },

    // validate every field, show all errors, focus the first bad one
    validateForm(form, applyRules) {
        if (applyRules) applyRules();

        const seenGroups = new Set();
        let firstInvalid = null;

        Array.from(form.elements)
            .filter(field => field.name && field.willValidate)
            .forEach(field => {
                if (field.type === "radio") {
                    if (seenGroups.has(field.name)) return;
                    seenGroups.add(field.name);
                }

                const message = FormKit.message(field);

                FormKit.showError(field, message);
                if (message && !firstInvalid) firstInvalid = field;
            });

        if (firstInvalid) firstInvalid.focus();

        return !firstInvalid;
    },

    // live feedback: check a field when the user leaves it, then as they fix it
    bind(form, applyRules) {
        form.noValidate = true; // we show our own messages (native checks still run without JS)

        const live = event => {
            const field = event.target;

            if (!field.name || !field.willValidate) return;
            if (event.type === "focusout") field.dataset.touched = "true";
            if (applyRules) applyRules();

            if (field.dataset.touched ||
                field.closest(".field")?.classList.contains("has-error")) {
                FormKit.showError(field, FormKit.message(field));
            }
        };

        ["focusout", "input", "change"].forEach(type => {
            form.addEventListener(type, live);
        });

        // live character counters on textareas
        form.querySelectorAll("[data-counter]").forEach(area => {
            const counter = form.querySelector(area.dataset.counter);
            const update = () => {
                counter.textContent = `${area.value.length} / ${area.maxLength}`;
                counter.classList.toggle("is-near", area.value.length > area.maxLength * 0.9);
            };

            area.addEventListener("input", update);
            form.addEventListener("reset", () => setTimeout(update));
            update();
        });

        form.addEventListener("reset", () => setTimeout(() => FormKit.clear(form)));
    },

    clear(form) {
        form.querySelectorAll(".field-error").forEach(error => {
            error.hidden = true;
            error.textContent = "";
        });
        form.querySelectorAll(".has-error").forEach(item => item.classList.remove("has-error"));
        form.querySelectorAll("[aria-invalid]").forEach(item => {
            item.removeAttribute("aria-invalid");
            item.setAttribute(
                "aria-describedby",
                (item.getAttribute("aria-describedby") || "")
                    .replace(/\S+-error/g, "").trim()
            );
            if (!item.getAttribute("aria-describedby")) item.removeAttribute("aria-describedby");
        });
        form.querySelectorAll("[data-touched]").forEach(item => delete item.dataset.touched);
    },

    // SA phone number: 0xx xxx xxxx or +27 xx xxx xxxx
    phoneProblem(value) {
        const digits = value.replace(/[\s\-()]/g, "");

        return value && !/^(\+27|0)[1-9]\d{8}$/.test(digits)
            ? "Enter a South African number, e.g. 011 456 7890 or +27 82 123 4567."
            : "";
    }
};


/* =========================================
   CONTACT PAGE — validate, compile email, send
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    if (!form) return;

    const fields = form.elements;
    const preview = document.getElementById("email-preview");
    const orderField = document.getElementById("order-field");
    const recipient = form.getAttribute("action")
        .replace(/^mailto:/i, "").split("?")[0];

    // rules that HTML attributes alone can't express
    function applyRules() {
        const type = fields.messageType.value;
        const needsOrder = type === "order" || type === "returns";

        orderField.hidden = !needsOrder;
        fields.order.disabled = !needsOrder;
        fields.order.required = needsOrder;

        fields.phone.required = fields.replyBy.value === "phone";
        fields.phone.setCustomValidity(FormKit.phoneProblem(fields.phone.value));
    }

    function composeEmail() {
        const typeLabel = fields.messageType.selectedOptions[0].textContent;
        const lines = [
            "Hi OffGrid team,",
            "",
            fields.message.value.trim(),
            "",
            "----------------------------",
            `Name: ${fields.name.value.trim()}`,
            `Email: ${fields.email.value.trim()}`,
            `Phone: ${fields.phone.value.trim() || "Not provided"}`,
            `Message type: ${typeLabel}`
        ];

        if (!fields.order.disabled) {
            lines.push(`Order number: ${fields.order.value.trim().toUpperCase()}`);
        }

        lines.push(`Preferred reply: ${fields.replyBy.value === "phone" ? "Phone" : "Email"}`);

        const subject = `[OffGrid] ${typeLabel} from ${fields.name.value.trim()}`;
        const body = lines.join("\r\n");

        return {
            subject,
            body,
            href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        };
    }

    function showPreview(mail) {
        const title = FormKit.el("h2", "", "Review your email");
        const meta = FormKit.el("dl", "email-meta");

        title.tabIndex = -1;

        [["To", recipient], ["Subject", mail.subject]].forEach(([term, value]) => {
            meta.append(FormKit.el("dt", "", term), FormKit.el("dd", "", value));
        });

        const send = FormKit.el("a", "btn", "Open in email app");
        const copy = FormKit.el("button", "btn btn-secondary", "Copy email text");
        const edit = FormKit.el("button", "btn btn-ghost", "Edit message");
        const actions = FormKit.el("div", "form-actions");

        send.href = mail.href;
        copy.type = edit.type = "button";
        actions.append(send, copy, edit);

        copy.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(
                    `To: ${recipient}\nSubject: ${mail.subject}\n\n${mail.body}`
                );
                copy.textContent = "Copied";
            } catch {
                copy.textContent = "Copy failed - select the text instead";
            }
            setTimeout(() => { copy.textContent = "Copy email text"; }, 2500);
        });

        edit.addEventListener("click", () => {
            preview.hidden = true;
            form.hidden = false;
            fields.message.focus();
        });

        preview.replaceChildren(
            title,
            meta,
            FormKit.el("pre", "email-body", mail.body),
            actions,
            FormKit.el("p", "form-note",
                "Your email app opens with this message ready to send. " +
                "Nothing is sent until you press Send there.")
        );

        form.hidden = true;
        preview.hidden = false;
        preview.scrollIntoView({ block: "start" });
        title.focus();
    }

    FormKit.bind(form, applyRules);
    applyRules();

    form.addEventListener("submit", event => {
        event.preventDefault();

        if (FormKit.validateForm(form, applyRules)) {
            showPreview(composeEmail());
        }
    });

    form.addEventListener("reset", () => setTimeout(applyRules));
});

/* =========================================
   OFFGRID SHOPPING CART SYSTEM
   ========================================= */

// 1. Storage Helpers
const Cart = {
    KEY: "offgrid_cart",

    get() {
        return JSON.parse(localStorage.getItem(Cart.KEY)) || [];
    },

    save(items) {
        localStorage.setItem(Cart.KEY, JSON.stringify(items));
        Cart.updateHeaderBadge();
    },

    add(product) {
        const items = Cart.get();
        // Check if product already exists with same size
        const existing = items.find(
            i => i.name === product.name && i.size === product.size
        );

        if (existing) {
            existing.qty += product.qty || 1;
        } else {
            items.push({
                id: product.id || product.name.toLowerCase().replace(/\s+/g, '-'),
                name: product.name,
                price: Number(product.price),
                size: product.size || "M",
                img: product.img || "images/graphic_tees.jpg",
                qty: product.qty || 1
            });
        }

        Cart.save(items);
        Cart.toast(`Added ${product.name} to your cart!`);
    },

    remove(index) {
        const items = Cart.get();
        items.splice(index, 1);
        Cart.save(items);
    },

    updateQty(index, qty) {
        const items = Cart.get();
        if (qty <= 0) {
            Cart.remove(index);
        } else {
            items[index].qty = qty;
            Cart.save(items);
        }
    },

    clear() {
        localStorage.removeItem(Cart.KEY);
        Cart.updateHeaderBadge();
    },

    updateHeaderBadge() {
        const items = Cart.get();
        const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
        
        document.querySelectorAll("header .cart").forEach(cartImg => {
            const link = cartImg.closest("a");
            if (!link) return;

            let badge = link.querySelector(".cart-badge");
            if (!badge) {
                badge = document.createElement("span");
                badge.className = "cart-badge";
                link.style.position = "relative";
                link.appendChild(badge);
            }

            badge.textContent = totalQty;
            badge.style.display = totalQty > 0 ? "inline-flex" : "none";
        });
    },

    toast(message) {
        let toast = document.getElementById("cart-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "cart-toast";
            toast.className = "cart-toast";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add("is-visible");
        setTimeout(() => toast.classList.remove("is-visible"), 2500);
    }
};

// 2. Initialize Cart Handlers on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    Cart.updateHeaderBadge();

    // A. Listen for "Add to Cart" on Shop & Home Pages
    document.body.addEventListener("click", event => {
        const btn = event.target.closest(".add-to-cart, .product-card .add");
        if (!btn) return;

        const card = btn.closest(".product-card");
        if (!card) return;

        const name = btn.dataset.product || card.dataset.name || card.querySelector("h2, h3")?.textContent.trim();
        const price = btn.dataset.price || card.dataset.price || card.querySelector(".product-price, p")?.textContent.replace(/[^0-9]/g, "");
        const img = card.querySelector("img")?.getAttribute("src");

        if (name && price) {
            Cart.add({ name, price: Number(price), img, size: "Medium", qty: 1 });
        }
    });

    // B. Render Cart Page dynamically if on cart.html
    const pageCart = document.querySelector(".page-cart");
    if (pageCart) {
        renderCartPage();
    }
});

// 3. Render Cart Page HTML & Totals
function renderCartPage() {
    const main = document.querySelector(".page-cart main");
    if (!main) return;

    const items = Cart.get();
    const deliveryFee = items.length > 0 ? 80 : 0;

    if (items.length === 0) {
        main.innerHTML = `
            <h1>Your Shopping Cart</h1>
            <section class="cart-empty">
                <p>Your cart is currently empty.</p>
                <p><a href="shop.html" class="btn" style="margin-top:15px;">Explore Shop</a></p>
            </section>
        `;
        return;
    }

    let itemsHTML = items.map((item, index) => `
        <article class="cart-item" data-index="${index}">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h2>${item.name}</h2>
                <p>Size: ${item.size}</p>
                <p class="cart-item-price">R${item.price}</p>
                <div class="cart-qty-control">
                    <label for="qty-${index}">Qty:</label>
                    <input type="number" id="qty-${index}" class="cart-qty-input" value="${item.qty}" min="1" max="99" data-index="${index}">
                </div>
            </div>
            <button type="button" class="cart-remove-btn" data-index="${index}">Remove</button>
        </article>
    `).join("");

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const total = subtotal + deliveryFee;

    main.innerHTML = `
        <h1>Your Shopping Cart</h1>

        <section class="cart-items-list">
            ${itemsHTML}
        </section>

        <section class="cart-summary-box">
            <h2>Cart Summary</h2>
            <p>Subtotal: <span>R${subtotal.toLocaleString()}</span></p>
            <p>Delivery: <span>R${deliveryFee}</span></p>
            <p class="cart-total-line"><strong>Total: <span>R${total.toLocaleString()}</span></strong></p>
            <button type="button" id="checkout-btn" class="btn">Proceed to Checkout</button>
        </section>

        <p><a href="shop.html">Continue Shopping</a></p>
    `;

    // Cart Event Listeners
    main.querySelectorAll(".cart-remove-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const idx = Number(e.target.dataset.index);
            Cart.remove(idx);
            renderCartPage();
        });
    });

    main.querySelectorAll(".cart-qty-input").forEach(input => {
        input.addEventListener("change", e => {
            const idx = Number(e.target.dataset.index);
            const qty = parseInt(e.target.value, 10) || 1;
            Cart.updateQty(idx, qty);
            renderCartPage();
        });
    });

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            Cart.clear();
            main.innerHTML = `
                <h1>Order Successful!</h1>
                <section class="cart-summary-box" style="text-align: center;">
                    <h2>Thank you for your order!</h2>
                    <p style="margin: 15px 0;">Your order has been placed successfully and is being processed.</p>
                    <a href="shop.html" class="btn" style="display:inline-block; margin-top:10px;">Continue Shopping</a>
                </section>
            `;
        });
    }
}
