import axios from "axios";

export function RegisterDeportistaService(data) {
  console.log(process.env.REACT_APP_BASE_URL);
  return axios({
    method: "post",
    url: "api/deportista",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
