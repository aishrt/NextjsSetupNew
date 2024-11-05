"use client";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Label,
  ResponsiveContainer,
} from "recharts";

const Donutchart = ({ score }: { score: number }) => {

  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 94 - score },
  ];
  const COLORS = ["#ff5555", "#d0d0d0"];
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              value={`${score}/94`}
              position="center"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                fill: "#333",
              }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
export default Donutchart;
