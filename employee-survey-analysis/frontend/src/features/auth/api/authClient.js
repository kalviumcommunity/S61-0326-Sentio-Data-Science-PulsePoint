const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function sendRequest(endpoint, { method = "GET", payload, token } = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(payload ? { body: JSON.stringify(payload) } : {}),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || "Something went wrong. Please try again.");
  }

  return data;
}


export function signupUser(payload) {
  return sendRequest("/v1/auth/signup", { method: "POST", payload });
}


export function loginUser(payload) {
  return sendRequest("/v1/auth/login", { method: "POST", payload });
}


export function fetchDashboardOverview(token) {
  return sendRequest("/dashboard/overview", { token });
}
