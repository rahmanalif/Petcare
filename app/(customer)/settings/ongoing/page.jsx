"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import {
  fetchBookingById,
  clearCurrentBooking,
  requestReschedule,
  cancelBooking,
  clearMessages as clearBookingMessages,
} from "@/redux/bookingSlice";
import {
  fetchMessagesByUser,
  sendMessage,
  clearChat,
  addMessage,
  addOptimisticMessage,
} from "@/redux/chat/chatSlice";

const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getImageUrl = (path) => {
  if (!path) return "https://placehold.co/100";
  if (path.startsWith("http")) return path;
  return `${SERVER_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// ✅ Image URL কিনা properly check করে
const isImageUrl = (url) => {
  if (!url) return false;
  return url.startsWith("http") && /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-1">
    <span className="text-[#024B5E] font-bold text-sm min-w-[140px]">{label}:</span>
    <span className="text-gray-500 text-sm text-right flex-1">{value || "N/A"}</span>
  </div>
);

const SectionHeading = ({ title, icon }) => (
  <h4 className="flex items-center gap-2 text-[#024B5E] font-bold text-sm mb-3">
    {icon && icon}
    {title}
  </h4>
);

export default function OwnerOngoingDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();

  const { currentBooking: booking, loading } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth || state.user || {});
  const { messages, sending } = useSelector((state) => state.chat);

  const [activeView, setActiveView] = useState("details");
  const [messageText, setMessageText] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // ✅ useRef দিয়ে socket manage করা হচ্ছে (global variable বাদ)
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  // Initial Booking Fetch
  useEffect(() => {
    if (id) dispatch(fetchBookingById(id));
    return () => {
      dispatch(clearCurrentBooking());
      dispatch(clearChat());
    };
  }, [id, dispatch]);

  // ✅ Socket সম্পূর্ণ ঠিক করা হয়েছে
  useEffect(() => {
    if (activeView !== "chat" || !booking?.sitter?._id) return;

    // Chat history fetch
    dispatch(fetchMessagesByUser(booking.sitter._id));

    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (!token) return;

    // ✅ আগের socket থাকলে disconnect করে নতুন তৈরি করো
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(SERVER_URL, {
      transports: ["websocket"],
      auth: { token },
      query: { token },
      reconnection: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
      setIsSocketConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
      setIsSocketConnected(false);
    });

    // ✅ Real-time message receive
    socket.on("new_message", (data) => {
      // Backend { conversationId, message: {...} } format fix
      const actualMessage = data.message || data;
      const senderId = typeof actualMessage.sender === "object" ? actualMessage.sender?._id : actualMessage.sender;

      if (senderId === booking.sitter._id || senderId === user?._id) {
        dispatch(addMessage(actualMessage));
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket Error:", err.message);
      setIsSocketConnected(false);
    });

    // ✅ Cleanup: chat view থেকে বের হলে socket disconnect
    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsSocketConnected(false);
    };
  }, [activeView, booking?.sitter?._id, dispatch, user?._id]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Optimistic UI সহ Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !booking?.sitter?._id) return;

    const currentText = messageText;
    const tempId = `temp_${Date.now()}`; // unique temporary ID

    // 1. ✅ Optimistic: আগেই message দেখাও (instant feel)
    dispatch(
      addOptimisticMessage({
        tempId,
        content: currentText,
        sender: user?._id,
        messageType: "text",
        createdAt: new Date().toISOString(),
        isOptimistic: true, // loading indicator দেখানোর জন্য
      })
    );

    setMessageText(""); // Input clear করো তাড়াতাড়ি

    // 2. API তে save করো (tempId পাঠাও যাতে replace করা যায়)
    await dispatch(
      sendMessage({
        recipientId: booking.sitter._id,
        content: currentText,
        tempId,
      })
    );

    // 3. ✅ Socket emit (real-time notify to receiver)
    if (socketRef.current?.connected && user?._id) {
      socketRef.current.emit("send_message", {
        chatType: "conversation",
        chatId: booking._id,
        senderId: user._id,
        receiverId: booking.sitter._id,
        content: currentText,
        messageType: "text",
        timestamp: new Date().toISOString(),
      });
    }
  };

  if (loading) return <div className="p-10 text-center text-[#024B5E]">Loading details...</div>;
  if (!booking) return <div className="p-10 text-center text-red-500">Booking not found</div>;

  const pet = booking.pets?.[0];
  const sitter = booking.sitter;

  return (
    <div className="bg-[#FDFDFD] min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => router.back()} className="text-[#024B5E]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-[#024B5E]">Ongoing details</h1>
        </div>

        {/* Details View */}
        {activeView === "details" && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-[#024B5E] font-semibold mb-2">Pet sitter Availability</h2>
              {/* Calendar logic এখানে যাবে */}
            </div>

            <div className="w-full lg:w-2/3 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-[#024B5E] font-bold text-lg">{sitter?.fullName}</h3>
                <div className="flex justify-end gap-3 pt-2 flex-wrap mt-4">
                  <button
                    onClick={() => setActiveView("chat")}
                    className="bg-[#035F75] text-white px-8 py-2.5 rounded-lg hover:bg-[#024B5E] transition"
                  >
                    Chat with Sitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Chat View — সব সমস্যা fix করা */}
        {activeView === "chat" && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow h-[600px] flex flex-col mt-4">

            {/* Chat Header */}
            <div className="p-4 border-b font-bold text-[#024B5E] flex justify-between items-center">
              <span>Chat with {sitter?.fullName}</span>
              <span
                className={`text-xs font-normal flex items-center gap-1 ${
                  isSocketConnected ? "text-green-600" : "text-gray-400"
                }`}
              >
                ● {isSocketConnected ? "Live" : "Connecting..."}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-2 bg-gray-50">
              {messages.map((m, i) => {
                const senderId = typeof m.sender === "object" ? m.sender?._id : m.sender;

                // Sitter sender = LEFT, others = RIGHT
                const isSitterMessage = senderId && sitter?._id && senderId === sitter._id;
                const isMine = !isSitterMessage || m.isOptimistic;
                return (
                  <div key={m._id || m.tempId || i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`p-2 px-3 rounded-lg max-w-[80%] text-sm ${
                        isMine
                          ? `bg-[#035F75] text-white rounded-br-none ${m.isOptimistic ? "opacity-70" : ""}`
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {/* ✅ Image vs Text সঠিকভাবে check */}
                      {m.messageType === "image" || isImageUrl(m.content) ? (
                        <img src={getImageUrl(m.content)} alt="sent" className="w-48 rounded-lg" />
                      ) : (
                        <span>{m.content || m.message}</span>
                      )}
                      {/* ✅ Optimistic message এ sending indicator */}
                      {m.isOptimistic && (
                        <span className="text-xs opacity-60 ml-2">sending...</span>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <input
                className="flex-1 border p-2 rounded focus:outline-none focus:border-[#035F75]"
                placeholder="Message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                disabled={sending}
              />
              <button
                type="submit"
                className="bg-[#035F75] text-white px-4 py-2 rounded hover:bg-[#024B5E] disabled:opacity-50"
                disabled={!messageText.trim() || sending}
              >
                Send
              </button>
              <button
                type="button"
                onClick={() => setActiveView("details")}
                className="text-gray-500 underline text-sm"
              >
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}