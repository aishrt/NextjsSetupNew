import React from 'react';

const ContactSchema = () => (
    <script type="application/ld+json">
        {JSON.stringify(
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "yourDMARC",
                "url": "https://www.yourdmarc.com",
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-734-744-7407",
                    "contactType": "customer service",
                    "areaServed": "US",
                    "availableLanguage": ["English", "Spanish"],
                    "email": "mailto:contact@yourdmarc.com"
                }
            }
        )}
    </script>
);

export default ContactSchema;
