import React from 'react';

const EducationsPageBreadcrum = () => (
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
                        "name": "Educations",
                        "item": "https://yourdmarc.com/educations"
                    }
                ]

            }
        )}
    </script>
);

export default EducationsPageBreadcrum;
