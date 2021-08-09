import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import { connect } from "react-redux";
import { setSong } from "../state/management/songGraph";

const exampleNewData = [
  { name: "Jan", uv: 34, amt: 2400 },
  { name: "Feb", uv: 67, amt: 2400 },
  { name: "Mar", uv: 54, amt: 2400 },
  { name: "Apr", uv: 36, amt: 2400 },
  { name: "May", uv: 78, amt: 2400 },
  { name: "Jun", uv: 43, amt: 2400 },
];

function Graph(props) {
  console.log(props.songData);
  return (
    <LineChart
      width={1300}
      height={600}
      data={props.songData}
      onClick={() => props.setSong(exampleNewData)}
    >
      <Line type="monotone" dataKey="uv" stroke="#1DB954" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" tick={{ fontSize: 16 }} />
      <YAxis tick={{ fontSize: 16 }} />
    </LineChart>
  );
}

function mapStateToProps(state) {
  return {
    songData: state.songGraph.songData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSong: (songData) => dispatch(setSong(songData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
