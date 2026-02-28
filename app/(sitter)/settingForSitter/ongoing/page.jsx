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
import { useTranslation } from "react-i18next";

const SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getImageUrl = (path) => {
  if (!path) return "https://placehold.co/100";
  if (path.startsWith("http")) return path;
  return `${SERVER_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

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

export default function SitterOngoingDetails() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();

  const { currentBooking: booking, loading } = useSelector((state) => state.booking);
  const { messages, sending } = useSelector((state) => state.chat);

  const [activeView, setActiveView] = useState("details");
  const [messageText, setMessageText] = useState("");
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (id) dispatch(fetchBookingById(id));
    return () => {
      dispatch(clearCurrentBooking());
      dispatch(clearChat());
    };
  }, [id, dispatch]);

  // ✅ Sitter → Owner এর সাথে chat, তাই booking.owner._id ব্যবহার
  useEffect(() => {
    if (activeView !== "chat" || !booking?.owner?._id) return;

    dispatch(fetchMessagesByUser(booking.owner._id));

    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (!token) return;

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(SERVER_URL, {
      transports: ["websocket"],
      auth: { token },
      query: { token },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket Connected:", socket.id);
      setIsSocketConnected(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
      setIsSocketConnected(false);
    });

    // ✅ Owner থেকে আসা real-time message
    socket.on("new_message", (data) => {
      console.log("📩 Sitter received:", data);
      // Backend { conversationId, message: {...} } format fix
      const actualMessage = data.message || data;
      const senderId = typeof actualMessage.sender === "object" ? actualMessage.sender?._id : actualMessage.sender;
      console.log("senderId:", senderId, "owner._id:", booking.owner._id);
      // Owner থেকে আসলে add করো
      if (senderId === booking.owner._id) {
        dispatch(addMessage(actualMessage));
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket Error:", err.message);
      setIsSocketConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsSocketConnected(false);
    };
  }, [activeView, booking?.owner?._id, dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Sitter → Owner কে message পাঠানো
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !booking?.owner?._id) return;

    const currentText = messageText;
    const tempId = `temp_${Date.now()}`;

    // Optimistic: সাথে সাথে RIGHT এ দেখাও
    dispatch(addOptimisticMessage({
      tempId,
      content: currentText,
      messageType: "text",
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    }));

    setMessageText("");

    // API তে save
    await dispatch(sendMessage({
      recipientId: booking.owner._id, // ✅ Owner কে পাঠাচ্ছি
      content: currentText,
      tempId,
    }));

    // Socket emit
    if (socketRef.current?.connected) {
      socketRef.current.emit("send_message", {
        chatType: "conversation",
        chatId: booking._id,
        receiverId: booking.owner._id,
        content: currentText,
        messageType: "text",
        timestamp: new Date().toISOString(),
      });
    }
  };

  if (loading) return <div className="p-10 text-center text-[#024B5E]">{t("sitter_ongoing.loading")}</div>;
  if (!booking) return <div className="p-10 text-center text-red-500">{t("sitter_ongoing.not_found")}</div>;

  const owner = booking.owner;

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
          <h1 className="text-xl font-bold text-[#024B5E]">{t("sitter_ongoing.ongoing_details")}</h1>
        </div>

        {/* Details View */}
        {activeView === "details" && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-[#024B5E] font-semibold mb-2">{t("sitter_ongoing.availability")}</h2>
            </div>
            <div className="w-full lg:w-2/3 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-[#024B5E] font-bold text-lg">{owner?.fullName}</h3>
                <div className="flex justify-end gap-3 pt-2 flex-wrap mt-4">
                  <button
                    onClick={() => setActiveView("chat")}
                    className="bg-[#035F75] text-white px-8 py-2.5 rounded-lg hover:bg-[#024B5E] transition"
                  >
                    {t("sitter_ongoing.chat_with_owner")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat View */}
        {activeView === "chat" && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow h-[600px] flex flex-col mt-4">

            <div className="p-4 border-b font-bold text-[#024B5E] flex justify-between items-center">
              <span>{t("sitter_ongoing.chat_header", { name: owner?.fullName })}</span>
              <span className={`text-xs font-normal flex items-center gap-1 ${isSocketConnected ? "text-green-600" : "text-gray-400"}`}>
                ● {isSocketConnected ? t("sitter_ongoing.live") : t("sitter_ongoing.connecting")}
              </span>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-2 bg-gray-50">
              {messages.map((m, i) => {
                const senderId = typeof m.sender === "object" ? m.sender?._id : m.sender;

                // ✅ Owner এর message = LEFT, Sitter (আমার) message = RIGHT
                const isOwnerMessage = senderId && owner?._id && senderId === owner._id;
                const isMine = !isOwnerMessage || m.isOptimistic;

                return (
                  <div key={m._id || m.tempId || i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`p-2 px-3 rounded-lg max-w-[80%] text-sm ${isMine
                        ? `bg-[#035F75] text-white rounded-br-none ${m.isOptimistic ? "opacity-70" : ""}`
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}>
                      {m.messageType === "image" || isImageUrl(m.content) ? (
                        <img src={getImageUrl(m.content)} alt="sent" className="w-48 rounded-lg" />
                      ) : (
                        <span>{m.content || m.message}</span>
                      )}
                      {m.isOptimistic && (
                        <span className="text-xs opacity-60 ml-2">{t("sitter_ongoing.sending")}</span>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <input
                className="flex-1 border p-2 rounded focus:outline-none focus:border-[#035F75]"
                placeholder={t("sitter_ongoing.message_placeholder")}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                disabled={sending}
              />
              <button
                type="submit"
                className="bg-[#035F75] text-white px-4 py-2 rounded hover:bg-[#024B5E] disabled:opacity-50"
                disabled={!messageText.trim() || sending}
              >
                {t("sitter_ongoing.send")}
              </button>
              <button type="button" onClick={() => setActiveView("details")} className="text-gray-500 underline text-sm">
                {t("sitter_ongoing.back")}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}