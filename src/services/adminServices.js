import axios from "axios";
import GetToken from "../config/getToken";

export function GetPendingRecruiters(data) {
  return axios({
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
  return axios({
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
  return axios({
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
  return axios({
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
  return axios({
    method: "GET",
    url: "api/deportista/" + data.id,
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function GetHabilidadDeportista(data) {
  return axios({
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
  return axios({
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
  console.log("goingg")
  return axios({
    method: "PUT",
    data: data,
    url: "api/deportista/update/",
    baseURL: process.env.REACT_APP_BASE_URL,
  });
}

export function ChangeRecruiterStatus(data) {
  return axios({
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
  return axios({
    method: "GET",
    url: "api/dashboard/",
    headers: {
      Authorization: GetToken(),
    },
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
