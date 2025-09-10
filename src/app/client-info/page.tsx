'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './style.css'

interface SelectedServices {
  [key: string]: string | boolean;
}

const ClientInfoPage: React.FC = () => {
  const [iframeUrl, setIframeUrl] = useState(
    'https://forms.zohopublic.com/t360portal1/form/ClientInfoVersion2/formperma/fLxRX9M5JpogXoZuFpTaHAqplh4d6f3g1smhD5X15ww'
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Retrieve the stored data from localStorage
    const selectedServices: SelectedServices = JSON.parse(
      localStorage.getItem('selectedServices') || '{}'
    );

    // Retrieve the Bundle boolean
    const isBundle = localStorage.getItem('Bundle') === 'true';

    // Log the data for testing
    console.log('Selected Services:', selectedServices);
    console.log('Fantastic+ Bundle Selected:', isBundle);

    // Build query parameters
    const queryParams = new URLSearchParams();

    // Add selected services to query params
    Object.entries(selectedServices).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, String(value));
      }
    });

    // Add bundle parameter if selected
    if (isBundle) {
      queryParams.append('Bundle', 'true');
    }

    // Add any URL search params passed to this page
    searchParams.forEach((value, key) => {
      queryParams.append(key, value);
    });

    // Update iframe URL with parameters
    const baseUrl = 'https://forms.zohopublic.com/t360portal1/form/ClientInfoVersion2/formperma/fLxRX9M5JpogXoZuFpTaHAqplh4d6f3g1smhD5X15ww';
    const finalUrl = queryParams.toString()
      ? `${baseUrl}?${queryParams.toString()}`
      : baseUrl;

    setIframeUrl(finalUrl);

    // Clear localStorage after loading (optional)
    localStorage.removeItem('selectedServices');
    localStorage.removeItem('Bundle');

  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 pt-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
            Client Information
          </h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Please fill out the form below to provide your client information and get started with our services.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-gray-100 overflow-hidden">
        <div className="mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="200">

            {/* Iframe Container */}
            <div className="p-2 sm:p-4 md:p-6 overflow-y-auto scrollbar-hide">
              <div className="relative w-full">
                <iframe
                  id="zohoFrame"
                  aria-label="Client info"
                  className="w-full border-none rounded"
                  style={{
                    height: 'clamp(600px, 80vh, 1024px)',
                    minHeight: '600px'
                  }}
                  src={iframeUrl}
                  title="Client Information Form"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientInfoPage;