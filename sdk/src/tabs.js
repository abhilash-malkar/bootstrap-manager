import { generateId, mergeOptions } from './utils.js';

/**
 * Creates a Bootstrap 5 Tabs component and optionally appends it to a target element.
 *
 * @param {object} options - Configuration options for the tabs.
 * @param {string} [options.id] - Custom ID for the tabs container. Defaults to a generated ID.
 * @param {Array<object>} options.tabs - Array of tab objects, each with { label: string, content: string | HTMLElement, active?: boolean }.
 * @param {string | HTMLElement} [options.target] - The ID (string) or HTMLElement where the tabs should be appended. If provided, the target's content will be cleared first.
 * @param {boolean} [options.darkMode=false] - If true, applies dark mode styling (requires custom CSS or Bootstrap theme adjustments).
 * @param {boolean} [options.fade=true] - If true, adds fade effect to tab panes.
 * @returns {HTMLElement} The container element holding the tabs and panes.
 */
export function createTabs(options) {
    const defaultOptions = {
        id: generateId('tabs'),
        tabs: [], // Example: [{ label: 'Tab 1', content: 'Content 1' }, { label: 'Tab 2', content: 'Content 2' }]
        target: null,
        darkMode: false,
        fade: true,
    };

    const config = mergeOptions(defaultOptions, options);

    if (!config.tabs || config.tabs.length === 0) {
        console.error('createTabs requires at least one tab in the options.tabs array.');
        return null;
    }

    // Ensure only one tab is initially active
    let hasActiveTab = false;
    config.tabs.forEach(tab => {
        if (tab.active) {
            if (hasActiveTab) {
                tab.active = false; // Only allow one active tab
            } else {
                hasActiveTab = true;
            }
        }
    });
    // If no tab was explicitly set to active, make the first one active
    if (!hasActiveTab) {
        config.tabs[0].active = true;
    }

    const container = document.createElement('div');
    container.id = `${config.id}-container`;

    // Create Tab List (Nav)
    const nav = document.createElement('ul');
    nav.classList.add('nav', 'nav-tabs');
    nav.id = `${config.id}-nav`;
    nav.setAttribute('role', 'tablist');
    if (config.darkMode) {
        // Add custom dark mode class or use Bootstrap 5 theme attributes
        nav.setAttribute('data-bs-theme', 'dark'); // Example using theme attribute
        // Or nav.classList.add('nav-tabs-dark');
    }

    // Create Tab Content
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    tabContent.id = `${config.id}-content`;
    if (config.darkMode) {
        // Apply dark mode styling to content area if needed
        // tabContent.classList.add('tab-content-dark');
        tabContent.setAttribute('data-bs-theme', 'dark');
    }

    config.tabs.forEach((tabData, index) => {
        const tabId = `${config.id}-tab-${index}`;
        const paneId = `${config.id}-pane-${index}`;

        // Create Nav Item & Link
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        navItem.setAttribute('role', 'presentation');

        const navLink = document.createElement('button');
        navLink.classList.add('nav-link');
        navLink.id = tabId;
        navLink.setAttribute('data-bs-toggle', 'tab');
        navLink.setAttribute('data-bs-target', `#${paneId}`);
        navLink.type = 'button';
        navLink.setAttribute('role', 'tab');
        navLink.setAttribute('aria-controls', paneId);
        navLink.textContent = tabData.label;

        // Create Tab Pane
        const tabPane = document.createElement('div');
        tabPane.classList.add('tab-pane');
        if (config.fade) {
            tabPane.classList.add('fade');
        }
        tabPane.id = paneId;
        tabPane.setAttribute('role', 'tabpanel');
        tabPane.setAttribute('aria-labelledby', tabId);
        tabPane.tabIndex = 0;

        if (typeof tabData.content === 'string') {
            tabPane.innerHTML = tabData.content;
        } else if (tabData.content instanceof HTMLElement) {
            tabPane.appendChild(tabData.content);
        }

        if (tabData.active) {
            navLink.classList.add('active');
            navLink.setAttribute('aria-selected', 'true');
            tabPane.classList.add('show', 'active');
        } else {
            navLink.setAttribute('aria-selected', 'false');
        }

        navItem.appendChild(navLink);
        nav.appendChild(navItem);
        tabContent.appendChild(tabPane);
    });

    container.appendChild(nav);
    container.appendChild(tabContent);

    // Note: Bootstrap 5 handles tab switching via data attributes.
    // No manual JS initialization (like new bootstrap.Tab()) is needed for basic functionality.

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
            targetElement.appendChild(container);
        } else {
            console.error(`createTabs: Target element "${config.target}" not found.`);
        }
    }

    return container;
} 