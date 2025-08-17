'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/services/apiService';
import { API_CONFIG, PricingData, PricingApiResponse } from '@/config/constants';

interface PricingContextType {
  data: PricingData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const usePricing = (): PricingContextType => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

interface PricingProviderProps {
  children: ReactNode;
}

export const PricingProvider: React.FC<PricingProviderProps> = ({ children }) => {
  const [data, setData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPricingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if data is cached in localStorage
      const cachedData = localStorage.getItem('pricingData');
      const cacheTimestamp = localStorage.getItem('pricingDataTimestamp');
      const cacheExpiry = 5 * 60 * 1000; // 5 minutes
      
      if (cachedData && cacheTimestamp) {
        const isExpired = Date.now() - parseInt(cacheTimestamp) > cacheExpiry;
        if (!isExpired) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }
      
      const response = await apiService.get<PricingApiResponse>(API_CONFIG.ENDPOINTS.PRICING);
      
      if (response.data && response.data.success) {
        setData(response.data.data);
        // Cache the data
        localStorage.setItem('pricingData', JSON.stringify(response.data.data));
        localStorage.setItem('pricingDataTimestamp', Date.now().toString());
      } else {
        throw new Error('Failed to fetch pricing data');
      }
    } catch (err) {
      console.error('Error fetching pricing data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching pricing data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    // Clear cache and refetch
    localStorage.removeItem('pricingData');
    localStorage.removeItem('pricingDataTimestamp');
    await fetchPricingData();
  };

  useEffect(() => {
    fetchPricingData();
  }, []);

  const value: PricingContextType = {
    data,
    loading,
    error,
    refetch,
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};