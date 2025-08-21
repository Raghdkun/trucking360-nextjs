'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useHomepage } from '@/contexts/HomepageContext';
import { getImageUrl } from '@/config/constants';

// Core Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Reusable Checkmark Icon component for lists
const CheckmarkIcon = () => (
  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-4">
    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const DashboardSlider: React.FC = () => {
  const { homepageData, loading } = useHomepage();
  // State for controlling the image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  const openImageModal = (src: string) => {
    setModalImageSrc(src);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImageSrc('');
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  if (loading) {
    return (
      <section id="dashboard-slide" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div>Loading dashboard slides...</div>
        </div>
      </section>
    );
  }

  // Get sliders from API data, fallback to empty array
  const sliders = homepageData?.sliders || [];
  const sortedSliders = [...sliders].sort((a, b) => a.order - b.order);

  // Transform API data to match component structure
  const slideData = sortedSliders.map(slider => ({
    imgSrc: slider.image ? getImageUrl(slider.image.trim()) : '/images/1.jpg',
    imgAlt: slider.title || 'Dashboard Image',
    title: slider.title || '',
    description: slider.description || '',
    features: slider.features ? slider.features.split('\r\n').filter((feature: string) => feature.trim()) : [],
  }));

  // If no sliders from API, use fallback data
  const fallbackSlideData = [
    {
      imgSrc: '/images/1.jpg',
      imgAlt: 'Dashboard Analytics',
      title: 'One Dashboard',
      description: 'No more wasting hours jumping between portals. Get one centralized command center that simplifies, sharpens, and accelerates your operations.',
      features: [
        'Daily performance metrics updated automatically',
        'Visual representation of key performance indicators',
      ],
    },
    {
      imgSrc: '/images/2.jpg',
      imgAlt: 'Performance Tracking',
      title: 'What Makes it Unstoppable',
      description: '',
      features: [
        'All-in-One Access',
        'Real-Time + Daily Updates',
        'Data-Driven Coaching, Automated',
        'Tactical & Strategic Insights',
        'Multi-User, Role-Based Access',
        'Top & Bottom Performer Highlight',
        'One-Click Report',
      ],
    },
  ];

  const finalSlideData = slideData.length > 0 ? slideData : fallbackSlideData;

  return (
    <>
      <section id="dashboard-slide" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Introducing Dashboard <span className="text-secondary">360</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">
              Fully Automated – No Manual Entry by the User
            </h3>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Updated Daily
              </span>
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Daily Scores
              </span>
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Real-Time Analytics
              </span>
            </div>
          </div>

          {/* Swiper Slider Component */}
          <div className="relative" data-aos="fade-up" data-aos-delay="200">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={true}
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                reverseDirection: false,
                stopOnLastSlide: false,
                waitForTransition: true,
              }}
              speed={800}
              slidesPerView={1}
              spaceBetween={30}
              allowTouchMove={true}
              touchStartPreventDefault={false}
              pagination={{
                el: '.custom-pagination',
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: '.custom-nav-next',
                prevEl: '.custom-nav-prev',
              }}
              className="dashboardSwiper"
            >
              {finalSlideData.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div
                      className="dashboard-image rounded-lg overflow-hidden relative cursor-pointer"
                      onClick={() => openImageModal(slide.imgSrc)}
                    >
                      <Image
                        src={slide.imgSrc}
                        alt={slide.imgAlt}
                        width={800}
                        height={600}
                        className="w-full h-auto transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="dashboard-content p-4">
                      <h3 className="text-2xl font-bold text-primary mb-4">{slide.title}</h3>
                      {slide.description && (
                        <div 
                          className="text-gray-700 mb-6"
                          dangerouslySetInnerHTML={{ __html: slide.description }}
                        />
                      )}
                      <ul className="space-y-3">
                        {slide.features.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, fIndex: React.Key | null | undefined) => (
                          <li key={fIndex} className="flex items-start">
                            <CheckmarkIcon />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation & Pagination Elements */}
            <div className="custom-nav-prev">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
            <div className="custom-nav-next">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
            <div className="swiper-pagination custom-pagination"></div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          id="imageModal"
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeImageModal} // Close modal on background click
        >
          <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}> {/* Prevents closing when clicking on the image itself */}
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-2 md:top-4 md:right-4 text-white hover:text-red-500 focus:outline-none bg-gray-800 rounded-full p-1"
              aria-label="Close image modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <Image
              id="modalImage"
              src={modalImageSrc}
              alt="Dashboard Full View"
              width={1600}
              height={900}
              className="max-w-full max-h-[80vh] mx-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* All custom CSS is now scoped to this component using JSX-Styled CSS */}
      <style jsx>{`
        /* Swiper Custom Styles */
        .dashboardSwiper {
          padding-bottom: 60px;
          overflow: visible; /* Allows shadows and hover effects to be seen */
        }
        :global(.swiper-slide) {
          background-position: center;
          background-size: cover;
          padding: 20px;
          transition: all 0.5s ease;
          opacity: 0.7;
          transform: scale(0.9);
        }
        :global(.swiper-slide-active) {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Custom Navigation Arrows */
        .custom-nav-next,
        .custom-nav-prev {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        /* Hide navigation buttons on small screens */
        @media (max-width: 767px) {
          .custom-nav-next,
          .custom-nav-prev {
            display: none;
          }
        }
        .custom-nav-next {
          right: -20px;
        }
        .custom-nav-prev {
          left: -20px;
        }
        .custom-nav-next:hover,
        .custom-nav-prev:hover {
          background-color: #3b82f6; /* Example: blue-500 */
          transform: translateY(-50%) scale(1.1);
        }
        .custom-nav-next svg,
        .custom-nav-prev svg {
          width: 20px;
          height: 20px;
          color: #3b82f6;
          transition: color 0.3s ease;
        }
        .custom-nav-next:hover svg,
        .custom-nav-prev:hover svg {
          color: white;
        }
        @media (max-width: 1280px) {
          .custom-nav-next {
            right: 10px;
          }
          .custom-nav-prev {
            left: 10px;
          }
        }
        
        /* Custom Pagination */
        :global(.custom-pagination) {
          bottom: 0px !important;
        }
        :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
          opacity: 0.7;
          transition: all 0.3s ease;
          background-color: #9ca3af; /* gray-400 */
        }
        :global(.swiper-pagination-bullet-active) {
          background-color: #3b82f6 !important; /* blue-500 */
          opacity: 1;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </>
  );
};

export default DashboardSlider;