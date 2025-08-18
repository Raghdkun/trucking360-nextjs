'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiService } from '@/services/apiService';
import { WhyT360Data, WhyT360ApiResponse, API_CONFIG } from '@/config/constants';

interface WhyTrucking360ContextType {
  whyT360Data: WhyT360Data | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const WhyTrucking360Context = createContext<WhyTrucking360ContextType | undefined>(undefined);

export const useWhyTrucking360 = () => {
  const context = useContext(WhyTrucking360Context);
  if (context === undefined) {
    throw new Error('useWhyTrucking360 must be used within a WhyTrucking360Provider');
  }
  return context;
};

interface WhyTrucking360ProviderProps {
  children: ReactNode;
}

export const WhyTrucking360Provider: React.FC<WhyTrucking360ProviderProps> = ({ children }) => {
  const [whyT360Data, setWhyT360Data] = useState<WhyT360Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWhyT360Data = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.get<WhyT360ApiResponse>(API_CONFIG.ENDPOINTS.WHY_T360);
      
      if (response.data.success) {
        setWhyT360Data(response.data.data);
      } else {
        throw new Error('Failed to fetch Why Trucking 360 data');
      }
    } catch (err) {
      console.error('Error fetching Why Trucking 360 data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWhyT360Data();
  }, []);

  const refetch = async () => {
    await fetchWhyT360Data();
  };

  const value: WhyTrucking360ContextType = {
    whyT360Data,
    loading,
    error,
    refetch,
  };

  return (
    <WhyTrucking360Context.Provider value={value}>
      {children}
    </WhyTrucking360Context.Provider>
  );
};