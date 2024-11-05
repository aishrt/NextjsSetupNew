"use client";
import React from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const LineChartComponent = ({ chart }: { chart: any }) => {
  if (!chart) return null;
  const transformedData = Object.entries(chart).map(
    ([date, values]: [string, any]) => {
      const name = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const {
        reject: Rejected,
        quarantine: Quarantined,
        none: None,
      }: any = values;
      return { name, Rejected, Quarantined, Delivered: None, amt: None };
    }
  );
  return (
    <ResponsiveContainer width="100%" height={500}>
      {/* <BarChart
        data={transformedData.length > 0 ? transformedData : [{ name: 'No Data Found', reject: 0, quarantine: 0, pass: 0, amt: 0 }]}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {transformedData.length > 0 ? (
          <>
            <Bar dataKey="reject" fill="#111c2d" />
            <Bar dataKey="quarantine" fill="#111c2d" />
            <Bar dataKey="pass" fill="#111c2d" />
          </>
        ) : (
          <Bar dataKey="reject" fill="rgba(0,0,0,0.1)" />
        )}
      </BarChart> */}
      <BarChart
        data={
          transformedData.length > 0
            ? transformedData
            : [
              {
                name: "No Data Found",
                reject: 0,
                quarantine: 0,
                pass: 0,
                amt: 0,
              },
            ]
        }
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Legend />
        <Bar dataKey="Rejected" stroke="#ff0000" fill="#f00" barSize={20} />
        <Bar dataKey="Quarantined" stroke="#fa762a" fill="#fa762a" barSize={20} />
        <Bar dataKey="Delivered" stroke="#198754" fill="#36b393" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
