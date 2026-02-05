/**
 * Content Export Script for WordPress Migration
 *
 * This script exports all page content from the Next.js frontend
 * into formats that can be easily imported into WordPress.
 *
 * Usage: npx ts-node scripts/export-content-for-wordpress.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  homePage,
  aboutPage,
  accommodationsPage,
  activitiesPage,
  contactPage,
  diningPage,
  galleryPage,
  reservePage,
  offersPage,
  faqPage,
  mainLodgePage,
} from '../src/lib/data/pages';
import { rooms } from '../src/lib/data/rooms';
import { activities } from '../src/lib/data/activities';
import { faqCategories } from '../src/lib/data/faq';

const OUTPUT_DIR = path.join(__dirname, 'wordpress-export');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Export all pages as JSON
 */
function exportPages() {
  const pages = {
    home: homePage,
    about: aboutPage,
    accommodations: accommodationsPage,
    activities: activitiesPage,
    contact: contactPage,
    dining: diningPage,
    gallery: galleryPage,
    reserve: reservePage,
    offers: offersPage,
    faq: faqPage,
    'main-lodge': mainLodgePage,
  };

  // Export all pages as a single JSON file
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'all-pages.json'),
    JSON.stringify(pages, null, 2)
  );

  // Export each page individually
  Object.entries(pages).forEach(([slug, page]) => {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `page-${slug}.json`),
      JSON.stringify(page, null, 2)
    );
  });

  console.log(`✓ Exported ${Object.keys(pages).length} pages`);
}

/**
 * Export pages as CSV for easy viewing
 */
function exportPagesCSV() {
  const pages = [
    homePage,
    aboutPage,
    accommodationsPage,
    activitiesPage,
    contactPage,
    diningPage,
    galleryPage,
    reservePage,
    offersPage,
    faqPage,
    mainLodgePage,
  ];

  const csv = [
    'Slug,Title,Description,Section Count',
    ...pages.map((page) =>
      [
        page.meta.slug,
        `"${page.meta.title}"`,
        `"${page.meta.description}"`,
        page.sections.length,
      ].join(',')
    ),
  ].join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'pages-overview.csv'), csv);
  console.log('✓ Exported pages overview CSV');
}

/**
 * Export rooms collection
 */
function exportRooms() {
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'rooms.json'),
    JSON.stringify(rooms, null, 2)
  );

  // Create CSV for rooms
  const csv = [
    'Slug,Title,Subtitle,Bedrooms,Bathrooms,Size,Capacity Adults,Capacity Children,Amenities Count,Features Count,Images Count',
    ...rooms.map((room) =>
      [
        room.slug,
        `"${room.title}"`,
        `"${room.subtitle}"`,
        room.bedrooms,
        room.bathrooms,
        `"${room.size}"`,
        room.capacity.adults,
        room.capacity.children,
        room.amenities.length,
        room.features.length,
        room.images.length,
      ].join(',')
    ),
  ].join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'rooms.csv'), csv);
  console.log(`✓ Exported ${rooms.length} rooms`);
}

/**
 * Export activities collection
 */
function exportActivities() {
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'activities.json'),
    JSON.stringify(activities, null, 2)
  );

  // Create CSV for activities
  const csv = [
    'Slug,Title,Subtitle,Duration,Difficulty,Min Age,Includes Count,Highlights Count,Images Count',
    ...activities.map((activity) =>
      [
        activity.slug,
        `"${activity.title}"`,
        `"${activity.subtitle}"`,
        `"${activity.duration}"`,
        activity.difficulty || '',
        activity.minAge || '',
        activity.includes.length,
        activity.highlights.length,
        activity.images.length,
      ].join(',')
    ),
  ].join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'activities.csv'), csv);
  console.log(`✓ Exported ${activities.length} activities`);
}

/**
 * Export FAQ data
 */
function exportFAQ() {
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'faq.json'),
    JSON.stringify(faqCategories, null, 2)
  );

  // Create CSV for FAQ
  const csv = [
    'Category,Question,Answer',
    ...faqCategories.flatMap((category) =>
      category.items.map((item) =>
        [
          `"${category.title}"`,
          `"${item.question}"`,
          `"${item.answer.replace(/"/g, '""')}"`,
        ].join(',')
      )
    ),
  ].join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'faq.csv'), csv);

  const totalQA = faqCategories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );
  console.log(
    `✓ Exported ${faqCategories.length} FAQ categories (${totalQA} Q&A pairs)`
  );
}

/**
 * Export section types summary
 */
function exportSectionTypes() {
  const pages = [
    homePage,
    aboutPage,
    accommodationsPage,
    activitiesPage,
    contactPage,
    diningPage,
    galleryPage,
    reservePage,
    offersPage,
    faqPage,
    mainLodgePage,
  ];

  const sectionTypes: Record<string, number> = {};

  pages.forEach((page) => {
    page.sections.forEach((section) => {
      sectionTypes[section.type] = (sectionTypes[section.type] || 0) + 1;
    });
  });

  const csv = [
    'Section Type,Count,Pages Using',
    ...Object.entries(sectionTypes)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => {
        const pagesUsing = pages
          .filter((page) => page.sections.some((s) => s.type === type))
          .map((p) => p.meta.slug)
          .join('; ');
        return `${type},${count},"${pagesUsing}"`;
      }),
  ].join('\n');

  fs.writeFileSync(path.join(OUTPUT_DIR, 'section-types-summary.csv'), csv);
  console.log(`✓ Exported section types summary (${Object.keys(sectionTypes).length} types)`);
}

/**
 * Create WordPress import instructions
 */
function createImportInstructions() {
  const instructions = `# WordPress Content Import Instructions

## Overview

This export contains all content from the Manyoni Ridge Next.js frontend in multiple formats:

### Files Exported

1. **Pages**
   - \`all-pages.json\` - All pages in a single file
   - \`page-{slug}.json\` - Individual page files
   - \`pages-overview.csv\` - Spreadsheet overview of all pages

2. **Collections**
   - \`rooms.json\` / \`rooms.csv\` - Room/accommodation data
   - \`activities.json\` / \`activities.csv\` - Activity/experience data
   - \`faq.json\` / \`faq.csv\` - FAQ categories and questions

3. **Analysis**
   - \`section-types-summary.csv\` - Section usage statistics

## Using the JSON Files

### Automated Import (Recommended)

Use the \`import-to-wordpress.ts\` script to automatically create pages and populate content:

\`\`\`bash
npx ts-node scripts/import-to-wordpress.ts
\`\`\`

### Manual Import

1. Open the JSON file for the page you want to create (e.g., \`page-home.json\`)
2. Create a new page in WordPress with the same slug
3. For each section in the \`sections\` array:
   - Click "Add Section" in the Page Sections field group
   - Select the section type (e.g., "hero_image")
   - Copy the field values from \`props\` into the corresponding ACF fields
   - Repeat for all sections

### Using CSV Files

The CSV files are provided for easy viewing and reference:
- Open in Excel, Google Sheets, or any spreadsheet application
- Use as a checklist while manually populating WordPress
- Helpful for content review and QA

## Section Type Reference

Each section type in the JSON corresponds to an ACF layout:

- \`hero_image\` → Hero Image layout
- \`text_block\` → Text Block layout
- \`split_content\` → Split Content layout
- \`room_cards_section\` → Room Cards Section layout
- etc.

See \`WORDPRESS_MIGRATION_AUDIT.md\` for complete field mapping.

## Image Migration

Images referenced in the JSON files (e.g., \`/images/Birds and Wildlife/leopard.jpg\`) need to be:

1. Uploaded to WordPress Media Library
2. URLs updated in the ACF fields to use WordPress media URLs

See \`IMAGE_MIGRATION_GUIDE.md\` for detailed instructions.

## Order of Import

Recommended order:

1. **Collections First**
   - Import Rooms (2 items)
   - Import Activities (6 items)
   - Import FAQ (6 categories)

2. **Pages**
   - Home
   - About
   - Accommodations
   - Activities
   - Dining
   - Reserve
   - Gallery
   - Contact
   - FAQ
   - Offers
   - Main Lodge

## Validation

After importing each page, verify:
- Correct number of sections
- All text content present
- Images loading correctly
- CTAs linking to correct pages
- Repeater fields populated

## Content Updates

The JSON files represent a snapshot of content as of ${new Date().toISOString()}.

To re-export after content changes:
\`\`\`bash
npx ts-node scripts/export-content-for-wordpress.ts
\`\`\`

---

**Generated:** ${new Date().toLocaleString()}
**Source:** Manyoni Ridge Next.js Frontend
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), instructions);
  console.log('✓ Created import instructions');
}

/**
 * Main export function
 */
function main() {
  console.log('================================================================================');
  console.log('WordPress Content Export');
  console.log('================================================================================\n');

  exportPages();
  exportPagesCSV();
  exportRooms();
  exportActivities();
  exportFAQ();
  exportSectionTypes();
  createImportInstructions();

  console.log('\n================================================================================');
  console.log('Export Complete!');
  console.log('================================================================================\n');
  console.log(`Files saved to: ${OUTPUT_DIR}\n`);
  console.log('Next steps:');
  console.log('1. Review the exported JSON files');
  console.log('2. Use the CSV files as a reference/checklist');
  console.log('3. Import content to WordPress (manually or using import script)');
  console.log('4. Upload images to WordPress Media Library\n');
}

main();
