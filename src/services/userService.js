import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

// const authuser = JSON.parse(localStorage.getItem("user"));

export function getUsers(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}users`, requestOptions).then(
    authService.handleResponse
  );
}
