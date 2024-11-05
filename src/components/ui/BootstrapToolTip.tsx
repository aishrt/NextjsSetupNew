"use client"

import {styled} from "@mui/material";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import React from "react";

interface BootstrapTooltipProps extends TooltipProps {
  placement?: 'top' | 'bottom' | 'left' | 'right'; // Specify valid placements
}

export const BootstrapTooltipUi = styled(
  ({ className, children, placement = "top", ...props }: BootstrapTooltipProps) => (
    <Tooltip
      {...props}
      arrow
      placement={placement}
      classes={{ popper: className }}
      PopperProps={{
        disablePortal: true, // Disable portal for absolute positioning
      }}
    >
      {/* Ensure a single element by wrapping children in a span */}
      <span>{children}</span>
    </Tooltip>
  )
)(({ theme }) => ({
  // Custom styles for the arrow
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,  // Set the arrow color to black
  },
  // Custom styles for the tooltip itself
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,  // Set the tooltip background to black
    color: theme.palette.common.white,            // Optional: Set tooltip text color to white
    fontSize: "0.875rem",                         // Optional: Adjust the font size
  },
}));
