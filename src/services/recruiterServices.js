import axios from "axios";
import GetToken from "../config/getToken";

const axiosInstance = axios.create();
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location = "/login";
    }

    return Promise.reject(error);
  }
);

export function RegisterService(data) {
  return axiosInstance({
    method: "post",
    url: "api/reclutador",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function GetMessagesReclutador(data) {
  return axiosInstance({
    method: "get",
    url: "api/mensaje/getByDe/" + data.id,
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
    headers: {
      Authorization: GetToken(),
    },
  });
}

export function GetMessagesReclutadorReceived(data) {
  return axiosInstance({
    method: "get",
    url: "api/mensaje/getByPara/" + data.id,
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
    headers: {
      Authorization: GetToken(),
    },
  });
}

export function UpdateProfileRecruiter(data) {
  return axiosInstance({
    method: "PUT",
    data: data,
    url: "api/reclutador/update/",
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: GetToken(),
    },
  });
}
export function UpdateProfileAthlete(data) {
  return axiosInstance({
    method: "PUT",
    data: data,
    url: "api/deportista/update/",
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: GetToken(),
    },
  });
}
