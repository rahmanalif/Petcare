import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// 1. Create Stripe Connect Account
export const createConnectAccount = createAsyncThunk(
  'payment/createConnectAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/payments/create-connect-account`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to create connect account");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Get Onboarding Link
export const fetchOnboardingLink = createAsyncThunk(
  'payment/fetchOnboardingLink',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/payments/onboarding-link`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to get onboarding link");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. Reset Connect Account
export const resetConnectAccount = createAsyncThunk(
  'payment/resetConnectAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/payments/reset-connect-account`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to reset account");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 4. Create Booking Intent (Owner pays)
export const createBookingIntent = createAsyncThunk(
  'payment/createBookingIntent',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/payments/create-booking-intent`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ bookingId }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to create payment intent");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 5. Transfer To Sitter (Manual)
export const transferToSitter = createAsyncThunk(
  'payment/transferToSitter',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/payments/transfer-to-sitter`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ bookingId }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to transfer to sitter");
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 6. Fetch Earnings History (Sitter)
export const fetchEarningsHistory = createAsyncThunk(
  'payment/fetchEarningsHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/sitter/earnings`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch earnings");
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 7. Fetch Payment History (Owner — bookings list)
export const fetchPaymentHistory = createAsyncThunk(
  'payment/fetchPaymentHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to fetch payment history");
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    stripeConnected: false,
    stripeOnboardingUrl: null,
    earningsHistory: [],
    earningsLoading: false,
    paymentHistory: [],
    paymentHistoryLoading: false,
    clientSecret: null,
    transferLoading: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    clearClientSecret: (state) => {
      state.clientSecret = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Connect Account
      .addCase(createConnectAccount.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createConnectAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.stripeOnboardingUrl = action.payload.url || action.payload.data?.url;
      })
      .addCase(createConnectAccount.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Fetch Onboarding Link
      .addCase(fetchOnboardingLink.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchOnboardingLink.fulfilled, (state, action) => {
        state.loading = false;
        state.stripeOnboardingUrl = action.payload.url || action.payload.data?.url;
      })
      .addCase(fetchOnboardingLink.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Create Booking Intent
      .addCase(createBookingIntent.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createBookingIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.clientSecret || action.payload.data?.clientSecret;
      })
      .addCase(createBookingIntent.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Transfer To Sitter
      .addCase(transferToSitter.pending, (state) => { state.transferLoading = true; state.error = null; })
      .addCase(transferToSitter.fulfilled, (state) => { state.transferLoading = false; })
      .addCase(transferToSitter.rejected, (state, action) => { state.transferLoading = false; state.error = action.payload; })

      // Fetch Earnings History
      .addCase(fetchEarningsHistory.pending, (state) => { state.earningsLoading = true; })
      .addCase(fetchEarningsHistory.fulfilled, (state, action) => {
        state.earningsLoading = false;
        state.earningsHistory = action.payload;
      })
      .addCase(fetchEarningsHistory.rejected, (state, action) => { state.earningsLoading = false; state.error = action.payload; })

      // Fetch Payment History
      .addCase(fetchPaymentHistory.pending, (state) => { state.paymentHistoryLoading = true; state.error = null; })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.paymentHistoryLoading = false;
        state.paymentHistory = action.payload;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => { state.paymentHistoryLoading = false; state.error = action.payload; });
  },
});

export const { clearPaymentError, clearClientSecret } = paymentSlice.actions;
export default paymentSlice.reducer;