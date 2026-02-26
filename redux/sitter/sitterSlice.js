import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

// Helper: Get Token & Headers
const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('token');
  if (!token) console.warn("⚠️ Warning: No token found in localStorage!");

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  
  return headers;
};

// 1. Fetch Sitter Profile
export const fetchSitterProfile = createAsyncThunk(
  'sitter/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/sitter/profile`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch profile");
      
      return result.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Update Sitter Profile Info
export const updateSitterProfile = createAsyncThunk(
  'sitter/updateProfile',
  async (sitterData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/sitter/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(sitterData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Update failed");
      
      return result.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. Update Sitter Image
export const updateSitterImage = createAsyncThunk(
  'sitter/updateImage',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await fetch(`${API_URL}/api/sitter/profile-image`, { 
        method: "POST", 
        headers: getAuthHeaders(true),
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Image upload failed");
    
      return result.profilePicture || result.data?.profilePicture || result.url;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 4. Change Password
export const changeSitterPassword = createAsyncThunk(
  'sitter/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/sitter/change-password`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(passwordData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Password change failed");
      
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 5. Upload Portfolio Image
export const uploadPortfolioImage = createAsyncThunk(
  'sitter/uploadPortfolioImage',
  async (file, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await fetch(`${API_URL}/api/upload`, { 
        method: "POST", 
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadResult.message || "Image upload failed");
      const newImageUrl = uploadResult.data?.url || uploadResult.url || uploadResult.secure_url;

      if (!newImageUrl) throw new Error("Did not receive image URL from server");
      const currentState = getState().sitter.profile;
      const currentPortfolio = currentState?.portfolio || [];
      
      const newPortfolioItem = { url: newImageUrl, id: Date.now() };
      
      const updateData = {
        portfolio: [...currentPortfolio, newPortfolioItem]
      };

      const profileResponse = await fetch(`${API_URL}/api/sitter/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });

      const profileResult = await profileResponse.json();
      if (!profileResponse.ok) throw new Error("Failed to update profile with new image");

      return newPortfolioItem;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 6. Delete Portfolio Image
export const deletePortfolioImage = createAsyncThunk(
  'sitter/deletePortfolioImage',
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/sitter/portfolio/${imageId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Delete failed");
      
      return imageId; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 7. Fetch Public Sitter Profile by ID
export const fetchPublicSitterProfile = createAsyncThunk(
  'sitter/fetchPublicProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/sitter/public/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" } 
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch public profile");
      
      return result.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const sitterSlice = createSlice({
  name: 'sitter',
  initialState: {
    profile: null,
    publicProfile: null, // Fixed: Added this line
    loading: false,
    updating: false,
    error: null,
  },
  reducers: {
    clearSitterError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Profile Logic ---
      .addCase(fetchSitterProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSitterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        if (!state.profile.portfolio) {
          state.profile.portfolio = [];
        }
      })
      .addCase(fetchSitterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Update Profile Info Logic ---
      .addCase(updateSitterProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSitterProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateSitterProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // --- Update Profile Image Logic ---
      .addCase(updateSitterImage.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSitterImage.fulfilled, (state, action) => {
        state.updating = false;
        if (state.profile) {
          state.profile.profilePicture = action.payload;
        }
      })
      .addCase(updateSitterImage.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // --- Change Password Logic ---
      .addCase(changeSitterPassword.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(changeSitterPassword.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(changeSitterPassword.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // --- Upload Portfolio Image Logic ---
      .addCase(uploadPortfolioImage.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(uploadPortfolioImage.fulfilled, (state, action) => {
        state.updating = false;
        if (state.profile) {
          if (!state.profile.portfolio) state.profile.portfolio = [];
          state.profile.portfolio.push(action.payload);
        }
      })
      .addCase(uploadPortfolioImage.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // --- Delete Portfolio Image Logic ---
      .addCase(deletePortfolioImage.pending, (state) => {
        // Optional loading
      })
      .addCase(deletePortfolioImage.fulfilled, (state, action) => {
        if (state.profile && state.profile.portfolio) {
          state.profile.portfolio = state.profile.portfolio.filter(
            (img) => img._id !== action.payload && img.id !== action.payload
          );
        }
      })
      .addCase(deletePortfolioImage.rejected, (state, action) => {
        state.error = action.payload;
      })

      // --- Fetch Public Sitter Profile Logic ---
      .addCase(fetchPublicSitterProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.publicProfile = null;
      })
      .addCase(fetchPublicSitterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.publicProfile = action.payload;
      })
      .addCase(fetchPublicSitterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSitterError } = sitterSlice.actions;
export default sitterSlice.reducer;