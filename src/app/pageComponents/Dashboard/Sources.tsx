"use client";
import React, { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import DashboardCard from "@/components/shared/DashboardCard";

interface Source {
  count: number;
  source_logo?: string;
}

interface SourceProps {
  source: Record<string, Source>;
  reporter: any;
}

const Sources: React.FC<SourceProps> = ({ source }) => {
  const theme = useTheme();
  const totalCount = Object.values(source).reduce(
    (sum, item: any) => sum + item.count,
    0
  );
  const updatedData = Object.keys(source).map((key) => {
    return {
      name: key,
      count: (source[key].count / totalCount) * 100,
    };
  });
  const colors = [
    "#111c2d",
    "red",
    "green",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ];

  const formatTooltipValue = (value: any) => `${parseFloat(value).toFixed(2)}%`;
  return (
    <DashboardCard component="source">
      <>
        <div className="container-fluid">
          <Grid item xl={12} className="sourceHead">
            <h4>Senders</h4>
            <p>Who sends on your behalf?</p>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div className="bar sourceBar" style={{ height: "100%" }}>
                {updatedData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={383}>
                    <BarChart
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      width={150}
                      height={50}
                      data={updatedData}
                    >
                      <Bar dataKey="count" stackId="stack">
                        {updatedData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Bar>

                      <Tooltip formatter={formatTooltipValue} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <YAxis
                        dataKey="count"
                        tickLine={true}
                        tickFormatter={(value: any, index: any) => `${value}% `}
                        tickMargin={10}
                      />
                      <XAxis dataKey="name" hide />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="noDataFound">
                    <p>No Data Found</p>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    </DashboardCard>
  );
};

export default memo(Sources);
