'use client';

import { useEffect } from 'react';

export default function NetlifyIdentity() {
  useEffect(() => {
    // Check if window is defined (it won't be during SSR)
    if (typeof window !== 'undefined') {
      // Include Netlify Identity script
      const script = document.createElement('script');
      script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
      script.async = true;
      document.body.appendChild(script);

      // Initialize Netlify Identity after the script is loaded
      script.onload = () => {
        if (window.netlifyIdentity) {
          window.netlifyIdentity.init();
        }
      };
    }
  }, []);

  // This component doesn't render anything visible
  return null;
}
