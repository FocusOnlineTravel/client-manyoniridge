# GraphQL Queries for Manyoni Ridge WordPress Backend

This document provides GraphQL query examples for fetching content from the WordPress backend using WPGraphQL and WPGraphQL for ACF.

**GraphQL Endpoint:** `https://backend-manyoni.focusonlinetravel.co.za/graphql`

---

## Table of Contents

1. [Basic Page Queries](#basic-page-queries)
2. [Page with Sections](#page-with-sections)
3. [All Pages](#all-pages)
4. [Specific Section Types](#specific-section-types)
5. [Rooms/Accommodations](#roomsaccommodations)
6. [Activities](#activities)
7. [FAQ](#faq)
8. [Site Options](#site-options)
9. [Menus](#menus)
10. [Advanced Queries](#advanced-queries)

---

## Basic Page Queries

### Get Page by Slug

```graphql
query GetPageBySlug($slug: ID!) {
  page(id: $slug, idType: URI) {
    id
    title
    slug
    content
    date
    modified
    seo {
      title
      metaDesc
      opengraphImage {
        sourceUrl
      }
    }
  }
}
```

**Variables:**
```json
{
  "slug": "home"
}
```

---

## Page with Sections

### Get Home Page with All Sections

```graphql
query GetHomePage {
  page(id: "home", idType: URI) {
    id
    title
    slug
    pageSections {
      sections {
        ... on Page_Pagesections_Sections_HeroImage {
          fieldGroupName
          subtitle
          title
          description
          ctaText
          ctaHref
          secondaryCtaText
          secondaryCtaHref
          scrollToId
          imageSrc {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
          videoSrc
          size
          verticalAlign
          textBackground
          showScrollIndicator
        }
        ... on Page_Pagesections_Sections_TextBlock {
          fieldGroupName
          title
          subtitle
          description
          ctaText
          ctaHref
          background
          id
        }
        ... on Page_Pagesections_Sections_SplitContent {
          fieldGroupName
          subtitle
          title
          description
          features {
            text
          }
          ctaText
          ctaHref
          imageSrc {
            sourceUrl
            altText
          }
          imagePlaceholder
          imagePosition
          background
        }
        ... on Page_Pagesections_Sections_RoomCardsSection {
          fieldGroupName
          roomSlugs {
            slug
          }
          variant
          headingTitle
          headingSubtitle
          background
          showViewAllLink
          layout
        }
        ... on Page_Pagesections_Sections_ActivityCardsSection {
          fieldGroupName
          activitySlugs {
            slug
          }
          variant
          headingTitle
          headingSubtitle
          background
          showViewAllLink
        }
        ... on Page_Pagesections_Sections_StatsStrip {
          fieldGroupName
          stats {
            value
            label
          }
          background
        }
        ... on Page_Pagesections_Sections_NewsletterSection {
          fieldGroupName
          title
          description
          background
        }
        ... on Page_Pagesections_Sections_CtaSection {
          fieldGroupName
          title
          description
          ctaText
          ctaHref
          secondaryCtaText
          secondaryCtaHref
          background
          imageSrc {
            sourceUrl
            altText
          }
        }
      }
    }
  }
}
```

---

## All Pages

### Get All Page Slugs (for Static Generation)

```graphql
query GetAllPageSlugs {
  pages(first: 100) {
    nodes {
      slug
      uri
    }
  }
}
```

### Get All Pages with Basic Info

```graphql
query GetAllPages {
  pages(first: 100) {
    nodes {
      id
      title
      slug
      uri
      date
      modified
      excerpt
    }
  }
}
```

---

## Specific Section Types

### Hero Image Section

```graphql
fragment HeroImageSection on Page_Pagesections_Sections_HeroImage {
  fieldGroupName
  subtitle
  title
  description
  ctaText
  ctaHref
  secondaryCtaText
  secondaryCtaHref
  scrollToId
  imageSrc {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
  videoSrc
  size
  verticalAlign
  textBackground
  showScrollIndicator
}
```

### Features Grid Section

```graphql
fragment FeaturesGridSection on Page_Pagesections_Sections_FeaturesGrid {
  fieldGroupName
  headingTitle
  headingSubtitle
  features {
    title
    description
  }
  columns
  background
}
```

### Gallery Section

```graphql
fragment GallerySection on Page_Pagesections_Sections_Gallery {
  fieldGroupName
  headingTitle
  headingSubtitle
  items {
    id
    category
    image {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
    alt
  }
  categories {
    id
    label
  }
  background
}
```

### FAQ Accordion Section

```graphql
fragment FaqAccordionSection on Page_Pagesections_Sections_FaqAccordion {
  fieldGroupName
  categories {
    title
    items {
      question
      answer
    }
  }
  background
}
```

### Offers List Section

```graphql
fragment OffersListSection on Page_Pagesections_Sections_OffersList {
  fieldGroupName
  offers {
    title
    subtitle
    description
    highlights {
      text
    }
    validUntil
    imageSrc {
      sourceUrl
      altText
    }
  }
  background
}
```

### Daily Schedule Section

```graphql
fragment DailyScheduleSection on Page_Pagesections_Sections_DailySchedule {
  fieldGroupName
  headingTitle
  headingSubtitle
  schedule {
    time
    title
    description
  }
  background
}
```

---

## Rooms/Accommodations

### If Using Custom Post Type

#### Get All Rooms

```graphql
query GetAllRooms {
  rooms(first: 100) {
    nodes {
      id
      title
      slug
      roomDetails {
        subtitle
        shortDescription
        capacityAdults
        capacityChildren
        size
        bedrooms
        bathrooms
        amenities {
          text
        }
        features {
          text
        }
        images {
          sourceUrl
          altText
        }
        heroImage {
          sourceUrl
          altText
        }
        placeholderClass
      }
    }
  }
}
```

#### Get Single Room by Slug

```graphql
query GetRoomBySlug($slug: ID!) {
  room(id: $slug, idType: SLUG) {
    id
    title
    slug
    content
    roomDetails {
      subtitle
      shortDescription
      description
      capacityAdults
      capacityChildren
      size
      bedrooms
      bathrooms
      amenities {
        text
      }
      features {
        text
      }
      images {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      heroImage {
        sourceUrl
        altText
      }
      placeholderClass
    }
  }
}
```

**Variables:**
```json
{
  "slug": "one-bedroom-suite"
}
```

---

## Activities

### If Using Custom Post Type

#### Get All Activities

```graphql
query GetAllActivities {
  activities(first: 100) {
    nodes {
      id
      title
      slug
      activityDetails {
        subtitle
        shortDescription
        duration
        difficulty
        minAge
        includes {
          text
        }
        highlights {
          text
        }
        images {
          sourceUrl
          altText
        }
        icon
        placeholderClass
      }
    }
  }
}
```

#### Get Single Activity by Slug

```graphql
query GetActivityBySlug($slug: ID!) {
  activity(id: $slug, idType: SLUG) {
    id
    title
    slug
    content
    activityDetails {
      subtitle
      shortDescription
      description
      duration
      difficulty
      minAge
      includes {
        text
      }
      highlights {
        text
      }
      images {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
      icon
      placeholderClass
    }
  }
}
```

---

## FAQ

### Get All FAQ Categories

```graphql
query GetAllFAQ {
  page(id: "faq", idType: URI) {
    pageSections {
      sections {
        ... on Page_Pagesections_Sections_FaqAccordion {
          categories {
            title
            items {
              question
              answer
            }
          }
        }
      }
    }
  }
}
```

---

## Site Options

### Get Global Site Settings

```graphql
query GetSiteOptions {
  siteOptions {
    siteOptions {
      siteName
      tagline
      openingDate
      contactEmail
      contactPhone
      address
      socialMedia {
        platform
        url
      }
    }
  }
}
```

---

## Menus

### Get Main Navigation Menu

```graphql
query GetMainMenu {
  menu(id: "main-navigation", idType: NAME) {
    menuItems {
      nodes {
        id
        label
        url
        path
        target
        parentId
        cssClasses
      }
    }
  }
}
```

### Get Mobile Navigation Menu

```graphql
query GetMobileMenu {
  menu(id: "mobile-navigation", idType: NAME) {
    menuItems {
      nodes {
        id
        label
        url
        path
        target
        parentId
        cssClasses
      }
    }
  }
}
```

---

## Advanced Queries

### Get Multiple Pages with Sections

```graphql
query GetMultiplePages($slugs: [ID!]) {
  pages(where: { nameIn: $slugs }, first: 100) {
    nodes {
      id
      title
      slug
      pageSections {
        sections {
          __typename
          ... on Page_Pagesections_Sections_HeroImage {
            subtitle
            title
            description
            imageSrc {
              sourceUrl
            }
          }
          ... on Page_Pagesections_Sections_TextBlock {
            title
            subtitle
            description
          }
          # Add other section types as needed
        }
      }
    }
  }
}
```

**Variables:**
```json
{
  "slugs": ["home", "about", "contact"]
}
```

### Search Pages

```graphql
query SearchPages($search: String!) {
  pages(where: { search: $search }, first: 10) {
    nodes {
      id
      title
      slug
      excerpt
      date
    }
  }
}
```

---

## Complete Page Query Template

This is a comprehensive template that fetches ALL possible section types for a page:

```graphql
query GetCompletePage($slug: ID!) {
  page(id: $slug, idType: URI) {
    id
    title
    slug
    content
    date
    modified
    seo {
      title
      metaDesc
      opengraphImage {
        sourceUrl
      }
    }
    pageSections {
      sections {
        __typename

        # Hero Image
        ... on Page_Pagesections_Sections_HeroImage {
          subtitle
          title
          description
          ctaText
          ctaHref
          secondaryCtaText
          secondaryCtaHref
          scrollToId
          imageSrc {
            sourceUrl
            altText
          }
          videoSrc
          size
          verticalAlign
          textBackground
          showScrollIndicator
        }

        # Text Block
        ... on Page_Pagesections_Sections_TextBlock {
          title
          subtitle
          description
          ctaText
          ctaHref
          background
          id
        }

        # Content Section
        ... on Page_Pagesections_Sections_ContentSection {
          headingTitle
          headingSubtitle
          content
          centered
          background
        }

        # Split Content
        ... on Page_Pagesections_Sections_SplitContent {
          subtitle
          title
          description
          features {
            text
          }
          ctaText
          ctaHref
          imageSrc {
            sourceUrl
          }
          imagePlaceholder
          imagePosition
          background
        }

        # CTA Section
        ... on Page_Pagesections_Sections_CtaSection {
          title
          description
          ctaText
          ctaHref
          secondaryCtaText
          secondaryCtaHref
          background
          imageSrc {
            sourceUrl
          }
        }

        # Newsletter Section
        ... on Page_Pagesections_Sections_NewsletterSection {
          title
          description
          background
        }

        # Room Cards Section
        ... on Page_Pagesections_Sections_RoomCardsSection {
          roomSlugs {
            slug
          }
          variant
          headingTitle
          headingSubtitle
          background
          showViewAllLink
          layout
        }

        # Activity Cards Section
        ... on Page_Pagesections_Sections_ActivityCardsSection {
          activitySlugs {
            slug
          }
          variant
          headingTitle
          headingSubtitle
          background
          showViewAllLink
        }

        # Stats Strip
        ... on Page_Pagesections_Sections_StatsStrip {
          stats {
            value
            label
          }
          background
        }

        # Features Grid
        ... on Page_Pagesections_Sections_FeaturesGrid {
          headingTitle
          headingSubtitle
          features {
            title
            description
          }
          columns
          background
        }

        # Values List
        ... on Page_Pagesections_Sections_ValuesList {
          headingTitle
          headingSubtitle
          values {
            title
            description
          }
          columns
          background
        }

        # Daily Schedule
        ... on Page_Pagesections_Sections_DailySchedule {
          headingTitle
          headingSubtitle
          schedule {
            time
            title
            description
          }
          background
        }

        # Gallery
        ... on Page_Pagesections_Sections_Gallery {
          headingTitle
          headingSubtitle
          items {
            id
            category
            image {
              sourceUrl
              altText
            }
            alt
          }
          categories {
            id
            label
          }
          background
        }

        # Offers List
        ... on Page_Pagesections_Sections_OffersList {
          offers {
            title
            subtitle
            description
            highlights {
              text
            }
            validUntil
            imageSrc {
              sourceUrl
            }
          }
          background
        }

        # Wildlife Grid
        ... on Page_Pagesections_Sections_WildlifeGrid {
          headingTitle
          headingSubtitle
          wildlife {
            name
            description
          }
          background
        }

        # Contact Info
        ... on Page_Pagesections_Sections_ContactInfo {
          background
        }

        # Getting Here
        ... on Page_Pagesections_Sections_GettingHere {
          headingTitle
          headingSubtitle
          directions {
            title
            description
          }
          background
        }

        # FAQ Accordion
        ... on Page_Pagesections_Sections_FaqAccordion {
          categories {
            title
            items {
              question
              answer
            }
          }
          background
        }

        # Dining Experiences
        ... on Page_Pagesections_Sections_DiningExperiences {
          headingTitle
          headingSubtitle
          experiences {
            title
            description
            placeholder
          }
          background
        }

        # Dietary Options
        ... on Page_Pagesections_Sections_DietaryOptions {
          headingTitle
          headingSubtitle
          description
          options {
            text
          }
          background
        }

        # Opening Info
        ... on Page_Pagesections_Sections_OpeningInfo {
          subtitle
          title
          description
          imageSrc {
            sourceUrl
          }
          background
        }
      }
    }
  }
}
```

---

## Integration with Next.js

### Example: Fetching Page Data in Next.js

```typescript
// lib/wordpress/graphql.ts

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL ||
  'https://backend-manyoni.focusonlinetravel.co.za/graphql';

export async function fetchGraphQL(query: string, variables?: any) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 }, // ISR
  });

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error('Failed to fetch GraphQL data');
  }

  return json.data;
}

// Example usage
export async function getPageBySlug(slug: string) {
  const data = await fetchGraphQL(GET_PAGE_BY_SLUG_QUERY, { slug });
  return data.page;
}
```

---

## Testing Queries

### Using GraphiQL IDE

1. Navigate to: https://backend-manyoni.focusonlinetravel.co.za/wp-admin/admin.php?page=graphiql-ide
2. Paste any query from this document
3. Click "Play" button to execute
4. View results in right panel

### Using cURL

```bash
curl -X POST \
  https://backend-manyoni.focusonlinetravel.co.za/graphql \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "query { pages(first: 5) { nodes { title slug } } }"
  }'
```

---

## Notes

1. **Field Names**: GraphQL field names are automatically camelCased by WPGraphQL
2. **Pagination**: Use `first`, `after`, `before`, `last` for pagination
3. **Fragments**: Use fragments to reuse query parts
4. **TypeScript**: Generate types using `graphql-codegen`
5. **Caching**: Implement proper caching strategy for production

---

**Last Updated:** ${new Date().toLocaleDateString()}
**Endpoint:** https://backend-manyoni.focusonlinetravel.co.za/graphql
