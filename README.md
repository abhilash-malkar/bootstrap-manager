# Bootstrap 5 SDK

A lightweight JavaScript SDK for dynamically creating Bootstrap 5 components (Modals, Tabs, Carousels) with feature toggles.

## Features

*   Dynamically create Modals, Tabs, and Carousels using simple JavaScript functions.
*   No external dependencies except Bootstrap 5 (CSS & JS).
*   Usable directly in the browser (plain JS).
*   Configurable options for each component type (dark mode, size, animation, etc.).

## Installation / Usage

1.  **Include Bootstrap 5:** Make sure your HTML page includes Bootstrap 5 CSS and JS.
    ```html
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap 5 JS Bundle (includes Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    ```

2.  **Include the SDK:**
    *   **Recommended:** Bundle the `sdk/src` files (`index.js`, `modal.js`, `tabs.js`, `carousel.js`, `utils.js`) into a single file (e.g., `bootstrap-sdk.js`) using a bundler like esbuild, Rollup, or Webpack. Then include the bundled file:
        ```html
        <script src="path/to/your/bootstrap-sdk.js"></script>
        ```
    *   **Simple (Requires Server):** If running your HTML from a local server (due to ES module restrictions), you can include the main entry point as a module:
        ```html
        <script type="module">
            import BootstrapSDK from './sdk/src/index.js';
            // Use BootstrapSDK object now
        </script>
        ```
        *(Note: The SDK automatically exposes itself as `window.BootstrapSDK` when included this way or via a standard `<script>` tag after bundling).* 

3.  **Use the SDK:** Call the methods on the `BootstrapSDK` object.

    ```javascript
    // Example: Create a simple modal
    BootstrapSDK.createModal({
        title: 'My Dynamic Modal',
        body: 'Hello from the SDK!',
        showOnCreate: true
    });

    // Example: Create tabs and append them to an element with ID 'my-tabs-container'
    BootstrapSDK.createTabs({
        target: 'my-tabs-container', // The SDK will append the tabs here
        tabs: [
            { label: 'Info', content: 'Information here' },
            { label: 'Settings', content: 'Settings controls go here' }
        ]
    });
    ```

## API Methods

### `BootstrapSDK.createModal(options)`

Creates a Bootstrap 5 Modal element, appends it to the `<body>`, and initializes it.

*   **`options`** (Object): Configuration for the modal.
    *   `id` (String, Optional): Custom ID for the modal. Defaults to a generated ID.
    *   `title` (String): The title text for the modal header.
    *   `body` (String | HTMLElement): The content for the modal body.
    *   `footer` (String | HTMLElement | null | undefined, Optional): The content for the modal footer. If `null` or `undefined`, footer is omitted. If an empty string (`''`), a default "Close" button is added.
    *   `darkMode` (Boolean, Optional, Default: `false`): Adds `data-bs-theme="dark"` attribute to the modal for Bootstrap's dark theme variables. Requires Bootstrap 5.3+ and proper theme setup.
    *   `size` ('sm' | 'lg' | 'xl', Optional): Size of the modal.
    *   `animate` (Boolean, Optional, Default: `true`): Use the `fade` animation.
    *   `showOnCreate` (Boolean, Optional, Default: `false`): Show the modal immediately after creation.
    *   `staticBackdrop` (Boolean, Optional, Default: `false`): Deprecated. Use `backdrop: 'static'` instead.
    *   `backdrop` (Boolean | 'static', Optional, Default: `true`): Configures backdrop (`true`, `false`, or `'static'`).
    *   `keyboard` (Boolean, Optional, Default: `true`): Close modal with Esc key (`true` or `false`).
    *   `scrollable` (Boolean, Optional, Default: `false`): Add `modal-dialog-scrollable` class.
    *   `centered` (Boolean, Optional, Default: `false`): Add `modal-dialog-centered` class.
*   **Returns:** (Object) `{ element: HTMLElement, instance: bootstrap.Modal }` The modal DOM element and its Bootstrap instance.

### `BootstrapSDK.createTabs(options)`

Creates a Bootstrap 5 Tabs component (nav and content panes).

*   **`options`** (Object): Configuration for the tabs.
    *   `id` (String, Optional): Custom base ID for the tabs. Defaults to a generated ID.
    *   `target` (String | HTMLElement, Optional): The ID or HTMLElement where the tabs component should be appended. Clears target content first.
    *   `tabs` (Array): Array of tab objects:
        *   `label` (String): Text for the tab button.
        *   `content` (String | HTMLElement): Content for the tab pane.
        *   `active` (Boolean, Optional): Set this tab as initially active (only the first one found will be active).
    *   `darkMode` (Boolean, Optional, Default: `false`): Adds `data-bs-theme="dark"` attribute to the nav and content elements. Requires Bootstrap 5.3+ and proper theme setup.
    *   `fade` (Boolean, Optional, Default: `true`): Add `fade` class to tab panes for animation.
*   **Returns:** (HTMLElement | null) The container element holding the tabs structure, or `null` if `options.tabs` is empty.

### `BootstrapSDK.createCarousel(options)`

Creates a Bootstrap 5 Carousel element and initializes it.

*   **`options`** (Object): Configuration for the carousel.
    *   `id` (String, Optional): Custom ID for the carousel. Defaults to a generated ID.
    *   `target` (String | HTMLElement, Optional): The ID or HTMLElement where the carousel should be appended. Clears target content first.
    *   `items` (Array): Array of item objects:
        *   `content` (String | HTMLElement): Content for the carousel item (e.g., an `<img>` tag or a `<div>`).
        *   `caption` (String | HTMLElement, Optional): Content for the caption (`.carousel-caption`).
        *   `interval` (Number, Optional): Specific interval (ms) for this item.
    *   `indicators` (Boolean, Optional, Default: `true`): Show carousel indicators.
    *   `controls` (Boolean, Optional, Default: `true`): Show previous/next controls.
    *   `animate` (Boolean, Optional, Default: `false`): Use fade transition (`carousel-fade`).
    *   `pauseOnHover` ('hover' | false, Optional, Default: `'hover'`): Pause cycling on mouse hover.
    *   `wrap` (Boolean, Optional, Default: `true`): Cycle continuously.
    *   `keyboard` (Boolean, Optional, Default: `true`): React to keyboard events.
    *   `interval` (Number | false, Optional, Default: `5000`): Default interval (ms) between slides. `false` disables auto-cycling.
    *   `darkMode` (Boolean, Optional, Default: `false`): Add `carousel-dark` class for dark controls/indicators/captions.
    *   `touch` (Boolean, Optional, Default: `true`): Enable swipe gestures on touch devices.
    *   `initialize` (Boolean, Optional, Default: `true`): Automatically initialize the Bootstrap Carousel instance.
*   **Returns:** (Object) `{ element: HTMLElement, instance: bootstrap.Carousel | null }` The carousel DOM element and its Bootstrap instance (or `null` if `initialize` is `false`).

## Development / Building

(Optional) To bundle the source files into a single distributable file (e.g., `dist/bootstrap-sdk.js`):

1.  Install a bundler like `esbuild`:
    ```bash
    npm install --save-dev esbuild
    # or
    yarn add --dev esbuild
    ```
2.  Run the build command (example using esbuild):
    ```bash
    npx esbuild sdk/src/index.js --bundle --outfile=sdk/dist/bootstrap-sdk.js --format=esm --platform=browser
    # For a minified version:
    npx esbuild sdk/src/index.js --bundle --minify --outfile=sdk/dist/bootstrap-sdk.min.js --format=esm --platform=browser
    # For a UMD version (if needed for older environments without module support):
    npx esbuild sdk/src/index.js --bundle --outfile=sdk/dist/bootstrap-sdk.umd.js --format=umd --global-name=BootstrapSDK --platform=browser
    ```

Modify your `example/index.html` or other projects to load the bundled file from the `dist` directory. 