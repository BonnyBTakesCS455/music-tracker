import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from "recharts";

function MusicStats({ musicStats }) {
  if (!musicStats || musicStats === {}) return <></>;
  return (
    <div>
      <h3>Your favourite features</h3>
      <RadarChart
        cx={300}
        cy={250}
        outerRadius="80%"
        width={600}
        height={500}
        data={musicStats}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="feature"
          tick={{ fontSize: 14, fill: "grey" }}
        />
        <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} />
        <Radar
          name="You"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
}

export default MusicStats;