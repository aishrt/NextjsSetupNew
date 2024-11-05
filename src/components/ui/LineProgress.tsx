import React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

interface BorderLinearProgressProps {
  barColor?: string; // Optional prop for the bar color
  value: number; // Required prop for progress value
  variant?: "determinate" | "indeterminate" | "buffer" | "query"; // Variant prop
}

export const BorderLinearProgress = styled(
  ({ barColor, ...other }: BorderLinearProgressProps) => (
    <LinearProgress {...other} />
  )
)(({ theme, barColor }) => ({
  height: 10,
  borderRadius: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
    backgroundColor: barColor || "#1a90ff", // Use the barColor prop or default to a color
    ...theme.applyStyles("dark", {
      backgroundColor: barColor ? darkenColor(barColor) : "#308fe8",
    }),
  },
}));

// Utility function to darken the color for dark theme
const darkenColor = (color: string) => {
  // You can use any color manipulation library or custom logic to darken the color
  return color; // Replace with actual logic to darken the color
};
