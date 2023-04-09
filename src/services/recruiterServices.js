import axios from "axios";

export function RegisterService(data) {
  return axios({
    method: "post",
    url: "api/reclutador",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function GetMessagesReclutador(data) {
  return axios({
    method: "get",
    url: "api/mensaje/getByDe/" + data.id,
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
