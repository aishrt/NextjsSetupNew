import { useEffect, useRef } from "react";

const CalendlyBadge = () => {
  const calendlyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const head = document.querySelector("head");

    // Load Calendly styles
    const cssLink = document.createElement("link");
    cssLink.href = "https://assets.calendly.com/assets/external/widget.css";
    cssLink.rel = "stylesheet";
    head?.appendChild(cssLink);

    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      // Initialize Calendly badge widget
      if (window.Calendly && calendlyButtonRef.current) {
        window.Calendly.initBadgeWidget({
          url: "https://calendly.com/hello-dmarc/your-dmarc-demo",
          text: "Schedule time with me",
          color: "#0069ff",
          textColor: "#ffffff",
          branding: undefined,
        });

        // Attach click handler to the button if it exists
        calendlyButtonRef.current.addEventListener("click", () => {
          window.Calendly.showPopupWidget(
            "https://calendly.com/hello-dmarc/your-dmarc-demo"
          );
        });
      }
    };
    head?.appendChild(script);

    // Cleanup on unmount
    return () => {
      head?.removeChild(cssLink);
      head?.removeChild(script);
    };
  }, []);

  return (
    <button
      ref={calendlyButtonRef}
      className="btn"
    >
      Schedule a Demo
    </button>
  );
};

export default CalendlyBadge;