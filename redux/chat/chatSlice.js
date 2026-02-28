import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getHeaders = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }
  return { 'Content-Type': 'application/json' };
};

// Fetch Messages
export const fetchMessagesByUser = createAsyncThunk(
  'chat/fetchMessagesByUser',
  async (otherUserId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chat/messages/${otherUserId}`, {
        method: 'GET',
        headers: getHeaders(),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to fetch messages');
      return result.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Send Message (API Call - for persistence)
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ recipientId, content, tempId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/chat/send`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          receiverId: recipientId,
          content: content,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Server Error Details:", result);
        throw new Error(result.message || 'Failed to send message');
      }

      // ✅ Return with tempId so we can replace the optimistic message
      return { ...result.data, tempId };
    } catch (error) {
      return rejectWithValue({ message: error.message, tempId });
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false,
    sending: false,
    error: null,
  },
  reducers: {
    clearChat: (state) => {
      state.messages = [];
      state.error = null;
    },

    // ✅ Optimistic message add (before API responds)
    addOptimisticMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    // ✅ Socket থেকে আসা real-time message add
    addMessage: (state, action) => {
      const newMessage = action.payload;

      const exists = state.messages.some(
        (m) =>
          // Real _id match
          (newMessage._id && m._id && m._id === newMessage._id) ||
          // Optimistic tempId match
          (newMessage.tempId && m.tempId && m.tempId === newMessage.tempId)
      );

      if (!exists) {
        state.messages.push(newMessage);
      }
    },

    // ✅ Failed optimistic message remove
    removeOptimisticMessage: (state, action) => {
      const tempId = action.payload;
      state.messages = state.messages.filter((m) => m.tempId !== tempId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessagesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessagesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        if (action.payload) {
          // ✅ Optimistic message কে real message দিয়ে replace করো
          const idx = state.messages.findIndex(
            (m) => m.tempId && m.tempId === action.payload.tempId
          );
          if (idx !== -1) {
            state.messages[idx] = action.payload; // replace
          } else {
            // Optimistic message না থাকলে শুধু push করো (duplicate check)
            const alreadyExists = state.messages.some(
              (m) => m._id && m._id === action.payload._id
            );
            if (!alreadyExists) {
              state.messages.push(action.payload);
            }
          }
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload?.message || action.payload;
        // ✅ Failed হলে optimistic message সরিয়ে দাও
        if (action.payload?.tempId) {
          state.messages = state.messages.filter(
            (m) => m.tempId !== action.payload.tempId
          );
        }
      });
  },
});

export const { clearChat, addMessage, addOptimisticMessage, removeOptimisticMessage } =
  chatSlice.actions;
export default chatSlice.reducer;