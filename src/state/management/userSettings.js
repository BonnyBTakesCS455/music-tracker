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
};

// Types
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_USER = 'SET_USER';

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
    default:
      return state;
  }
}

export default reducer;
