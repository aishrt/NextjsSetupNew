"use client";

import React from "react";

const EmailButton = ({ email }: { email: string }) => {
  const handleClick = () => {
    window.location.href = `mailto:${email}`;
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
      {email ? email : "N/A"}
    </button>
  );
};

export default EmailButton;
