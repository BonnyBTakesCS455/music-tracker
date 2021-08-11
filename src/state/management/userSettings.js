/**
 * Example:
 *
 * Add the following function to the JS file:
 *
 * function mapStateToProps(state) {
 *  return {
 *    isDarkModeEnabled: state.userSettings.isDarkModeEnabled
 *  }
 * }
 *
 * function mapDispatchToProps(dispatch) {
 *  return {
 *    toggleDarkMode: (isDarkModeEnabled) => dispatch(toggleDarkMode(isDarkModeEnabled))
 *  }
 * }
 *
 * export default connect(mapStateToProps, mapDispatchToProps)(YourComponentHere);
 *
 */

// Initial state
const INITIAL_STATE = {
  isDarkModeEnabled: true,
  user: "",
  friends: [],
  friendRequests: [],
};

// Types
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";
export const SET_USER = "SET_USER";
export const SET_FRIENDS = "FRIENDS";
export const SET_FRIEND_REQUESTS = "SET_FRIEND_REQUESTS";

// Actions
export const toggleDarkMode = (isDarkModeEnabled) => {
  return {
    type: TOGGLE_DARK_MODE,
    isDarkModeEnabled: isDarkModeEnabled,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setFriends = (friends) => {
  return {
    type: SET_FRIENDS,
    friends,
  };
};

export const setFriendRequests = (friendRequests) => {
  return {
    type: SET_FRIEND_REQUESTS,
    friendRequests,
  };
};

// Reducer
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkModeEnabled: action.isDarkModeEnabled,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_FRIENDS:
      if (action.friends === null) return state;
      return {
        ...state,
        friends: action.friends,
      };
    case SET_FRIEND_REQUESTS:
      if (action.friendRequests === null) return state;
      return {
        ...state,
        friendRequests: action.friendRequests,
      };
    default:
      return state;
  }
}

export default reducer;
