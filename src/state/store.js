import { createStore } from "redux";

import rootReducer from "./rootReducer";

/**
 * https://dev.to/bhatvikrant/how-to-setup-redux-with-react-2020-cdj
 */
const store = createStore(rootReducer);

export default store;
