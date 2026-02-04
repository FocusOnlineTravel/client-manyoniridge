#!/usr/bin/env node
/**
 * WordPress Import Script - Manyoni Ridge Safari Lodge
 *
 * This script automatically creates all pages and populates content
 * in WordPress using the REST API.
 *
 * Prerequisites:
 * 1. WordPress installed with ACF Pro
 * 2. ACF field groups imported (acf-field-group-complete.json)
 * 3. Application Password created for authentication
 *
 * Usage:
 *   WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za \
 *   WORDPRESS_USER=admin \
 *   WORDPRESS_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx \
 *   node scripts/import-to-wordpress.mjs
 */

import fetch from 'node-fetch';

// Configuration from environment variables
const config = {
  wpUrl: process.env.WORDPRESS_URL || 'https://backend-manyoni.focusonlinetravel.co.za',
  wpUser: process.env.WORDPRESS_USER || 'admin',
  wpPassword: process.env.WORDPRESS_APP_PASSWORD,
};

// Validate configuration
if (!config.wpPassword) {
  console.error('❌ Error: WORDPRESS_APP_PASSWORD environment variable is required');
  console.log('\nTo generate an Application Password:');
  console.log('1. Go to WordPress Admin > Users > Profile');
  console.log('2. Scroll to "Application Passwords"');
  console.log('3. Enter name (e.g., "Import Script") and click "Add New"');
  console.log('4. Copy the generated password\n');
  console.log('Then run:');
  console.log('WORDPRESS_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx node scripts/import-to-wordpress.mjs\n');
  process.exit(1);
}

// Auth header
const auth = Buffer.from(`${config.wpUser}:${config.wpPassword}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json',
};

// Page data (simplified for demonstration - full data would come from imported modules)
const pages = [
  {
    slug: 'home',
    title: 'Home',
    meta_description: 'Experience the magic of the African bush at our boutique safari lodge in Manyoni Private Game Reserve.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'Opening September 2026',
        title: 'Intimate Luxury in the Wild',
        description: 'Experience the magic of the African bush at our boutique safari lodge in Manyoni Private Game Reserve. Big 5 encounters, exceptional service, and unforgettable moments await.',
        ctaText: 'Enquire Now',
        ctaHref: '/contact',
        secondaryCtaText: 'Explore',
        secondaryCtaHref: '/accommodations',
        scrollToId: 'intro',
        videoSrc: '/videos/manynoi.mp4',
        verticalAlign: 'bottom',
        textBackground: true,
      },
      {
        acf_fc_layout: 'text_block',
        title: 'Welcome to Manyoni Ridge',
        subtitle: 'Your Safari Awaits',
        description: "Nestled in the heart of Manyoni Private Game Reserve, Manyoni Ridge offers an intimate safari experience where luxury meets wilderness. With only nine exclusive suites, we provide personalized service and unforgettable encounters with Africa's most iconic wildlife.",
        ctaText: 'Discover Our Story',
        ctaHref: '/about',
        background: 'cream',
      },
      // More sections would be added here...
    ],
  },
  {
    slug: 'about',
    title: 'About Us',
    meta_description: 'Learn about Manyoni Ridge Safari Lodge - our story, vision, and commitment to exceptional safari experiences.',
    status: 'publish',
    sections: [
      {
        acf_fc_layout: 'hero_image',
        subtitle: 'About Us',
        title: 'Our Story',
        description: "A vision born from a passion for Africa's wilderness and a commitment to sharing its magic.",
        size: 'large',
        showScrollIndicator: false,
        verticalAlign: 'bottom',
      },
      // More sections...
    ],
  },
  // More pages would be added...
];

/**
 * Make authenticated request to WordPress REST API
 */
async function wpRequest(endpoint, method = 'GET', body = null) {
  const url = `${config.wpUrl}/wp-json/wp/v2${endpoint}`;

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Request failed: ${endpoint}`);
    throw error;
  }
}

/**
 * Check if WordPress is accessible
 */
async function checkConnection() {
  console.log('🔌 Testing WordPress connection...');

  try {
    const response = await fetch(`${config.wpUrl}/wp-json`);
    if (!response.ok) {
      throw new Error(`WordPress not accessible: ${response.status}`);
    }
    console.log('✅ WordPress is accessible\n');
    return true;
  } catch (error) {
    console.error('❌ Cannot connect to WordPress');
    console.error(error.message);
    return false;
  }
}

/**
 * Test authentication
 */
async function testAuth() {
  console.log('🔐 Testing authentication...');

  try {
    await wpRequest('/users/me');
    console.log('✅ Authentication successful\n');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed');
    console.error('Please check your username and Application Password\n');
    return false;
  }
}

/**
 * Check if page exists
 */
async function pageExists(slug) {
  try {
    const pages = await wpRequest(`/pages?slug=${slug}`);
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    return null;
  }
}

/**
 * Create or update a page
 */
async function createPage(pageData) {
  const { slug, title, meta_description, status, sections } = pageData;

  console.log(`\n📄 Processing page: ${title} (${slug})`);

  // Check if page already exists
  const existing = await pageExists(slug);

  const pagePayload = {
    title,
    slug,
    status,
    excerpt: meta_description,
    meta: {
      description: meta_description,
    },
  };

  let page;

  if (existing) {
    console.log(`   ℹ️  Page already exists (ID: ${existing.id})`);
    console.log(`   🔄 Updating...`);
    page = await wpRequest(`/pages/${existing.id}`, 'POST', pagePayload);
    console.log(`   ✅ Updated`);
  } else {
    console.log(`   ➕ Creating new page...`);
    page = await wpRequest('/pages', 'POST', pagePayload);
    console.log(`   ✅ Created (ID: ${page.id})`);
  }

  // Update ACF fields
  if (sections && sections.length > 0) {
    console.log(`   📝 Adding ${sections.length} sections...`);
    await updateACFFields(page.id, sections);
    console.log(`   ✅ Sections added`);
  }

  return page;
}

/**
 * Update ACF fields for a page
 */
async function updateACFFields(pageId, sections) {
  // ACF REST API endpoint
  const acfEndpoint = `${config.wpUrl}/wp-json/acf/v3/pages/${pageId}`;

  const acfData = {
    fields: {
      sections: sections,
    },
  };

  try {
    const response = await fetch(acfEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(acfData),
    });

    if (!response.ok) {
      const error = await response.text();
      console.warn(`   ⚠️  ACF update warning: ${error}`);
      console.log(`   ℹ️  You may need to manually add sections via WordPress Admin`);
    }
  } catch (error) {
    console.warn(`   ⚠️  ACF API not available. Sections need to be added manually.`);
  }
}

/**
 * Set homepage
 */
async function setHomepage(pageId) {
  console.log('\n🏠 Setting homepage...');

  try {
    // This requires the REST API to support settings endpoint
    // You may need to do this manually in WordPress Settings > Reading
    console.log('   ℹ️  Please manually set homepage in WordPress Admin:');
    console.log('   Settings > Reading > "A static page" > Homepage: Home');
  } catch (error) {
    console.warn('   ⚠️  Could not set homepage automatically');
  }
}

/**
 * Main import function
 */
async function main() {
  console.log('================================================================================');
  console.log('WordPress Content Import - Manyoni Ridge Safari Lodge');
  console.log('================================================================================\n');
  console.log(`WordPress URL: ${config.wpUrl}`);
  console.log(`User: ${config.wpUser}\n`);

  // Step 1: Check connection
  if (!await checkConnection()) {
    process.exit(1);
  }

  // Step 2: Test authentication
  if (!await testAuth()) {
    process.exit(1);
  }

  // Step 3: Import pages
  console.log('📦 Importing pages...\n');
  console.log('=' .repeat(80));

  const createdPages = [];

  for (const pageData of pages) {
    try {
      const page = await createPage(pageData);
      createdPages.push(page);
    } catch (error) {
      console.error(`\n❌ Failed to create page: ${pageData.title}`);
      console.error(error.message);
    }
  }

  // Step 4: Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n✅ Import Complete!\n');
  console.log(`Pages created/updated: ${createdPages.length}`);
  console.log('\nCreated pages:');
  createdPages.forEach(page => {
    console.log(`   ✓ ${page.title.rendered} - ${config.wpUrl}/${page.slug}`);
  });

  console.log('\n📋 Next Steps:\n');
  console.log('1. Go to WordPress Admin and verify pages were created');
  console.log('2. Check that ACF sections are populated (may need manual entry if ACF REST API is unavailable)');
  console.log('3. Upload images to Media Library (see IMAGE_MIGRATION_GUIDE.md)');
  console.log('4. Link images to appropriate ACF image fields');
  console.log('5. Set homepage: Settings > Reading > Static page > Home');
  console.log('6. Enable WordPress mode in Next.js (.env.local: NEXT_PUBLIC_USE_WORDPRESS=true)');
  console.log('7. Test frontend: npm run dev\n');

  console.log('================================================================================\n');
}

// Run the import
main().catch((error) => {
  console.error('\n❌ Fatal error during import:');
  console.error(error);
  process.exit(1);
});
