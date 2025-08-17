'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';
import { ApiResponse, ApiError } from '@/config/constants';

interface TestData {
  // Define your expected data structure here
  id?: string;
  name?: string;
  // Add more fields as needed
}

export default function ApiTestPage() {
  const [data, setData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Example endpoint - replace with your actual endpoint
      const response: ApiResponse<TestData> = await apiService.get('/general');
      setData(response.data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Uncomment to fetch data on component mount
    // fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">API Test Page</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <button
            onClick={fetchData} 
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <h3 className="font-bold mb-2">API Response:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">API Configuration:</h3>
          <p><strong>Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
        </div>
      </div>
    </div>
  );
}