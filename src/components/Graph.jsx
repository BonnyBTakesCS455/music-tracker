import { Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

function Graph({ artistData, ...props }) {
  return (
    <BarChart width={800} height={1000} data={artistData} layout="vertical">
      {/* <Line type="monotone" dataKey="uv" stroke="#1DB954" /> */}
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
      <Bar dataKey="plays" fill="#1DB954" layout="vertical" />
    </BarChart>
  );
}

export default Graph;
