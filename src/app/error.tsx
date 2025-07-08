'use client';

import { useEffect } from 'react';
import NotificationPage from '@/components/NotificationPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <NotificationPage 
        notification={{
          type: 'error',
          header: 'Something went wrong',
          breadcrumb: 'Error',
          title: 'Application Error',
          message: 'An unexpected error occurred. Please try again or contact support if the problem persists.'
        }}
      />
      <div className="text-center mt-8">
        <button
          onClick={reset}
          className="bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition-colors duration-300 mr-4"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}