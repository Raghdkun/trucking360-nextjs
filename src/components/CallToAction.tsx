import React from 'react';
import Link from 'next/link';
import { useHomepage } from '@/contexts/HomepageContext';
import { getImageUrl } from '@/config/constants';

const CallToAction: React.FC = () => {
  const { homepageData, loading } = useHomepage();
  
  if (loading) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  const meetingData = homepageData?.meeting;
  const backgroundImageUrl = meetingData?.image ? getImageUrl(meetingData.image) : '/images/para.jpg';
  const title = meetingData?.title || 'Ready to Optimize Your Logistics?';
  const description = meetingData?.description || "Let's discuss how we can streamline your supply chain and improve your bottom line.";
  const buttonText = meetingData?.btn_name || 'Book a Meeting';
  const buttonLink = meetingData?.btn_link || '/booking';

  return (
    <section
      className="parallax py-20 bg-fixed bg-cover bg-center"
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
            {title}
          </h2>
          <div
            className="text-gray-700 mb-6"
            data-aos="fade-up"
            data-aos-delay="400"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <Link
            href={buttonLink}
            className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;