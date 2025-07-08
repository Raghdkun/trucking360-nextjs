import React from 'react';
import Link from 'next/link'; // Using Next.js Link instead of React Router

/**
 * A versatile notification page component.
 * @param {object} props - The component props.
 * @param {object} props.notification - An object defining the notification content.
 * @param {'success' | 'error' | '404'} [props.notification.type='404'] - The type of notification.
 * @param {string} [props.notification.header] - The main header text.
 * @param {string} [props.notification.breadcrumb] - The text for the breadcrumb.
 * @param {string} [props.notification.title] - The title below the icon.
 * @param {string} [props.notification.message] - The detailed message.
 */
interface NotificationProps {
  notification?: {
    type?: 'success' | 'error' | '404';
    header?: string;
    breadcrumb?: string;
    title?: string;
    message?: string;
  };
}

const NotificationPage: React.FC<NotificationProps> = ({ notification = {} }) => {
  // Default to 404 if no type is specified
  const {
    type = '404',
    title,
    message,
  } = notification;

  let iconClass: string, textColor: string, bgColor: string, hoverBgColor: string, defaultTitle: string, defaultMessage: string;

  // Determine styles and default text based on notification type
  switch (type) {
    case 'success':
      iconClass = 'fa fa-check-circle';
      textColor = 'text-green-500';
      bgColor = 'bg-green-500';
      hoverBgColor = 'hover:bg-green-600';
      defaultTitle = title || 'Operation Successful';
      defaultMessage = message || 'The operation completed successfully.';
      break;
    case 'error':
      iconClass = 'fa fa-exclamation-triangle';
      textColor = 'text-red-500';
      bgColor = 'bg-red-500';
      hoverBgColor = 'hover:bg-red-600';
      defaultTitle = title || 'Operation Failed';
      defaultMessage = message || 'There was an issue with the operation.';
      break;
    default: // 404 case
      iconClass = 'fa fa-exclamation-triangle';
      textColor = 'text-blue-500';
      bgColor = 'bg-blue-500';
      hoverBgColor = 'hover:bg-blue-600';
      defaultTitle = title || 'Page Not Found';
      defaultMessage = message || "We're sorry, the page you have looked for does not exist on our website!";
      break;
  }

  return (
    <>
      {/* Page Header Start */}
  
      {/* Page Header End */}

      {/* Notification Start */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex justify-center">
          <div className="text-center">
            <i className={`${iconClass} ${textColor} text-6xl`}></i>
            <h1 className="text-5xl font-bold mt-4">{type === '404' ? '404' : title || type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <h2 className="text-3xl font-semibold mt-4">{defaultTitle}</h2>
            <p className="text-lg mt-4">{defaultMessage}</p>
            <Link href="/" className={`${bgColor} text-white py-3 px-6 rounded-full mt-8 inline-block ${hoverBgColor} transition-colors duration-300`}>
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
      {/* Notification End */}
    </>
  );
};

export default NotificationPage;