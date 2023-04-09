import axios from "axios";

export function RegisterDeportistaService(data) {
  return axios({
    method: "post",
    url: "api/deportista",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}

export function GetMessagesDeportista(data) {
  return axios({
    method: "get",
    url: "api/mensaje/getByPara/" + data.id,
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function ChangeMessageOpened(data) {
  console.log(process.env.REACT_APP_BASE_URL);
  return axios({
    method: "put",
    url: "api/mensaje/cambiarLeido/" + data.id,
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
