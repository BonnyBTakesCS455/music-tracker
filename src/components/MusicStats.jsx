import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

function MusicStats({ musicStats }) {
  if (!musicStats) return <></>;

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
        <PolarAngleAxis dataKey="feature" tick={{ fontSize: 14, fill: "grey" }} />
        <PolarRadiusAxis tick={{ fontSize: 14, fill: "grey" }}/>
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
