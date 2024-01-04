import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./asyncAction";

const initialState = {
  user: {},
  token: "",
  loading: false,
  msg: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  //FOR SYNC ACTION
  reducers: {
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
  //FOR ASYNC ACTION
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.msg = "Pending";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = "Success";
        state.user = action.payload?.data;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.msg = "Failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout, updateToken } = userSlice.actions;

export default userSlice.reducer;
