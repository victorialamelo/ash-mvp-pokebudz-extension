import { jwtDecode } from "jwt-decode";

const TOKEN_STORAGE_KEY = "token";

export function hasSession() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) !== null;
}

export function getAuthHeader() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    throw new Error("no session");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

export function getCurrentSession() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    throw new Error("no session");
  }

  const payload = jwtDecode(token);

  return {
    userId: payload.user_id,
  };
}

export function deleteCurrentSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function saveSession(token) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}
