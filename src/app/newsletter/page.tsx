'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsletterProvider, useNewsletter } from '@/contexts/NewsletterContext';
import './newsletter.css';

const NewsletterContent: React.FC = () => {
  const { data, loading, error } = useNewsletter();

  if (loading) {
    return (
      <div className="newsletter-loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading newsletter articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="newsletter-error">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading newsletter: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.articles || data.articles.length === 0) {
    return (
      <div className="newsletter-empty">
        <p className="text-gray-600">No newsletter articles available.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="newsletter-container">
      <main className="newsletter-main container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16" data-aos="fade-up">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2e368f' }}>
              Newsletter
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with the latest insights, tips, and industry news from Trucking 360
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {data.articles.map((article) => (
              <Link 
                key={article.id} 
                href={`/newsletter/${article.id}`}
                className="group block bg-white round-edges rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.featured_image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(article.custom_date)}
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="mt-4 inline-flex items-center text-primary group-hover:text-secondary transition-colors duration-300">
                    <span className="text-sm font-medium">Read More</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const NewsletterPage: React.FC = () => {
  return (
    <NewsletterProvider>
      <NewsletterContent />
    </NewsletterProvider>
  );
};

export default NewsletterPage;