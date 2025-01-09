import axios from "axios";
import { API_URL } from "./constants.ts";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export { api };
