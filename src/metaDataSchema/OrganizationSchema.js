import React from 'react';

const OrganizationSchema = () => (
    <script type="application/ld+json">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "yourDMARC",
            "url": "https://www.yourdmarc.com/",
            "logo": "https://www.yourdmarc.com/assets/images/logo-final-blue.svg",
            "sameAs": [
                "https://www.facebook.com/yourDMARC/",
                "https://www.instagram.com/your.dmarc/",
                "https://www.linkedin.com/company/yourdmarc/",
                "https://www.youtube.com/@yourDMARC",
                "https://www.pinterest.ca/yourDMARC/"
            ]
        })}
    </script>
);

export default OrganizationSchema;