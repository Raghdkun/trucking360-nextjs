// components/ParallaxCTASection.tsx
import React from 'react';
import Link from 'next/link'; // Import the Next.js Link component

const CallToAction: React.FC = () => {
  // The path to your image in the `public` directory.
  const backgroundImageUrl = '/images/para.jpg';

  return (
    <section
      className="parallax py-20 bg-fixed bg-cover bg-center"
      // In JSX, inline styles are provided as a JavaScript object.
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="container mx-auto px-6 text-center">
        <div
          className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg inline-block"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <h2
            className="text-3xl font-bold text-primary mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Ready to Optimize Your Logistics?
          </h2>
          <p
            className="text-gray-700 mb-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Let&apos;s discuss how we can streamline your supply chain and improve your bottom line.
          </p>
          {/* Use the Next.js <Link> component for internal navigation */}
          <Link
            href="/booking" // The internal path for the booking page
            className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Book a Meeting
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;