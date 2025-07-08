'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function ComingSoon() {
  useEffect(() => {
    const timeouts = [
      setTimeout(() => {
        const topSection = document.getElementById('topSection');
        if (topSection) {
          topSection.classList.add('animate-slide-up');
          topSection.classList.remove('opacity-0');
        }
      }, 0),
      
      setTimeout(() => {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
          mainContent.classList.add('animate-slide-up');
          mainContent.classList.remove('opacity-0');
        }
      }, 200),
      
      setTimeout(() => {
        const rocketSection = document.getElementById('rocketSection');
        if (rocketSection) {
          rocketSection.classList.add('animate-slide-up');
          rocketSection.classList.remove('opacity-0');
          rocketSection.style.visibility = 'visible';
        }
      }, 400),
      
      setTimeout(() => {
        const bottomSection = document.getElementById('bottomSection');
        if (bottomSection) {
          bottomSection.classList.add('animate-slide-up');
          bottomSection.classList.remove('opacity-0');
        }
      }, 600)
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .enhanced-gradient {
          background: linear-gradient(-45deg, #2e368f, #4a51a8, #e93232, #ed5858);
          background-size: 400% 400%;
          opacity: 0.8;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(45deg, #e93232, #2e368f);
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .mobile-video {
          display: none;
        }

        .tablet-video {
          display: none;
        }

        .desktop-video {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        @media (max-width: 768px) {
          .desktop-video {
            display: none;
          }
          .mobile-video {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
          }
        }

        @media (min-width: 820px) and (max-width: 1024px) {
          .desktop-video {
            display: none;
          }
          .mobile-video {
            display: none;
          }
          .tablet-video {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
          }
          #mainContent {
            align-items: flex-start;
          }
        }

        @media (max-width: 348px) {
          #mainContent {
            margin-top: 4rem;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes slideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div className="min-h-screen enhanced-gradient flex flex-col justify-between p-6 md:p-12 text-white overflow-hidden relative" id="screen">
        {/* Video Background */}
        <video autoPlay muted loop className="video-background desktop-video">
          <source src="/videos/dashboard.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <video autoPlay muted loop className="video-background mobile-video">
          <source src="/videos/dashboardmobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <video autoPlay muted loop className="video-background tablet-video">
          <source src="/videos/dashboardtablet.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-[#e93232]/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div 
            className="absolute -right-1/4 -bottom-1/4 w-3/4 h-3/4 bg-[#2e368f]/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '-2s' }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-center flex-grow">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 opacity-0" id="mainContent">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              The Future is <br /> <span className="text-gradient">Coming Soon</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-lg">
              We're crafting something extraordinary. Prepare to experience innovation like never before.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center opacity-0" id="rocketSection" style={{ visibility: 'hidden' }}>
            <div className="relative">
              <div className="w-64 h-64 md:w-96 md:h-96 bg-white/20 rounded-full flex items-center justify-center animate-float opacity-75">
                <Image 
                  className="md:opacity-100" 
                  src="/images/logo22.png" 
                  alt="Trucking 360 Logo"
                  width={250}
                  height={250}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}