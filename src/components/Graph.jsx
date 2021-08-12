import React from "react";
import styled from "styled-components";
import { Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

const Container = styled.div`
  margin: 1.5vh 0;
`;

function Graph({ artistData }) {
  if (!artistData) return <></>;
  return (
    <Container>
      <h3>Most listened to artists</h3>
      <BarChart width={800} height={1000} data={artistData} layout="vertical">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1db954" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#1db954" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#444" />
        <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} />
        <XAxis
          type="number"
          dataKey="plays"
          tick={{ fontSize: 14, fill: "grey" }}
        />
        <YAxis
          width={140}
          type="category"
          dataKey="name"
          tick={{ fontSize: 14, fill: "grey" }}
        />
        <Bar
          dataKey="plays"
          stroke="#1db954"
          fill="url(#barGrad)"
          layout="vertical"
        />
      </BarChart>
    </Container>
  );
}

export default Graph;
