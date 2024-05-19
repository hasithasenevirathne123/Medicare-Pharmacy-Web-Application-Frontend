import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userslice";
import successMessageSlice from "../reducers/successMessageSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    success: successMessageSlice,
  },
});

export default store;
