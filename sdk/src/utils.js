/**
 * Generates a unique ID string.
 * @param {string} prefix - Optional prefix for the ID.
 * @returns {string} A unique ID.
 */
export function generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Simple utility to merge default options with user-provided options.
 * @param {object} defaults - The default options object.
 * @param {object} options - The user-provided options object.
 * @returns {object} The merged options object.
 */
export function mergeOptions(defaults, options) {
    return { ...defaults, ...options };
} 