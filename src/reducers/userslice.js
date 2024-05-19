import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken:null,
    refreshToken:null,
    userDetails:null,
    
    // token: {
    //   key: false,
    // },
  },
  reducers: {
    // setToken: (state, action) => {
    //   state.token = action.payload;
    // },
    setuserDetails:(state, action) => {
      state.userDetails = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
  },
});

export const { setToken, setuserDetails, setAccessToken, setRefreshToken } = userSlice.actions;

export default userSlice.reducer;
