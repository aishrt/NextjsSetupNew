"use client";
import React, { useState } from "react";
import nameJson from "../../../../public/assets/Information.json"; // Adjust path accordingly

interface TooltipButtonProps {
  name: string;
  position?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top2"
    | "bottom2"
    | "left2"
    | "right2";
  favIcons?: "q" | "e" | "i";
}

const InformationTooltip: React.FC<TooltipButtonProps> = ({
  name,
  position = "top",
  favIcons = "q",
}) => {
  const [visible, setVisible] = useState(false);
  // Find the item in the JSON that matches the `name` prop
  const matchedItem = nameJson.find((item) => item.name === name);

  // If no matching item or tooltipData, return null
  if (!matchedItem || !matchedItem.tooltipData) {
    return null;
  }
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);
  return (
    <div
      className="tooltip-container"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {favIcons == "q" && (
        <i className="fa-solid fa-circle-question custom-icon"></i>
      )}
      {favIcons == "e" && <i className="fa-solid fa-circle-exclamation"></i>}
      {favIcons == "i" && <i className="fa-solid fa-circle-info"></i>}

      {visible && (
        <div className={`custom-tooltip custom-tooltip-${position}`}>
          <div className="tooltip-data" dangerouslySetInnerHTML={{ __html: matchedItem.tooltipData }}>
            {/* {matchedItem.tooltipData} */}
            </div>
        </div>
      )}
    </div>
  );
};

export default InformationTooltip;
