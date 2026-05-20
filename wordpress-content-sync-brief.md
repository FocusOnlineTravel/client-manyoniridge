# WordPress Content Sync - Developer Brief

**Date:** 2026-03-31
**Task:** Sync local TypeScript content to WordPress CMS

---

## Objective

Update WordPress pages to match the complete content structure defined in local TypeScript files. The local files (`src/lib/data/pages/`) contain more comprehensive content than what's currently in WordPress.

---

## Reference URLs

- **Production (using local data):** https://www.manyoniridge.co.za
- **Staging (using WordPress):** https://client-manyoniridge-fz5q3mdfp-focus-online.vercel.app
- **Local dev:** http://localhost:3000
- **WordPress Admin:** https://backend-manyoni.focusonlinetravel.co.za/wp-admin

---

## How to Use This Brief

For each page section below:
1. View the **Local Source** file reference
2. Compare with **WordPress** current state
3. Follow the **Action Items** to add/update WordPress content
4. Verify changes by viewing the staging URL

---

## Critical Fixes (Do First)

### 1. Fix Home Page Slug References

**Location:** WordPress → Pages → Home → Page Sections → Room Cards Section

**Issue:** References non-existent room slugs

**Current WordPress ACF Field:**
```
roomSlugs:
  - one-bedroom-suite  ❌ (doesn't exist)
  - two-bedroom-suite  ❌ (doesn't exist)
```

**Change to:**
```
roomSlugs:
  - one-bedroom-villa  ✅
  - two-bedroom-villa  ✅
```

---

### 2. Fix Home Page Activity Slug

**Location:** WordPress → Pages → Home → Page Sections → Activity Cards Section

**Current WordPress ACF Field:**
```
activitySlugs:
  - game-drives
  - rhino-conservation  ❌ (doesn't exist)
  - pangolin-experiences
```

**Change to:**
```
activitySlugs:
  - game-drives
  - rhino-orphanage  ✅
  - pangolin-experiences
```

---

### 3. Update Navigation Menu

**Location:** WordPress → Appearance → Menus → Main Menu

**Current:** "Accommodations" (plural)
**Change to:** "Accommodation" (singular)

---

## Page-by-Page Content Sync

---

## 1. MAIN LODGE PAGE

**Priority:** ⚠️ HIGH - Missing 4 major sections

**Local Source:** `src/lib/data/pages/main-lodge.ts`
**WordPress Page:** https://backend-manyoni.focusonlinetravel.co.za/wp-admin/post.php?post=[main-lodge-id]&action=edit

### Current State Comparison

| Section | Local | WordPress | Status |
|---------|-------|-----------|--------|
| Hero Image | ✅ | ✅ | Match |
| Text Block (intro) | ✅ | ✅ | Match |
| Split Content: Lounge | ✅ | ✅ | Match |
| Split Content: Bar | ✅ | ❌ | **MISSING** |
| Split Content: Dining Area | ✅ | ❌ | **MISSING** |
| Split Content: Starlight Terrace | ✅ | ❌ | **MISSING** |
| Split Content: Entertainment Area | ✅ | ❌ | **MISSING** |
| Features Grid | ✅ | ✅ | Match |
| CTA Section | ✅ | ✅ | Match |

### Action Items

#### Add Section 4: The Bar

**Location:** After "The Lounge" section
**Section Type:** Split Content
**Image Position:** Left

```
Subtitle: Craft Cocktails & Fine Wines
Title: The Bar
Description:
Our well-stocked bar features an impressive selection of South African wines, premium spirits, and craft beers. Our experienced bartenders are ready to mix your favorite cocktail or recommend a local wine to perfectly complement your sundowner experience. Enjoy your drink on the deck or by the fire or on the Starlight terrace.

Features:
- Premium South African wines
- Top-shelf spirits
- Craft beers
- Expert bartenders
- Signature safari cocktails
- Sundowner service

Image: /images/MANYONI RIDGE CLUBHOUSE RENDERS 8.jpg
Image Position: left
Background: cream
```

#### Add Section 5: Dining Area

**Location:** After "The Bar" section
**Section Type:** Split Content
**Image Position:** Right

```
Subtitle: Culinary Excellence
Title: Dining Area
Description:
Our elegant dining area offers intimate seating at separate tables, with the option of a long communal table for larger groups. Choose to dine on the Starlight Terrace, in the boma, on the deck, or inside the main lodge. The surrounding windows ensure you never miss a moment of the bush spectacle, even during meals.

Features:
- Intimate separate seating
- Long table option for groups
- Bush views while dining
- Seasonal menus
- Multiple dining venues
- Special dietary accommodations

Image: /images/MANYONI RIDGE CLUBHOUSE RENDERS 2.jpg
Image Position: right
Background: white
```

#### Add Section 6: Starlight Terrace

**Location:** After "Dining Area" section
**Section Type:** Split Content
**Image Position:** Left

```
Subtitle: Front Row to the Wilderness
Title: Starlight Terrace
Description:
Extending out into the landscape, our expansive Starlight Terrace offers uninterrupted views across the reserve. Furnished with comfortable seating and shaded areas, it's the perfect spot for game viewing, bird watching, or simply soaking in the African atmosphere. For evening dinners or colder sundowners, fireplaces provide warmth and ambiance. A waterhole located nearby attracts regular wildlife visitors.

Features:
- Expansive terrace area
- Comfortable seating
- Shaded and sun areas
- Fireplaces for warmth
- Waterhole views
- Binoculars provided
- Perfect for sundowners and dining

Image: /images/MANYONI RIDGE CLUBHOUSE RENDERS 3.jpg
Image Position: left
Background: cream
```

#### Add Section 7: Secluded Entertainment Area

**Location:** After "Starlight Terrace" section
**Section Type:** Split Content
**Image Position:** Right

```
Subtitle: Entertainment & Leisure
Title: Secluded Entertainment Area
Description:
For moments of indoor leisure, our secluded entertainment area provides entertainment for all ages. Challenge fellow guests to a game of pool, darts, or table tennis. Watch your favorite sports on the TV, making it a wonderful space for families and a great way to unwind between safari activities.

Features:
- Pool table
- Darts
- Table tennis
- TV for sports viewing
- Comfortable seating
- Perfect for families

Image: /images/MANYONI RIDGE CLUBHOUSE RENDERS 37.jpg
Image Position: right
Background: white
```

---

## 2. RESERVE PAGE

**Priority:** ⚠️ MEDIUM - Missing heading content

**Local Source:** `src/lib/data/pages/reserve.ts`
**WordPress Page:** Reserve page editor

### Action Items

#### Update Wildlife Grid Section

**Location:** Find the Wildlife Grid section (section 4)
**Current:** heading_title and heading_subtitle are empty
**Update to:**

```
Heading Title: Wildlife of Manyoni
Heading Subtitle: From the Big 5 to the rare pangolin, discover the incredible diversity of wildlife at Manyoni.
```

---

## 3. RATES PAGE

**Priority:** 🔴 CRITICAL - Almost entirely missing

**Local Source:** `src/lib/data/pages/rates.ts`
**WordPress Page:** Rates page editor

### Current State

WordPress has: 1 section (hero only)
Local has: ~5 sections

### Action Items

You need to review `src/lib/data/pages/rates.ts` and add all pricing information sections. This is a critical page for conversions.

**Sections to add (check local file for exact content):**
1. Hero Image ✅ (exists)
2. Text Block - Pricing introduction
3. Split Content - What's included
4. Features Grid - Package details
5. CTA Section - Booking prompt

---

## 4. ACTIVITIES PAGE

**Priority:** ⚠️ HIGH - Significantly less content

**Local Source:** `src/lib/data/pages/activities.ts`
**WordPress Page:** Activities page editor

### Current State

WordPress has: 4 sections
Local has: ~8 sections

### Action Items

Compare WordPress with local file and add missing content sections that describe different activity categories and conservation information.

---

## 5. ACCOMMODATIONS PAGE

**Priority:** ✅ LOW - Mostly aligned

**Local Source:** `src/lib/data/pages/accommodations.ts`

### Action Items

Quick verification needed - compare section count and content.

---

## Quick Reference: ACF Field Mapping

When adding sections in WordPress, use these ACF layouts:

| Local Type | WordPress ACF Layout | Key Fields |
|------------|---------------------|------------|
| `hero_image` | Hero Image Layout | title, subtitle, description, imageSrc, size |
| `text_block` | Text Block Layout | title, subtitle, description, background |
| `split_content` | Split Content Layout | title, subtitle, description, features[], imageSrc, imagePosition |
| `cta_section` | CTA Section Layout | title, description, ctaText, ctaHref, background |
| `features_grid` | Features Grid Layout | heading_title, heading_subtitle, features[], columns |
| `wildlife_grid` | Wildlife Grid Layout | heading_title, heading_subtitle, wildlife[] |
| `room_cards_section` | Room Cards Section Layout | roomSlugs[], variant, heading_title |
| `activity_cards_section` | Activity Cards Section Layout | activitySlugs[], variant, heading_title |

---

## Image References

All images referenced in the local files are located in the WordPress Media Library under `/images/`. When adding content:

1. Search for the image filename in Media Library
2. Select the image for the ACF image field
3. Ensure image is properly linked

Common image paths:
- Clubhouse renders: `MANYONI RIDGE CLUBHOUSE RENDERS [number].jpg`
- Wildlife: `Birds and Wildlife/[filename].jpeg`

---

## Verification Checklist

After making changes, verify each page:

- [ ] Main Lodge has 9 sections total
- [ ] Reserve wildlife grid has heading
- [ ] Home page room cards display correctly
- [ ] Home page activity cards display correctly
- [ ] Rates page has complete pricing content
- [ ] Activities page has full content
- [ ] Navigation shows "Accommodation" (singular)
- [ ] All images display correctly
- [ ] No console errors about missing slugs

---

## Testing Instructions

1. **Local testing:**
   ```bash
   cd /path/to/frontend
   npm run dev
   # Visit http://localhost:3000
   ```

2. **Check which data source is being used:**
   - Open browser console
   - Look for `[Data Source]` logs
   - Should see "Fetching from WordPress REST API"
   - If it says "Using local data (WordPress had no sections)" - content is missing in WP

3. **Compare pages:**
   - Open production (manyoniridge.co.za) in one tab
   - Open staging (vercel app) in another tab
   - Navigate to each page and compare visually

---

## Common Issues & Solutions

**Issue:** "WordPress had no sections" in console
**Solution:** Check that ACF sections are actually added to the page

**Issue:** Images not displaying
**Solution:** Verify image exists in Media Library and is properly selected in ACF

**Issue:** Slugs not matching
**Solution:** Check the actual page slug in WordPress matches what's referenced

**Issue:** Features list not showing
**Solution:** Ensure features are added as repeater field items with "text" field

---

## Support Files

- **Full audit:** `wordpress-content-audit.md`
- **Local data directory:** `src/lib/data/pages/`
- **WordPress client code:** `src/lib/wordpress/rest-client.ts`

---

## Questions?

If you need clarification on any section or encounter issues:
1. Check the local TypeScript file for exact content/structure
2. Review the full audit document for additional context
3. Test changes on staging before marking complete

---

**Estimated Time Breakdown:**
- Main Lodge (4 sections): 2 hours
- Rates page (4+ sections): 1.5 hours
- Activities page expansion: 1 hour
- Reserve heading fix: 15 min
- Home page slug fixes: 15 min
- Navigation menu update: 5 min
- Verification & testing: 30 min

**Total: ~5.5 hours**
