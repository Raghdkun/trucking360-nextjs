'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiService } from '@/services/apiService';
import { Dashboard360Data, Dashboard360ApiResponse, API_CONFIG } from '@/config/constants';

interface Dashboard360ContextType {
  dashboard360Data: Dashboard360Data | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const Dashboard360Context = createContext<Dashboard360ContextType | undefined>(undefined);

export const useDashboard360 = () => {
  const context = useContext(Dashboard360Context);
  if (context === undefined) {
    throw new Error('useDashboard360 must be used within a Dashboard360Provider');
  }
  return context;
};

interface Dashboard360ProviderProps {
  children: ReactNode;
}

export const Dashboard360Provider: React.FC<Dashboard360ProviderProps> = ({ children }) => {
  const [dashboard360Data, setDashboard360Data] = useState<Dashboard360Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard360Data = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.get<Dashboard360ApiResponse>(API_CONFIG.ENDPOINTS.DASHBOARD360);
      
      if (response.data.success) {
        setDashboard360Data(response.data.data);
      } else {
        throw new Error('Failed to fetch Dashboard360 data');
      }
    } catch (err) {
      console.error('Error fetching Dashboard360 data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard360Data();
  }, []);

  const refetch = async () => {
    await fetchDashboard360Data();
  };

  const value: Dashboard360ContextType = {
    dashboard360Data,
    loading,
    error,
    refetch,
  };

  return (
    <Dashboard360Context.Provider value={value}>
      {children}
    </Dashboard360Context.Provider>
  );
};