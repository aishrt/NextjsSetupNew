import React from 'react';

const SignupPageBreadCrum = () => (
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
                        "name": "Signup",
                        "item": "https://yourdmarc.com/signup"
                    }
                ]
            }
        )}
    </script>
);

export default SignupPageBreadCrum;
