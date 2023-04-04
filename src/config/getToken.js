import jwt_decode from "jwt-decode";
import { createBrowserHistory } from "history";
const GetToken = () => {
  const history = createBrowserHistory();
  let token = localStorage.getItem("access_token");

  if (!token) {
    history.push("/");
    return false;
  }
  const { exp } = jwt_decode(token);
  const expirationTime = exp * 1000 - 60000;
  if (Date.now() >= expirationTime) {
    // token = await refreshToken()
    // set LocalStorage here based on response;
    history.push("/");
    localStorage.clear();
    return false;
  }

  return token;
};

export default GetToken;
