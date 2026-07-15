import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.manyoniridge.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "FAQ",
      "item": "https://www.manyoniridge.com/faq"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When does Manyoni Ridge open?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manyoni Ridge Safari Lodge is opening in November 2026. You can subscribe to receive exclusive early booking offers and updates."
      }
    },
    {
      "@type": "Question",
      "name": "What animals can I see at Manyoni Ridge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manyoni Ridge is located in Manyoni Private Game Reserve, a Big 5 reserve home to lion, leopard, elephant, rhino, and buffalo. The reserve also has over 400 bird species and rare wildlife including pangolin."
      }
    },
    {
      "@type": "Question",
      "name": "Is Manyoni Ridge all-inclusive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Manyoni Ridge offers an all-inclusive luxury experience including accommodation, meals, game drives, and guided activities."
      }
    },
    {
      "@type": "Question",
      "name": "How many suites does Manyoni Ridge have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manyoni Ridge has only 9 exclusive suites, ensuring an intimate and personalised safari experience for every guest."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Manyoni Ridge located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Manyoni Ridge is nestled within Manyoni Private Game Reserve in the north-eastern region of KwaZulu-Natal, South Africa."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make a booking or enquiry at Manyoni Ridge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact Manyoni Ridge by calling +27 (0)82 892 0598, emailing enquiries@manyoniridge.com, or using the enquiry form at https://www.manyoniridge.com/contact"
      }
    }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('faq');

  if (!page) {
    return {
      title: 'FAQ | Manyoni Ridge Safari Lodge',
      alternates: { canonical: '/faq' },
    };
  }

  return buildMetadata(page.meta, '/faq');
}

export default async function FAQPage() {
  const page = await getPageData('faq');

  if (!page) {
    notFound();
  }

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      <SchemaMarkup data={faqSchema} />
      {renderSections(page.sections)}
    </>
  );
}
