import React from 'react';

const EnterprisePageBreadcrum = () => (
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
                        "name": "Enterprise",
                        "item": "https://yourdmarc.com/enterprise"
                    }
                ]
            }
        )}
    </script>
);

export default EnterprisePageBreadcrum;
