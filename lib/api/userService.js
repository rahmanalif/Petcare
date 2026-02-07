// API Base URL from environment variable
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Helper function to get auth headers
const authHeader = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

// Get user profile
export const getProfile = async () => {
  const res = await fetch(`${API_BASE}/api/users/profile`, {
    method: "GET",
    headers: {
      ...authHeader(),
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Failed to fetch profile (${res.status})`);
  }
  return res.json();
};

// Update user profile
export const updateProfile = async (data) => {
  const res = await fetch(`${API_BASE}/api/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Failed to update profile (${res.status})`);
  }
  return res.json();
};

// Upload profile picture
export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);

  const res = await fetch(`${API_BASE}/api/users/profile/picture`, {
    method: "POST",
    headers: {
      ...authHeader(),
    },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Failed to upload image (${res.status})`);
  }
  return res.json();
};
