# WordPress Migration Audit - Manyoni Ridge Safari Lodge

**Date:** February 2, 2026
**Frontend URL:** http://localhost:3000
**WordPress Backend:** https://backend-manyoni.focusonlinetravel.co.za
**GitHub Repo:** https://github.com/FocusOnlineTravel/client-manyoniridge.git

---

## PHASE 1: FRONTEND AUDIT

### 1.1 PAGES INVENTORY

| Page Name | Slug | URL | Sections Count |
|-----------|------|-----|----------------|
| Home | home | `/` | 9 sections |
| About Us | about | `/about` | 6 sections |
| Accommodations | accommodations | `/accommodations` | 5 sections |
| Activities | activities | `/activities` | 4 sections |
| Dining | dining | `/dining` | 6 sections |
| Reserve | reserve | `/reserve` | 6 sections |
| Gallery | gallery | `/gallery` | 4 sections |
| Contact | contact | `/contact` | 3 sections |
| FAQ | faq | `/faq` | 4 sections |
| Offers | offers | `/offers` | 5 sections |
| Main Lodge | main-lodge | `/main-lodge` | TBD |

**Total Pages:** 11 main pages
**Dynamic Pages:** 2 (accommodations/[slug], activities/[slug])

---

## 1.2 SECTION TYPES USED

### Complete Section Type Inventory

The frontend uses **21 different section types**. Below is the comprehensive mapping:

| Section Type | Used On Pages | Frequency | Complexity |
|--------------|---------------|-----------|------------|
| `hero_image` | All pages | 11× | Medium |
| `text_block` | Home, About, Reserve | 3× | Low |
| `content_section` | Accommodations, Activities, FAQ, Offers, Gallery | 6× | Low |
| `split_content` | Home (2×), About (2×), Dining (2×), Reserve (3×) | 9× | Medium |
| `room_cards_section` | Home, Accommodations | 2× | High |
| `activity_cards_section` | Home, Activities | 2× | High |
| `stats_strip` | Home | 1× | Low |
| `features_grid` | Accommodations, Reserve | 2× | Medium |
| `values_list` | About | 1× | Medium |
| `daily_schedule` | Activities | 1× | Medium |
| `gallery` | Gallery | 1× | High |
| `newsletter_section` | Home | 1× | Medium |
| `cta_section` | All pages | 11× | Low |
| `offers_list` | Offers | 1× | High |
| `wildlife_grid` | Reserve | 1× | Medium |
| `contact_info` | Contact | 1× | High |
| `getting_here` | Contact | 1× | Low |
| `faq_accordion` | FAQ | 1× | High |
| `dining_experiences` | Dining | 1× | Medium |
| `dietary_options` | Dining | 1× | Low |
| `opening_info` | About | 1× | Medium |

---

## 1.3 DETAILED SECTION FIELD MAPPING

### Section 1: hero_image

**Purpose:** Full-width hero banner with title, description, and CTAs

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| subtitle | String | No | Text | "Opening September 2026" |
| title | String | Yes | Text | Main heading |
| description | String | No | Textarea | Paragraph description |
| ctaText | String | No | Text | Primary button text |
| ctaHref | String | No | URL | Primary button link |
| secondaryCtaText | String | No | Text | Secondary button text |
| secondaryCtaHref | String | No | URL | Secondary button link |
| scrollToId | String | No | Text | Anchor link ID |
| imageSrc | String | No | Image | Background image URL |
| videoSrc | String | No | Text | Background video URL |
| size | Select | No | Select | "medium" or "large" |
| verticalAlign | Select | No | Select | "center" or "bottom" |
| textBackground | Boolean | No | True/False | Gold background on text |
| showScrollIndicator | Boolean | No | True/False | Down arrow indicator |

**Example Data (Home Page):**
```typescript
{
  subtitle: "Opening September 2026",
  title: "Intimate Luxury in the Wild",
  description: "Experience the magic of the African bush...",
  ctaText: "Enquire Now",
  ctaHref: "/contact",
  secondaryCtaText: "Explore",
  secondaryCtaHref: "/accommodations",
  scrollToId: "intro",
  videoSrc: "/videos/manynoi.mp4",
  verticalAlign: "bottom",
  textBackground: true
}
```

---

### Section 2: text_block

**Purpose:** Centered content block with title, subtitle, and description

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| title | String | Yes | Text | |
| subtitle | String | No | Text | |
| description | String | Yes | WYSIWYG | Supports HTML |
| ctaText | String | No | Text | |
| ctaHref | String | No | URL | |
| background | Select | No | Select | Options: white, cream, off-white, primary-dark, gold, image |
| id | String | No | Text | Anchor ID |

**Example Data (Home Page):**
```typescript
{
  title: "Welcome to Manyoni Ridge",
  subtitle: "Your Safari Awaits",
  description: "Nestled in the heart of Manyoni Private Game Reserve...",
  ctaText: "Discover Our Story",
  ctaHref: "/about",
  background: "cream"
}
```

---

### Section 3: split_content

**Purpose:** Two-column layout with text on one side, image on the other

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| subtitle | String | No | Text | |
| title | String | Yes | Text | |
| description | String | Yes | WYSIWYG | |
| features | Array | No | Repeater | Array of strings |
| ctaText | String | No | Text | |
| ctaHref | String | No | URL | |
| imageSrc | String | No | Image | |
| imagePlaceholder | String | No | Text | CSS class for placeholder |
| imagePosition | Select | No | Select | "left" or "right" |
| background | Select | No | Select | white, cream, off-white, etc. |

**Repeater Sub-field (features):**
- `text` (Text field)

**Example Data (Home Page):**
```typescript
{
  subtitle: "The Experience",
  title: "Where Luxury Meets Wilderness",
  description: "Every detail at Manyoni Ridge has been carefully considered...",
  features: [
    "Big 5 private game reserve",
    "Only 9 intimate suites",
    "All-inclusive luxury experience",
    "Expert guides and trackers",
    "Conservation-focused activities"
  ],
  ctaText: "View Accommodations",
  ctaHref: "/accommodations",
  imageSrc: "/images/Birds and Wildlife/DSC00844.jpeg",
  imagePosition: "left"
}
```

---

### Section 4: room_cards_section

**Purpose:** Display accommodation cards (fetches data from rooms collection)

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| roomSlugs | Array | Yes | Repeater | Array of room slugs |
| variant | Select | No | Select | "default" or "featured" |
| heading_title | String | No | Text | Section heading |
| heading_subtitle | String | No | Text | Section subheading |
| background | Select | No | Select | Background color |
| showViewAllLink | Boolean | No | True/False | Show "View All" link |
| layout | Select | No | Select | "grid" or "stack" |

**Repeater Sub-field (roomSlugs):**
- `slug` (Text field) - Options: "one-bedroom-suite", "two-bedroom-suite"

**Example Data (Home Page):**
```typescript
{
  roomSlugs: ["one-bedroom-suite", "two-bedroom-suite"],
  variant: "featured",
  heading: {
    title: "Our Suites",
    subtitle: "Choose from our luxurious one and two bedroom suites..."
  },
  background: "off-white",
  layout: "grid"
}
```

**Note:** Room data (images, descriptions, amenities) is stored separately in the rooms collection, not in this section.

---

### Section 5: activity_cards_section

**Purpose:** Display activity/experience cards (fetches data from activities collection)

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| activitySlugs | Array | Yes | Repeater | Array of activity slugs |
| variant | Select | No | Select | "default" or "featured" |
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| background | Select | No | Select | |
| showViewAllLink | Boolean | No | True/False | |

**Repeater Sub-field (activitySlugs):**
- `slug` (Text field) - Options: "game-drives", "rhino-conservation", "pangolin-experiences", "k9-unit-training", "spa-services", "family-experiences"

**Example Data (Home Page):**
```typescript
{
  activitySlugs: ["game-drives", "rhino-conservation", "pangolin-experiences"],
  heading: {
    title: "Safari Activities",
    subtitle: "From thrilling game drives to meaningful conservation experiences..."
  },
  background: "white",
  showViewAllLink: true
}
```

**Note:** Activity data is stored separately in the activities collection.

---

### Section 6: stats_strip

**Purpose:** Horizontal bar displaying key statistics

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| stats | Array | Yes | Repeater | Statistics items |
| background | Select | No | Select | Usually "primary-dark" |

**Repeater Sub-fields (stats):**
- `value` (Text) - e.g., "23,000", "Big 5", "9"
- `label` (Text) - e.g., "Hectares of Wilderness"

**Example Data (Home Page):**
```typescript
{
  stats: [
    { value: "23,000", label: "Hectares of Wilderness" },
    { value: "Big 5", label: "Game Reserve" },
    { value: "9", label: "Exclusive Suites" },
    { value: "400+", label: "Bird Species" }
  ],
  background: "primary-dark"
}
```

---

### Section 7: features_grid

**Purpose:** Grid of feature/amenity blocks with title and description

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| features | Array | Yes | Repeater | Feature items |
| columns | Number | No | Select | 2, 3, or 4 columns |
| background | Select | No | Select | |

**Repeater Sub-fields (features):**
- `title` (Text)
- `description` (Textarea)

**Example Data (Accommodations Page):**
```typescript
{
  heading: {
    title: "Suite Features",
    subtitle: "Every suite at Manyoni Ridge comes with exceptional amenities..."
  },
  features: [
    {
      title: "Private Plunge Pool",
      description: "Each suite features a private pool..."
    },
    {
      title: "Indoor & Outdoor Showers",
      description: "Experience the freedom of showering under the African sky..."
    }
    // ...4 more items
  ],
  columns: 3,
  background: "off-white"
}
```

---

### Section 8: values_list

**Purpose:** Similar to features_grid but specifically for company values

**Fields:** (Identical structure to features_grid)
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| values | Array | Yes | Repeater | Value items |
| columns | Number | No | Select | 2, 3, or 4 columns |
| background | Select | No | Select | |

**Repeater Sub-fields (values):**
- `title` (Text)
- `description` (Textarea)

**Example Data (About Page):**
```typescript
{
  heading: {
    title: "Our Values",
    subtitle: "The principles that guide everything we do..."
  },
  values: [
    { title: "Authenticity", description: "Genuine experiences rooted in..." },
    { title: "Conservation", description: "Active participation in protecting..." },
    { title: "Excellence", description: "Uncompromising commitment to quality..." },
    { title: "Community", description: "Supporting local communities..." }
  ],
  columns: 4,
  background: "white"
}
```

---

### Section 9: daily_schedule

**Purpose:** Timeline showing daily itinerary

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| schedule | Array | Yes | Repeater | Schedule items |
| background | Select | No | Select | |

**Repeater Sub-fields (schedule):**
- `time` (Text) - e.g., "05:30"
- `title` (Text) - e.g., "Wake Up Call"
- `description` (Textarea)

**Example Data (Activities Page):**
```typescript
{
  heading: {
    title: "Your Day at Manyoni Ridge",
    subtitle: "A typical day at Manyoni Ridge..."
  },
  schedule: [
    {
      time: "05:30",
      title: "Wake Up Call",
      description: "Rise with the sun and enjoy tea or coffee..."
    },
    {
      time: "06:00",
      title: "Morning Game Drive",
      description: "Set out on an early morning safari..."
    }
    // ...6 more items
  ],
  background: "off-white"
}
```

---

### Section 10: gallery

**Purpose:** Photo gallery with category filtering

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| items | Array | Yes | Repeater | Gallery images |
| categories | Array | No | Repeater | Filter categories |
| background | Select | No | Select | |

**Repeater Sub-fields (items):**
- `id` (Text or Number)
- `category` (Text) - e.g., "wildlife", "lodge", "suites"
- `image` (Image)
- `alt` (Text) - Alt text for accessibility

**Repeater Sub-fields (categories):**
- `id` (Text) - e.g., "all", "wildlife"
- `label` (Text) - e.g., "All", "Wildlife"

**Example Data (Gallery Page):**
```typescript
{
  heading: {
    title: "Photo Gallery",
    subtitle: "Browse our collection of images..."
  },
  categories: [
    { id: "all", label: "All" },
    { id: "wildlife", label: "Wildlife" },
    { id: "lodge", label: "Lodge" },
    { id: "suites", label: "Suites" },
    { id: "activities", label: "Activities" },
    { id: "landscape", label: "Landscape" }
  ],
  items: [
    {
      id: 1,
      category: "wildlife",
      image: "/images/Birds and Wildlife/leopard 2 - ar.jpg",
      alt: "Leopard in the African bush"
    }
    // ...19 more items (20 total)
  ],
  background: "white"
}
```

---

### Section 11: newsletter_section

**Purpose:** Newsletter subscription form

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| title | String | Yes | Text | |
| description | String | Yes | Textarea | |
| background | Select | No | Select | Usually "cream" |

**Example Data (Home Page):**
```typescript
{
  title: "Be the First to Know",
  description: "Manyoni Ridge opens in September 2026. Subscribe to receive exclusive...",
  background: "cream"
}
```

**Note:** Form functionality is handled client-side, not in ACF.

---

### Section 12: cta_section

**Purpose:** Call-to-action section with prominent buttons

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| title | String | Yes | Text | |
| description | String | Yes | Textarea | |
| ctaText | String | Yes | Text | Primary button |
| ctaHref | String | Yes | URL | |
| secondaryCtaText | String | No | Text | Secondary button |
| secondaryCtaHref | String | No | URL | |
| background | Select | Yes | Select | "gold" or "image" |
| imageSrc | String | No | Image | If background = "image" |

**Example Data (Home Page):**
```typescript
{
  title: "Begin Your Safari Journey",
  description: "Contact us to start planning your unforgettable experience...",
  ctaText: "Make an Enquiry",
  ctaHref: "/contact",
  secondaryCtaText: "View FAQ",
  secondaryCtaHref: "/faq",
  background: "image",
  imageSrc: "/images/MANYONI RIDGE CLUBHOUSE RENDERS 22.jpg"
}
```

---

### Section 13: offers_list

**Purpose:** Display special offers/packages with details

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| offers | Array | Yes | Repeater | Offer items |
| background | Select | No | Select | |

**Repeater Sub-fields (offers):**
- `title` (Text) - e.g., "Early Bird Offer"
- `subtitle` (Text) - e.g., "Book 6+ months in advance"
- `description` (Textarea)
- `highlights` (Repeater) - Array of benefit strings
  - Sub-field: `text` (Text)
- `validUntil` (Text or Date Picker) - e.g., "Valid for stays from September 2026"
- `imageSrc` (Image)

**Example Data (Offers Page):**
```typescript
{
  offers: [
    {
      title: "Early Bird Offer",
      subtitle: "Book 6+ months in advance",
      description: "Plan ahead and save...",
      highlights: [
        "10% discount on accommodation",
        "Complimentary spa treatment",
        "Priority room selection"
      ],
      validUntil: "Valid for stays from September 2026",
      imageSrc: "/images/Birds and Wildlife/DSC00569.jpeg"
    }
    // ...3 more offers
  ],
  background: "white"
}
```

---

### Section 14: wildlife_grid

**Purpose:** Grid of wildlife species found at the reserve

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| wildlife | Array | Yes | Repeater | Wildlife items |
| background | Select | No | Select | |

**Repeater Sub-fields (wildlife):**
- `name` (Text) - e.g., "Lion", "Leopard"
- `description` (Textarea)

**Example Data (Reserve Page):**
```typescript
{
  heading: {
    title: "Wildlife of Manyoni",
    subtitle: "From the Big 5 to the rare pangolin..."
  },
  wildlife: [
    { name: "Lion", description: "The king of the African bush..." },
    { name: "Leopard", description: "Elusive and majestic..." },
    { name: "Elephant", description: "Majestic herds roam freely..." }
    // ...5 more species (8 total)
  ],
  background: "white"
}
```

---

### Section 15: contact_info

**Purpose:** Contact form and information display

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| background | Select | No | Select | |

**Note:** This section renders hardcoded contact information and forms. No dynamic content fields needed beyond background color.

**Example Data (Contact Page):**
```typescript
{
  background: "white"
}
```

---

### Section 16: getting_here

**Purpose:** Directions and travel information

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| directions | Array | Yes | Repeater | Direction items |
| background | Select | No | Select | |

**Repeater Sub-fields (directions):**
- `title` (Text) - e.g., "From Durban"
- `description` (Textarea)

**Example Data (Contact Page):**
```typescript
{
  heading: {
    title: "Getting Here",
    subtitle: "Manyoni Ridge is accessible by road..."
  },
  directions: [
    {
      title: "From Durban",
      description: "Approximately 3 hours by road from King Shaka..."
    },
    {
      title: "From Richards Bay",
      description: "Approximately 1.5 hours by road..."
    },
    {
      title: "Charter Flight",
      description: "Charter flights can be arranged..."
    }
  ],
  background: "cream"
}
```

---

### Section 17: faq_accordion

**Purpose:** Accordion-style FAQ sections

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| categories | Array | Yes | Repeater | FAQ categories |
| background | Select | No | Select | |

**Repeater Sub-fields (categories):**
- `title` (Text) - Category name, e.g., "Rates & Inclusions"
- `items` (Repeater) - FAQ items within category
  - `question` (Text)
  - `answer` (Textarea)

**Example Data (FAQ Page):**
```typescript
{
  categories: [
    {
      title: "Rates & Inclusions",
      items: [
        {
          question: "What is included in the rates?",
          answer: "Our all-inclusive rates cover accommodation, all meals..."
        },
        {
          question: "Are there different rates for children?",
          answer: "Yes, we offer reduced rates for children..."
        }
        // ...2 more Q&As
      ]
    },
    {
      title: "Cancellation Policy",
      items: [
        {
          question: "What is your cancellation policy?",
          answer: "Cancellations made more than 30 days..."
        }
        // ...2 more Q&As
      ]
    }
    // ...4 more categories (6 total categories)
  ],
  background: "white"
}
```

**Note:** The FAQ data includes 6 categories with a total of 18 Q&A pairs.

---

### Section 18: dining_experiences

**Purpose:** Showcase different dining experience types

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| experiences | Array | Yes | Repeater | Experience items |
| background | Select | No | Select | |

**Repeater Sub-fields (experiences):**
- `title` (Text) - e.g., "Bush Breakfast"
- `description` (Textarea)
- `placeholder` (Text) - CSS class for placeholder images

**Example Data (Dining Page):**
```typescript
{
  heading: {
    title: "Dining Experiences",
    subtitle: "From intimate bush dinners to starlit boma evenings..."
  },
  experiences: [
    {
      title: "Bush Breakfast",
      description: "After your morning game drive, enjoy a hearty breakfast...",
      placeholder: "placeholder-nature"
    },
    {
      title: "Sundowner Drinks",
      description: "Pause during your afternoon drive to toast the African sunset...",
      placeholder: "placeholder-gold"
    }
    // ...3 more experiences (5 total)
  ],
  background: "white"
}
```

---

### Section 19: dietary_options

**Purpose:** Display dietary accommodations available

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| description | String | No | Textarea | |
| options | Array | Yes | Repeater | Dietary options |
| background | Select | No | Select | |

**Repeater Sub-fields (options):**
- `text` (Text) - e.g., "Vegetarian", "Vegan", "Gluten-Free"

**Example Data (Dining Page):**
```typescript
{
  heading: {
    title: "Dietary Accommodations"
  },
  description: "We understand that every guest has unique dietary needs...",
  options: [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Halal",
    "Kosher",
    "Low-Sodium",
    "Dairy-Free",
    "Nut-Free"
  ],
  background: "white"
}
```

---

### Section 20: opening_info

**Purpose:** Display information about lodge opening/construction

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| subtitle | String | Yes | Text | e.g., "Coming Soon" |
| title | String | Yes | Text | e.g., "Opening September 2026" |
| description | String | Yes | WYSIWYG | |
| imageSrc | String | Yes | Image | |
| background | Select | No | Select | |

**Example Data (About Page):**
```typescript
{
  subtitle: "Coming Soon",
  title: "Opening September 2026",
  description: "Manyoni Ridge Safari Lodge is currently under construction...",
  imageSrc: "/images/2-bed 6.jpg",
  background: "white"
}
```

---

### Section 21: content_section

**Purpose:** Generic content block for flexible HTML/markdown content

**Fields:**
| Field Name | Type | Required | ACF Field Type | Notes |
|------------|------|----------|----------------|-------|
| heading_title | String | No | Text | |
| heading_subtitle | String | No | Text | |
| content | String | Yes | WYSIWYG | HTML or markdown |
| centered | Boolean | No | True/False | Center-align content |
| background | Select | No | Select | |

**Example Data (Accommodations Page):**
```typescript
{
  heading: {
    title: "Your Private Sanctuary"
  },
  content: "Manyoni Ridge offers just nine exclusive suites...",
  centered: true,
  background: "cream"
}
```

---

## 1.4 DATA COLLECTIONS

### Rooms Collection (2 items)

**Collection Name:** Rooms
**Slug Field:** slug
**Used By:** room_cards_section

**Fields:**
| Field Name | Type | ACF Field Type | Notes |
|------------|------|----------------|-------|
| slug | String | Text | "one-bedroom-suite", "two-bedroom-suite" |
| title | String | Text | "One Bedroom Suite" |
| subtitle | String | Text | "Intimate luxury for two" |
| description | WYSIWYG | WYSIWYG | Full description |
| shortDescription | String | Textarea | Card description |
| capacity.adults | Number | Number | Max adults |
| capacity.children | Number | Number | Max children |
| size | String | Text | "85 sqm" |
| bedrooms | Number | Number | 1 or 2 |
| bathrooms | Number | Number | 1 or 2 |
| amenities | Array | Repeater | List of amenities |
| features | Array | Repeater | List of features |
| images | Array | Gallery | Suite images (4-8 images) |
| heroImage | String | Image | Main card image |
| placeholderClass | String | Text | "placeholder-room" |

**Room 1: One Bedroom Suite**
- 2 adults, 0 children
- 85 sqm, 1 bed, 1 bath
- 10 amenities, 6 features
- 4 images

**Room 2: Two Bedroom Suite**
- 4 adults, 2 children
- 150 sqm, 2 beds, 2 baths
- 10 amenities, 6 features
- 8 images

---

### Activities Collection (6 items)

**Collection Name:** Activities
**Slug Field:** slug
**Used By:** activity_cards_section

**Fields:**
| Field Name | Type | ACF Field Type | Notes |
|------------|------|----------------|-------|
| slug | String | Text | Unique identifier |
| title | String | Text | "Game Drives" |
| subtitle | String | Text | "Discover the Big 5" |
| description | WYSIWYG | WYSIWYG | Full description |
| shortDescription | String | Textarea | Card description |
| duration | String | Text | "3-4 hours" |
| difficulty | Select | Select | Easy, Moderate, Challenging |
| minAge | Number | Number | Minimum age (optional) |
| includes | Array | Repeater | What's included |
| highlights | Array | Repeater | Key highlights |
| images | Array | Gallery | Activity images (4 images each) |
| icon | String | Text | Icon name (e.g., "Binoculars") |
| placeholderClass | String | Text | CSS class |

**Activities:**
1. Game Drives
2. Rhino Conservation
3. Pangolin Experiences
4. K9 Unit Training
5. Spa Services
6. Family Experiences

---

### FAQ Collection (6 categories, 18 Q&A pairs)

**Collection Name:** FAQ Categories
**Used By:** faq_accordion section

**Categories:**
1. Rates & Inclusions (4 Q&As)
2. Cancellation Policy (3 Q&As)
3. Children & Family (3 Q&As)
4. Wildlife & Safari (3 Q&As)
5. Weather & Best Times to Visit (3 Q&As)
6. Getting There (3 Q&As)

**Fields:** See Section 17 (faq_accordion) for full structure.

---

## 1.5 IMAGE ASSETS INVENTORY

**Total Images:** 200+ images across the site

**Categories:**
1. **Birds and Wildlife** (~200 images in `/images/Birds and Wildlife/`)
   - Wildlife photos (Big 5, birds, landscapes)
   - Used across multiple sections

2. **Accommodation** (~20 images)
   - `/images/1-bed 1.jpg` through `/images/1-bed 4.jpg`
   - `/images/2-bed 1.jpg` through `/images/2-bed 10.jpg`

3. **Lodge Renders** (~35 images)
   - `/images/MANYONI RIDGE CLUBHOUSE RENDERS *.jpg` (numbered 1-35)

4. **Videos**
   - `/videos/manynoi.mp4` (homepage hero)

**Image Upload Strategy:**
- All images must be migrated to WordPress Media Library
- Maintain folder structure for organization
- Update all `imageSrc` fields to WordPress media URLs
- Recommended sizes:
  - Hero images: 1920×1080 minimum
  - Gallery images: 1200×800
  - Card thumbnails: 800×600
  - Icons/logos: SVG or 200×200 PNG

---

## 1.6 GLOBAL CONTENT

### Header/Navigation

**Main Navigation Items:**
1. Accommodation (`/accommodations`)
2. Experiences (`/activities`)
3. Reserve (`/reserve`)

**Mobile Navigation (Burger Menu):**
- Home
- Accommodation
  - One Bedroom Suite
  - Two Bedroom Suite
- Experiences
  - Game Drives
  - Rhino Conservation
  - Pangolin Experiences
  - K9 Unit Training
  - Spa Services
  - Family Experiences
- Dining
- Reserve
- About
- Gallery
- Contact
- FAQ
- Offers

**Logo:** Manyoni Ridge Safari Lodge

---

### Footer

**Footer Sections:**

**Column 1: About**
- Brief description
- Social media links (if any)

**Column 2: Quick Links**
- Accommodations
- Activities
- Dining
- Reserve
- Gallery

**Column 3: Information**
- About Us
- Contact
- FAQ
- Offers
- Terms & Conditions (if applicable)

**Column 4: Contact**
- Email: info@manyoniridge.com
- Phone: +27 (0)XX XXX XXXX (check)
- Address: Manyoni Private Game Reserve, KwaZulu-Natal, South Africa

**Footer Bottom:**
- Copyright © 2026 Manyoni Ridge Safari Lodge
- Designed by Focus Online Travel

---

### Site Configuration

**Stored in:** `/src/lib/constants.ts`

```typescript
export const SITE_CONFIG = {
  name: 'Manyoni Ridge Safari Lodge',
  tagline: 'Intimate Luxury in the Wild',
  opening: 'September 2026',
  email: 'info@manyoniridge.com',
  // Add phone, address, social media as needed
}
```

**WordPress Implementation:**
- Create an Options Page in ACF for global settings
- Fields: site_name, tagline, opening_date, contact_email, contact_phone, address, social_media_links (repeater)

---

## 1.7 DYNAMIC ROUTES

### Individual Room Pages

**Route:** `/accommodations/[slug]`
**Slugs:** `one-bedroom-suite`, `two-bedroom-suite`

**Content Source:** Rooms collection data
**Template:** Single room page with image gallery, details, amenities, booking CTA

---

### Individual Activity Pages

**Route:** `/activities/[slug]`
**Slugs:** `game-drives`, `rhino-conservation`, `pangolin-experiences`, `k9-unit-training`, `spa-services`, `family-experiences`

**Content Source:** Activities collection data
**Template:** Single activity page with images, details, highlights, booking CTA

---

### Catch-All Route

**Route:** `/[...slug]`
**Purpose:** Dynamically generate pages from WordPress

**WordPress Implementation:**
- Fetch page by slug from WordPress
- Render sections based on ACF flexible content
- 404 if slug not found

---

## PHASE 1 SUMMARY

### Statistics

- **Total Pages:** 11 main pages
- **Section Types:** 21 unique section types
- **Section Instances:** ~55 sections across all pages
- **Collections:** 3 (Rooms, Activities, FAQ)
- **Collection Items:** 14 total (2 rooms, 6 activities, 6 FAQ categories)
- **Image Assets:** 200+ images, 1 video
- **Global Components:** Header, Footer, Site Config

### Content Complexity

**Simple Sections (Low Complexity):**
- text_block
- content_section
- stats_strip
- cta_section
- newsletter_section
- dietary_options
- getting_here
- contact_info

**Medium Complexity:**
- hero_image
- split_content
- features_grid
- values_list
- daily_schedule
- dining_experiences
- opening_info
- wildlife_grid

**High Complexity (with Repeaters/Collections):**
- room_cards_section
- activity_cards_section
- gallery
- offers_list
- faq_accordion

---

## NEXT STEPS

### Phase 2: WordPress Setup
1. Install required plugins
2. Configure ACF Pro
3. Set up custom post types if needed
4. Create ACF field groups

### Phase 3: Content Migration
1. Import ACF field group JSON
2. Create all 11 pages in WordPress
3. Populate each page with sections
4. Upload all images to Media Library
5. Create room and activity post types/collections
6. Populate FAQ data

### Phase 4: WPGraphQL Configuration
1. Enable GraphQL for all field groups
2. Test queries
3. Generate query documentation

### Phase 5: Frontend Integration
1. Update Next.js to fetch from WordPress
2. Test all pages
3. Verify image loading
4. Check dynamic routes

---

**Document Status:** ✅ Phase 1 Complete - Ready for Review
**Next Action:** Await approval to proceed with Phase 2 (WordPress Setup)
