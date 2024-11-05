import React from 'react';

const InfoTechPageBreadcrum = () => (
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
                        "name": "Info-Tech",
                        "item": "https://yourdmarc.com/info-tech"
                    }
                ]
            }
        )}
    </script>
);

export default InfoTechPageBreadcrum;
