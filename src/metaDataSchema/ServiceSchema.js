import React from 'react';

const ServiceSchema = () => (
    <script type="application/ld+json" class="schemantra">
        {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.yourdmarc.com",
            "additionalType": "https://www.yourdmarc.com",
            "alternateName": "yourDMARC",
            "areaServed": ["Canada", "Europe"],
            "category": ["Compliance Services", "Cybersecurity", "Email Compliance"],
            "termsOfService": "https://www.yourdmarc.com/terms-condition",
            "logo": "https://www.yourdmarc.com/assets/images/logo-final-blue.svg",
            "provider": {
                "@type": "Organization",
                "name": "yourDMARC",
                "url": "https://www.yourdmarc.com"
            },
            "description": "your DMARC is a SaaS web-based platform where users can access various tools and services related to Email Compliance, including DMARC, SPF, and DKIM."
        })}
    </script>

);

export default ServiceSchema;




