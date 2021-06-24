import { combineReducers } from 'redux';
import userSettings from './management/userSettings';

const rootReducer = combineReducers({
  userSettings: userSettings,
});

export default rootReducer;
