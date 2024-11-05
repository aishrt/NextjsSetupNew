import React from 'react';

const HealthcarePageBreadcrum = () => (
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
                        "name": "Healthcare",
                        "item": "https://yourdmarc.com/healthcare"
                    }
                ]
            }
        )}
    </script>
);

export default HealthcarePageBreadcrum;
