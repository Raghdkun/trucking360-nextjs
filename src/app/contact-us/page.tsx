'use client';

import React, { useState, useRef } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactUsPage: React.FC = () => {
  // State to hold the form input values
  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState('');
  
  // State to manage the form submission process
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Contact information
  const contactInfo = {
    address: "123 Business Street, Suite 100, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@trucking360.com"
  };

  // Function to handle form submission without redirect
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus('submitting');

    // Submit the form to hidden iframe
    if (formRef.current) {
      formRef.current.submit();
    }

    // Show success message after a short delay
    setTimeout(() => {
      setSubmissionStatus('success');
      // Clear the form on success
      setName('');
      setEmailInput('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 pt-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" data-aos="fade-up">
            Contact Us
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-center" data-aos="fade-up" data-aos-delay="200">
            Get in touch with our team. We're here to help and answer any questions you might have.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <div className="flex flex-col md:flex-row">
              {/* Contact Information */}
              <div className="md:w-1/2 p-8 bg-primary text-white" data-aos="fade-right" data-aos-delay="300">
                <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                <p className="mb-6 opacity-90">We&apos;re here to help and answer any question you might have.</p>
                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="mr-4 text-secondary text-xl" />
                  <span>{contactInfo.address}</span>
                </div>
                <div className="flex items-center mb-4">
                  <FaPhone className="mr-4 text-secondary text-xl" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-4 text-secondary text-xl" />
                  <span>{contactInfo.email}</span>
                </div>
              </div>

              {/* Contact Form - Zoho Form Submission without redirect */}
              <div className="md:w-1/2 p-8" data-aos="fade-left" data-aos-delay="400">
                <div className="zf-templateWrapper">
                  <div className="zf-tempHeadBdr mb-6">
                    <div className="zf-tempHeadContBdr">
                      <h2 className="zf-frmTitle text-2xl font-semibold text-gray-800 mb-2">
                        {/* <em>Contact Us</em> */}
                      </h2>
                      <div className="zf-clearBoth"></div>
                    </div>
                  </div>
                  
                  {/* Hidden iframe to prevent redirect */}
                  <iframe 
                    name="hidden_iframe" 
                    style={{ display: 'none' }}
                    title="Hidden iframe for form submission"
                  ></iframe>
                  
                  {/* Form submission to Zoho via hidden iframe */}
                  <form 
                    ref={formRef}
                    action="https://forms.zohopublic.com/t360portal1/form/ContactUs/formperma/oyLkZv0FG2-qL070REyHnMc1ydI-DQX0ZBgAoOufeiA/htmlRecords/submit"
                    method="POST"
                    acceptCharset="UTF-8"
                    encType="multipart/form-data"
                    target="hidden_iframe"
                    onSubmit={handleSubmit}
                    className="zf-subContWrap zf-topAlign"
                  >
                    {/* Hidden fields required by Zoho */}
                    <input type="hidden" name="zf_referrer_name" value="" />
                    <input type="hidden" name="zf_redirect_url" value="" />
                    <input type="hidden" name="zc_gad" value="" />
                    
                    <div className="space-y-4">
                      {/* Name Field */}
                      <div className="zf-tempFrmWrapper zf-large">
                        <label className="zf-labelName block text-sm font-medium text-gray-700 mb-1">
                          Name
                          <em className="zf-important text-red-500"> *</em>
                        </label>
                        <div className="zf-tempContDiv">
                          <span>
                            <input 
                              type="text" 
                              name="SingleLine" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)} 
                              maxLength={255} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                              required 
                            />
                          </span>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>

                      {/* Email Field */}
                      <div className="zf-tempFrmWrapper zf-large">
                        <label className="zf-labelName block text-sm font-medium text-gray-700 mb-1">
                          Email
                          <em className="zf-important text-red-500"> *</em>
                        </label>
                        <div className="zf-tempContDiv">
                          <span>
                            <input 
                              type="email" 
                              name="Email" 
                              value={emailInput} 
                              onChange={(e) => setEmailInput(e.target.value)} 
                              maxLength={255} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                              required 
                            />
                          </span>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>

                      {/* Message Field */}
                      <div className="zf-tempFrmWrapper zf-large">
                        <label className="zf-labelName block text-sm font-medium text-gray-700 mb-1">
                          Message
                          <em className="zf-important text-red-500"> *</em>
                        </label>
                        <div className="zf-tempContDiv">
                          <span>
                            <textarea 
                              name="MultiLine" 
                              rows={4} 
                              value={message} 
                              onChange={(e) => setMessage(e.target.value)} 
                              maxLength={65535} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                              required
                            ></textarea>
                          </span>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="zf-fmFooter mt-6">
                      <button 
                        type="submit" 
                        disabled={submissionStatus === 'submitting'}
                        className="zf-submitColor w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {submissionStatus === 'submitting' ? 'Sending...' : 'Submit'}
                      </button>
                    </div>

                    {/* User Feedback Messages */}
                    {submissionStatus === 'success' && (
                      <p className="text-green-600 text-center font-semibold mt-4">Thank you! Your message has been sent successfully.</p>
                    )}
                    {submissionStatus === 'error' && (
                      <p className="text-red-600 text-center font-semibold mt-4">Something went wrong. Please try again later.</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default ContactUsPage;