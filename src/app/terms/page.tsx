import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Manyoni Ridge Safari Lodge',
  description: 'Terms and conditions for booking and staying at Manyoni Ridge Safari Lodge.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary-dark text-white py-20">
        <div className="container-max">
          <p className="text-primary-gold text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Legal
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium">
            Terms & Conditions
          </h1>
        </div>
      </div>

      <Section background="white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-8">
            Last updated: March 2026
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            1. Booking & Reservations
          </h2>
          <p className="text-gray-700 mb-4">
            All bookings are subject to availability and must be confirmed in writing by Manyoni Ridge Safari Lodge. A deposit is required to secure your reservation, with the balance due prior to arrival as specified in your booking confirmation.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            2. Cancellation Policy
          </h2>
          <p className="text-gray-700 mb-4">
            Cancellations must be made in writing. Cancellation terms and any applicable fees will be outlined in your booking confirmation. We recommend purchasing travel insurance to protect against unforeseen circumstances.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            3. Payment Terms
          </h2>
          <p className="text-gray-700 mb-4">
            Payment can be made by bank transfer or credit card. All rates are quoted in South African Rand (ZAR) unless otherwise specified. Rates are subject to change without notice until a booking is confirmed.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            4. Check-in & Check-out
          </h2>
          <p className="text-gray-700 mb-4">
            Standard check-in time is 14:00 and check-out time is 11:00. Early check-in or late check-out may be available upon request and subject to availability and additional charges.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            5. Guest Conduct
          </h2>
          <p className="text-gray-700 mb-4">
            Guests are expected to respect the property, wildlife, staff, and other guests. We reserve the right to refuse service or ask guests to leave if their behavior is deemed inappropriate or disruptive.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            6. Safari Activities & Safety
          </h2>
          <p className="text-gray-700 mb-4">
            All safari activities are conducted under the guidance of experienced guides. Guests must follow all safety instructions. Manyoni Ridge Safari Lodge is not liable for injury or loss resulting from failure to follow safety guidelines.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            7. Liability
          </h2>
          <p className="text-gray-700 mb-4">
            While we take every precaution to ensure guest safety, participation in safari activities is at your own risk. We recommend comprehensive travel and medical insurance. The lodge is not responsible for loss or damage to personal belongings.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            8. Children
          </h2>
          <p className="text-gray-700 mb-4">
            Children are welcome at Manyoni Ridge Safari Lodge. However, certain activities may have age restrictions for safety reasons. Children must be supervised by parents or guardians at all times.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            9. Special Requests
          </h2>
          <p className="text-gray-700 mb-4">
            We will do our best to accommodate special requests such as dietary requirements, room preferences, or accessibility needs. However, such requests cannot be guaranteed and are subject to availability.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            10. Force Majeure
          </h2>
          <p className="text-gray-700 mb-4">
            Manyoni Ridge Safari Lodge is not liable for failure to perform its obligations due to circumstances beyond our control, including but not limited to natural disasters, strikes, or government actions.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            11. Photography & Marketing
          </h2>
          <p className="text-gray-700 mb-4">
            Images and videos may be taken during your stay for marketing purposes. If you do not wish to be featured in marketing materials, please inform our staff.
          </p>

          <h2 className="font-heading text-2xl font-medium text-primary-dark mt-8 mb-4">
            12. Governing Law
          </h2>
          <p className="text-gray-700 mb-4">
            These terms and conditions are governed by the laws of South Africa. Any disputes will be subject to the jurisdiction of South African courts.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-gray-600">
              For questions about these terms and conditions, please contact us at{' '}
              <a href="mailto:info@manyoniridge.com" className="text-primary-gold hover:text-primary-dark transition-colors">
                info@manyoniridge.com
              </a>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
