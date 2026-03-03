import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Dark header area for navigation visibility */}
      <div className="h-32 bg-primary-dark"></div>

      <div className="flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="font-heading text-8xl md:text-9xl text-primary-gold font-medium mb-4">
              404
            </h1>
            <h2 className="font-heading text-3xl md:text-4xl text-primary-dark font-medium mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              The page you're looking for seems to have wandered off into the bush. Let's get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" size="lg">
              Return Home
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-300">
            <p className="text-gray-600 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/accommodations" className="text-primary-dark hover:text-primary-gold transition-colors">
                Accommodations
              </Link>
              <Link href="/activities" className="text-primary-dark hover:text-primary-gold transition-colors">
                Activities
              </Link>
              <Link href="/dining" className="text-primary-dark hover:text-primary-gold transition-colors">
                Dining
              </Link>
              <Link href="/reserve" className="text-primary-dark hover:text-primary-gold transition-colors">
                The Reserve
              </Link>
              <Link href="/rates" className="text-primary-dark hover:text-primary-gold transition-colors">
                Rates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
