/**
 * Per-page search titles and descriptions for villa and activity detail pages.
 *
 * These pages have no Yoast meta of their own, so without this map every one
 * of them falls back to the site-wide default title and description, and
 * search engines and AI answer tools see identical summaries for all of them.
 *
 * Titles omit the brand: the root layout's title template appends
 * "| Manyoni Ridge". Keep descriptions under ~160 characters and stick to
 * facts from the fact sheet and page content.
 */

type SeoEntry = { title: string; description: string };

export const ROOM_SEO: Record<string, SeoEntry> = {
  'one-bedroom-villa': {
    title: 'One Bedroom Safari Villa in KwaZulu-Natal',
    description:
      'Private one-bedroom villa for couples in Manyoni Private Game Reserve, KZN: 150 sqm, king bed, outdoor shower, fireplace and bush-view deck. Opening April 2027.',
  },
  'two-bedroom-villa': {
    title: 'Two Bedroom Family Safari Villa in KwaZulu-Natal',
    description:
      'Two-bedroom, two-bathroom family villa in Manyoni Private Game Reserve, KZN: 320 sqm with a private pool and shared living area. Opening April 2027.',
  },
};

export const ACTIVITY_SEO: Record<string, SeoEntry> = {
  'game-drives': {
    title: 'Big 5 Game Drives in Manyoni Private Game Reserve',
    description:
      'Sunrise and sunset Big 5 game drives in Manyoni Private Game Reserve, KwaZulu-Natal, with expert guides in open or covered 4x4 game viewers. 3–4 hours.',
  },
  'rhino-orphanage': {
    title: 'Rhino Orphanage Visit in Zululand, KwaZulu-Natal',
    description:
      'Visit the Zululand Rhino Orphanage from Manyoni Ridge and meet the conservation team caring for orphaned rhinos. 2–3 hours, minimum age 6.',
  },
  'rhino-horn-trimming': {
    title: 'Rhino Horn Trimming Conservation Experience in KZN',
    description:
      "Join Manyoni's conservation team as rhino horns are trimmed to deter poaching: a rare, hands-on conservation experience in KwaZulu-Natal. Minimum age 6.",
  },
  'k9-unit-training': {
    title: 'Anti-Poaching K9 Unit Experience in KwaZulu-Natal',
    description:
      "Meet the anti-poaching dogs and handlers protecting Manyoni's wildlife. Training demonstrations and tracking techniques, 1.5–2 hours.",
  },
  'walking-safaris': {
    title: 'Guided Walking Safaris in Manyoni Private Game Reserve',
    description:
      'Track wildlife on foot with a professional guide in Manyoni Private Game Reserve, KwaZulu-Natal. Learn to read tracks, plants and the bush. 2–3 hours.',
  },
};
