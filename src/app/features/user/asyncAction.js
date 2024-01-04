import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../../../services/apiCall";

export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const data = await postLogin.get("user/get-user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log("error", error);
  }
});
