'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { NewsletterProvider, useNewsletter } from '@/contexts/NewsletterContext';
import { Article } from '@/config/constants';

const ArticleContent: React.FC = () => {
  const params = useParams();
  const { data, loading, error } = useNewsletter();
  const articleId = parseInt(params.id as string);

  if (loading) {
    return (
      <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center pt-20 pb-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center pt-20 pb-24">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading article: {error}</p>
          <Link href="/newsletter" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80">
            Back to Newsletter
          </Link>
        </div>
      </div>
    );
  }

  const article = data?.articles.find((a: Article) => a.id === articleId);

  if (!article) {
    return (
      <div className="bg-gray-100 font-sans min-h-screen flex items-center justify-center pt-20 pb-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/newsletter" className="bg-primary text-white px-6 py-3 rounded hover:bg-opacity-80 transition-colors">
            Back to Newsletter
          </Link>
        </div>
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
    <div className="bg-gray-100 font-sans min-h-screen pt-20 pb-24">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/newsletter" className="hover:text-primary transition-colors">Newsletter</Link>
            <span>/</span>
            <span className="text-gray-800">{article.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="text-sm text-gray-500 mb-4">
              {formatDate(article.custom_date)}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#2e368f' }}>
              {article.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {article.description}
            </p>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.1rem'
                }}
              />
              
              {/* Article Images */}
              {article.images && article.images.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: '#2e368f' }}>Related Images</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {article.images.map((image) => (
                      <div key={image.id} className="relative h-64 rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={image.image_url}
                          alt={image.alt_text}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Back to Newsletter */}
        <div className="text-center p-10">
          <Link 
            href="/newsletter" 
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Newsletter
          </Link>
        </div>
      </main>
    </div>
  );
};

const ArticlePage: React.FC = () => {
  return (
    <NewsletterProvider>
      <ArticleContent />
    </NewsletterProvider>
  );
};

export default ArticlePage;