import { notFound } from 'next/navigation';
import { getPageData } from '@/lib/data';
import { renderSections } from '@/lib/renderSections';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { buildMetadata } from '@/lib/metadata';
import { stripHtml } from '@/lib/utils';
import type { Section } from '@/lib/types';
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

function buildFaqSchema(sections: Section[]) {
  const faqSection = sections.find(
    (s): s is Extract<Section, { type: 'faq_accordion' }> => s.type === 'faq_accordion'
  );
  const questions = faqSection?.props.categories.flatMap((c) => c.items) ?? [];
  if (questions.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": stripHtml(q.question),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripHtml(q.answer),
      },
    })),
  };
}

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

  const faqSchema = buildFaqSchema(page.sections);

  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      {faqSchema && <SchemaMarkup data={faqSchema} />}
      {renderSections(page.sections)}
    </>
  );
}
