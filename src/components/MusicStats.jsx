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
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1db954" stopOpacity={1}/>
            <stop offset="95%" stopColor="#1db954" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="feature"
          tick={{ fontSize: 14, fill: "grey" }}
        />
        <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} />
        <Radar
          name="You"
          dataKey="value"
          stroke="#1db954"
          fill="url(#colorPv)"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
}

export default MusicStats;
