/**
 * Central export for all data sources
 * This file provides a unified interface for accessing data,
 * whether from local files or WordPress
 */

// Re-export existing data collections
export * from './rooms';
export * from './activities';
export * from './faq';

// Re-export page data and functions
export * from './pages';

// Re-export WordPress data switch functions
// These are the main functions used throughout the app
export { getPageData, getAllPageSlugs, getDataSource, isWordPressMode } from '../wordpress/switch';
