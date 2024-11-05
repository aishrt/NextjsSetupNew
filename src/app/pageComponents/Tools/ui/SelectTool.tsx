"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { _TABS } from "@/constants/tabData";
import { useState } from "react";

export default function BasicSelect() {
  const tools: {
    title: string;
    description: string;
    href: string;
    buttonTitle: string;
    icon: string;
  }[] = [];
  _TABS.map((val, idx: number) => {
    val.tabTools.map((tool) => {
      tools.push(tool);
    });
  });
  const [selectedTool, setSelectedTool] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTool(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tools</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTool}
          label="Tools"
          onChange={handleChange}
        >
          {tools.map((tool, idx: number) => {
            return (
              <MenuItem key={`menu_item_${idx}`} value={tool.href}>
                {tool.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
