#!/usr/bin/env node

/**
 * WordPress Export Script
 *
 * This script generates WordPress import data from the local page definitions.
 * It can output:
 * 1. WP-CLI commands for creating pages
 * 2. JSON files for bulk import
 * 3. SQL INSERT statements
 *
 * Usage:
 *   node scripts/export-to-wordpress.js [--format=cli|json|sql]
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const format = args.find((arg) => arg.startsWith('--format='))?.split('=')[1] || 'cli';

// Import page data (we'll need to compile TypeScript or use a runner)
// For now, this is a template that shows the structure

console.log('='.repeat(80));
console.log('WordPress Export Tool for Manyoni Ridge Safari Lodge');
console.log('='.repeat(80));
console.log('');

console.log('IMPORTANT: This is a template script.');
console.log('To use this script, you need to either:');
console.log('1. Run it with ts-node: npx ts-node scripts/export-to-wordpress.ts');
console.log('2. Compile the TypeScript files first and import the compiled JS');
console.log('3. Manually copy the data from lib/data/pages/*.ts files');
console.log('');

// Template data structure for reference
const examplePageStructure = {
  meta: {
    title: 'Page Title',
    slug: 'page-slug',
    description: 'Page description',
  },
  sections: [
    {
      type: 'hero_image',
      props: {
        title: 'Hero Title',
        // ... other props
      },
    },
    // ... more sections
  ],
};

console.log('Example Page Structure:');
console.log(JSON.stringify(examplePageStructure, null, 2));
console.log('');

// Generate WP-CLI commands
function generateWPCLI(pages) {
  console.log('='.repeat(80));
  console.log('WP-CLI Commands');
  console.log('='.repeat(80));
  console.log('');

  pages.forEach((page) => {
    console.log(`# Create page: ${page.meta.title}`);
    console.log(`wp post create \\`);
    console.log(`  --post_type=page \\`);
    console.log(`  --post_title="${page.meta.title}" \\`);
    console.log(`  --post_name="${page.meta.slug}" \\`);
    console.log(`  --post_status=publish \\`);
    console.log(`  --meta_input='{"sections": ${JSON.stringify(page.sections)}}'`);
    console.log('');
  });

  console.log('');
  console.log('After creating pages, you need to:');
  console.log('1. Install Advanced Custom Fields (ACF) Pro');
  console.log('2. Create a field group for "Page Sections"');
  console.log('3. Add a flexible content field called "sections"');
  console.log('4. Add layouts for each section type (hero_image, text_block, etc.)');
  console.log('');
}

// Generate JSON export
function generateJSON(pages) {
  const exportData = {
    version: '1.0',
    generator: 'Manyoni Ridge Export Script',
    exportDate: new Date().toISOString(),
    pages: pages,
  };

  const outputPath = path.join(__dirname, 'wordpress-export.json');
  fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2));

  console.log('='.repeat(80));
  console.log('JSON Export');
  console.log('='.repeat(80));
  console.log('');
  console.log(`Export file created: ${outputPath}`);
  console.log('');
  console.log('You can import this JSON file into WordPress using:');
  console.log('1. A custom import plugin');
  console.log('2. The WordPress REST API');
  console.log('3. Manual page creation based on the JSON structure');
  console.log('');
}

// Generate SQL statements
function generateSQL(pages) {
  console.log('='.repeat(80));
  console.log('SQL Import Statements');
  console.log('='.repeat(80));
  console.log('');
  console.log('-- NOTE: These are template SQL statements');
  console.log('-- You will need to adjust them based on your WordPress database structure');
  console.log('');

  pages.forEach((page, index) => {
    const postId = 1000 + index; // Starting post ID
    console.log(`-- Insert page: ${page.meta.title}`);
    console.log(`INSERT INTO wp_posts (ID, post_title, post_name, post_status, post_type, post_content)`);
    console.log(
      `VALUES (${postId}, '${page.meta.title}', '${page.meta.slug}', 'publish', 'page', '');`
    );
    console.log('');

    // Insert ACF metadata
    console.log(`INSERT INTO wp_postmeta (post_id, meta_key, meta_value)`);
    console.log(`VALUES (${postId}, 'sections', '${JSON.stringify(page.sections)}');`);
    console.log('');
  });
}

// ACF Field Group JSON structure
function generateACFFieldGroup() {
  const fieldGroup = {
    key: 'group_page_sections',
    title: 'Page Sections',
    fields: [
      {
        key: 'field_sections',
        label: 'Sections',
        name: 'sections',
        type: 'flexible_content',
        layouts: [
          {
            key: 'layout_hero_image',
            name: 'hero_image',
            label: 'Hero Image',
            display: 'block',
            sub_fields: [
              {
                key: 'field_hero_title',
                label: 'Title',
                name: 'title',
                type: 'text',
                required: 1,
              },
              {
                key: 'field_hero_subtitle',
                label: 'Subtitle',
                name: 'subtitle',
                type: 'text',
              },
              {
                key: 'field_hero_description',
                label: 'Description',
                name: 'description',
                type: 'textarea',
              },
              {
                key: 'field_hero_image',
                label: 'Image',
                name: 'imageSrc',
                type: 'image',
              },
              // Add more fields for hero section...
            ],
          },
          // Add more section layouts (text_block, split_content, etc.)...
        ],
      },
    ],
    location: [
      [
        {
          param: 'post_type',
          operator: '==',
          value: 'page',
        },
      ],
    ],
  };

  const outputPath = path.join(__dirname, 'acf-field-group.json');
  fs.writeFileSync(outputPath, JSON.stringify(fieldGroup, null, 2));

  console.log('='.repeat(80));
  console.log('ACF Field Group');
  console.log('='.repeat(80));
  console.log('');
  console.log(`ACF field group JSON created: ${outputPath}`);
  console.log('');
  console.log('To import this field group:');
  console.log('1. Go to WordPress Admin > Custom Fields > Tools');
  console.log('2. Click "Import Field Groups"');
  console.log('3. Upload this JSON file');
  console.log('');
  console.log('NOTE: This is a basic template. You need to add all section types');
  console.log('and their fields based on the Section types in lib/types.ts');
  console.log('');
}

// Example pages for demonstration
const examplePages = [
  {
    meta: {
      title: 'Home',
      slug: 'home',
      description: 'Homepage',
    },
    sections: [
      {
        type: 'hero_image',
        props: {
          title: 'Welcome to Manyoni Ridge',
          subtitle: 'Luxury Safari Lodge',
        },
      },
    ],
  },
  {
    meta: {
      title: 'About',
      slug: 'about',
      description: 'About us',
    },
    sections: [
      {
        type: 'text_block',
        props: {
          title: 'Our Story',
        },
      },
    ],
  },
];

// Main execution
console.log('TO USE THIS SCRIPT WITH REAL DATA:');
console.log('');
console.log('1. Create a TypeScript version: export-to-wordpress.ts');
console.log('2. Import page data from lib/data/pages');
console.log('3. Run with: npx ts-node scripts/export-to-wordpress.ts --format=cli');
console.log('');
console.log('For now, showing example output with sample data:');
console.log('');

if (format === 'cli') {
  generateWPCLI(examplePages);
} else if (format === 'json') {
  generateJSON(examplePages);
} else if (format === 'sql') {
  generateSQL(examplePages);
} else if (format === 'acf') {
  generateACFFieldGroup();
} else {
  console.log('Unknown format. Use: --format=cli|json|sql|acf');
}

console.log('='.repeat(80));
console.log('Next Steps');
console.log('='.repeat(80));
console.log('');
console.log('1. Set up WordPress with ACF Pro');
console.log('2. Create ACF field groups matching your Section types');
console.log('3. Export page data using this script');
console.log('4. Import pages into WordPress');
console.log('5. Update .env: NEXT_PUBLIC_USE_WORDPRESS=true');
console.log('6. Configure: NEXT_PUBLIC_WP_API_URL=your-wordpress-url/wp-json');
console.log('7. Implement WordPress data transformation in lib/wordpress/client.ts');
console.log('');
