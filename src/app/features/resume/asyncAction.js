import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../../../services/apiCall";

export const getAllResume = createAsyncThunk(
  "resume/getAllResume",
  async () => {
    try {
      const res = await postLogin.get("resume/get-all-resume", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (res?.data) return res?.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);
