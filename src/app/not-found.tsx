import NotificationPage from '@/components/NotificationPage';

export default function NotFound() {
  return (
    <NotificationPage 
      notification={{
        type: '404',
        header: 'Page Not Found',
        breadcrumb: 'Error',
        title: '404',
        message: "We're sorry, the page you have looked for does not exist on our website! Maybe go to our home page or try to use a search?"
      }}
    />
  );
}