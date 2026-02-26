import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

// Helper function to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
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
      
      return result.data; // Assuming API returns { data: { ... } }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Update Sitter Profile
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
      
      return result.data; // Return the updated data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const sitterSlice = createSlice({
  name: 'sitter',
  initialState: {
    profile: null,   // Sitter profile data
    loading: false,  // For initial fetch
    updating: false, // For update actions
    error: null,
  },
  reducers: {
    // Optional: Clear error manually if needed
    clearSitterError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile Logic
      .addCase(fetchSitterProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSitterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSitterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile Logic
      .addCase(updateSitterProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateSitterProfile.fulfilled, (state, action) => {
        state.updating = false;
        // Update local state with new data
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateSitterProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearSitterError } = sitterSlice.actions;
export default sitterSlice.reducer;