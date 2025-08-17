'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiService } from '@/services/apiService';
import { HomepageData, HomepageApiResponse, API_CONFIG } from '@/config/constants';

interface HomepageContextType {
  homepageData: HomepageData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const HomepageContext = createContext<HomepageContextType | undefined>(undefined);

export const useHomepage = () => {
  const context = useContext(HomepageContext);
  if (context === undefined) {
    throw new Error('useHomepage must be used within a HomepageProvider');
  }
  return context;
};

interface HomepageProviderProps {
  children: ReactNode;
}

export const HomepageProvider: React.FC<HomepageProviderProps> = ({ children }) => {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.get<HomepageApiResponse>(API_CONFIG.ENDPOINTS.HOMEPAGE);
      
      if (response.data.success) {
        setHomepageData(response.data.data);
      } else {
        throw new Error('Failed to fetch homepage data');
      }
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const refetch = async () => {
    await fetchHomepageData();
  };

  const value: HomepageContextType = {
    homepageData,
    loading,
    error,
    refetch,
  };

  return (
    <HomepageContext.Provider value={value}>
      {children}
    </HomepageContext.Provider>
  );
};