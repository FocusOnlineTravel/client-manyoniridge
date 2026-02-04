# Automated WordPress Import Guide

This guide will help you automatically import all content from your Next.js frontend into WordPress using the REST API scripts.

---

## Prerequisites

### 1. WordPress Setup
- [ ] WordPress installed at https://backend-manyoni.focusonlinetravel.co.za
- [ ] ACF Pro plugin installed and activated
- [ ] ACF field groups imported (`scripts/acf-field-group-complete.json`)

### 2. Authentication Setup

You need to create an **Application Password** in WordPress:

#### Steps to Create Application Password:

1. Log in to WordPress Admin: https://backend-manyoni.focusonlinetravel.co.za/wp-admin
2. Go to **Users > Profile** (or click your username in top right)
3. Scroll down to **Application Passwords** section
4. In the "New Application Password Name" field, enter: `Import Script`
5. Click **Add New Application Password**
6. **IMPORTANT:** Copy the generated password immediately (it looks like: `xxxx xxxx xxxx xxxx xxxx xxxx`)
7. Save this password securely - you won't see it again!

---

## Quick Start

### Option 1: Environment Variables (Recommended)

Create a `.env.import` file in your project root:

```bash
# .env.import
WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za
WORDPRESS_USER=admin
WORDPRESS_APP_PASSWORD=your-application-password-here
```

Then run:
```bash
source .env.import && node scripts/import-to-wordpress.mjs
```

### Option 2: Inline Environment Variables

```bash
WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za \
WORDPRESS_USER=admin \
WORDPRESS_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx \
node scripts/import-to-wordpress.mjs
```

---

## Step-by-Step Import Process

### Step 1: Verify WordPress Connection

First, test that the script can connect to WordPress:

```bash
node scripts/test-wordpress-connection.js
```

Expected output:
```
✓ WordPress API is accessible
✓ Successfully fetched 0 pages
```

### Step 2: Install Dependencies

The import script requires `node-fetch`:

```bash
npm install node-fetch
```

### Step 3: Run the Import

```bash
WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za \
WORDPRESS_USER=admin \
WORDPRESS_APP_PASSWORD=your-password-here \
node scripts/import-to-wordpress.mjs
```

### Step 4: Monitor Progress

The script will:
1. ✅ Test WordPress connection
2. ✅ Verify authentication
3. ✅ Create/update all 11 pages
4. ✅ Populate page metadata
5. ⚠️ Attempt to populate ACF sections (may require manual entry)

### Step 5: Manual ACF Section Entry

**Important:** The WordPress REST API has limited ACF support. You may need to manually add sections for each page:

1. Go to WordPress Admin > Pages
2. Edit each page
3. Scroll to "Page Sections" field group
4. Click "Add Section" for each section
5. Copy field values from the corresponding JSON file in `scripts/wordpress-export/`

**Reference:** Use `scripts/wordpress-export/page-{slug}.json` files

---

## What Gets Imported Automatically

### ✅ Fully Automated
- [x] Page creation (all 11 pages)
- [x] Page titles
- [x] Page slugs
- [x] Page descriptions (meta)
- [x] Publish status

### ⚠️ Partially Automated
- [ ] ACF sections (may need manual entry)
- [ ] Images (need to be uploaded separately, see IMAGE_MIGRATION_GUIDE.md)
- [ ] Image field references

### ❌ Manual Steps Required
- [ ] Upload images to Media Library
- [ ] Set featured images
- [ ] Set homepage (Settings > Reading)
- [ ] Configure menus

---

## Troubleshooting

### Error: "Authentication Failed"

**Cause:** Invalid username or Application Password

**Fix:**
1. Verify username is correct (usually `admin`)
2. Regenerate Application Password in WordPress
3. Ensure you're using the Application Password, not your regular password
4. Check for extra spaces in the password

### Error: "Cannot connect to WordPress"

**Cause:** WordPress URL is incorrect or server is down

**Fix:**
1. Verify URL: https://backend-manyoni.focusonlinetravel.co.za
2. Test in browser - should show WordPress site
3. Check that `/wp-json` is accessible
4. Verify server is running

### Error: "ACF update warning"

**Cause:** ACF REST API endpoint not available or permissions issue

**Fix:**
- This is expected if ACF REST API is not enabled
- Sections will need to be added manually via WordPress Admin
- Follow the Manual ACF Section Entry steps above

### Pages Created but No Sections

**Cause:** ACF REST API limitations

**Fix:**
1. Go to `scripts/wordpress-export/page-{slug}.json`
2. Open the corresponding page in WordPress Admin
3. For each section in the JSON `sections` array:
   - Click "Add Section"
   - Select the layout type (e.g., `hero_image`)
   - Copy field values from JSON `props` to ACF fields
   - Save

---

## Advanced Usage

### Import Specific Pages Only

Edit `scripts/import-to-wordpress.mjs` and comment out pages you don't want to import:

```javascript
const pages = [
  homePageData,       // Import
  // aboutPageData,   // Skip
  // contactPageData, // Skip
];
```

### Dry Run Mode

To see what would be imported without making changes:

1. Add `--dry-run` support to the script (see code comments)
2. Or simply review the output before confirming changes

### Re-run Import Safely

The script is idempotent - it checks if pages exist and updates them rather than creating duplicates. Safe to run multiple times.

---

## Complete Import Checklist

### Phase 1: Preparation
- [ ] WordPress installed with ACF Pro
- [ ] ACF field groups imported
- [ ] Application Password created
- [ ] Dependencies installed (`npm install node-fetch`)

### Phase 2: Run Import
- [ ] Connection test passed
- [ ] Authentication successful
- [ ] Import script executed
- [ ] All 11 pages created/updated
- [ ] No fatal errors

### Phase 3: Manual Completion
- [ ] ACF sections added to each page (if not automated)
- [ ] Images uploaded to Media Library (IMAGE_MIGRATION_GUIDE.md)
- [ ] Images linked in ACF fields
- [ ] Homepage set (Settings > Reading)
- [ ] Menus configured
- [ ] Preview all pages in WordPress

### Phase 4: Frontend Integration
- [ ] Update `.env.local`: `NEXT_PUBLIC_USE_WORDPRESS=true`
- [ ] Restart Next.js: `npm run dev`
- [ ] Test homepage: http://localhost:3000
- [ ] Verify all pages loading
- [ ] Check images displaying

---

## Alternative: Manual Import via JSON

If the automated script doesn't work for your setup:

1. Use the JSON files in `scripts/wordpress-export/`
2. For each page:
   - Create page in WordPress manually
   - Set title and slug from JSON `meta`
   - For each item in `sections` array:
     - Add section with matching `type`
     - Copy all fields from `props` object
3. This is slower but gives you full control

---

## Time Estimates

| Task | Automated | Manual | Time Saved |
|------|-----------|--------|------------|
| Create pages | 2 min | 30 min | 28 min |
| Page metadata | Included | 15 min | 15 min |
| ACF sections | Manual | Manual | 0 min |
| **Total per page** | ~30 min | ~45 min | ~15 min |
| **All 11 pages** | ~5.5 hours | ~8 hours | ~2.5 hours |

*Note: ACF section entry is similar time either way due to API limitations*

---

## Success Indicators

### ✅ Import Successful When:
- Script completes without fatal errors
- All 11 pages visible in WordPress Admin > Pages
- Each page has correct title and slug
- Page URLs work in browser (even if content is minimal)

### Next Steps After Success:
1. Add ACF sections (if needed manually)
2. Upload and link images
3. Enable WordPress in Next.js frontend
4. Test complete site

---

## Support

### Common Issues

**Issue:** "Page created but looks empty in WordPress"
**Solution:** ACF sections need to be added manually. This is normal.

**Issue:** "Images not showing"
**Solution:** Images need to be uploaded separately. See IMAGE_MIGRATION_GUIDE.md

**Issue:** "Script runs but nothing happens"
**Solution:** Check authentication. Verify Application Password is correct.

### Getting Help

1. Check error messages in script output
2. Review `WORDPRESS_SETUP_CHECKLIST.md`
3. Verify prerequisites are met
4. Test WordPress directly via browser

---

## Example: Complete Import Session

```bash
# 1. Install dependencies
npm install node-fetch

# 2. Test connection
node scripts/test-wordpress-connection.js

# 3. Run import with your credentials
WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za \
WORDPRESS_USER=admin \
WORDPRESS_APP_PASSWORD=abcd-efgh-ijkl-mnop-qrst-uvwx \
node scripts/import-to-wordpress.mjs

# Expected output:
# ================================================================================
# WordPress Content Import - Manyoni Ridge Safari Lodge
# ================================================================================
#
# WordPress URL: https://backend-manyoni.focusonlinetravel.co.za
# User: admin
#
# 🔌 Testing WordPress connection...
# ✅ WordPress is accessible
#
# 🔐 Testing authentication...
# ✅ Authentication successful
#
# 📦 Importing pages...
# ================================================================================
#
# 📄 Processing page: Home (home)
#    ➕ Creating new page...
#    ✅ Created (ID: 123)
#    📝 Adding 9 sections...
#    ⚠️  ACF API not available. Sections need to be added manually.
#    ✅ Sections marked for manual entry
#
# ... (repeats for all pages)
#
# ================================================================================
#
# ✅ Import Complete!
#
# Pages created/updated: 11
# ...
```

---

## Next: After Import is Complete

Once the import is done:

1. **Add ACF Sections** - Follow WORDPRESS_SETUP_CHECKLIST.md Section 8
2. **Upload Images** - Follow IMAGE_MIGRATION_GUIDE.md
3. **Test WordPress** - Preview pages in WordPress Admin
4. **Connect Frontend** - Enable WordPress mode in Next.js
5. **QA** - Test all pages and functionality

---

**Ready to Import?**

```bash
# Set your credentials and run!
WORDPRESS_URL=https://backend-manyoni.focusonlinetravel.co.za \
WORDPRESS_USER=admin \
WORDPRESS_APP_PASSWORD=your-password-here \
node scripts/import-to-wordpress.mjs
```

Good luck! 🚀
