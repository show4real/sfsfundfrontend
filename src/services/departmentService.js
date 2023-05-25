import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";
export function getDepartment() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}departments`, requestOptions)
    .then(authService.handleResponse)
    .then((response) => {
      return response;
    });
}
