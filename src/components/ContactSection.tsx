'use client';

import React, { useState } from 'react';
// Import icons from the react-icons library
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

// Define the types for the props this component will accept
interface ContactSectionProps {
  address: string;
  phone: string;
  email: string;
  cognitoWebhookUrl: string; // The webhook URL will be passed as a prop
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactSection: React.FC<ContactSectionProps> = ({ address, phone, email, cognitoWebhookUrl }) => {
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
      const response = await fetch(cognitoWebhookUrl, {
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
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-12" data-aos="fade-up">
          Contact Us
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="200">
          <div className="flex flex-col md:flex-row">
            {/* Contact Information */}
            <div className="md:w-1/2 p-8 bg-primary text-white" data-aos="fade-right" data-aos-delay="300">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <p className="mb-6 opacity-90">We're here to help and answer any question you might have.</p>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="mr-4 text-secondary text-xl" />
                <span>{address}</span>
              </div>
              <div className="flex items-center mb-4">
                <FaPhone className="mr-4 text-secondary text-xl" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-4 text-secondary text-xl" />
                <span>{email}</span>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-1/2 p-8" data-aos="fade-left" data-aos-delay="400">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" required></textarea>
                </div>
                <div>
                  <button type="submit" disabled={submissionStatus === 'submitting'} className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {/* User Feedback Messages */}
                {submissionStatus === 'success' && (
                  <p className="text-green-600 text-center font-semibold">Thank you! Your message has been sent successfully.</p>
                )}
                {submissionStatus === 'error' && (
                  <p className="text-red-600 text-center font-semibold">Something went wrong. Please try again later.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;