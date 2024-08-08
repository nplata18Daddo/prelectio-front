import axios from "axios";

export function LoginService(data) {
  return axios({
    method: "post",
    url: "api/auth/login",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function LogoutService(data) {
  return axios({
    method: "post",
    url: "api/auth/logout",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
export function ForgotPasswordService(data) {
  return axios({
    method: "post",
    url: "api/auth/forgotPassword",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}

export function ChangePasswordService(data) {
  return axios({
    method: "post",
    url: "api/auth/changePassword",
    baseURL: process.env.REACT_APP_BASE_URL,
    data: data,
  });
}
