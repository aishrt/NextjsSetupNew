"use client";
import Link from "next/link";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { API_ROUTES } from "@/@core/apiRoutes";
import { getFetcherWithAuth } from "@/@core/apiFetcher";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "table",
  margin: "16px auto",
}));

const Logo = () => {
  const [checkImage, setCheckImage] = useState("" as any);

  useEffect(() => {
    fetchImageUrl();
  }, []);
  const fetchImageUrl = () => {
    getFetcherWithAuth(API_ROUTES.GET_COMPANY_DETAILS)
      .then((resData: any) => {
        if (!isEmpty(resData)) {
          setCheckImage(resData?.data?.brand_image || "");
        } else {
          setCheckImage("");
        }
      })
      .catch(() => {
        setCheckImage("");
      });
  };

  return (
    <LinkStyled href="/dashboard/dashboard">
      <img
        loading="lazy"
        src={
          isEmpty(checkImage)
            ? "/assets/images/logo-final-white.png"
            : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${checkImage}`
        }
        alt="logo"
        height={100}
        width={175}
      />
    </LinkStyled>
  );
};

export default Logo;