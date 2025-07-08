'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

interface HeroProps {
  website_name: string;
}

const HeroSection: React.FC<HeroProps> = ({ website_name }) => {
  const typedEl = useRef<HTMLSpanElement>(null);

  const typedStrings = [
    "Best-in-class dispatch service",
    "Fully Automated Metric Dashboard With Daily Scores",
    "Available 24/7 for your drivers",
    "High-quality communication",
    "Scorecard analysis and tailored action plans to achieve and maintain Fantastic Plus scores",
    "Customized reports",
    "Daily disputes",
  ];

  useEffect(() => {
    // Initialize Animate On Scroll (AOS)
    AOS.init({
      duration: 1000,
      once: true, // Whether animation should happen only once - while scrolling down
    });

    // Ensure the ref is attached to a DOM element before initializing Typed.js
    if (typedEl.current) {
      const typed = new Typed(typedEl.current, {
        strings: typedStrings,
        typeSpeed: 80,
        backSpeed: 45,
        loop: true,
        showCursor: false,
      });

      // Cleanup function to destroy the Typed instance when the component unmounts
      // This prevents memory leaks
      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <>
      <section id="home" className="pt-20 flex items-center gradient-bg relative overflow-hidden">
        <div className="container mx-auto px-0 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 md:pl-12 z-10">
            {/* "Trucking 360" text with animations */}
            <h1 className="text-5xl font-bold text-white mb-4 md:text-5xl" data-aos="fade-down">
              {website_name}
            </h1>
            <h4 className="text-2xl font-bold text-white mb-4 md:text-4xl" data-aos="fade-up" data-aos-delay="200">
              Your Partner to Fantastic Plus
            </h4>
            <br />
            {/* The span element that Typed.js will target */}
            <span
              ref={typedEl}
              className="text-lg md:text-3xl text-white block"
              data-aos="fade-in"
              data-aos-delay="400"
              style={{ minHeight: '3.5rem' }}
            ></span>
          </div>

          {/* Image container with responsive sizing and positioning */}
          <div className="header-container" data-aos="fade-left" data-aos-delay="600">
            <Image
              src="/images/header.png"
              alt="Truck Image"
              width={1000} // Intrinsic width of the image
              height={750}  // Intrinsic height of the image
              className="header-image"
              priority // Preload this important image
            />
          </div>
        </div>

        {/* Animated background particles */}
        <div className="particles" aria-hidden="true"></div>
      </section>

      {/* CSS for the component */}
      <style>{`
        .typed-container {
          min-height: 3.5rem;
          display: flex;
          align-items: flex-start;
        }
        
        @media (max-width: 768px) {
          .typed-container {
            min-height: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default HeroSection;