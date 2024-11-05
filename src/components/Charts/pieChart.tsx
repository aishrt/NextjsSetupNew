// components/PieChart.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Typography } from "@mui/material";

interface PieChartProps {
  data: {
    sending_source: string;
    total_sessions_email: number;
    percentage: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Add more colors if needed

const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {

  return (
    <Box>
      {/* <Typography variant="h6" gutterBottom>
        Sessions by Sending Source
      </Typography> */}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="total_sessions_email"
          nameKey="sending_source"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {data?.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Box>
  );
};

export default PieChartComponent;
