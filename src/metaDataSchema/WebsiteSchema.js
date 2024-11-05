import React from 'react';

const WebsiteSchema = () => (
    <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "yourDMARC",
            "url": "https://www.yourdmarc.com/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://www.yourdmarc.com/search/?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        })}
    </script>

);

export default WebsiteSchema;
