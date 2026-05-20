# WordPress vs Local Content Audit

**Generated:** 2026-03-31
**Purpose:** Document content differences between WordPress CMS and local TypeScript data files

---

## Overview

The site currently uses WordPress as the primary content source with local TypeScript files as fallback. This document outlines discrepancies found between the two sources.

---

## Critical Issues

### 1. **Slug Mismatches**

#### Home Page Room References
- **WordPress Home Page ACF Field:** References `one-bedroom-suite`, `two-bedroom-suite`
- **WordPress Actual Pages:** `one-bedroom-villa`, `two-bedroom-villa`
- **Local Data:** Uses `one-bedroom-suite`, `two-bedroom-suite`
- **Impact:** Room cards on home page won't display when using WordPress
- **Fix:** Update WordPress home page room_cards_section to reference `-villa` slugs

#### Home Page Activity References
- **WordPress Home Page ACF Field:** References `rhino-conservation`
- **WordPress Actual Page:** `rhino-orphanage`
- **Impact:** Activity card won't display on home page
- **Fix:** Update WordPress home page activity_cards_section slug to `rhino-orphanage`

---

## Section Count Differences

| Page | WordPress Sections | Local Sections | Status |
|------|-------------------|----------------|---------|
| home | 9 | 9 | ✅ Match |
| about | 6 | 6 | ✅ Match |
| accommodations | 5 | ~5 | ⚠️ Check |
| activities | 4 | ~8 | ❌ Major difference |
| reserve | 6 | ~6 | ⚠️ Check headings |
| **main-lodge** | **5** | **8** | ❌ **Major difference** |
| dining | 6 | ~6 | ⚠️ Check |
| rates | 1 | ~5 | ❌ Major difference |
| contact | 3 | ~4 | ⚠️ Minor difference |
| faq | 3 | ~3 | ✅ Likely match |
| gallery | 4 | ~4 | ✅ Likely match |

---

## Detailed Page Comparisons

### Main Lodge Page

**WordPress (5 sections):**
1. `hero_image` - "The Heart of Manyoni Ridge"
2. `text_block` - "A Sanctuary of Shared Experiences"
3. `split_content` - "The Lounge"
4. `features_grid` - (empty heading)
5. `cta_section` - "Experience the Main Lodge"

**Local TypeScript (8+ sections):**
1. `hero_image` - "The Heart of Manyoni Ridge" ✅
2. `text_block` - "A Sanctuary of Shared Experiences" ✅
3. `split_content` - "The Lounge" ✅
4. `split_content` - "The Bar" ❌ **Missing in WordPress**
5. `split_content` - "Dining Area" ❌ **Missing in WordPress**
6. `split_content` - "Starlight Terrace" ❌ **Missing in WordPress**
7. `split_content` - "Secluded Entertainment Area" ❌ **Missing in WordPress**
8. `features_grid` - "Main Lodge Amenities" ⚠️ (exists but different)
9. `cta_section` - Final CTA ✅

**Impact:** WordPress is missing 3-4 critical content sections describing major lodge facilities.

---

### Activities Page

**WordPress (4 sections):**
1. `hero_image`
2. `content_section`
3. `activity_cards_section`
4. `daily_schedule`

**Local TypeScript (likely 7-8 sections):**
- Contains multiple split_content sections describing different activity types
- More detailed content about conservation activities
- Additional context sections

**Impact:** Significantly less content on WordPress version.

---

### Rates Page

**WordPress (1 section):**
1. `hero_image` only

**Local TypeScript (estimated 4-5 sections):**
- Hero
- Pricing information sections
- What's included section
- CTA section

**Impact:** Critical pricing/rates information missing from WordPress.

---

## Missing Content Fields

### Reserve Page - Wildlife Grid
- **Issue:** `heading_title` and `heading_subtitle` are empty in WordPress
- **Local has:** "Wildlife of Manyoni" with descriptive subtitle
- **Impact:** Section displays without heading context
- **Fix:** Populate heading fields in WordPress

---

## Menu Configuration

### Navigation Menu
- **WordPress Menu:** Shows "Accommodations" (plural)
- **Local Fallback:** Shows "Accommodation" (singular)
- **Fix:** Update menu label in WordPress admin → Appearance → Menus

### Mobile Menu
- **Status:** Not configured in WordPress
- **Current Behavior:** Falls back to local MOBILE_NAV_LINKS constant
- **Warning:** Console shows "No menu found with name: Mobile Menu"
- **Fix:** Create "Mobile Menu" in WordPress admin

---

## Recommendations

### Immediate Actions (Critical)
1. ✅ Fix room slug references on home page (`-suite` → `-villa`)
2. ✅ Fix activity slug reference on home page (`rhino-conservation` → `rhino-orphanage`)
3. ❌ Add missing Main Lodge sections to WordPress (Bar, Dining, Starlight Terrace, Entertainment)
4. ❌ Complete Rates page content in WordPress
5. ❌ Expand Activities page content in WordPress

### Short-term Actions (Important)
6. ⚠️ Add Wildlife Grid heading to Reserve page
7. ⚠️ Update navigation menu label to "Accommodation"
8. ⚠️ Create Mobile Menu in WordPress
9. ⚠️ Review and align all page content sections

### Content Strategy Decision Needed
**Question:** Which is the source of truth?
- **Option A:** WordPress is source of truth → Update local files to match WordPress (less content)
- **Option B:** Local files are source of truth → Import missing content to WordPress (more work, more complete)

**Recommendation:** Option B - Local TypeScript files appear to have more complete, detailed content that better serves the user. WordPress content should be expanded to match.

---

## Technical Notes

### Content Rendering Issues Fixed
- ✅ OpeningInfoSection now properly renders HTML from WordPress using `dangerouslySetInnerHTML`
- ✅ Text labels updated to use "Accommodation" (singular)

### Environment Configuration
- ✅ WordPress integration enabled via `.env.local`
- ✅ Correct API URL format: `/wp-json/wp/v2` (was missing `/wp/v2`)
- ✅ Fallback system working correctly when WordPress content is incomplete

---

## Next Steps

1. **Audit remaining pages** - Check accommodations, activities, dining, rates in detail
2. **Create WordPress import checklist** - List all missing sections to add
3. **Decision on content source of truth** - Determine direction for content alignment
4. **Systematic WordPress content update** - Add missing sections based on local data
5. **Final verification** - Compare rendered output between local and WordPress modes

---

## Files for Reference

- **Local data location:** `src/lib/data/pages/`
- **WordPress switch:** `src/lib/wordpress/switch.ts`
- **WordPress client:** `src/lib/wordpress/rest-client.ts`
- **Environment config:** `.env.local` (for local dev), `.env` (for production)
