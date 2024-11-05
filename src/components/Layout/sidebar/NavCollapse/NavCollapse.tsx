import React, { useState } from "react";
import Link from "next/link";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import LensIcon from "@mui/icons-material/Lens";
import { isEmpty } from "@/utils/isEmpty";
import { removeQueryStringAndMatch } from "@/utils/string-conversion";

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  variant?: string | any;
  external?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
  toggleMobileSidebar: any;
}

export default function NavCollapse({
  item,
  pathDirect,
  hideMenu,
  toggleMobileSidebar,
}: ItemType) {
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const active = removeQueryStringAndMatch(item.href, pathDirect).isMatch; // pathDirect === item?.href // .includes(item?.href)

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "5px 10px 5px 0",
    borderRadius: `30px`,
    backgroundColor: "inherit",
    color: active
      ? `${theme.palette.primary.main}!important`
      : theme.palette.text.secondary,
    fontWeight: active ? "600 !important" : "400",
    paddingLeft: "0",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "-20px",
      height: "100%",
      zIndex: "-1",
      borderRadius: " 0 24px 24px 0",
      transition: "all .3s ease-in-out",
      width: "0",
    },
    "&:hover::before": {
      width: "calc(100% + 20px)",
      backgroundColor: theme.palette.primary.light,
    },
    "& > .MuiListItemIcon-root": {
      width: 45,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      marginRight: "8px",
      transition: "all .3s ease-in-out",
      // color: item.children ? "" : theme.palette.primary.main,
      // backgroundColor: item.children ? "" : theme.palette.primary.light,
    },
    "&:hover": {
      backgroundColor: "transparent !important",
      color: theme.palette.text.primary,
    },
    "&.Mui-selected": {
      //color: theme.palette.text.primary,
      backgroundColor: "transparent !important",
      ".MuiListItemIcon-root": {
        color: theme.palette.primary.main,
      },
      "&:before": {
        backgroundColor: theme.palette.primary.light,
        width: "calc(100% + 16px)",
      },
      "&:hover": {
        // backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
      },
    },
  }));

  let isOpen = false;
  if (item && !isEmpty(item.children) && item.children) {
    isOpen = item.children.some(
      (itm) => removeQueryStringAndMatch(itm.href, pathDirect).isMatch
    );
  }
  const [open, setOpen] = useState(isOpen);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <List
        component="li"
        disablePadding
        key={item?.id && item.title}
        onClick={handleClick}
        className=""
      >
        <div style={{ textDecoration: "none" }}>
          <ListItemStyled
            title={item.title}
            disabled={item?.disabled}
            sx={{
              "&:hover": {
                ".MuiListItemIcon-root": {
                  color: item.bgcolor + ".main",
                },
              },
              "&:hover::before": {
                backgroundColor: item.bgcolor + ".light",
              },
              "&.Mui-selected": {
                color: "primary.main",
                "& .MuiTypography-root": {
                  fontWeight: "600 !important",
                },
                ".MuiListItemIcon-root": {
                  color: "primary.main",
                },
                "&:before": {
                  backgroundColor: "primary.light",
                },
                "&:hover": {
                  color: "primary.main",
                  ".MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color: active
                  ? `${theme.palette.primary.main}!important`
                  : "inherit",
              }}
            >
              {itemIcon}
            </ListItemIcon>
            <ListItemText>
              {hideMenu ? "" : <>{`${item?.title}`}</>}
              <br />
              {item?.subtitle ? (
                <Typography variant="caption">
                  {hideMenu ? "" : item?.subtitle}
                </Typography>
              ) : (
                ""
              )}
            </ListItemText>
          </ListItemStyled>
        </div>
      </List>
      {!isEmpty(item.children) &&
        item.children &&
        open &&
        item?.children.map((subItem: any) => {
          return (
            <List
              component="li"
              disablePadding
              key={subItem?.id && subItem.title}
              className="sublist"
            >
              <Link
                href={subItem.href}
                title={subItem.title}
                style={{ textDecoration: "none" }}
              >
                <ListItemStyled
                  disabled={subItem?.disabled}
                  selected={
                    removeQueryStringAndMatch(subItem.href, pathDirect).isMatch
                  }
                  sx={{
                    "&:hover": {
                      ".MuiListItemIcon-root": {
                        color: subItem.bgcolor + ".main",
                      },
                    },
                    "&:hover::before": {
                      backgroundColor: subItem.bgcolor + ".light",
                    },
                    "&.Mui-selected": {
                      color: "primary.main",
                      "& .MuiTypography-root": {
                        fontWeight: "600 !important",
                      },
                      ".MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                      "&:before": {
                        backgroundColor: "primary.light",
                      },
                      "&:hover": {
                        color: "primary.main",
                        ".MuiListItemIcon-root": {
                          color: "primary.main",
                        },
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "36px",
                      p: "3px 0",
                      color: removeQueryStringAndMatch(subItem.href, pathDirect)
                        .isMatch
                        ? `${theme.palette.primary.main}!important`
                        : "inherit",
                    }}
                  >
                    <LensIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {hideMenu ? "" : <>{`${subItem?.title}`}</>}
                    <br />
                    {subItem?.subtitle ? (
                      <Typography variant="caption">
                        {hideMenu ? "" : subItem?.subtitle}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </ListItemText>
                </ListItemStyled>
              </Link>
            </List>
          );
        })}
    </>
  );
}
