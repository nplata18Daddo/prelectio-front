import axios from "axios";

export function RegisterDeportistaService(data) {
  return axios({
    method: "post",
    url: "api/deportista",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
