import { generateId, mergeOptions } from './utils.js';

/**
 * Creates a Bootstrap 5 Modal element and optionally initializes it.
 *
 * @param {object} options - Configuration options for the modal.
 * @param {string} [options.id] - Custom ID for the modal. Defaults to a generated ID.
 * @param {string} options.title - The title text for the modal header.
 * @param {string | HTMLElement} options.body - The content for the modal body. Can be HTML string or an HTMLElement.
 * @param {string | HTMLElement} [options.footer] - The content for the modal footer. Can be HTML string or an HTMLElement. If null or undefined, footer is omitted.
 * @param {boolean} [options.darkMode=false] - If true, applies dark mode classes (custom implementation assumed if needed, Bootstrap 5 doesn't have explicit modal dark mode).
 * @param {'sm' | 'lg' | 'xl'} [options.size] - The size of the modal ('sm', 'lg', 'xl').
 * @param {boolean} [options.animate=true] - If true, uses the 'fade' animation.
 * @param {boolean} [options.showOnCreate=false] - If true, shows the modal immediately after creation.
 * @param {boolean} [options.staticBackdrop=false] - If true, sets data-bs-backdrop="static". (Use `backdrop: 'static'` instead).
 * @param {boolean | 'static'} [options.backdrop=true] - Configures the modal backdrop. `true` (default), `false` (no backdrop), or `'static'` (backdrop doesn't close modal on click).
 * @param {boolean} [options.keyboard=true] - If true (default), allows closing the modal with the Esc key.
 * @param {boolean} [options.scrollable=false] - If true, makes the modal content scrollable.
 * @param {boolean} [options.centered=false] - If true, vertically centers the modal.
 * @returns {object} An object containing the modal element and the Bootstrap modal instance.
 */
export function createModal(options) {
    const defaultOptions = {
        id: generateId('modal'),
        title: 'Modal Title',
        body: '',
        footer: '', // Default to empty footer, can be customized
        darkMode: false,
        size: null,
        animate: true,
        showOnCreate: false,
        staticBackdrop: false,
        backdrop: true,
        keyboard: true,
        scrollable: false,
        centered: false,
    };

    const config = mergeOptions(defaultOptions, options);

    const modalElement = document.createElement('div');
    modalElement.classList.add('modal');
    if (config.animate) {
        modalElement.classList.add('fade');
    }
    modalElement.id = config.id;
    modalElement.tabIndex = -1;
    modalElement.setAttribute('aria-labelledby', `${config.id}Label`);
    modalElement.setAttribute('aria-hidden', 'true');

    // Handle backdrop configuration
    if (config.backdrop === 'static' || config.staticBackdrop) { // Allow staticBackdrop for backward compat
        modalElement.setAttribute('data-bs-backdrop', 'static');
    } else if (config.backdrop === false) {
        modalElement.setAttribute('data-bs-backdrop', 'false');
    }
    // If config.backdrop is true (default), no attribute is needed.

    // Handle keyboard configuration
    if (config.keyboard === false) {
        modalElement.setAttribute('data-bs-keyboard', 'false');
    }
    // If config.keyboard is true (default), no attribute is needed.

    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    if (config.size && ['sm', 'lg', 'xl'].includes(config.size)) {
        modalDialog.classList.add(`modal-${config.size}`);
    }
    if (config.scrollable) {
        modalDialog.classList.add('modal-dialog-scrollable');
    }
    if (config.centered) {
        modalDialog.classList.add('modal-dialog-centered');
    }

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    // Note: Bootstrap 5 doesn't have a built-in dark mode for modals.
    // Add a custom class if specific dark mode styling is needed.
    if (config.darkMode) {
        modalContent.classList.add('modal-dark'); // Example custom class
        // Or apply Bootstrap 5 dark theme variables if applicable globally
        modalElement.setAttribute('data-bs-theme', 'dark');
    }

    // Header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.id = `${config.id}Label`;
    modalTitle.textContent = config.title;

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    // Body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    if (typeof config.body === 'string') {
        modalBody.innerHTML = config.body;
    } else if (config.body instanceof HTMLElement) {
        modalBody.appendChild(config.body);
    }

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    // Footer (optional)
    if (config.footer !== null && config.footer !== undefined) {
        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        if (typeof config.footer === 'string') {
            modalFooter.innerHTML = config.footer;
        } else if (config.footer instanceof HTMLElement) {
            modalFooter.appendChild(config.footer);
        } else {
             // Default footer if config.footer is empty string or true (backward compatibility?)
            const closeBtnFooter = document.createElement('button');
            closeBtnFooter.type = 'button';
            closeBtnFooter.classList.add('btn', 'btn-secondary');
            closeBtnFooter.setAttribute('data-bs-dismiss', 'modal');
            closeBtnFooter.textContent = 'Close';
            modalFooter.appendChild(closeBtnFooter);
        }

        if (config.footer !== '') {
            modalContent.appendChild(modalFooter);
        }
    }

    modalDialog.appendChild(modalContent);
    modalElement.appendChild(modalDialog);

    // Append to body
    document.body.appendChild(modalElement);

    // Initialize Bootstrap modal
    const bootstrapModal = new bootstrap.Modal(modalElement);

    // Optional: Show modal immediately
    if (config.showOnCreate) {
        bootstrapModal.show();
    }

    // Cleanup: Remove modal from DOM when hidden
    modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modalElement);
    });

    return {
        element: modalElement,
        instance: bootstrapModal,
        /**
         * Shows the modal.
         */
        show: () => {
            if (bootstrapModal) {
                bootstrapModal.show();
            }
        },
        /**
         * Hides the modal.
         */
        hide: () => {
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
    };
} 