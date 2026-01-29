import { FAQCategory } from '@/lib/types';

export const faqCategories: FAQCategory[] = [
  {
    title: 'Rates & Inclusions',
    items: [
      {
        question: 'What is included in the rates?',
        answer: 'Our all-inclusive rates cover accommodation, all meals, selected beverages (house wines, local beers, spirits, and soft drinks), two game drives daily, and Wi-Fi. Premium beverages and spa treatments are available at additional cost.',
      },
      {
        question: 'Are there different rates for children?',
        answer: 'Yes, we offer reduced rates for children. Children under 6 stay free when sharing with parents. Children 6-12 receive a 50% discount. Please note that children under 6 are only permitted in the Two Bedroom Suites.',
      },
      {
        question: 'Is there a minimum stay requirement?',
        answer: 'We recommend a minimum stay of 2 nights to fully experience Manyoni Ridge and the reserve. During peak seasons, a 3-night minimum may apply.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and cash in South African Rand. A 50% deposit is required to confirm your booking.',
      },
    ],
  },
  {
    title: 'Cancellation Policy',
    items: [
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellations made more than 30 days before arrival receive a full refund minus admin fees. Cancellations 15-30 days before arrival forfeit 50% of the deposit. Cancellations within 14 days of arrival forfeit the full deposit.',
      },
      {
        question: 'Can I reschedule my booking?',
        answer: 'Yes, we understand plans can change. Rescheduling requests made more than 30 days before arrival are accommodated subject to availability at no additional charge. Requests within 30 days may incur a rebooking fee.',
      },
      {
        question: 'Do you recommend travel insurance?',
        answer: 'Yes, we strongly recommend comprehensive travel insurance that covers trip cancellation, medical expenses, and evacuation. Safari destinations can be remote, and insurance provides peace of mind.',
      },
    ],
  },
  {
    title: 'Children & Family',
    items: [
      {
        question: 'Is Manyoni Ridge suitable for children?',
        answer: 'Absolutely! Our Two Bedroom Suites are perfect for families. We offer dedicated family experiences, junior ranger programs, and child-friendly menus. Children must be supervised at all times due to the presence of wildlife.',
      },
      {
        question: 'What age restrictions apply to activities?',
        answer: 'Children of all ages can enjoy game drives in the Two Bedroom Suites\' private vehicle. The Pangolin Experience has a minimum age of 12. Walking safaris require guests to be at least 16. Our family experiences are designed for children 4 and above.',
      },
      {
        question: 'Is babysitting available?',
        answer: 'Yes, we can arrange qualified babysitting services with advance notice. This allows parents to enjoy activities unsuitable for younger children. Please inform us of your requirements when booking.',
      },
    ],
  },
  {
    title: 'Wildlife & Safari',
    items: [
      {
        question: 'What wildlife can we expect to see?',
        answer: 'Manyoni Private Game Reserve is home to the Big 5 (lion, leopard, elephant, rhino, and buffalo), as well as cheetah, wild dog, giraffe, zebra, hippo, and numerous antelope species. Over 400 bird species have been recorded.',
      },
      {
        question: 'How many game drives are included?',
        answer: 'Two game drives are included daily: a morning drive departing at sunrise and an afternoon drive returning after sunset. Each drive lasts approximately 3-4 hours. Additional drives can be arranged at extra cost.',
      },
      {
        question: 'What should I wear on game drives?',
        answer: 'Neutral-colored clothing (khaki, olive, brown) is recommended. Layers are essential as mornings can be cool. Closed shoes, a hat, and sunglasses are advisable. We provide blankets, ponchos, and binoculars.',
      },
    ],
  },
  {
    title: 'Weather & Best Times to Visit',
    items: [
      {
        question: 'What is the best time to visit?',
        answer: 'Manyoni is excellent year-round. Dry winter months (May-September) offer superb game viewing as animals gather at water sources. Summer (October-April) brings lush landscapes, baby animals, and migratory birds.',
      },
      {
        question: 'What is the weather like?',
        answer: 'KwaZulu-Natal enjoys a subtropical climate. Summer temperatures range from 25-35°C with afternoon thunderstorms. Winter days are warm (20-28°C) but mornings and evenings can be cool (8-15°C). Pack layers year-round.',
      },
      {
        question: 'Is malaria a concern?',
        answer: 'Manyoni Private Game Reserve is in a low-risk malaria area. However, we recommend consulting your doctor before travel about prophylactics. We also suggest using insect repellent, especially during summer months.',
      },
    ],
  },
  {
    title: 'Getting There',
    items: [
      {
        question: 'How do we get to Manyoni Ridge?',
        answer: 'The nearest airport is Richards Bay (1.5 hours) or King Shaka International in Durban (3 hours). We can arrange road transfers or charter flights. Detailed directions are provided upon booking confirmation.',
      },
      {
        question: 'Do you offer airport transfers?',
        answer: 'Yes, we offer private road transfers from Richards Bay and Durban airports. Charter flights can also be arranged to nearby airstrips. Transfer rates are available upon request.',
      },
      {
        question: 'Can we self-drive to the lodge?',
        answer: 'Yes, the lodge is accessible by sedan car on tarred and well-maintained gravel roads. We provide detailed driving directions and GPS coordinates. The scenic drive through KwaZulu-Natal is part of the experience.',
      },
    ],
  },
];

export function getFAQByCategory(categoryTitle: string): FAQCategory | undefined {
  return faqCategories.find((category) => category.title === categoryTitle);
}
