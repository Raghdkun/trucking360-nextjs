'use client'
import React, { useState } from 'react'
import { useHomepage } from '@/contexts/HomepageContext'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { homepageData, loading } = useHomepage();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (loading) {
    return (
      <section id='faqs' className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div>Loading FAQs...</div>
        </div>
      </section>
    );
  }

  const faqs = homepageData?.faqs || [];
  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <section id='faqs' className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our services and how we can help your trucking business succeed.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {sortedFaqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="mb-4" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-primary pr-4">
                      {faq.title}
                    </h3>
                    <span className="text-secondary text-xl font-bold flex-shrink-0">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div 
                    className="px-6 pb-4 animate-fadeInSlide"
                    style={{
                      animation: 'fadeInSlide 0.3s ease-out forwards'
                    }}
                  >
                    <div className="border-t border-gray-200 pt-4 some-bottom-padding">
                      <div 
                        className="text-primary leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.description.replace(/\n/g, '<br>') }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ