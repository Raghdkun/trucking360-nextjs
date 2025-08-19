'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

// A simple component for the spinner element
function GlobalSpinner() {
  return (
    <div
      id="globalSpinner"
      className="fixed inset-0 flex justify-center items-center z-[9999]"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 shadow-lg"></div>
        {/* Inner ring for double effect */}
        <div className="absolute top-2 left-2 h-8 w-8 animate-spin rounded-full border-2 border-gray-100 border-t-blue-400" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
      </div>
    </div>
  );
}


export function ClientInitializer({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Hide spinner on initial load and route changes
    setIsLoading(false);

    // If the path changes, it means navigation has occurred.
    if (previousPathname.current !== pathname) {
      // Refresh AOS to detect new elements on the page
      AOS.refresh();
      previousPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    // Initialize AOS library
    AOS.init({
      duration: 1000,
      offset: 120,
      easing: 'ease-in-out',
      once: false, // Set to false to allow re-triggering animations
    });
    
    // Header scroll effect
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add('shadow-md');
        } else {
          header.classList.remove('shadow-md');
        }
      }
      // Refresh AOS on scroll to top
      if (window.scrollY === 0) {
        AOS.refresh();
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Spinner logic for link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        const currentUrl = new URL(window.location.href);
        
        // Don't show spinner for:
        // - External links
        // - Links that open in new tabs
        // - Same-page hash links
        // - Links that navigate to the exact same page (same pathname)
        if (url.origin === window.location.origin && 
            anchor.target !== '_blank' && 
            !anchor.href.includes('#') &&
            url.pathname !== currentUrl.pathname) {
          setIsLoading(true);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <>
      {isLoading && <GlobalSpinner />}
      {children}
    </>
  );
}