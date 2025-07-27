import axios from "axios";
import nookies from "nookies";

const token = nookies.get(null)["auth.token"];

export const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
