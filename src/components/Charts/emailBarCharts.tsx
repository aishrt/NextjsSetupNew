import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const exampleData = [
  { grouped_date: "2024-09-16T00:00:00Z", total_success: 53, total_failure: 0 },
];

const EmailBarCharts = ({ data = exampleData }: { data: any }) => {
  const [showFailures, setShowFailures] = useState(true);
  const [showSuccess, setShowSuccess] = useState(true);

  const handleLegendClick = (dataKey: string) => {

    if (dataKey === "Failures") {
      if (showFailures && showSuccess) {
        setShowSuccess(false);
      } else {
        setShowFailures((prev) => !prev);
        if (showSuccess) {
          setShowSuccess(false);
        }
      }
    } else if (dataKey === "Success") {
      if (showFailures && showSuccess) {
        setShowFailures(false);
      } else {
        setShowSuccess((prev) => !prev);
        if (showFailures) {
          setShowFailures(false);
        }
      }
    }
  };

  const filteredData = data
    .map((entry: any) => ({
      date: new Date(entry.grouped_date).toLocaleDateString(),
      success: entry.total_success,
      failures: entry.total_failure,
    }))
    .filter((entry: any) => {
      if (showSuccess && showFailures) {
        return entry.success > 0 || entry.failures > 0;
      }
      if (showSuccess) {
        return entry.success > 0;
      }
      if (showFailures) {
        return entry.failures > 0;
      }
      return false;
    });

  return (
    <div>
      <ResponsiveContainer height={500}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {showSuccess && (
            <Bar
              dataKey="success"
              fill="#42a55e"
              name="Success"
              stackId="a"
              isAnimationActive={false}
            />
          )}
          {showFailures && (
            <Bar
              dataKey="failures"
              fill="#f43f5e"
              name="Failures"
              stackId="a"
              isAnimationActive={false}
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
            onClick={() => handleLegendClick("Success")}
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
                backgroundColor: "#42a55e",
                marginRight: "5px",
              }}
            ></div>
            <div
              style={{
                fontWeight: `${showSuccess && !showFailures ? "bold" : "normal"}`,
              }}
            >
              Success
            </div>
          </div>
          <div
            onClick={() => handleLegendClick("Failures")}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#f43f5e",
                marginRight: "5px",
              }}
            ></div>
            <div
              style={{
                fontWeight: `${!showSuccess && showFailures ? "bold" : "normal"}`,
              }}
            >
              Failures
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailBarCharts;
