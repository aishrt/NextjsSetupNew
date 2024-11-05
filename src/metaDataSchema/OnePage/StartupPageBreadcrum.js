import React from 'react';

const StartupPageBreadcrum = () => (
    <script type="application/ld+json">
        {JSON.stringify(
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://yourdmarc.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Startup",
                        "item": "https://yourdmarc.com/startup"
                    }
                ]
            }
        )}
    </script>
);

export default StartupPageBreadcrum;
