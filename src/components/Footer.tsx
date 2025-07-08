'use client';

import Link from 'next/link';

// Define a type for the settings prop for better type-safety (optional but recommended)
// interface Settings {
//   description: string;
//   linkedin_link: string;
//   facebook_link: string;
//   address: string;
//   phone: string;
//   email: string;
// }

const Footer = ({ settings }) => {
  // A default settings object to prevent errors if the prop is not provided
  const defaultSettings = {
    description: "Trucking 360 is your dedicated partner for achieving Fantastic+ results in the Amazon Freight Partner (AFP) program.",
    linkedin_link: "#",
    facebook_link: "#",
    address: "620 E. Broad St. Suite U Columbus, OH 43215",
    phone: "(614)359-6306",
    email: "Contact@trucking360solutions.com"
  };

  const currentSettings = settings || defaultSettings;
  const mapsQuery = encodeURIComponent(currentSettings.address);
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

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Description */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Trucking 360</h3>
            <p className="mb-4 text-sm md:text-base font-bold">{currentSettings.description}</p>
            <div className="flex space-x-4">
              <a href={currentSettings.linkedin_link} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-colors duration-300">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href={currentSettings.facebook_link} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-secondary transition-colors duration-300">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
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
                  href="#faqs" 
                  onClick={(e) => handleSmoothScroll(e, 'faqs')}
                  className="hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  FAQs
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
                  href="#contact" 
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                  className="hover:text-secondary transition-colors duration-300 cursor-pointer"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Contact Info</h3>

            {/* Address */}
            <p className="mb-2 text-sm md:text-base flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-secondary"></i>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors duration-300">
                {currentSettings.address}
              </a>
            </p>

            {/* Phone */}
            <p className="mb-2 text-sm md:text-base flex items-center">
              <i className="fas fa-phone mr-2 text-secondary"></i>
              <a href={`tel:${currentSettings.phone}`} className="text-white hover:text-secondary transition-colors duration-300">
                {currentSettings.phone}
              </a>
            </p>

            {/* Email */}
            <p className="text-sm md:text-base flex items-center">
              <i className="fas fa-envelope mr-2 text-secondary"></i>
              <a href={`mailto:${currentSettings.email}`} className="text-white hover:text-secondary transition-colors duration-300 email">
                {currentSettings.email}
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} Trucking 360. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;