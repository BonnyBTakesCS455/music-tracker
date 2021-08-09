// Initial state
const INITIAL_STATE = {
  songData: [
    { name: "Jan", uv: 60, amt: 2400 },
    { name: "Feb", uv: 42, amt: 2400 },
    { name: "Mar", uv: 34, amt: 2400 },
    { name: "Apr", uv: 75, amt: 2400 },
    { name: "May", uv: 12, amt: 2400 },
    { name: "Jun", uv: 86, amt: 2400 },
  ],
};

// Types
export const SET_SONG = "SET_SONG";

// Actions
export const setSong = (songData) => {
  return {
    type: SET_SONG,
    songData,
  };
};

// Reducer
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SONG:
      return {
        ...state,
        songData: action.songData,
      };
    default:
      return state;
  }
}

export default reducer;
