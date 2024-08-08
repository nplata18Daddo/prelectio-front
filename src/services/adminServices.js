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

export function GetPendingRecruiters(data) {
  return axiosInstance({
    method: "GET",
    url: "api/reclutador/pendientes",
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}

export function GetApprovedRecruiters(data) {
  return axiosInstance({
    method: "GET",
    url: "api/reclutador/aprobados",
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function SendMail(data) {
  return axiosInstance({
    method: "POST",
    url: "api/mensaje",
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}

export function GetRecruiterDetail(data) {
  return axiosInstance({
    method: "GET",
    url: "api/reclutador/detail/" + data.id,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function GetAthleteDetail(data) {
  return axiosInstance({
    method: "GET",
    url: "api/deportista/" + data.id,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}

export function GetAcudienteDeportista(data) {
  return axiosInstance({
    method: "GET",
    url: "api/acudiente/findByDeportista/" + data,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function GetHabilidadDeportista(data) {
  return axiosInstance({
    method: "GET",
    url: "api/habilidadDeportista/deportista/" + data,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function GetTrayectoriaDeportista(data) {
  return axiosInstance({
    method: "GET",
    url: "api/trayectoria/findByDeportista/" + data,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function UpdateProfileAthlete(data) {
  return axiosInstance({
    method: "PUT",
    data: data,
    url: "api/deportista/update/",
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function ChangeRecruiterStatus(data) {
  return axiosInstance({
    method: "PUT",
    url: "api/reclutador/cambiarEstado/" + data.id,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function GetDashboardInfo(data) {
  return axiosInstance({
    method: "GET",
    url: "api/dashboard/",
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
