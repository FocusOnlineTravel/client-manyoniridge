import { FAQCategory } from '@/lib/types';

export const faqCategories: FAQCategory[] = [
  {
    title: 'Rates & Inclusions',
    items: [
      {
        question: 'What is included in the rates?',
        answer: 'Our all-inclusive rates cover accommodation, all meals, selected beverages (house wines, local beers, spirits, and soft drinks), two game drives daily, and Wi-Fi.',
      },
      {
        question: 'Is there a minimum stay requirement?',
        answer: 'Yes, we require a minimum stay of 2 consecutive nights to fully experience Manyoni Ridge and the reserve.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), bank transfers, and PayFast.',
      },
    ],
  },
  {
    title: 'Cancellation Policy',
    items: [
      {
        question: 'What is your cancellation policy?',
        answer: 'Please refer to our full terms and conditions for complete cancellation details.',
      },
      {
        question: 'Can I reschedule my booking?',
        answer: 'Rescheduling requests must be made in writing and will be considered on a case-by-case basis, subject to availability. Please contact our reservations team to discuss your requirements.',
      },
      {
        question: 'Is travel insurance required?',
        answer: 'Yes, comprehensive travel insurance is compulsory for all guests. Your policy should cover trip cancellation, medical expenses, and emergency evacuation. Safari destinations can be remote, and adequate insurance is essential for your protection.',
      },
    ],
  },
  {
    title: 'Children & Family',
    items: [
      {
        question: 'Is Manyoni Ridge suitable for children?',
        answer: 'Our Two Bedroom Villas are perfect for families. We also offer babysitting services with advance notice. Children must be supervised at all times due to the presence of wildlife.',
      },
      {
        question: 'What age restrictions apply to game drives?',
        answer: 'For safety reasons, children under 6 years are not permitted on standard game drives. Children aged 6-11 may join game drives at the discretion of lodge management and the assigned guide. For children under 12, we offer a child-friendly "Bumble" safari experience after the game drive, providing a fun and age-appropriate introduction to the bush.',
      },
      {
        question: 'Is babysitting available?',
        answer: 'Yes, professional childcare services are available on request, subject to availability, should parents wish to enjoy activities independently. Please inform us of your requirements when booking.',
      },
      {
        question: 'What are the supervision requirements for children?',
        answer: 'All children under the age of 18 must be accompanied onto the lodge premises. Children under 14 must be supervised at all times while on site by a parent or guardian, unless a babysitter has been pre-arranged with the lodge.',
      },
      {
        question: 'Are the pools safe for children?',
        answer: 'Please note that our pools are unfenced and there is no lifeguard on duty. Extra caution must be taken by parents with children, and children may never swim alone. Parents and guardians are responsible for supervising children at all times around water.',
      },
    ],
  },
  {
    title: 'Wildlife & Safari',
    items: [
      {
        question: 'What wildlife can we expect to see?',
        answer: 'Manyoni Private Game Reserve is home to the Big 5 (lion, leopard, elephant, rhino, and buffalo), as well as cheetah, giraffe, zebra, hippo, and numerous antelope species. Over 400 bird species have been recorded.',
      },
      {
        question: 'Is the lodge fenced?',
        answer: 'Yes, the lodge is fenced with an electric game fence. However, wild animals may still enter the property from time to time and roam the lodge grounds. Guests should always exercise caution when moving around the lodge premises, particularly at night.',
      },
      {
        question: 'Can we interact with the wildlife?',
        answer: 'No, all animals at Manyoni are wild and must never be touched or fed, whether encountered at the lodge or on the reserve. Please maintain a safe distance at all times and follow your guide\'s instructions during game activities.',
      },
      {
        question: 'Are there snakes or other dangerous creatures?',
        answer: 'As we are in the African bush, snakes and scorpions may be encountered. We recommend wearing long pants and closed shoes, especially at night and during safari activities. Always use a torch when walking at night and check your shoes before putting them on.',
      },
      {
        question: 'How many game drives are included?',
        answer: 'Two game drives are included daily: a morning drive departing at sunrise and an afternoon drive returning after sunset. Each drive lasts approximately 3-4 hours.',
      },
      {
        question: 'What should I wear on game drives?',
        answer: 'Neutral-colored clothing (khaki, olive, brown) is recommended. Layers are essential as mornings can be cool. Closed shoes, a hat, and sunglasses are advisable. We provide blankets, ponchos, and binoculars.',
      },
      {
        question: 'Is the lodge fenced?',
        answer: 'Yes, the lodge is fenced with an electric game fence. However, wild animals may still enter the property from time to time and roam the lodge grounds. Guests should always exercise caution when moving around the lodge premises, particularly at night.',
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
        answer: 'KwaZulu-Natal enjoys a subtropical climate. Summer temperatures range from 25-35°C with afternoon thunderstorms - we recommend applying sunscreen regularly, dressing appropriately for the heat, and staying well hydrated throughout your stay. Winter days are warm (20-28°C) but mornings and evenings can be cool (8-15°C). Pack layers year-round.',
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
