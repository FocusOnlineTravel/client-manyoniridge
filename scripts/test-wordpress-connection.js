/**
 * Test WordPress API Connection
 *
 * Run this script to verify your WordPress API is accessible
 * and returning data correctly.
 *
 * Usage: node scripts/test-wordpress-connection.js
 */

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:8000/wp-json';
const WP_API_NAMESPACE = process.env.NEXT_PUBLIC_WP_API_NAMESPACE || 'wp/v2';

async function testConnection() {
  console.log('================================================================================');
  console.log('WordPress API Connection Test');
  console.log('================================================================================\n');

  console.log(`Testing connection to: ${WP_API_URL}\n`);

  // Test 1: Root endpoint
  console.log('Test 1: Checking WordPress API root endpoint...');
  try {
    const response = await fetch(WP_API_URL);
    if (response.ok) {
      console.log('✓ WordPress API is accessible\n');
    } else {
      console.log(`✗ WordPress API returned status: ${response.status}\n`);
      return;
    }
  } catch (error) {
    console.log('✗ Failed to connect to WordPress API');
    console.log(`  Error: ${error.message}\n`);
    return;
  }

  // Test 2: Fetch pages
  console.log('Test 2: Fetching pages from WordPress...');
  try {
    const response = await fetch(`${WP_API_URL}/${WP_API_NAMESPACE}/pages?per_page=10`);
    if (!response.ok) {
      console.log(`✗ Failed to fetch pages. Status: ${response.status}\n`);
      return;
    }

    const pages = await response.json();
    console.log(`✓ Successfully fetched ${pages.length} pages\n`);

    if (pages.length > 0) {
      console.log('Available pages:');
      pages.forEach((page, index) => {
        console.log(`  ${index + 1}. ${page.title.rendered} (slug: ${page.slug})`);
        if (page.acf && page.acf.sections) {
          console.log(`     - Has ${page.acf.sections.length} sections`);
        } else {
          console.log(`     - No ACF sections found (have you added sections in WordPress?)`);
        }
      });
      console.log('');
    } else {
      console.log('No pages found in WordPress. Create a page with sections to test.\n');
    }
  } catch (error) {
    console.log('✗ Failed to fetch pages');
    console.log(`  Error: ${error.message}\n`);
    return;
  }

  // Test 3: Check specific page
  console.log('Test 3: Fetching a specific page (e.g., "home")...');
  try {
    const response = await fetch(`${WP_API_URL}/${WP_API_NAMESPACE}/pages?slug=home`);
    if (!response.ok) {
      console.log(`✗ Failed to fetch home page. Status: ${response.status}\n`);
      return;
    }

    const pages = await response.json();
    if (pages.length > 0) {
      const page = pages[0];
      console.log(`✓ Found page: ${page.title.rendered}`);
      console.log(`  Slug: ${page.slug}`);

      if (page.acf) {
        console.log(`  ACF Data: Present`);
        if (page.acf.sections) {
          console.log(`  Sections: ${page.acf.sections.length}`);
          page.acf.sections.forEach((section, index) => {
            console.log(`    ${index + 1}. ${section.acf_fc_layout}`);
          });
        } else {
          console.log(`  Sections: None (add sections in WordPress)`);
        }
      } else {
        console.log(`  ACF Data: Not found (ensure ACF Pro is installed and fields are added)`);
      }
      console.log('');
    } else {
      console.log('✗ No page found with slug "home"\n');
      console.log('  Create a page with slug "home" in WordPress to test\n');
    }
  } catch (error) {
    console.log('✗ Failed to fetch home page');
    console.log(`  Error: ${error.message}\n`);
  }

  console.log('================================================================================');
  console.log('Test Complete');
  console.log('================================================================================\n');
  console.log('Next steps:');
  console.log('1. If tests passed, create a .env file with:');
  console.log('   NEXT_PUBLIC_USE_WORDPRESS=true');
  console.log(`   NEXT_PUBLIC_WP_API_URL=${WP_API_URL}`);
  console.log('');
  console.log('2. Create a test page in WordPress with some sections');
  console.log('3. Restart your Next.js dev server');
  console.log('4. Navigate to the page in your browser\n');
}

testConnection().catch(console.error);
