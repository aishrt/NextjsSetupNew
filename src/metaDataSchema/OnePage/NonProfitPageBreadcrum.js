import React from 'react';

const NonProfitPageBreadcrum = () => (
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
                        "name": "Nonprofits",
                        "item": "https://yourdmarc.com/nonprofits"
                    }
                ]
            }
        )}
    </script>
);

export default NonProfitPageBreadcrum;
