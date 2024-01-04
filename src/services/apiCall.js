import axios from "axios";

export const preLogin = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  timeout: 1000 * 30,
  headers: { "Content-Type": "application/json" },
});

export const postLogin = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  },
});
