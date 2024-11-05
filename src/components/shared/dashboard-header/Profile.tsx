"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Menu, IconButton } from "@mui/material";
import { getFetcherWithAuth, isTokenExpired } from "@/@core/apiFetcher";

import { signOut } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import { API_ROUTES } from "@/@core/apiRoutes";
import { useSession } from "next-auth/react";
import { useStore } from "@/utils/store";
import UpgradePlanComponent from "@/components/UpgradePlanComponent";
const Profile = () => {
  const { licenseValidation } = useStore();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    weekly_digest_report: false,
    profile_image: "",
    unread_alert_count: 0,
  } as any);
  const { data: session, status } = useSession();
  useEffect(() => {
    getProfileData();
  }, [session]);
  const getProfileData = async () => {
    let url = API_ROUTES.VIEW_PROFILE;
    const userFromLocalStorage = localStorage.getItem("user");
    const users =
      session?.user ||
      (userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null);
    if (!users || !users.token) {
      signOut({ callbackUrl: "/" });
      return null;
    }
    let headers: any = {
      "Content-Type": "application/json",
    };
    if (!isEmpty(users) && !isEmpty(users?.token)) {
      headers["Authorization"] = `Bearer ${users?.token}`;
    }
    let resData: any = {};
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${url}`,
        {
          method: "GET",
          headers,
          next: {
            revalidate: 0,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      resData = await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setProfileData(resData?.data);
  };
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleCloseUpgradePlan = () => {
    setShowUpgrade(false);
  };

  return (
    <>
      {showUpgrade && (
        <UpgradePlanComponent
          initialOpenModal={showUpgrade}
          onClose={handleCloseUpgradePlan}
        />
      )}
      <Box className="alertSection">
        <div className="dropdown">
          {licenseValidation?.showAlerts ? (
            <Link href="/dashboard/alert-feature" legacyBehavior>
              <a className="btn btn-secondary" role="button">
                <i className="fa-regular fa-bell"></i>
                {profileData?.unread_alert_count > 0 && (
                  <span className="unreadCount">
                    {" "}
                    {profileData?.unread_alert_count}
                  </span>
                )}
                Alerts
              </a>
            </Link>
          ) : (
            <a
              className="btn btn-secondary"
              role="button"
              onClick={() => setShowUpgrade(true)}
            >
              <i className="fa-regular fa-bell"></i>
              {profileData?.unread_alert_count > 0 && (
                <span className="unreadCount">
                  {" "}
                  {profileData?.unread_alert_count}
                </span>
              )}
              Alerts
            </a>
          )}
        </div>
      </Box>
      <Box>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === "object" && {
              color: "primary.light",
            }),
          }}
          onClick={handleClick2}
          className="loginDetails"
        >
          <Avatar
            src={
              isEmpty(profileData?.profile_image)
                ? "/assets/images/profile.png"
                : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${profileData?.profile_image}`
            }
            alt="image"
            sx={{ width: 35, height: 35 }}
          />
          <span className="userId d-flex align-items-center">
            <Typography variant="body2" sx={{ color: "text.primary" }} noWrap>
              {profileData?.first_name !== ""
                ? profileData?.first_name
                : profileData?.email}
            </Typography>
            <ArrowDropDownIcon sx={{ fontSize: "20px" }} />
          </span>
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
              backgroundColor: "background.default",
            },
          }}
        >
          <div className="profileNav">
            <div className="profile ">
              <i className="fa-solid fa-user"></i>
              <a href="/dashboard/profile-section">Profile</a>
            </div>
            <div className="loginSection d-flex gap-3">
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </div>
          </div>
        </Menu>
      </Box>
    </>
  );
};

export default Profile;
