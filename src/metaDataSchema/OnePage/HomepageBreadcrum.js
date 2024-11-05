import React from 'react';

const HomepageBreadcrum = () => (
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
                    }
                ]
            }
        )}
    </script>
);

export default HomepageBreadcrum;
