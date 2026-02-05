# WordPress Setup Checklist - Manyoni Ridge Migration

**WordPress URL:** https://backend-manyoni.focusonlinetravel.co.za
**Date Started:** _____________
**Completed By:** _____________

---

## PHASE 1: WORDPRESS INSTALLATION & CONFIGURATION

###  1.1 Core WordPress Setup

- [ ] WordPress installed and accessible at https://backend-manyoni.focusonlinetravel.co.za
- [ ] Admin account created
- [ ] Permalink structure set to "Post name" (Settings > Permalinks)
- [ ] Timezone configured to South Africa (Settings > General)
- [ ] Site Title: "Manyoni Ridge Safari Lodge"
- [ ] Tagline: "Intimate Luxury in the Wild"
- [ ] WordPress Address (URL) and Site Address (URL) verified

---

## PHASE 2: PLUGIN INSTALLATION

### 2.1 Required Plugins

- [ ] **Advanced Custom Fields PRO** (v6.x or higher)
  - License key activated
  - Version: __________

- [ ] **WPGraphQL** (Latest version)
  - Installed from WordPress.org
  - Activated
  - GraphQL endpoint accessible at `/graphql`

- [ ] **WPGraphQL for Advanced Custom Fields**
  - Installed (requires ACF Pro + WPGraphQL)
  - Activated

- [ ] **Classic Editor** (to disable Gutenberg)
  - Installed
  - Activated
  - Default editor set to Classic

- [ ] **Yoast SEO** (Optional but recommended)
  - Installed
  - Basic configuration complete
  - XML sitemaps enabled

### 2.2 Optional/Helpful Plugins

- [ ] **WP Migrate DB** (for backups/migrations)
- [ ] **Query Monitor** (debugging)
- [ ] **Regenerate Thumbnails** (for images)
- [ ] **Safe SVG** (if using SVG logos/icons)

---

## PHASE 3: ACF FIELD GROUPS SETUP

### 3.1 Import ACF Field Group

- [ ] Navigate to Custom Fields > Tools
- [ ] Click "Import Field Groups"
- [ ] Upload file: `scripts/acf-field-group-complete.json`
- [ ] Field group "Page Sections" imported successfully
- [ ] Verify all 21 section layouts are present:
  - [ ] hero_image
  - [ ] text_block
  - [ ] split_content
  - [ ] cta_section
  - [ ] newsletter_section
  - [ ] room_cards_section
  - [ ] activity_cards_section
  - [ ] stats_strip
  - [ ] features_grid
  - [ ] values_list
  - [ ] daily_schedule
  - [ ] gallery
  - [ ] offers_list
  - [ ] wildlife_grid
  - [ ] contact_info
  - [ ] getting_here
  - [ ] faq_accordion
  - [ ] dining_experiences
  - [ ] dietary_options
  - [ ] opening_info
  - [ ] content_section

### 3.2 Field Group Configuration

- [ ] Field group location set to "Post Type is equal to Page"
- [ ] All fields have GraphQL names configured (if using WPGraphQL)
- [ ] "Show in GraphQL" enabled for all field groups

---

## PHASE 4: CUSTOM POST TYPES (If Needed)

### 4.1 Rooms Post Type

**Decision:** Use ACF Repeater or Custom Post Type?

**Option A: Custom Post Type (Recommended for scalability)**
- [ ] Create custom post type "Rooms"
  - Post type key: `room`
  - Plural: "Rooms"
  - Singular: "Room"
  - Show in REST: Yes
  - Show in GraphQL: Yes (if using WPGraphQL)
  - Supports: title, editor, thumbnail

- [ ] Create ACF field group "Room Details"
  - Location: Post Type is equal to Room
  - Fields:
    - [ ] subtitle (Text)
    - [ ] short_description (Textarea)
    - [ ] capacity_adults (Number)
    - [ ] capacity_children (Number)
    - [ ] size (Text)
    - [ ] bedrooms (Number)
    - [ ] bathrooms (Number)
    - [ ] amenities (Repeater with Text field)
    - [ ] features (Repeater with Text field)
    - [ ] images (Gallery)
    - [ ] hero_image (Image)
    - [ ] placeholder_class (Text)

**Option B: Use Existing Room Cards Section Repeater**
- [ ] Skip custom post type
- [ ] Store room data directly in page sections

### 4.2 Activities Post Type

**Decision:** Use ACF Repeater or Custom Post Type?

**Option A: Custom Post Type (Recommended)**
- [ ] Create custom post type "Activities"
  - Post type key: `activity`
  - Show in REST: Yes
  - Show in GraphQL: Yes

- [ ] Create ACF field group "Activity Details"
  - Location: Post Type is equal to Activity
  - Fields similar to Rooms (see audit document)

**Option B: Use Existing Activity Cards Section Repeater**
- [ ] Skip custom post type
- [ ] Store activity data in page sections

---

## PHASE 5: GLOBAL SETTINGS (ACF Options Page)

### 5.1 Create Options Page

- [ ] Navigate to Custom Fields > Add New
- [ ] Create field group "Site Options"
- [ ] Location: Options Page is equal to "Site Settings"
- [ ] Create Options Page (ACF > Tools or code)

### 5.2 Global Fields

- [ ] site_name (Text) - "Manyoni Ridge Safari Lodge"
- [ ] tagline (Text) - "Intimate Luxury in the Wild"
- [ ] opening_date (Text) - "September 2026"
- [ ] contact_email (Email) - "info@manyoniridge.co.za"
- [ ] contact_phone (Text)
- [ ] address (Textarea)
- [ ] social_media (Repeater)
  - platform (Select: Facebook, Instagram, Twitter, etc.)
  - url (URL)
- [ ] Show in GraphQL enabled

---

## PHASE 6: IMAGE PREPARATION

### 6.1 Media Library Setup

- [ ] Navigate to Media > Add New
- [ ] Create folder structure (if using plugin like FileBird):
  - Birds and Wildlife
  - Accommodations
  - Lodge Renders
  - Activities
  - Gallery

### 6.2 Image Upload

**Total Images to Upload: 200+**

- [ ] Upload Birds & Wildlife images (~200 images)
  - From: `/public/images/Birds and Wildlife/`
  - Note image IDs or URLs for reference

- [ ] Upload Accommodation images (~20 images)
  - 1-bed 1.jpg through 1-bed 4.jpg
  - 2-bed 1.jpg through 2-bed 10.jpg

- [ ] Upload Lodge Renders (~35 images)
  - MANYONI RIDGE CLUBHOUSE RENDERS (numbered)

- [ ] Upload Video (if hosting on WordPress)
  - manynoi.mp4 (home hero background)
  - Or use external hosting (Vimeo/YouTube)

### 6.3 Image Optimization

- [ ] Install image optimization plugin (e.g., Smush, ShortPixel)
- [ ] Run optimization on all uploaded images
- [ ] Verify image sizes are appropriate
- [ ] Generate thumbnails (Regenerate Thumbnails plugin)

---

## PHASE 7: PAGE CREATION

### 7.1 Create All Pages

Create the following pages in WordPress:

- [ ] **Home**
  - Title: "Home"
  - Slug: `home`
  - Sections: 9

- [ ] **About Us**
  - Title: "About Us"
  - Slug: `about`
  - Sections: 6

- [ ] **Accommodations**
  - Title: "Accommodations"
  - Slug: `accommodations`
  - Sections: 5

- [ ] **Activities**
  - Title: "Safari Activities"
  - Slug: `activities`
  - Sections: 4

- [ ] **Dining**
  - Title: "Dining"
  - Slug: `dining`
  - Sections: 6

- [ ] **Reserve**
  - Title: "The Reserve"
  - Slug: `reserve`
  - Sections: 6

- [ ] **Gallery**
  - Title: "Gallery"
  - Slug: `gallery`
  - Sections: 4

- [ ] **Contact**
  - Title: "Contact Us"
  - Slug: `contact`
  - Sections: 3

- [ ] **FAQ**
  - Title: "Frequently Asked Questions"
  - Slug: `faq`
  - Sections: 4

- [ ] **Offers**
  - Title: "Special Offers"
  - Slug: `offers`
  - Sections: 5

- [ ] **Main Lodge**
  - Title: "Main Lodge"
  - Slug: `main-lodge`
  - Sections: TBD

### 7.2 Set Homepage

- [ ] Settings > Reading
- [ ] "Your homepage displays" = "A static page"
- [ ] Homepage: Select "Home"
- [ ] Save Changes

---

## PHASE 8: CONTENT POPULATION

Use the exported JSON files from `scripts/wordpress-export/` as reference.

### 8.1 Home Page

Reference: `scripts/wordpress-export/page-home.json`

**Sections to Add (9 total):**

1. [ ] **Hero Image**
   - subtitle: "Opening September 2026"
   - title: "Intimate Luxury in the Wild"
   - description: "Experience the magic..."
   - ctaText: "Enquire Now"
   - ctaHref: "/contact"
   - secondaryCtaText: "Explore"
   - secondaryCtaHref: "/accommodations"
   - videoSrc: Upload or external URL
   - verticalAlign: "bottom"
   - textBackground: Yes

2. [ ] **Text Block**
   - title: "Welcome to Manyoni Ridge"
   - subtitle: "Your Safari Awaits"
   - description: "Nestled in the heart..."
   - ctaText: "Discover Our Story"
   - ctaHref: "/about"
   - background: "cream"

3. [ ] **Split Content**
   - subtitle: "The Experience"
   - title: "Where Luxury Meets Wilderness"
   - description: "Every detail..."
   - features: (5 items)
     - "Big 5 private game reserve"
     - "Only 9 intimate suites"
     - "All-inclusive luxury experience"
     - "Expert guides and trackers"
     - "Conservation-focused activities"
   - ctaText: "View Accommodations"
   - ctaHref: "/accommodations"
   - imageSrc: Select from Media Library
   - imagePosition: "left"

4. [ ] **Room Cards Section**
   - roomSlugs: (Add 2 items)
     - "one-bedroom-suite"
     - "two-bedroom-suite"
   - variant: "featured"
   - heading_title: "Our Suites"
   - heading_subtitle: "Choose from our luxurious..."
   - background: "off-white"
   - layout: "grid"

5. [ ] **Stats Strip**
   - stats: (Add 4 items)
     - value: "23,000", label: "Hectares of Wilderness"
     - value: "Big 5", label: "Game Reserve"
     - value: "9", label: "Exclusive Suites"
     - value: "400+", label: "Bird Species"
   - background: "primary-dark"

6. [ ] **Activity Cards Section**
   - activitySlugs: (Add 3 items)
     - "game-drives"
     - "rhino-conservation"
     - "pangolin-experiences"
   - heading_title: "Safari Activities"
   - heading_subtitle: "From thrilling game drives..."
   - background: "white"
   - showViewAllLink: Yes

7. [ ] **Split Content** (Conservation)
   - subtitle: "Conservation"
   - title: "Protecting Africa's Heritage"
   - description: "At Manyoni Ridge..."
   - ctaText: "Learn About Conservation"
   - ctaHref: "/reserve"
   - imageSrc: Select from Media Library
   - imagePosition: "right"
   - background: "cream"

8. [ ] **Newsletter Section**
   - title: "Be the First to Know"
   - description: "Manyoni Ridge opens in September 2026..."
   - background: "cream"

9. [ ] **CTA Section**
   - title: "Begin Your Safari Journey"
   - description: "Contact us to start planning..."
   - ctaText: "Make an Enquiry"
   - ctaHref: "/contact"
   - secondaryCtaText: "View FAQ"
   - secondaryCtaHref: "/faq"
   - background: "image"
   - imageSrc: Select from Media Library

- [ ] Home page published
- [ ] Preview checked
- [ ] All links working

### 8.2 About Page

Reference: `scripts/wordpress-export/page-about.json`

**Sections to Add (6 total):**

1. [ ] Hero Image
2. [ ] Text Block
3. [ ] Split Content
4. [ ] Values List (4 values)
5. [ ] Split Content
6. [ ] Opening Info
7. [ ] CTA Section

- [ ] About page published
- [ ] Preview checked

### 8.3 Accommodations Page

Reference: `scripts/wordpress-export/page-accommodations.json`

**Sections to Add (5 total):**

1. [ ] Hero Image
2. [ ] Content Section
3. [ ] Room Cards Section
4. [ ] Features Grid (6 features, 3 columns)
5. [ ] CTA Section

- [ ] Accommodations page published
- [ ] Preview checked

### 8.4 Activities Page

Reference: `scripts/wordpress-export/page-activities.json`

**Sections to Add (4 total):**

1. [ ] Hero Image
2. [ ] Content Section
3. [ ] Activity Cards Section (all 6 activities)
4. [ ] Daily Schedule (8 schedule items)
5. [ ] CTA Section

- [ ] Activities page published
- [ ] Preview checked

### 8.5 Dining Page

Reference: `scripts/wordpress-export/page-dining.json`

**Sections to Add (6 total):**

1. [ ] Hero Image
2. [ ] Content Section
3. [ ] Split Content
4. [ ] Dining Experiences (5 experiences)
5. [ ] Split Content
6. [ ] Dietary Options (8 options)
7. [ ] CTA Section

- [ ] Dining page published
- [ ] Preview checked

### 8.6 Reserve Page

Reference: `scripts/wordpress-export/page-reserve.json`

**Sections to Add (6 total):**

1. [ ] Hero Image
2. [ ] Text Block
3. [ ] Split Content
4. [ ] Wildlife Grid (8 wildlife species)
5. [ ] Split Content
6. [ ] Features Grid (6 features, 3 columns)
7. [ ] CTA Section

- [ ] Reserve page published
- [ ] Preview checked

### 8.7 Gallery Page

Reference: `scripts/wordpress-export/page-gallery.json`

**Sections to Add (4 total):**

1. [ ] Hero Image
2. [ ] Gallery Section
   - 6 categories (all, wildlife, lodge, suites, activities, landscape)
   - 20 gallery items minimum
3. [ ] Content Section
4. [ ] CTA Section

- [ ] Gallery page published
- [ ] Preview checked

### 8.8 Contact Page

Reference: `scripts/wordpress-export/page-contact.json`

**Sections to Add (3 total):**

1. [ ] Hero Image
2. [ ] Contact Info (no fields except background)
3. [ ] Getting Here (3 direction items)

- [ ] Contact page published
- [ ] Preview checked

### 8.9 FAQ Page

Reference: `scripts/wordpress-export/page-faq.json`

**Sections to Add (4 total):**

1. [ ] Hero Image
2. [ ] FAQ Accordion
   - 6 categories
   - 18 total Q&A pairs
3. [ ] Content Section
4. [ ] CTA Section

- [ ] FAQ page published
- [ ] Preview checked

### 8.10 Offers Page

Reference: `scripts/wordpress-export/page-offers.json`

**Sections to Add (5 total):**

1. [ ] Hero Image
2. [ ] Content Section
3. [ ] Offers List (4 offers)
4. [ ] Content Section (Terms)
5. [ ] CTA Section

- [ ] Offers page published
- [ ] Preview checked

### 8.11 Main Lodge Page

Reference: `scripts/wordpress-export/page-main-lodge.json`

- [ ] Create and populate sections
- [ ] Main Lodge page published
- [ ] Preview checked

---

## PHASE 9: COLLECTIONS/POST TYPES DATA

### 9.1 Rooms (if using custom post type)

**Create 2 Room Posts:**

1. [ ] **One Bedroom Suite**
   - slug: `one-bedroom-suite`
   - All fields populated
   - Featured image set
   - Gallery images added (4 images)
   - Published

2. [ ] **Two Bedroom Suite**
   - slug: `two-bedroom-suite`
   - All fields populated
   - Featured image set
   - Gallery images added (8 images)
   - Published

### 9.2 Activities (if using custom post type)

**Create 6 Activity Posts:**

1. [ ] Game Drives
2. [ ] Rhino Conservation
3. [ ] Pangolin Experiences
4. [ ] K9 Unit Training
5. [ ] Spa Services
6. [ ] Family Experiences

Each with:
- [ ] All fields populated
- [ ] Images added (4 per activity)
- [ ] Published

---

## PHASE 10: WPGRAPHQL CONFIGURATION

### 10.1 Enable GraphQL

- [ ] WPGraphQL plugin activated
- [ ] GraphQL IDE accessible at `/wp-admin/admin.php?page=graphiql-ide`

### 10.2 Configure ACF for GraphQL

- [ ] Navigate to Custom Fields > Field Groups
- [ ] For "Page Sections" field group:
  - [ ] Click Edit
  - [ ] Scroll to "GraphQL" settings
  - [ ] Check "Show in GraphQL"
  - [ ] Set GraphQL Field Name: `pageSections`
  - [ ] Save

- [ ] For each section layout, verify GraphQL field names:
  - hero_image → heroImage
  - text_block → textBlock
  - split_content → splitContent
  - etc.

### 10.3 Test GraphQL Queries

- [ ] Test query to fetch home page
- [ ] Test query to fetch all pages
- [ ] Verify sections data structure matches frontend expectations
- [ ] Test queries for rooms (if custom post type)
- [ ] Test queries for activities (if custom post type)

---

## PHASE 11: MENUS & NAVIGATION

### 11.1 Create Menus

- [ ] Navigate to Appearance > Menus
- [ ] Create menu: "Main Navigation"
  - [ ] Accommodation
  - [ ] Experiences
  - [ ] Reserve

- [ ] Create menu: "Mobile Navigation"
  - All pages and subpages

- [ ] Assign menus to locations

### 11.2 Footer Configuration

- [ ] Create footer menus or add to Options Page
- [ ] Configure footer content in ACF Options

---

## PHASE 12: NEXT.JS FRONTEND CONFIGURATION

### 12.1 Update Environment Variables

In `.env.local`:

- [ ] `NEXT_PUBLIC_USE_WORDPRESS=true`
- [ ] `NEXT_PUBLIC_WP_API_URL=https://backend-manyoni.focusonlinetravel.co.za/wp-json`
- [ ] (Or GraphQL endpoint if using WPGraphQL)

### 12.2 Test Frontend

- [ ] Restart Next.js dev server
- [ ] Visit http://localhost:3000
- [ ] Verify home page loads from WordPress
- [ ] Check all navigation links
- [ ] Test all pages load correctly
- [ ] Verify images display
- [ ] Check dynamic routes (rooms, activities)

---

## PHASE 13: QUALITY ASSURANCE

### 13.1 Content Verification

- [ ] All pages created and published
- [ ] All sections populated with correct content
- [ ] No lorem ipsum or placeholder text
- [ ] All images uploaded and displaying
- [ ] All internal links working
- [ ] External links (if any) working

### 13.2 SEO Verification

- [ ] Page titles set correctly
- [ ] Meta descriptions added (Yoast SEO)
- [ ] Open Graph images set
- [ ] XML sitemap generated
- [ ] Robots.txt configured

### 13.3 Performance

- [ ] Images optimized
- [ ] Page load times acceptable
- [ ] GraphQL queries efficient
- [ ] Caching configured (if needed)

---

## PHASE 14: BACKUPS & SECURITY

### 14.1 Backups

- [ ] Database backup created
- [ ] Media files backup created
- [ ] Backup schedule configured (plugin or server-level)

### 14.2 Security

- [ ] Strong admin password set
- [ ] WordPress updated to latest version
- [ ] Plugins updated to latest versions
- [ ] Security plugin installed (e.g., Wordfence)
- [ ] SSL certificate installed (HTTPS)
- [ ] File permissions checked

---

## PHASE 15: GO LIVE

### 15.1 Pre-Launch

- [ ] All content verified
- [ ] All functionality tested
- [ ] Performance optimized
- [ ] SEO configured
- [ ] Backup created

### 15.2 Launch

- [ ] WordPress backend live at https://backend-manyoni.focusonlinetravel.co.za
- [ ] Next.js frontend configured to use WordPress
- [ ] DNS/hosting configured
- [ ] Monitoring in place

### 15.3 Post-Launch

- [ ] Monitor for errors
- [ ] Check analytics
- [ ] Verify search engine indexing
- [ ] Client training scheduled

---

## COMPLETION

**Migration Status:**

- Start Date: ______________
- Completion Date: ______________
- Total Pages: 11
- Total Sections: ~55
- Total Images: 200+
- Migrated By: ______________

**Sign-Off:**

- [ ] Client approval received
- [ ] Documentation provided
- [ ] Training completed
- [ ] Support plan in place

---

**Notes:**

Use this space to track issues, decisions, or important notes during migration:

________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
________________________________________________________________________________
