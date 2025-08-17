'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Typed from 'typed.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useHomepage } from '@/contexts/HomepageContext';
import { getImageUrl } from '@/config/constants';

interface HeroProps {
  website_name?: string;
}

const HeroSection: React.FC<HeroProps> = ({ website_name }) => {
  const typedEl = useRef<HTMLSpanElement>(null);
  const { homepageData, loading } = useHomepage();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    if (typedEl.current && homepageData?.hero?.animated_texts) {
      const typed = new Typed(typedEl.current, {
        strings: homepageData.hero.animated_texts,
        typeSpeed: 80,
        backSpeed: 45,
        loop: true,
        showCursor: false,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [homepageData]);

  if (loading) {
    return (
      <section id="home" className="pt-20 flex items-center gradient-bg relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-0 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </section>
    );
  }

  const heroData = homepageData?.hero;
  const displayTitle = heroData?.title || website_name || 'Trucking360';
  const displayDescription = heroData?.description || 'Your Partner to Fantastic Plus';
  const heroImage = heroData?.image ? getImageUrl(heroData.image) : '/images/header.png';

  return (
    <>
      <section id="home" className="pt-20 flex items-center gradient-bg relative overflow-hidden">
        <div className="container mx-auto px-0 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 md:pl-12 z-10">
            <h1 className="text-4xl font-bold text-white mb-4 md:text-5xl" data-aos="fade-down">
              {displayTitle}
            </h1>
            <h4 className="text-xl font-bold text-white mb-4 md:text-3xl" data-aos="fade-up" data-aos-delay="200">
              {displayDescription}
            </h4>
            <br />
            <span
              ref={typedEl}
              className="text-lg md:text-2xl text-white block"
              data-aos="fade-in"
              data-aos-delay="400"
              style={{ minHeight: '3.5rem' }}
            ></span>
          </div>

          <div className="header-container" data-aos="fade-left" data-aos-delay="600">
            <Image
              src={heroImage}
              alt="Hero Image"
              width={1000}
              height={750}
              className="header-image"
              priority
            />
          </div>
        </div>

        <div className="particles" aria-hidden="true"></div>
      </section>

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