import settings from "./settings";

export const authService = {
  login,
  register,
  handleResponse,
};
export function getUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  return user || false;
}

export function login({ email, password }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  return fetch(`${settings.API_URL}login`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.user) {
        response.user.token = response.token;
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    });
}

export function register({ name, email, password, department_id, approver }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, password, department_id, approver }),
  };
  return fetch(`${settings.API_URL}signup`, requestOptions)
    .then(handleResponse)
    .then((response) => {
      if (response.user) {
        response.user.token = response.token;
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    });
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
}
