import api from "./api.js";

export function login(credentials) {
  return api.post("/login", credentials);
}

export function register(payload) {
  return api.post("/register", payload);
}
