import { SITE_CONFIG, CONTACT, BOOKING_ENGINE_URL, DOWNLOADS } from '@/lib/constants';
import { getAllRooms } from '@/lib/wordpress/rooms';
import { getAllActivities } from '@/lib/wordpress/activities';
import { ACTIVITY_SEO, ROOM_SEO } from '@/lib/seo';

/**
 * /llms.txt — a short plain-text guide to the lodge for AI tools
 * (https://llmstxt.org). Villas and experiences come from WordPress (with the
 * local data as fallback); the lodge facts below come from the 2027 fact sheet,
 * so update them here if the fact sheet changes.
 */
export const revalidate = 3600;

export async function GET() {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const [rooms, activities] = await Promise.all([getAllRooms(), getAllActivities()]);

  const villaLines = rooms.map(
    (room) =>
      `- [${room.title}](${base}/accommodations/${room.slug}): ${ROOM_SEO[room.slug]?.description ?? room.shortDescription}`
  );

  const activityLines = activities.map(
    (activity) =>
      `- [${activity.title}](${base}/activities/${activity.slug}): ${ACTIVITY_SEO[activity.slug]?.description ?? activity.shortDescription}`
  );

  const body = `# Manyoni Ridge Safari Lodge

> Manyoni Ridge is a boutique, all-inclusive luxury Big 5 safari lodge with nine private villas in Manyoni Private Game Reserve (23,000 ha), north-eastern KwaZulu-Natal (Zululand), South Africa. It opens on 1 April 2027.

## At a glance

- Opening date: 1 April 2027 (taking bookings now)
- Location: ${CONTACT.location}
- Reserve: Manyoni Private Game Reserve, 23,000 hectares, Big 5, rhino conservation and a pangolin sanctuary
- Villas: 9 in total. 5 One Bedroom Villas, 3 Two Bedroom Villas and 1 Honeymoon Villa
- Basis: all-inclusive, with a personal butler per villa and in-house chefs
- Facilities: spa and wellness centre, Technogym fitness centre, heated swimming pool, boma, Starlight Terrace overlooking a waterhole, family entertainment area
- Check-in from 14:00, check-out by 10:00
- Children: all ages welcome. 0–5 years free, 6–11 years 50% of the adult rate, 12 and older full adult rate
- Health: low-malaria zone
- Getting there: about 3 hours (300 km) by road from King Shaka International Airport, Durban; about 6 hours (480–500 km) from OR Tambo, Johannesburg; Mkuze Airstrip is about 15 km away

## Villas

${villaLines.join('\n')}

## Experiences

Conservation experiences are subject to availability and reserve operations; some carry an additional charge.

${activityLines.join('\n')}

## Plan a stay

- [Rates and packages](${base}/rates)
- [Book online](${BOOKING_ENGINE_URL})
- [Frequently asked questions](${base}/faq)
- [Getting here](${base}/contact#directions)
- [Fact sheet (PDF)](${base}${DOWNLOADS.factSheet.href})
- [Brochure (PDF)](${base}${DOWNLOADS.brochure.href})
- [2027 rate sheet (PDF)](${base}${DOWNLOADS.rateSheet.href})

## Contact

- Phone: ${CONTACT.phone}
- Email: ${CONTACT.email}
- Website: ${base}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
