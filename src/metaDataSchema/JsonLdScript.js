"use client"

import React, { useEffect } from 'react';

const JsonLdScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "yourDMARC",
      url: "https://www.yourdmarc.com/",
      logo: "https://www.yourdmarc.com/assets/images/logo-final-blue.svg",
      sameAs: [
        "https://www.facebook.com/yourDMARC/",
        "https://www.instagram.com/your.dmarc/",
        "https://www.linkedin.com/company/yourdmarc/",
        "https://www.youtube.com/@yourDMARC",
        "https://www.pinterest.ca/yourDMARC/",
      ],
    });
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Render nothing in the component, since script is added dynamically
};

export default JsonLdScript;
