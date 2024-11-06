import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-track": {
    backgroundColor: "#ee7000", // Track color when unchecked
  },
  "&.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: "#ee7000", // Thumb color when checked
  },
  "&.Mui-checked .MuiSwitch-track": {
    backgroundColor: "#ee7000", // Track color when checked
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#ffffff", // Thumb color when unchecked
  },
  "&.Mui-checked:hover": {
    backgroundColor: "#dda500", // Color on hover when checked
  },
  "&:hover .MuiSwitch-thumb": {
    backgroundColor: "#ee7000", // Thumb color on hover
  },
  "&.Mui-focusVisible .MuiSwitch-thumb": {
    color: "#ee7000", // Thumb color on focus
  },
}));

const ToggleSwitch = ({
  label,
  name,
  checkedValue,
  touched,
  error,
  handleChange,
  handleBlur,
}) => {
  return (
    <div>
      <FormControl component="fieldset" error={Boolean(touched && error)}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormControlLabel
          control={
            <CustomSwitch
              checked={checkedValue === "true"}
              onChange={(e) => {
                handleChange({
                  target: {
                    name,
                    value: e.target.checked ? "true" : "false",
                  },
                });
              }}
              onBlur={handleBlur}
              name={name}
            />
          }
          label={checkedValue === "true" ? "Enabled" : "Disabled"}
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default ToggleSwitch;
