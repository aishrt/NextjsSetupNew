import React, { useState, useEffect } from "react";
import Link from "next/link";
import { putFormFetcher } from "@/@core/apiFetcher";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { API_ROUTES } from "@/@core/apiRoutes";
import { isEmpty } from "lodash";
import { ROLES } from "@/constants/roles";

const AdminDetails = ({ profileData }: any) => {
  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabClick = (tabUrl: string) => {
    setActiveTab(tabUrl);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveTab(window.location.pathname);
    }
  }, []);
  const [profilePic, setProfileData] = useState({
    profile_image: "",
    preview: "",
  });

  const handleImageChange = (e: any) => {
    setProfileData({
      ...profileData,
      profile_image: e.target.files[0],
      preview: window.URL.createObjectURL(e.target.files[0]),
    });
  };

  useEffect(() => {
    if (profileData?.profile_image != "") {
      setProfileData({
        ...profileData,
        profile_image: profileData?.profile_image,
        preview: profileData?.preview,
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (
      profilePic?.profile_image &&
      typeof profilePic?.profile_image == "object"
    ) {
      saveData();
    }
  }, [profilePic?.profile_image]);

  const saveData = async () => {
    const formData = new FormData();
    formData.append("profile_image", profilePic?.profile_image);
    formData.append("email", profileData.email),
      formData.append("first_name", profileData.first_name),
      formData.append("last_name", profileData.last_name),
      formData.append("weekly_digest_report", profileData.weekly_digest_report);

    const res = await putFormFetcher(
      // "/api/v1/account/update-profile",
      API_ROUTES.UPDATE_PROFILE,
      formData
    );
    if (res?.logout == true) {
      signOut({ callbackUrl: "/" });
      toast.success(res.message);
    }
    if (!res?.status) {
      toast.error(res.message);
    } else {
      toast.success("Profile image updated successfully");
    }
  };

  return (
    <div className="userData">
      <div className="userProfile">
        <div className="imageSection">
          <div className="col-xl-12">
            <div className="form-group">
              <div className="uploadImage">
                <img
                  src={
                    isEmpty(profileData?.preview)
                      ? "/assets/images/profile.png"
                      : `${profileData?.preview}`
                  }
                  alt="profile image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/profile.png";
                  }}
                />
                <div className="image">
                  <input
                    className="file-upload"
                    type="file"
                    accept="image/*"
                    id="uploadImage"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="image pointer" title="Select Photo">
            <i
              className="fa-solid fa-camera"
              onClick={() => document.getElementById("uploadImage")?.click()}
            ></i>
          </div>
        </div>

        <div className="userName">
          <h5 className="fw-semibold">
            {profileData?.first_name !== ""
              ? profileData?.first_name
              : profileData?.email}
          </h5>
          <p>
            {profileData?.role == 2
              ? "Administrator"
              : profileData?.role == 3
              ? "Member"
              : ""}
          </p>
        </div>
      </div>
      <div className="detailSection">
        <ul className="nav-item">
          <li
            className={`nav-link ${
              activeTab === "/dashboard/profile-section" ? "active" : ""
            }`}
          >
            <div className="tabs">
              <Link legacyBehavior href="/dashboard/profile-section">
                <a
                  title="Profile"
                  onClick={() => handleTabClick("/dashboard/profile-section")}
                >
                  <p>
                    <i className="fa-solid fa-user"></i> Profile
                  </p>
                </a>
              </Link>
            </div>
          </li>
          <li
            className={`nav-link ${
              activeTab === "/dashboard/license" ? "active" : ""
            }`}
          >
            <div className="tabs">
              <Link legacyBehavior href="/dashboard/license">
                <a
                  title="License"
                  onClick={() => handleTabClick("/dashboard/license")}
                >
                  <p>
                    <i className="fa-solid fa-id-card"></i>License
                  </p>
                </a>
              </Link>
            </div>
          </li>

          {profileData?.role == ROLES.ADMIN ? (
            <li
              className={`nav-link ${
                activeTab === "/dashboard/branding" ? "active" : ""
              }`}
            >
              <div className="tabs">
                <Link legacyBehavior href="/dashboard/branding">
                  <a
                    title="Branding"
                    onClick={() => handleTabClick("/dashboard/branding")}
                  >
                    <p>
                      <i className="fa-solid fa-award"></i> Branding
                    </p>
                  </a>
                </Link>
              </div>
            </li>
          ) : (
            <></>
          )}
          <li
            className={`nav-link ${
              activeTab === "/dashboard/notifications-alerts" ? "active" : ""
            }`}
          >
            <div className="tabs">
              <Link legacyBehavior href="/dashboard/notifications-alerts">
                <a
                  title="Notifications"
                  onClick={() =>
                    handleTabClick("/dashboard/notifications-alerts")
                  }
                >
                  <p>
                    <i className="fa-solid fa-envelope-open-text"></i>
                    Notifications
                  </p>
                </a>
              </Link>
            </div>
          </li>
          <li
            className={`nav-link ${
              activeTab === "/dashboard/password" ? "active" : ""
            }`}
          >
            <div className="tabs">
              <Link legacyBehavior href="/dashboard/password">
                <a
                  title="Password"
                  onClick={() => handleTabClick("/dashboard/password")}
                >
                  <p>
                    <i className="fa-solid fa-lock"></i> Password
                  </p>
                </a>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AdminDetails;
