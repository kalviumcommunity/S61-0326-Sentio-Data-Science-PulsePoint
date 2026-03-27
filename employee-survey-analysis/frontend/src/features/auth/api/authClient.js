const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function sendAuthRequest(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || "Something went wrong. Please try again.");
  }

  return data;
}

export function signupUser(payload) {
  return sendAuthRequest("/auth/signup", payload);
}

export function loginUser(payload) {
  return sendAuthRequest("/auth/login", payload);
}
