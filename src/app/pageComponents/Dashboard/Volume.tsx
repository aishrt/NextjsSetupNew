"use client";
import React, { memo, Suspense, useEffect, useState } from "react";
import { MenuItem, Box, Menu } from "@mui/material";
import DashboardCard from "@/app/pageComponents/Dashboard/DashboardCard";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { getDashboardGraphData } from "@/@core/apiFetcher";
import InformationTooltip from "@/app/pageComponents/Others/InformationTooltip";
import GraphLoader from "@/components/Loaders/GraphLoader";
const options = ["Action", "Another Action", "Something else here"];

const Volume = ({
  domain,
  start_date,
  end_date,
  reload,
}: {
  domain?: any;
  start_date?: any;
  end_date?: any;
  reload?: any;
}) => {
  const [graphType, setGraphType] = useState<any>(30);
  const [graphData, setGraphData] = useState<any>(null);
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await getDashboardGraphData(
        graphType,
        domain,
        start_date,
        end_date
      );
      const seriesDataUpdated =
        data?.VOLUME_BAR?.categories?.map(
          (category: string, index: number) => ({
            name: category,
            Compliant: data?.VOLUME_BAR?.seriescolumnchart[0].data[index],
            "Not Compliant": data?.VOLUME_BAR?.seriescolumnchart[1].data[index],
          })
        ) || [];
      if (seriesDataUpdated.length > 0) {
        setShowChart(true);
        setIsLoading(false);
      }
      setGraphData(seriesDataUpdated);
      setIsLoading(false);
    };

    fetchData();
  }, [graphType, reload]);

  const [showCompliant, setShowCompliant] = useState(true);
  const [showNotCompliant, setShowNotCompliant] = useState(true);
  const handleLegendClick = (value: any) => {
    if (value === "Compliant") {
      if (showCompliant && !showNotCompliant) {
        setShowCompliant(true);
        setShowNotCompliant(true);
      } else {
        setShowCompliant(true);
        setShowNotCompliant(false);
      }
    } else if (value === "Not Compliant") {
      if (!showCompliant && showNotCompliant) {
        setShowCompliant(true);
        setShowNotCompliant(true);
      } else {
        setShowCompliant(false);
        setShowNotCompliant(true);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <GraphLoader />
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<p>Loading data...</p>}>
        <DashboardCard
          component="volume"
          action={
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={`${option}-${index}`}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}v=spf1 a mx include:ecloudessentials.com
                  ip4:14.203.96.158 ip4:120.151.74.72
                  include:spf.demandbridge.com ~all
                </MenuItem>
              ))}
            </Menu>
          }
        >
          <>
            <Box className="rounded-bars sourceHead">
              <div className="row">
                <div className="col-lg-8">
                  <h4>
                    Emails
                    <InformationTooltip name="AD_email_hd" position="right" />
                  </h4>
                  <p>How many emails per category?</p>
                </div>
                <div className="col-lg-4">
                  {!domain && (
                    <div className="dropdown text-end">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {graphType == 30
                          ? "Last 30 Days"
                          : graphType == 90
                          ? "Last 90 Days"
                          : "All Time"}
                      </button>
                      {!domain ? (
                        <ul className="dropdown-menu">
                          {["Last 30 Days", "Last 90 Days", "All Time"].map(
                            (item: any, index: any) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() => {
                                    if (item == "Last 30 Days") {
                                      setGraphType(30);
                                    }
                                    else if (item == "Last 90 Days") {
                                      setGraphType(90);
                                    } else if (item == "All Time") {
                                      setGraphType("");
                                    }
                                  }}
                                >
                                  <button>{item}</button>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Box>
            <ResponsiveContainer width="100%" height={383}>
              <BarChart
                data={
                  showChart
                    ? graphData
                    : [
                        {
                          name: "No Data Found",
                          Compliant: 0,
                          "Not Compliant": 0,
                        },
                      ]
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} />
                {showCompliant && (
                  <Bar
                    barSize={20}
                    dataKey="Compliant"
                    stackId="stack"
                    fill="#111c2d"
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={100}
                    animationEasing="ease-in-out"
                  />
                )}
                {showNotCompliant && (
                  <Bar
                    barSize={20}
                    dataKey="Not Compliant"
                    stackId="stack"
                    fill="red"
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={800}
                    animationEasing="ease-in-out"
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", cursor: "pointer" }}>
                <div
                  onClick={() => handleLegendClick("Compliant")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#111c2d",
                      marginRight: "5px",
                    }}
                  ></div>
                  <div>
                    <div
                      style={{
                        fontWeight: `${
                          showCompliant && !showNotCompliant ? "bold" : "normal"
                        }`,
                      }}
                    >
                      Compliant
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleLegendClick("Not Compliant")}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "red",
                      marginRight: "5px",
                    }}
                  ></div>
                  <div
                    style={{
                      fontWeight: `${
                        !showCompliant && showNotCompliant ? "bold" : "normal"
                      }`,
                    }}
                  >
                    Not Compliant
                  </div>
                </div>
              </div>
            </div>
          </>
        </DashboardCard>
      </Suspense>
      {/* )} */}
    </>
  );
};

export default memo(Volume);
