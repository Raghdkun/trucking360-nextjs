// components/MatomoAnalytics.tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function MatomoAnalytics() {
  const pathname = usePathname();

  // Track page views when the route changes
  useEffect(() => {
    if (window._paq) {
      window._paq.push(['setCustomUrl', pathname]);
      window._paq.push(['trackPageView']);
    }
  }, [pathname]);

  return (
    <Script id="matomo-analytics" strategy="afterInteractive">
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push(['enableLinkTracking']);
        (function() {
            var u="https://matomo.pneunited.com/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
  );
}

// You might need to declare _paq on the window object for TypeScript
declare global {
  interface Window {
    _paq: any[];
  }
}