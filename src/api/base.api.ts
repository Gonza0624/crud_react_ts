import axios from "axios";

// api creada en express
export const BASE_URL = `http://localhost:4000/api/`;

export const instance = axios.create({
  baseURL: BASE_URL,
});
