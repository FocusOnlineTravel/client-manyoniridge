import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Privacy Policy | Manyoni Ridge Safari Lodge',
  description: 'Privacy policy for Manyoni Ridge Safari Lodge - how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary-dark text-white py-20">
        <div className="container-max">
          <p className="text-primary-gold text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Legal
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium">
            Privacy Policy
          </h1>
        </div>
      </div>

      <Section background="white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-8">
            Last updated: March 2026
          </p>

          <p className="text-gray-700 mb-6">
            At Manyoni Ridge Safari Lodge, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Name, email address, phone number, and postal address</li>
            <li>Booking and reservation details</li>
            <li>Payment information</li>
            <li>Dietary requirements and special requests</li>
            <li>Communication preferences</li>
            <li>Correspondence and feedback</li>
          </ul>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Process and manage your bookings and reservations</li>
            <li>Communicate with you about your stay</li>
            <li>Provide personalized services and accommodate special requests</li>
            <li>Process payments and prevent fraud</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our services and guest experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-gray-700 mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Service providers who assist with bookings, payments, and operations</li>
            <li>Payment processors and financial institutions</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your explicit consent</li>
          </ul>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            5. Data Retention
          </h2>
          <p className="text-gray-700 mb-4">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            6. Your Rights
          </h2>
          <p className="text-gray-700 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Withdraw consent for marketing communications</li>
            <li>Request a copy of your data in a portable format</li>
          </ul>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            7. Cookies and Tracking
          </h2>
          <p className="text-gray-700 mb-4">
            Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            8. Marketing Communications
          </h2>
          <p className="text-gray-700 mb-4">
            With your consent, we may send you marketing emails about our services, special offers, and updates. You can unsubscribe at any time by clicking the unsubscribe link in our emails or contacting us directly.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            9. Children's Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children without parental consent.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            10. Third-Party Links
          </h2>
          <p className="text-gray-700 mb-4">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            11. Changes to This Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last updated" date.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            12. Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <div className="bg-cream p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:info@manyoniridge.com" className="text-primary-gold hover:text-primary-dark transition-colors">
                info@manyoniridge.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> Manyoni Private Game Reserve, KwaZulu-Natal, South Africa
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <p className="text-gray-600 text-sm">
              This privacy policy is compliant with the Protection of Personal Information Act (POPIA) of South Africa.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
