"use client";
import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const LineGraphComponent = ({ chart = {} }: { chart?: any }) => {
  // if (!chart || Object.keys(chart).length === 0) return null;

  const transformedData = Object.entries(chart).map(
    ([date, values]: [string, any]) => {
      const name = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const { reject: Rejected, quarantine: Quarantined, none: None } = values;
      return { name, Rejected, Quarantined, Delivered: None };
    }
  );

  return (
    <>
      {/* {transformedData.length > 0 ? null : <p>No Data found</p>} */}
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={
            transformedData.length > 0
              ? transformedData
              : [
                  {
                    name: "No Data Found",
                    Rejected: 0,
                    Quarantined: 0,
                    Delivered: 0,
                  },
                ]
          }
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Rejected" stroke="#ff0000" />
          <Line type="monotone" dataKey="Quarantined" stroke="#fa762a" />
          <Line type="monotone" dataKey="Delivered" stroke="#198754" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineGraphComponent;
