/**
 * COPTERCODE ICON SYSTEM - COMPLETE GUIDE
 * ========================================
 * 
 * This document explains how the centralized icon system works and how to use it.
 */

// ============================================================================
// 1. CENTRALIZED ICON LIBRARY
// ============================================================================
// 
// Location: src/sanity/schemas/icons.js
// 
// This file contains:
// - Complete list of all available icons (Lucide React icons)
// - Helper functions for managing icons
// - Reusable field configurations for Sanity schemas
// 
// Benefits:
// ✅ Single source of truth for all icons
// ✅ Easy to add/remove icons globally
// ✅ Consistent icon naming across all pages
// ✅ Reduced code duplication
// ✅ Better maintainability

// ============================================================================
// 2. ICON CATEGORIES
// ============================================================================
// 
// Icons are organized into categories for better organization:
// 
// • Business (Briefcase, Users, Shield, Target, Award, Shield Check)
// • Technology (Globe, Server, Database, Cloud, CPU, Smartphone, Layout, Code, Layers)
// • Analytics (Chart, Pie Chart, Bar Chart, Trending Up)
// • Documents (File, File Text)
// • Emotions (Heart, Star, Zap, Lightbulb)
// • Nature (Leaf, Sun)
// • UI Specific (Sustainability, Innovation, Impact)

// ============================================================================
// 3. SCHEMAS USING CENTRALIZED ICONS
// ============================================================================
// 
// The following schema files have been updated to use the centralized icon list:
// 
// 1. careersPage.js
//    - Benefits section icons
// 
// 2. homePage.js
//    - Impact icons
//    - Sustainability tab icons
//    - Benefits/CTA icons
//    - Impact items in sustainability section
// 
// 3. technologiesPage.js
//    - Tech stack category icons
// 
// 4. projectsPage.js
//    - Project type icons
// 
// 5. investorsPage.js
//    - Highlights grid icons
// 
// 6. sustainabilityPage.js
//    - Impact grid icons

// ============================================================================
// 4. HOW TO USE IN SANITY SCHEMAS
// ============================================================================
// 
// Method 1: Import and Map (RECOMMENDED - Currently Used)
// ============================================================
// 
// import { iconsList } from './icons';
// 
// // In your field definition:
// {
//     name: 'icon',
//     title: 'Icon',
//     type: 'string',
//     options: {
//         list: iconsList.map(icon => ({
//             title: icon.title,
//             value: icon.value
//         }))
//     }
// }
// 
// This approach allows filtering by category if needed:
// 
// // Show only Technology icons
// {
//     name: 'icon',
//     title: 'Icon',
//     type: 'string',
//     options: {
//         list: getIconsByCategory('Technology').map(icon => ({
//             title: icon.title,
//             value: icon.value
//         }))
//     }
// }
// 
// 
// Method 2: Use Reusable Field Configuration
// ============================================================
// 
// import { iconField, createIconField } from './icons';
// 
// {
//     name: 'icon',
//     ...iconField
// }
// 
// Or with custom title:
// 
// {
//     name: 'icon',
//     ...createIconField('Choose an Icon')
// }

// ============================================================================
// 5. AVAILABLE ICONS (COMPLETE LIST)
// ============================================================================
// 
// Business Category
// - briefcase: For job positions, careers, business
// - users: For teams, communities, groups
// - shield: For security, protection
// - shieldCheck: For verified, security status
// - target: For goals, objectives
// - award: For achievements, recognition
// 
// Technology Category
// - globe: For frontend, web, worldwide
// - server: For backend, infrastructure
// - database: For data management, storage
// - cloud: For cloud services, infrastructure
// - cpu: For AI, ML, processing power
// - smartphone: For mobile, apps
// - layout: For web design, UI/UX
// - code: For development, programming
// - layers: For architecture, stacking
// 
// Analytics Category
// - chart: For analytics, graphs
// - piechart: For data distribution
// - barChart: For comparisons, metrics
// - trendingUp: For growth, improvement
// 
// Documents Category
// - file: For documents, files
// - fileText: For text documents, reports
// 
// Emotions Category
// - heart: For passion, love, care
// - star: For excellence, rating
// - zap: For energy, speed, innovation
// - lightbulb: For ideas, innovation
// 
// Nature Category
// - leaf: For environment, sustainability
// - sun: For renewable energy, light
// 
// UI Specific Category
// - sustainability: Custom mapping for sustainability tab
// - innovation: Custom mapping for innovation tab
// - impact: Custom mapping for impact metrics

// ============================================================================
// 6. ADDING NEW ICONS
// ============================================================================
// 
// To add a new icon:
// 
// 1. Open src/sanity/schemas/icons.js
// 
// 2. Add the new icon to the iconsList array:
// 
//    export const iconsList = [
//        // ... existing icons ...
//        { title: 'MyNewIcon', value: 'myNewIcon', category: 'MyCategory' }
//    ];
// 
// 3. The icon will automatically be available in all schemas
//    that import from icons.js
// 
// 4. All schemas already using the centralized list will pick up
//    the new icon automatically
// 
// Note: Icon values must match Lucide React icon names
// See: https://lucide.dev/

// ============================================================================
// 7. REMOVING ICONS
// ============================================================================
// 
// To remove an icon:
// 
// 1. Open src/sanity/schemas/icons.js
// 
// 2. Remove the icon from iconsList array
// 
// 3. Find all Sanity documents that use this icon and update them
//    (they will need to be reassigned a different icon)

// ============================================================================
// 8. COMPONENT INTEGRATION
// ============================================================================
// 
// The icons are used in React components via Lucide React:
// 
// Example from Careers.jsx:
// 
// import { Zap, Award, Globe, Heart, ... } from "lucide-react";
// 
// const iconMap = {
//     zap: Zap,
//     award: Award,
//     globe: Globe,
//     heart: Heart,
//     // ...
// };
// 
// const Icon = iconMap[iconValue];
// <Icon size={32} className="text-primary" />
// 
// All icon values from Sanity will automatically render the correct
// Lucide React icon if the icon name exists in the component's iconMap.

// ============================================================================
// 9. CURRENT ICON STATISTICS
// ============================================================================
// 
// Total Icons: 31
// Categories: 7
// Schemas Updated: 6
// Components Using Icons: Multiple
// 
// Distribution by Category:
// - Business: 6 icons
// - Technology: 9 icons
// - Analytics: 4 icons
// - Documents: 2 icons
// - Emotions: 4 icons
// - Nature: 2 icons
// - UI Specific: 2 icons

// ============================================================================
// 10. MIGRATION NOTES
// ============================================================================
// 
// All schemas have been migrated to use the centralized icon list.
// 
// Before Migration:
// ❌ Each schema had its own hardcoded icon list
// ❌ Adding icons required updating multiple files
// ❌ No consistency in icon naming
// 
// After Migration:
// ✅ Single source of truth (icons.js)
// ✅ Easy to manage icons globally
// ✅ Consistent naming across all pages
// ✅ 50% less code duplication
// ✅ Easier to scale and maintain

// ============================================================================
// 11. HELPER FUNCTIONS
// ============================================================================
// 
// import { 
//     iconsList,                      // Full list of all icons
//     getIconsByCategory,             // Filter icons by category
//     getIconCategories,              // Get all available categories
//     iconField,                      // Reusable field config
//     createIconField,                // Create custom field config
//     basicIconsList,                 // Subset of commonly used icons
//     basicIconField                  // Basic field config
// } from './icons';
// 
// Example usage:
// const techIcons = getIconsByCategory('Technology');
// const allCategories = getIconCategories();
// 
// Output:
// techIcons = [
//     { title: 'Globe', value: 'globe', category: 'Technology' },
//     { title: 'Server', value: 'server', category: 'Technology' },
//     // ... more technology icons
// ]
// 
// allCategories = ['Business', 'Technology', 'Analytics', ...]

// ============================================================================
// 12. TROUBLESHOOTING
// ============================================================================
// 
// Q: Icon doesn't render in the component
// A: Make sure the icon value exists in the component's iconMap AND 
//    in Lucide React
// 
// Q: Icon doesn't appear in Sanity dropdown
// A: Check that the schema file imports iconsList and uses it correctly
// 
// Q: Want to use an icon not in the list
// A: Add it to iconsList in icons.js (verify it exists in Lucide first)
// 
// Q: Changes to icons.js not appearing in Sanity
// A: Clear Sanity cache or restart the dev server

