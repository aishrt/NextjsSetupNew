"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "@/components/shared/dashboard-header/Header";
import Sidebar from "@/components/shared/sidebar/Sidebar";
const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [data, setData] = useState("" as any);
  useEffect(() => {
    setMobileSidebarOpen(
      !(
        Math.max(document.documentElement.clientWidth) > 991 &&
        isMobileSidebarOpen == false
      )
    );
    const colorChange = () =>
      setMobileSidebarOpen(
        !(
          Math.max(document.documentElement.clientWidth) > 991 &&
          isMobileSidebarOpen == false
        )
      );
    window.addEventListener("resize", colorChange);
    return () => window.removeEventListener("resize", colorChange);
  }, [data]);
  return (
    <MainWrapper className="mainwrapper">
      {isMobileSidebarOpen == false && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
        />
      )}
      <PageWrapper className="page-wrapper">
        <Header
          toggleMobileSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
        />
        <Container className="full-width-container">
          <Box sx={{ minHeight: "calc(100vh - 170px)", p: 0 }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
