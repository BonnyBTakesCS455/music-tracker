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
