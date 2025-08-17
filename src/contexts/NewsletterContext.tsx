'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/apiService';
import { API_CONFIG, NewsletterData, NewsletterApiResponse } from '@/config/constants';

interface NewsletterContextType {
  data: NewsletterData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export const useNewsletter = (): NewsletterContextType => {
  const context = useContext(NewsletterContext);
  if (context === undefined) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
};

interface NewsletterProviderProps {
  children: ReactNode;
}

export const NewsletterProvider: React.FC<NewsletterProviderProps> = ({ children }) => {
  const [data, setData] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsletterData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if data is cached in localStorage
      const cachedData = localStorage.getItem('newsletterData');
      const cacheTimestamp = localStorage.getItem('newsletterDataTimestamp');
      const cacheExpiry = 5 * 60 * 1000; // 5 minutes
      
      if (cachedData && cacheTimestamp) {
        const isExpired = Date.now() - parseInt(cacheTimestamp) > cacheExpiry;
        if (!isExpired) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }
      
      const response = await apiService.get<NewsletterApiResponse>(API_CONFIG.ENDPOINTS.NEWSLETTER);
      
      if (response.data && response.data.success) {
        setData(response.data.data);
        // Cache the data
        localStorage.setItem('newsletterData', JSON.stringify(response.data.data));
        localStorage.setItem('newsletterDataTimestamp', Date.now().toString());
      } else {
        throw new Error('Failed to fetch newsletter data');
      }
    } catch (err) {
      console.error('Error fetching newsletter data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching newsletter data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    // Clear cache and refetch
    localStorage.removeItem('newsletterData');
    localStorage.removeItem('newsletterDataTimestamp');
    await fetchNewsletterData();
  };

  useEffect(() => {
    fetchNewsletterData();
  }, []);

  const value: NewsletterContextType = {
    data,
    loading,
    error,
    refetch,
  };

  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  );
};