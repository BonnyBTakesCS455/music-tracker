import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from "recharts";

function TopGenres({ genres }) {
  if (!genres) return <></>;

  const data = Object.entries(genres)
    .map(([key, value]) => {
      return { genre: key, value };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <div>
      <h3>Your favourite genres</h3>
      <RadarChart
        cx={300}
        cy={250}
        outerRadius="80%"
        width={600}
        height={500}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="genre" tick={{ fontSize: 14, fill: "grey" }} />
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

export default TopGenres;
