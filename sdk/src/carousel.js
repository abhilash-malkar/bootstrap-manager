import { generateId, mergeOptions } from './utils.js';

/**
 * Creates a Bootstrap 5 Carousel component and optionally appends it to a target element.
 *
 * @param {object} options - Configuration options for the carousel.
 * @param {string} [options.id] - Custom ID for the carousel. Defaults to a generated ID.
 * @param {Array<object>} options.items - Array of item objects. Each object should have `content` (string or HTMLElement).
 *                                        Optional: `caption` (string or HTMLElement), `interval` (number in ms).
 * @param {string | HTMLElement} [options.target] - The ID (string) or HTMLElement where the carousel should be appended. If provided, the target's content will be cleared first.
 * @param {boolean} [options.indicators=true] - Show carousel indicators.
 * @param {boolean} [options.controls=true] - Show previous/next controls.
 * @param {boolean} [options.animate=false] - Use fade transition instead of slide. (`carousel-fade` class)
 * @param {'hover' | false} [options.pauseOnHover='hover'] - Pause cycling on mouse hover.
 * @param {boolean} [options.wrap=true] - Cycle continuously.
 * @param {boolean} [options.keyboard=true] - React to keyboard events.
 * @param {number | false} [options.interval=5000] - Default interval between slides (ms). False disables auto-cycling.
 * @param {boolean} [options.darkMode=false] - Add `carousel-dark` class for dark controls/indicators/captions.
 * @param {boolean} [options.touch=true] - Support swipe gestures on touch devices.
 * @param {boolean} [options.initialize=true] - Initialize the Bootstrap Carousel instance automatically.
 * @returns {object} An object containing the carousel element and the Bootstrap carousel instance (if initialized).
 */
export function createCarousel(options) {
    const defaultOptions = {
        id: generateId('carousel'),
        items: [], // Example: [{ content: '<img src="...">' }, { content: '<div>Slide 2</div>' }]
        target: null,
        indicators: true,
        controls: true,
        animate: false, // false = slide, true = fade
        pauseOnHover: 'hover', // Or false
        wrap: true,
        keyboard: true,
        interval: 5000, // Or false to disable auto-cycling
        darkMode: false,
        touch: true,
        initialize: true,
    };

    const config = mergeOptions(defaultOptions, options);

    if (!config.items || config.items.length === 0) {
        console.error('createCarousel requires at least one item in the options.items array.');
        return { element: null, instance: null };
    }

    const carouselElement = document.createElement('div');
    carouselElement.id = config.id;
    carouselElement.classList.add('carousel', 'slide');
    if (config.animate) {
        carouselElement.classList.add('carousel-fade');
    }
    if (config.darkMode) {
        carouselElement.classList.add('carousel-dark');
    }

    carouselElement.setAttribute('data-bs-ride', config.interval === false ? 'false' : 'carousel');
    if (config.interval !== 5000 && config.interval !== false) {
        carouselElement.setAttribute('data-bs-interval', config.interval.toString());
    }
    if (config.pauseOnHover !== 'hover') {
        carouselElement.setAttribute('data-bs-pause', 'false');
    }
    if (!config.wrap) {
        carouselElement.setAttribute('data-bs-wrap', 'false');
    }
    if (!config.keyboard) {
        carouselElement.setAttribute('data-bs-keyboard', 'false');
    }
    if (!config.touch) {
        carouselElement.setAttribute('data-bs-touch', 'false');
    }

    // Indicators
    if (config.indicators && config.items.length > 1) {
        const indicatorsWrapper = document.createElement('div');
        indicatorsWrapper.classList.add('carousel-indicators');
        config.items.forEach((_, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-target', `#${config.id}`);
            button.setAttribute('data-bs-slide-to', index.toString());
            button.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            }
            indicatorsWrapper.appendChild(button);
        });
        carouselElement.appendChild(indicatorsWrapper);
    }

    // Inner items
    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');
    config.items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('carousel-item');
        if (index === 0) {
            itemElement.classList.add('active');
        }
        if (item.interval !== undefined && item.interval !== false) {
            itemElement.setAttribute('data-bs-interval', item.interval.toString());
        }

        // Add content
        if (typeof item.content === 'string') {
            itemElement.innerHTML = item.content; // Assumes content is safe HTML (e.g., img tag)
        } else if (item.content instanceof HTMLElement) {
            itemElement.appendChild(item.content);
        }

        // Add caption (optional)
        if (item.caption) {
            const captionElement = document.createElement('div');
            // Show only on md and up by default, like Bootstrap examples
            captionElement.classList.add('carousel-caption', 'd-none', 'd-md-block');
            if (typeof item.caption === 'string') {
                captionElement.innerHTML = item.caption;
            } else if (item.caption instanceof HTMLElement) {
                captionElement.appendChild(item.caption);
            }
            itemElement.appendChild(captionElement);
        }

        carouselInner.appendChild(itemElement);
    });
    carouselElement.appendChild(carouselInner);

    // Controls
    if (config.controls && config.items.length > 1) {
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-control-prev');
        prevButton.type = 'button';
        prevButton.setAttribute('data-bs-target', `#${config.id}`);
        prevButton.setAttribute('data-bs-slide', 'prev');
        prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-control-next');
        nextButton.type = 'button';
        nextButton.setAttribute('data-bs-target', `#${config.id}`);
        nextButton.setAttribute('data-bs-slide', 'next');
        nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

        carouselElement.appendChild(prevButton);
        carouselElement.appendChild(nextButton);
    }

    let bootstrapCarousel = null;
    if (config.initialize) {
         // Need to append to DOM before initializing if we rely on data-bs-ride
         // However, initializing manually gives more control and works even if not in DOM yet.
        bootstrapCarousel = new bootstrap.Carousel(carouselElement, {
             // Pass options explicitly to the constructor if needed,
             // though data attributes usually suffice.
             // interval: config.interval === false ? false : config.interval,
             // keyboard: config.keyboard,
             // pause: config.pauseOnHover,
             // ride: config.interval === false ? false : 'carousel',
             // wrap: config.wrap,
             // touch: config.touch
         });
    }

    // Append to target if specified
    if (config.target) {
        let targetElement = null;
        if (typeof config.target === 'string') {
            targetElement = document.getElementById(config.target) || document.querySelector(config.target);
        } else if (config.target instanceof HTMLElement) {
            targetElement = config.target;
        }

        if (targetElement) {
            targetElement.innerHTML = ''; // Clear existing content
            targetElement.appendChild(carouselElement);
        } else {
            console.error(`createCarousel: Target element "${config.target}" not found.`);
        }
    }

    return {
        element: carouselElement,
        instance: bootstrapCarousel
    };
} 