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
 * export default connect(null, mapDispatchToProps)(YourComponentHere);
 *
 */

// Initial state
const INITIAL_STATE = {
  isDarkModeEnabled: true,
};

// Types
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

// Actions
export const toggleDarkMode = (isDarkModeEnabled) => {
  return {
    type: TOGGLE_DARK_MODE,
    isDarkModeEnabled: isDarkModeEnabled,
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
    default:
      return state;
  }
}

export default reducer;
