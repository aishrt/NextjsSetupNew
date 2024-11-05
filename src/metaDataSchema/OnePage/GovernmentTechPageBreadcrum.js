import React from 'react';

const GovernmentTechPageBreadcrum = () => (
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
                        "name": "Government",
                        "item": "https://yourdmarc.com/government"
                    }
                ]

            }
        )}
    </script>
);

export default GovernmentTechPageBreadcrum;
