'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGeneralData } from '@/contexts/GeneralDataContext'

const Header = () => {
  const { generalData, loading, error } = useGeneralData();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false)

  useEffect(() => {
    // Desktop resources dropdown toggle
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element
      const dropdownButton = document.getElementById('resourcesDropdownButton')
      const dropdownMenu = document.getElementById('resourcesDropdownMenu')

      if (dropdownButton && dropdownMenu &&
        !dropdownButton.contains(target) && !dropdownMenu.contains(target)) {
        setIsResourcesOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    document.body.classList.remove('overflow-hidden')
  }

  const handleMobileLinkClick = () => {
    closeMobileMenu()
  }

  // Use API data or fallback to defaults
  const headerData = generalData?.header;
  const btn1Name = headerData?.btn1_name || "Book a Meeting";
  const btn1Link = headerData?.btn1_link || "/booking";
  const btn2Name = headerData?.btn2_name || "Dashboard360";
  const btn2Link = headerData?.btn2_link || "/dashboard360";
  const logoImage = headerData?.logo_image || "/images/logo22.png";

  return (
    <>
      {/* Header */}
      <header id="header" className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md">
        <div className="w-full px-2  py-3">

          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" id="logo" className="text-2xl font-bold text-primary">
              <Image src={logoImage} alt="Trucking 360 Logo" width={120} height={32} className="h-8 w-auto" />
            </Link>

            {/* Mobile Menu Toggle Button (Visible on Mobile & Tablet Only) */}
            <div className="block lg:hidden">
              <button
                id="menu-toggle"
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-secondary focus:outline-none"
              >
                {/* Menu Icon */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            {/* Desktop Navigation Menu (Hidden on Mobile) */}
            <nav id="menu" className="hidden lg:block">
              <ul className="flex flex-row items-center space-x-2  xl:space-x-6">
                <li>
                  <Link href="/why-trucking-360" className="block px-2 xl:px-4 py-2 text-center text-primary hover:text-secondary transition-colors duration-300 font-bold">

                    Why Trucking <span style={{ color: '#e93232' }}>360</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="block px-2 xl:px-4 py-2 text-center text-primary hover:text-secondary transition-colors duration-300 font-bold">
                    Services & Pricing
                  </Link>
                </li>
                {/* <li>
                  <Link href="/contact-us" className="block px-4 py-2 text-center text-primary hover:text-secondary transition-colors duration-300 font-bold">
                    Contact
                  </Link>
                </li> */}
                {/* Resources Dropdown */}
                <li className="relative">
                  <button
                    id="resourcesDropdownButton"
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                    className="block px-2 xl:px-4 py-2 text-center text-primary hover:text-secondary transition-colors duration-300 font-bold focus:outline-none"
                  >
                    Resources
                    <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <ul id="resourcesDropdownMenu" className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ${isResourcesOpen ? '' : 'hidden'}`}>
                    <li><Link href="/newsletter" className="block px-2 xl:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Newsletter</Link></li>
                    {/* <li><Link href="/faqs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">FAQs</Link></li> */}
                    <li><Link href="/comingsoon" className="block px-2 xl:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Free Resources</Link></li>
                  </ul>
                </li>
                {/* "Book a Meeting" Button */}
                <li>
                  <Link href={btn1Link} className="block px-2 xl:px-4 py-2 text-center text-white bg-primary border border-primary hover:bg-white hover:text-secondary rounded transition-colors duration-300 font-bold">
                    {btn1Name}

                  </Link>
                </li>
                <li>
                  <Link href={btn2Link} className="block px-2 xl:px-4 py-2 text-center text-white bg-secondary border border-secondary hover:bg-white hover:text-secondary rounded transition-colors duration-300 font-bold">
                    {btn2Name}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </header>

      {/* Mobile & Tablet Menu Overlay (Hidden on Desktop) */}
      <div id="mobile-menu-overlay" className={`fixed inset-0 h-full bg-gray-900 bg-opacity-50 z-40 lg:hidden ${isMenuOpen ? '' : 'hidden'}`}>
        <div className="bg-white w-full h-full relative">
          {/* Close Button */}
          <button
            id="mobile-menu-close"
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 text-gray-600 hover:text-secondary focus:outline-none"
          >
            {/* Close Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          {/* Navigation Menu for Mobile & Tablet */}
          <nav className="mt-16 px-4">
            <ul className="flex flex-col items-center space-y-6 text-center">
              <li>
                <Link href="/why-trucking-360" onClick={handleMobileLinkClick} className="text-primary text-2xl font-semibold hover:text-secondary transition-colors duration-300">
                  Why Trucking <span style={{ color: '#e93232' }}>360</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" onClick={handleMobileLinkClick} className="text-primary text-2xl font-semibold hover:text-secondary transition-colors duration-300">
                  Services & Pricing
                </Link>
              </li>
              {/* <li>
                <Link href="/contact-us" onClick={handleMobileLinkClick} className="text-primary text-2xl font-semibold hover:text-secondary transition-colors duration-300">
                  Contact
                </Link>
              </li> */}
              {/* Resources Dropdown (Mobile & Tablet) */}
              <li className="relative">
                <button
                  id="mobile-resources-toggle"
                  onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                  className="text-primary text-2xl font-semibold hover:text-secondary transition-colors duration-300 flex items-center"
                >
                  Resources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <ul id="mobile-resources-dropdown" className={`mt-2 space-y-2 ${isMobileResourcesOpen ? '' : 'hidden'}`}>
                  <li><Link href="/newsletter" onClick={handleMobileLinkClick} className="text-primary text-xl hover:text-secondary transition-colors duration-300">Newsletter</Link></li>
                  <li><Link href="/comingsoon" onClick={handleMobileLinkClick} className="text-primary text-xl hover:text-secondary transition-colors duration-300">Free Resources</Link></li>
                  {/* <li><Link href="/faqs" onClick={handleMobileLinkClick} className="text-primary text-xl hover:text-secondary transition-colors duration-300">FAQs</Link></li> */}
                </ul>
              </li>
              <li>
                <Link href="/booking" onClick={handleMobileLinkClick} className="text-primary text-2xl font-semibold hover:text-secondary transition-colors duration-300">
                  Book A Meeting
                </Link>
              </li>
              <li>
                <Link href="/dashboard360" onClick={handleMobileLinkClick} className="text-primary text-2xl font-semibold hover:text-secondary transition-colors duration-300">
                  Dashboard360
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>


    </>
  )
}

export default Header