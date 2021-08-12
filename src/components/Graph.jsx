import { Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

function Graph({ artistData, ...props }) {
  return (
    <>
      <h3>Most listened to artists</h3>
      <BarChart width={800} height={1000} data={artistData} layout="vertical">
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
    </>
  );
}

export default Graph;
