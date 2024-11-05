import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { SearchDebounce } from "@/components/ui/SearchDebounce";
import { BootstrapTooltipUi } from "@/components/ui/BootstrapToolTip";

export const ToolbarUi = ({
  numSelected = 0,
  title = "",
  subTitle = "",
  onSearch = (value: any) => {},
  searchPlaceholder = "Search",
  showDeleteButton = false,
  onDeleteClick = (e: any) => {},
  debounceTime = 500,
  hideSearch = false,
}) => {
  return (
    <Toolbar
      className="toolbar pt-3"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        justifyContent: "space-between",
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <div>
            {title && (
              <Typography variant="h5" id="tableTitle" component="div">
                {title}
              </Typography>
            )}
            {subTitle && <p>{subTitle}</p>}
          </div>
          {!hideSearch && (
            <div>
              <SearchDebounce
                onSearch={onSearch}
                searchPlaceholder={searchPlaceholder}
                debounceTime={debounceTime}
              />
            </div>
          )}
        </>
      )}

      {numSelected > 0 && showDeleteButton && (
        <BootstrapTooltipUi title="Delete">
          <IconButton onClick={() => onDeleteClick(true)}>
            <DeleteIcon />
          </IconButton>
        </BootstrapTooltipUi>
      )}
    </Toolbar>
  );
};
