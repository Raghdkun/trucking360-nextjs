'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationData {
  type: 'success' | 'error' | '404';
  header?: string;
  breadcrumb?: string;
  title?: string;
  message?: string;
}

interface NotificationContextType {
  notification: NotificationData | null;
  showNotification: (data: NotificationData) => void;
  hideNotification: () => void;
  isVisible: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = (data: NotificationData) => {
    setNotification(data);
    setIsVisible(true);
  };

  const hideNotification = () => {
    setNotification(null);
    setIsVisible(false);
  };

  return (
    <NotificationContext.Provider value={{
      notification,
      showNotification,
      hideNotification,
      isVisible
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};