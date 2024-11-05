"use client";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { removeHttp } from "@/utils/string-conversion";
import { useSearchParams } from "next/navigation";

export const SearchDebounce = ({
  onSearch = (value: any) => {},
  searchPlaceholder = "Search",
  debounceTime = 800,
  className = "",
  sx = {
    "& .MuiInputLabel-root": {
      color: "#000000",
    },
  },
}) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => {
    let searchQuery = searchParams.get("search_query")
      ? removeHttp(searchParams.get("search_query") as string)
      : "";
    return searchQuery ?? "";
  });

  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, debounceTime),
    [debounceTime, onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch, onSearch]);

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      fullWidth
      type="text"
      size="small"
      className={`searchWhite ${className}`}
      label="Search"
      variant="outlined"
      placeholder={searchPlaceholder || "Search"}
      value={searchTerm}
      sx={sx}
      onChange={handleInputChange}
      InputProps={{
        endAdornment: searchTerm ? (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : (
          <></>
        ),
        inputProps: {
          onWheel: (e) => e.currentTarget.blur(),
        },
      }}
    />
  );
};
