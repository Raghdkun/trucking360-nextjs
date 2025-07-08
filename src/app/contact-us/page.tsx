'use client';

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactPage: React.FC = () => {
  // Contact information - you can update these values as needed
  const contactInfo = {
    address: "123 Main Street, Your City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@trucking360.com",
    cognitoWebhookUrl: "https://your-webhook-url.com/contact" // Update with your actual webhook URL
  };

  // State to hold the form input values
  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState('');
  
  // State to manage the form submission process
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');

  // Async function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission (page reload)
    setSubmissionStatus('submitting');

    const formData = {
      Name: name,
      Email: emailInput,
      Message: message,
    };

    try {
      const response = await fetch(contactInfo.cognitoWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        // Clear the form on success
        setName('');
        setEmailInput('');
        setMessage('');
      } else {
        // Handle server-side validation errors or other issues
        setSubmissionStatus('error');
      }
    } catch (error) {
      // Handle network errors
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Contact Information */}
      <div className="md:w-1/2 p-8 md:p-16 bg-primary text-white flex flex-col justify-center" data-aos="fade-right" data-aos-delay="100" data-aos-duration="800">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className="mb-8 opacity-90 text-lg">We&apos;re here to help and answer any question you might have.</p>
          <div className="space-y-6">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-4 text-secondary text-2xl" />
              <span className="text-lg">{contactInfo.address}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-4 text-secondary text-2xl" />
              <span className="text-lg">{contactInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-4 text-secondary text-2xl" />
              <span className="text-lg">{contactInfo.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="md:w-1/2 p-8 md:p-16 lg:p-20 bg-gray-50 flex flex-col justify-center" data-aos="fade-left" data-aos-delay="200" data-aos-duration="800">
        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg transition-all duration-300" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={emailInput} 
                onChange={(e) => setEmailInput(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg transition-all duration-300" 
                required 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={6} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg transition-all duration-300 resize-none" 
                required
              ></textarea>
            </div>
            <div>
              <button 
                type="submit" 
                disabled={submissionStatus === 'submitting'} 
                className="w-full bg-secondary text-white px-6 py-4 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold transform hover:scale-105 active:scale-95"
              >
                {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {/* User Feedback Messages */}
            {submissionStatus === 'success' && (
              <p className="text-green-600 text-center font-semibold text-lg animate-fade-in">Thank you! Your message has been sent successfully.</p>
            )}
            {submissionStatus === 'error' && (
              <p className="text-red-600 text-center font-semibold text-lg animate-fade-in">Something went wrong. Please try again later.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;