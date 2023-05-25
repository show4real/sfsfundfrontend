import settings from "./settings";
import { authHeader } from "./authHeader";
import { authService } from "./authService";

export function getTasks(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}staff/tasks`, requestOptions).then(
    authService.handleResponse
  );
}

export function getApproverTasks(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`${settings.API_URL}approver/tasks`, requestOptions).then(
    authService.handleResponse
  );
}

export function addTask({ title, description, completed }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      title,
      description,
      completed,
    }),
  };
  return fetch(`${settings.API_URL}task/store`, requestOptions).then(
    authService.handleResponse
  );
}

export function editTask({ title, description, completed, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      title,
      description,
      completed,
      id,
    }),
  };

  return fetch(`${settings.API_URL}update/task/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function approveTask({ approve, id }) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      approve,
      id,
    }),
  };

  return fetch(`${settings.API_URL}approve/task/${id}`, requestOptions).then(
    authService.handleResponse
  );
}

export function deleteTask(id) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  return fetch(`${settings.API_URL}delete/task/${id}`, requestOptions).then(
    authService.handleResponse
  );
}
