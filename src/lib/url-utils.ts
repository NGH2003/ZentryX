// Utility functions for generating SEO-friendly URLs

/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Get the tool URL based on category and tool name
 * @param category - The tool category
 * @param toolName - The tool name
 * @returns Full tool URL path
 */
export function getToolUrl(category: string, toolName: string): string {
    const categorySlug = slugify(category);
    const toolSlug = slugify(toolName);
    return `/tools/${categorySlug}/${toolSlug}`;
}

/**
 * Get the tool detail URL
 * @param category - The tool category
 * @param toolName - The tool name
 * @returns Full tool detail URL path
 */
export function getToolDetailUrl(category: string, toolName: string): string {
    return `${getToolUrl(category, toolName)}/detail`;
}
