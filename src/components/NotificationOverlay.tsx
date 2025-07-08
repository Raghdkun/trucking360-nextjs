'use client';

import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import NotificationPage from './NotificationPage';

const NotificationOverlay: React.FC = () => {
  const { notification, isVisible, hideNotification } = useNotification();

  if (!isVisible || !notification) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <NotificationPage notification={notification} />
      {/* Optional: Add a close button */}
      <button
        onClick={hideNotification}
        className="fixed top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-60"
        aria-label="Close notification"
      >
        <i className="fa fa-times"></i>
      </button>
    </div>
  );
};

export default NotificationOverlay;