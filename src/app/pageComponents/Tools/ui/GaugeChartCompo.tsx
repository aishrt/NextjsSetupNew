"use client";
import React, { memo } from "react";
import GaugeChart from "react-gauge-chart";

const GaugeChartCompo = ({ percentage }: { percentage: number }) => {
  const prValue = percentage ? percentage / 100 : 0;

  return (
    <GaugeChart
      id="gauge-chart1"
      textColor={`#000000`}
      colors={[`#F43F5E`, `#FFA800`, `#42A55E`]}
      percent={prValue}
    />
  );
};

export default memo(GaugeChartCompo);
