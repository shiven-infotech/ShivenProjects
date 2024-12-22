import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
const store = configureStore({
  reducer: {
    shiven: reducer,
  },
});

export default store;
