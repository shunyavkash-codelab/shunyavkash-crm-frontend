import axios from "axios";
const { REACT_APP_API_BASE_URL } = process.env;
export const instance = axios.create({
  baseURL: REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
