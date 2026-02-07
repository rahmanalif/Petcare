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

  if (!res.ok) throw new Error("Failed to fetch profile");
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

  if (!res.ok) throw new Error("Failed to update profile");
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

  if (!res.ok) throw new Error("Failed to upload image");
  return res.json();
};
