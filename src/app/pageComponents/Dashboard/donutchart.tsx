"use client";
import React, { memo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieDetails {
  [key: string]: number | null;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#524F81",
  "#7393B3",
  "#41424C",
];
interface Props {
  pieDetails: PieDetails;
}

const dummyData = {
  "Category A": 400,
  "Category B": 300,
  "Category C": 300,
  "Category D": 200,
  "Category E": 100,
};

const DonutChart: React.FC<Props> = ({ pieDetails }) => {
  const convertedData = Object.entries(pieDetails || {})
    .filter(([name, value]) => value !== null)
    .map(([name, value]) => ({ name, value: value as number }));

  return (
    <PieChart
      className="donutChart"
      width={400}
      height={500}
      style={{ marginTop: "-30px" }}
    >
      <Pie
        data={
          convertedData?.length > 0
            ? convertedData
            : [{ name: "empty", value: 1 }]
        }
        cx={200}
        cy={200}
        innerRadius={80}
        outerRadius={125}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        labelLine={false}
      >
        {convertedData?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        layout="horizontal"
        wrapperStyle={{ fontSize: "11px", width: "100%" }}
      />
      <Tooltip />
    </PieChart>
  );
};
export default memo(DonutChart);
