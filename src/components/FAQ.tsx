'use client'
import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItem[] = [
    {
      question: "What services does Trucking 360 provide?",
      answer: "We provide comprehensive dispatch services, automated metric dashboards, 24/7 driver support, route optimization, and detailed performance analytics to help you achieve and maintain Fantastic Plus scores."
    },
    {
      question: "How does the automated dashboard work?",
      answer: "Our dashboard automatically collects and analyzes data from your operations, providing real-time insights, daily scores, performance metrics, and customized reports to help you make informed decisions."
    },
    {
      question: "Is support really available 24/7?",
      answer: "Yes! Our support team is available around the clock to assist your drivers and address any issues that may arise during their routes, ensuring minimal downtime and maximum efficiency."
    },
    {
      question: "How can you help improve our scores?",
      answer: "We provide scorecard analysis, identify improvement areas, create tailored action plans, and offer ongoing support to help you achieve and maintain Fantastic Plus scores consistently."
    },
    {
      question: "What makes your communication different?",
      answer: "We pride ourselves on high-quality, clear communication with both fleet managers and drivers. Our team is trained to provide professional, timely, and effective communication at all times."
    },
    {
      question: "Do you handle daily disputes?",
      answer: "Yes, we manage daily disputes as part of our comprehensive service, working to resolve issues quickly and efficiently to keep your operations running smoothly."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
          {faqs.map((faq, index) => (
            <div 
              key={index} 
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
                      {faq.question}
                    </h3>
                    <span className="text-secondary text-xl font-bold flex-shrink-0">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
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