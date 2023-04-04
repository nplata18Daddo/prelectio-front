import axios from "axios";

export function RegisterService(data) {
  return axios({
    method: "post",
    url: "api/reclutador",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
