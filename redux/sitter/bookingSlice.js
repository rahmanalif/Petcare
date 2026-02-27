import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const fetchAllBookings = createAsyncThunk(
  'booking/fetchAllBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/bookings`, {
        method: 'GET',
        headers: getHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch bookings');
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCalendarEvents = createAsyncThunk(
  'booking/fetchCalendarEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/bookings/calendar`, {
        method: 'GET',
        headers: getHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch calendar');
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'booking/updateBookingStatus',
  async ({ id, status }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to update status');
      dispatch(fetchAllBookings());
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'booking/fetchBookingById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/bookings/${id}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch booking details');
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestReschedule = createAsyncThunk(
  'booking/requestReschedule',
  async ({ id, reason, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/bookings/${id}/reschedule`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ reason, startDate, endDate }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to reschedule');
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    allBookings: [], // ✅ all bookings for calendar
    currentBooking: null,
    calendarEvents: [],
    stats: { total: 0, ongoing: 0, completed: 0, upcoming: 0 },
    loading: false,
    actionLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.successMessage = null;
      state.error = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.allBookings = action.payload; // ✅ calendar এর জন্য
        state.stats = {
          total: action.payload.length,
          ongoing: action.payload.filter(b => b?.status === 'ongoing').length,
          completed: action.payload.filter(b => b?.status === 'completed').length,
          upcoming: action.payload.filter(b => ['upcoming', 'confirmed'].includes(b?.status)).length,
        };
      })
      // Calendar
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.calendarEvents = action.payload;
      })
      // Single Booking
      .addCase(fetchBookingById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBookingById.fulfilled, (state, action) => { state.loading = false; state.currentBooking = action.payload; })
      .addCase(fetchBookingById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Reschedule
      .addCase(requestReschedule.pending, (state) => { state.actionLoading = true; state.error = null; })
      .addCase(requestReschedule.fulfilled, (state) => {
        state.actionLoading = false;
        state.successMessage = "Reschedule request sent successfully!";
      })
      .addCase(requestReschedule.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBooking, clearMessages } = bookingSlice.actions;
export default bookingSlice.reducer;