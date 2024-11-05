import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import Profile from "@/components/Layout/dashboard-header/Profile";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;}


const Header = ({ toggleMobileSidebar }: ItemType) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    // background: theme.palette.background.paper,
   
    background: "#0F2138",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    // borderRadius: 13,
    /*
    * position: fixed;
    left: 270px;
    width: calc(100% - 270px);
    * */
    [theme.breakpoints.up("lg")]: {
      minHeight: "100px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuIcon width="20" height="20"  />
        </IconButton>

        {/*<IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <NotificationsIcon  stroke="1.5"/>
          </Badge>
        </IconButton>*/}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/*<Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Button
              variant="contained"
              disableElevation
              color="primary"
              target="_blank"
              href="/"
            >
              Upgrade to Pro
            </Button>
          </Box>*/}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
