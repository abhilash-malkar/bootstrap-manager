# Bootstrap Manager

Version: 1.0.0
|
Author: Abhilash Malkar


---

A lightweight, dependency-free JavaScript library for dynamically creating and managing common Bootstrap 5 components (Modals, Tabs, Carousels) directly in the browser.

## Table of Contents

*   [Features](#features)
*   [Installation & Setup](#installation--setup)
    *   [Prerequisites](#prerequisites)
    *   [Including the Library](#including-the-library)
        *   [Using ES Module Build (Recommended)](#using-es-module-build-recommended)
        *   [Using UMD Build](#using-umd-build)
        *   [Using Source Files Directly (Requires Server)](#using-source-files-directly-requires-server)
*   [Usage Examples](#usage-examples)
    *   [Modals (`createModal`)](#modals-createmodal)
    *   [Tabs (`createTabs`)](#tabs-createtabs)
    *   [Carousels (`createCarousel`)](#carousels-createcarousel)
*   [API Reference](#api-reference)
    *   [`BootstrapManager.createModal(options)`](#bootstrappmanagercreatemodaloptions)
    *   [`BootstrapManager.createTabs(options)`](#bootstrappmanagercreatetabsoptions)
    *   [`BootstrapManager.createCarousel(options)`](#bootstrappmanagercreatecarouseloptions)
*   [Development & Building](#development--building)

## Features

*   **Dynamic Creation:** Generate Bootstrap components on the fly using JavaScript.
*   **No External JS Dependencies:** Only requires Bootstrap 5 CSS and JS to be included in your project.
*   **Flexible Configuration:** Customize components using a wide range of options (dark mode, size, animation, content types, etc.).
*   **Browser-Ready:** Designed for direct use in web browsers (ESM or UMD builds available).
*   **Simple API:** Easy-to-use functions for creating Modals, Tabs, and Carousels.
*   **DOM Management:** Optional `target` parameter for Tabs and Carousels automatically handles DOM insertion.
*   **Programmatic Control:** Modals return objects with `show()` and `hide()` methods.

## Installation & Setup

### Prerequisites

Your HTML page **must** include Bootstrap 5 CSS and the Bootstrap 5 JavaScript Bundle.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>

    <!-- 1. Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        /* Your custom styles */
    </style>
</head>
<body>
    <!-- Your HTML content -->

    <!-- App logic using BootstrapManager -->
    <script src="./sdk/bootstrap-sdk.umd.js"></script> 


    <!-- 2. Bootstrap 5 JS Bundle (must be included before or after your script that uses Bootstrap features) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Including the Library

You have several options to include `BootstrapManager` in your project:

#### Using ES Module Build (Recommended)

This is the preferred method for modern JavaScript development, especially when using bundlers or native ES modules.

1.  Build the ESM version (see [Development & Building](#development--building)) to get `dist/bootstrap-manager.js`.
2.  Import it into your JavaScript module:

    ```javascript
    // in your app.js (or similar)
    import BootstrapManager from './path/to/dist/bootstrap-manager.js';

    // Now you can use BootstrapManager.createModal(), etc.
    const myModal = BootstrapManager.createModal({ title: 'Hello' });
    myModal.show();
    ```

#### Using UMD Build

Suitable for environments that might not support ES modules directly or for inclusion via a standard `<script>` tag.

1.  Build the UMD version (see [Development & Building](#development--building)) to get `dist/bootstrap-manager.umd.js`.
2.  Include the script in your HTML:

    ```html
    <!-- Include Bootstrap JS first -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Include the UMD build of the library -->
    <script src="./path/to/dist/bootstrap-manager.umd.js"></script>
    ```

3.  Access the library via the global `BootstrapManager` object:

    ```javascript
    // in your app.js (or inline script)
    if (typeof BootstrapManager !== 'undefined') {
        const myTabs = BootstrapManager.createTabs({
            target: 'tabs-container',
            tabs: [{ label: 'Tab A', content: 'Content A' }]
        });
    } else {
        console.error('BootstrapManager library not loaded!');
    }
    ```

#### Using Source Files Directly (Requires Server)

While possible for development or simple cases, this is generally **not recommended for production**. It requires running your HTML file from a local web server due to browser security restrictions on ES modules loaded via `file:///`.

1.  Make sure the `sdk/src` directory is accessible relative to your HTML file.
2.  Import the main `index.js` file as a module:

    ```html
    <!-- Your HTML structure -->
    <div id="carousel-target"></div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Import SDK source directly -->
    <script type="module">
        import BootstrapManager from './sdk/src/index.js';

        BootstrapManager.createCarousel({
            target: 'carousel-target',
            items: [{ content: 'Slide 1' }]
        });
    </script>
    ```

## Usage Examples

*(Assuming you have included Bootstrap 5 CSS/JS and the BootstrapManager library as described above)*

### Modals (`createModal`)

Modals are created and appended to the `document.body`. You interact with them via the returned object.

```javascript
// --- Simple Modal --- 
const simpleModal = BootstrapManager.createModal({
    title: 'My Simple Modal',
    body: 'This is the modal content.',
    footer: '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
});

// Show it
simpleModal.show();

// --- Configured Modal (Programmatic Control) ---
const configuredModal = BootstrapManager.createModal({
    id: 'my-custom-modal', // Optional custom ID
    title: 'Advanced Configuration',
    body: document.createElement('p').appendChild(document.createTextNode('Content created via DOM element.')).parentNode,
    footer: '<button type="button" class="btn btn-danger" id="close-adv-modal">Close Programmatically</button>',
    size: 'lg',
    centered: true,
    backdrop: 'static', // Cannot close by clicking backdrop
    keyboard: false, // Cannot close with Esc key
    animate: true,
    darkMode: true, // Use Bootstrap dark theme variables (requires v5.3+)
    showOnCreate: false // IMPORTANT: Don't show immediately
});

// Add listener to our custom close button *inside* the modal
const closeButton = configuredModal.element.querySelector('#close-adv-modal');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        configuredModal.hide();
    });
}

// Somewhere else in your code (e.g., button click)
document.getElementById('show-advanced-modal-btn').addEventListener('click', () => {
    configuredModal.show();
});
```

### Tabs (`createTabs`)

Tabs are created and optionally appended to a specified target element.

```html
<!-- Placeholder for tabs -->
<div id="my-dynamic-tabs"></div>
```

```javascript
// --- Basic Tabs --- 
BootstrapManager.createTabs({
    target: 'my-dynamic-tabs', // ID of the container element
    tabs: [
        { label: 'Home', content: '<strong>Home content</strong> here.', active: true },
        { label: 'Profile', content: '<em>User profile details.</em>' },
        { label: 'Contact', content: '<input type="text" placeholder="Message...">' }
    ]
});

// --- Dark Mode Tabs with Fade --- 
BootstrapManager.createTabs({
    target: 'my-dark-tabs',
    darkMode: true,
    fade: true, // Add fade animation
    tabs: [
        { label: 'Section 1', content: 'Dark tab content 1.', active: true },
        { label: 'Section 2', content: 'Dark tab content 2.' }
    ]
});
```

### Carousels (`createCarousel`)

Carousels are created and optionally appended to a specified target element.

```html
<!-- Placeholders for carousels -->
<div id="standard-carousel"></div>
<div id="fade-carousel" class="mt-4"></div>
```

```javascript
// --- Standard Sliding Carousel --- 
BootstrapManager.createCarousel({
    target: 'standard-carousel', // ID of the container
    id: 'main-carousel', // Optional custom ID
    items: [
        { 
            content: '<img src="/path/to/image1.jpg" class="d-block w-100" alt="Slide 1">' , 
            caption: '<h5>First Slide</h5><p>Caption content</p>'
        },
        { content: '<div style="height:300px; background:#eee; display:flex; align-items:center; justify-content:center;">Slide 2 Content</div>' },
        { content: '<img src="/path/to/image3.jpg" class="d-block w-100" alt="Slide 3">' , interval: 2000 } // Custom interval
    ],
    controls: true,
    indicators: true,
    interval: 6000 // Default interval
});

// --- Dark Fade Carousel (No Controls/Wrap) ---
BootstrapManager.createCarousel({
    target: 'fade-carousel',
    items: [
        { content: '<img src="/path/to/dark1.jpg" class="d-block w-100" alt="Dark 1">' },
        { content: '<img src="/path/to/dark2.jpg" class="d-block w-100" alt="Dark 2">' }
    ],
    animate: true, // Use fade transition
    darkMode: true, // Use dark controls/indicators/captions
    controls: false,
    indicators: true,
    wrap: false, // Don't loop
    interval: false // Disable auto-play
});
```

## API Reference

### `BootstrapManager.createModal(options)`

Creates a Bootstrap 5 Modal element, appends it to `document.body`, and initializes its JavaScript component.

*   **`options`** (Object): Configuration for the modal.
    *   `id` (String, Optional): Custom ID attribute for the modal element. Defaults to a generated ID (e.g., `modal-xyz123`).
    *   `title` (String): The text displayed in the modal header.
    *   `body` (String | HTMLElement): The content for the modal body. Accepts an HTML string or a DOM element.
    *   `footer` (String | HTMLElement | null | undefined, Optional): The content for the modal footer. 
        *   If `null` or `undefined`, the footer section is omitted entirely.
        *   If an empty string (`''`), a default "Close" button is added.
        *   Otherwise, accepts an HTML string or a DOM element.
    *   `darkMode` (Boolean, Optional, Default: `false`): Adds `data-bs-theme="dark"` attribute to the modal. Requires Bootstrap v5.3+ and appropriate theme setup.
    *   `size` ('sm' | 'lg' | 'xl', Optional): Sets the modal size class (`modal-sm`, `modal-lg`, `modal-xl`).
    *   `animate` (Boolean, Optional, Default: `true`): Adds the `.fade` class for animation.
    *   `showOnCreate` (Boolean, Optional, Default: `false`): If `true`, shows the modal immediately after it's created.
    *   `staticBackdrop` (Boolean, Optional, Default: `false`): **Deprecated**. Use `backdrop: 'static'` instead.
    *   `backdrop` (Boolean | 'static', Optional, Default: `true`): Configures the modal backdrop.
        *   `true`: Standard backdrop, closes modal on click.
        *   `false`: No backdrop is rendered.
        *   `'static'`: Backdrop is rendered but doesn't close the modal on click.
    *   `keyboard` (Boolean, Optional, Default: `true`): If `true`, allows closing the modal by pressing the Esc key.
    *   `scrollable` (Boolean, Optional, Default: `false`): Adds `.modal-dialog-scrollable` for long content.
    *   `centered` (Boolean, Optional, Default: `false`): Adds `.modal-dialog-centered` for vertical centering.
*   **Returns:** (Object) An object containing:
    *   `element` (HTMLElement): The main modal DOM element (`.modal`).
    *   `instance` (bootstrap.Modal): The underlying Bootstrap 5 Modal instance.
    *   `show()` (Function): Method to programmatically show the modal.
    *   `hide()` (Function): Method to programmatically hide the modal.

### `BootstrapManager.createTabs(options)`

Creates a Bootstrap 5 Tabs component (nav and content panes) and optionally appends it to a target element.

*   **`options`** (Object): Configuration for the tabs.
    *   `id` (String, Optional): Custom base ID used for generating related tab/pane IDs. Defaults to a generated ID (e.g., `tabs-abc456`).
    *   `target` (String | HTMLElement, Optional): The ID (string) or the actual DOM element where the tabs component should be appended. If provided, the target element's existing content will be cleared first.
    *   `tabs` (Array): An array of objects, each representing a tab. Requires at least one tab.
        *   `label` (String): The text displayed on the tab button.
        *   `content` (String | HTMLElement): The content for the corresponding tab pane. Accepts an HTML string or a DOM element.
        *   `active` (Boolean, Optional): If `true`, this tab will be selected by default. Only the *first* tab marked `active` in the array will be honored.
    *   `darkMode` (Boolean, Optional, Default: `false`): Adds `data-bs-theme="dark"` to the nav and content elements. Requires Bootstrap v5.3+.
    *   `fade` (Boolean, Optional, Default: `true`): Adds the `.fade` class to tab panes for animation during transitions.
*   **Returns:** (HTMLElement | null) The container element (`div`) holding the entire tabs structure (`.nav-tabs` and `.tab-content`), or `null` if `options.tabs` is empty or invalid.

### `BootstrapManager.createCarousel(options)`

Creates a Bootstrap 5 Carousel element, initializes its JavaScript component, and optionally appends it to a target element.

*   **`options`** (Object): Configuration for the carousel.
    *   `id` (String, Optional): Custom ID attribute for the main carousel element. Defaults to a generated ID (e.g., `carousel-def789`).
    *   `target` (String | HTMLElement, Optional): The ID (string) or the actual DOM element where the carousel component should be appended. If provided, the target element's existing content will be cleared first.
    *   `items` (Array): An array of objects, each representing a carousel slide. Requires at least one item.
        *   `content` (String | HTMLElement): The main content for the slide (e.g., an `<img>` tag or a `<div>`). Accepts an HTML string or a DOM element.
        *   `caption` (String | HTMLElement, Optional): Content for the `.carousel-caption`. Accepts an HTML string or a DOM element.
        *   `interval` (Number, Optional): A specific interval duration (in milliseconds) for this individual slide, overriding the main `interval` option.
    *   `indicators` (Boolean, Optional, Default: `true`): If `true`, displays the slide indicators (`.carousel-indicators`).
    *   `controls` (Boolean, Optional, Default: `true`): If `true`, displays the previous/next control buttons (`.carousel-control-prev`, `.carousel-control-next`).
    *   `animate` (Boolean, Optional, Default: `false`): If `true`, adds the `.carousel-fade` class for a fade transition instead of sliding.
    *   `pauseOnHover` ('hover' | false, Optional, Default: `'hover'`): If `'hover'`, pauses automatic cycling when the mouse pointer enters the carousel. Set to `false` to disable pausing.
    *   `wrap` (Boolean, Optional, Default: `true`): If `true`, allows the carousel to cycle continuously (loop back to the start/end).
    *   `keyboard` (Boolean, Optional, Default: `true`): If `true`, allows controlling the carousel using the left/right keyboard arrow keys.
    *   `interval` (Number | false, Optional, Default: `5000`): The default time delay (in milliseconds) between automatically cycling slides. Set to `false` to disable automatic cycling.
    *   `darkMode` (Boolean, Optional, Default: `false`): Adds the `.carousel-dark` class, which provides darker styling for controls, indicators, and captions (useful on lighter backgrounds).
    *   `touch` (Boolean, Optional, Default: `true`): If `true`, enables swipe gestures to navigate slides on touch-enabled devices.
    *   `initialize` (Boolean, Optional, Default: `true`): If `true`, automatically initializes the Bootstrap Carousel JavaScript instance.
*   **Returns:** (Object) An object containing:
    *   `element` (HTMLElement): The main carousel DOM element (`.carousel`).
    *   `instance` (bootstrap.Carousel | null): The underlying Bootstrap 5 Carousel instance (or `null` if `initialize` was set to `false`).

## Development & Building

If you need to modify the SDK source code or create distributable builds (ESM, UMD):

1.  **Install Development Dependencies:** You'll need Node.js and npm/yarn. Install a bundler like `esbuild`:
    ```bash
    npm install --save-dev esbuild
    # or
    yarn add --dev esbuild
    ```

2.  **Run Build Commands:** Execute these from the root directory of the project.

    *   **ES Module (ESM) Build:** (Recommended for modern usage)
        ```bash
        npx esbuild sdk/src/index.js --bundle --outfile=sdk/dist/bootstrap-manager.js --format=esm --platform=browser
        ```
    *   **ESM Minified Build:**
        ```bash
        npx esbuild sdk/src/index.js --bundle --minify --outfile=sdk/dist/bootstrap-manager.min.js --format=esm --platform=browser
        ```
    *   **Universal Module Definition (UMD) Build:** (For global variable usage / older environments)
        ```bash
        npx esbuild sdk/src/index.js --bundle --outfile=sdk/dist/bootstrap-manager.umd.js --format=umd --global-name=BootstrapManager --platform=browser
        ```

3.  **Use the Builds:** Link to the generated files in the `sdk/dist/` directory as described in the [Installation & Setup](#installation--setup) section. 