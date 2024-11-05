"use client";

import React from "react";

const LinkOpenButton = ({ url }: { url: string }) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={() => handleClick()}
      style={{
        textDecoration: "none",
        color: "black",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {url ? url : "N/A"}
    </button>
  );
};

export default LinkOpenButton;
