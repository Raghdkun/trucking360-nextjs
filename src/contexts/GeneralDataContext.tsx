'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiService } from '@/services/apiService';
import { GeneralData, GeneralApiResponse, API_CONFIG } from '@/config/constants';

interface GeneralDataContextType {
  generalData: GeneralData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const GeneralDataContext = createContext<GeneralDataContextType | undefined>(undefined);

export const useGeneralData = () => {
  const context = useContext(GeneralDataContext);
  if (context === undefined) {
    throw new Error('useGeneralData must be used within a GeneralDataProvider');
  }
  return context;
};

interface GeneralDataProviderProps {
  children: ReactNode;
}

export const GeneralDataProvider: React.FC<GeneralDataProviderProps> = ({ children }) => {
  const [generalData, setGeneralData] = useState<GeneralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGeneralData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.get<GeneralApiResponse>(API_CONFIG.ENDPOINTS.GENERAL);
      
      if (response.data.success) {
        setGeneralData(response.data.data);
      } else {
        throw new Error('Failed to fetch general data');
      }
    } catch (err) {
      console.error('Error fetching general data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeneralData();
  }, []);

  const refetch = async () => {
    await fetchGeneralData();
  };

  const value: GeneralDataContextType = {
    generalData,
    loading,
    error,
    refetch,
  };

  return (
    <GeneralDataContext.Provider value={value}>
      {children}
    </GeneralDataContext.Provider>
  );
};