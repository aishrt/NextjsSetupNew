const JsonLdScript = ({ data }: { data: any }) => {
  const jsonLd = JSON.stringify(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
};

export default JsonLdScript;
