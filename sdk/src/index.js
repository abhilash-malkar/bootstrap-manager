import { createModal } from './modal.js';
import { createTabs } from './tabs.js';
import { createCarousel } from './carousel.js';

/**
 * Bootstrap 5 SDK
 * Provides functions to dynamically create Bootstrap components.
 * @namespace BootstrapManager
 * @version 1.0.0
 * @author Abhilash Malkar
 * @see https://github.com/abhilashmalkar/bootstrap-manager
 * @see https://abhilashmalkar.github.io/bootstrap-manager/
 */
const BootstrapManager = {
    createModal,
    createTabs,
    createCarousel,
};

// Expose the SDK to the global scope for browser usage
if (typeof window !== 'undefined') {
    // window.BootstrapSDK = BootstrapSDK;
    window.BootstrapManager = BootstrapManager;
    
}

export default BootstrapManager;
