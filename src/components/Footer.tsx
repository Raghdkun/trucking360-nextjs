'use client';

import Link from 'next/link';
import { useGeneralData } from '@/contexts/GeneralDataContext';

const Footer = () => {
  const { generalData, loading, error } = useGeneralData();

  // Use API data or fallback to defaults
  const footerData = generalData?.footer;
  const title = footerData?.title || "Trucking 360";
  const description = footerData?.description || "Trucking 360 is your dedicated partner for achieving Fantastic+ results in the Amazon Freight Partner (AFP) program.";
  const location = footerData?.location || "620 E. Broad St. Suite U Columbus, OH 43215";
  const phone = footerData?.phone || "(614)359-6306";
  const email = footerData?.email || "Contact@trucking360solutions.com";
  const linkedinUrl = footerData?.linkedin_url || "#";
  const facebookUrl = footerData?.facebook_url || "#";

  const mapsQuery = encodeURIComponent(location);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Strip HTML tags and remove duplication
  const cleanDescription = (() => {
    let clean = description.replace(/<[^>]*>/g, '');

    // Check if the text is duplicated (same text appears twice)
    const words = clean.split(' ');
    const halfLength = Math.floor(words.length / 2);
    const firstHalf = words.slice(0, halfLength).join(' ');
    const secondHalf = words.slice(halfLength).join(' ');

    // If first half equals second half, it's duplicated
    if (firstHalf === secondHalf && firstHalf.length > 0) {
      return firstHalf;
    }

    return clean;
  })();

  return (
    <footer className="bg-gray-800 text-white py-12 mt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Description */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
            <p className="mb-4 text-sm md:text-base font-bold">{cleanDescription}</p>
            <div className="flex space-x-4">
              {linkedinUrl && linkedinUrl !== "#" && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-colors duration-300">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {facebookUrl && facebookUrl !== "#" && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-colors duration-300">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links - Preserved as requested */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#why-t360"
                  onClick={(e) => handleSmoothScroll(e, 'why-t360')}
                  className="hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  Why Trucking 360
                </a>
              </li>

              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleSmoothScroll(e, 'pricing')}
                  className="hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  Services & Pricing
                </a>
              </li>
              <li>
                <a
                  href="/dashboard360"
                  className="hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  Dashboard360
                </a>
              </li>
              <li>
                <Link
                  href="/newsletter"
                  className="hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Updated with API data */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Contact Info</h3>

            {/* Address */}
            <p className="mb-2 text-sm md:text-base flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-secondary"></i>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors duration-300">
                {location}
              </a>
            </p>

            {/* Phone */}
            <p className="mb-2 text-sm md:text-base flex items-center">
              <i className="fas fa-phone mr-2 text-secondary"></i>
              <a href={`tel:${phone}`} className="text-white hover:text-secondary transition-colors duration-300">
                {phone}
              </a>
            </p>

            {/* Email */}
            <p className="text-sm md:text-base flex items-center">
              <i className="fas fa-envelope mr-2 text-secondary"></i>
              <a href={`mailto:${email}`} className="text-white hover:text-secondary transition-colors duration-300 email">
                {email}
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} {title}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;