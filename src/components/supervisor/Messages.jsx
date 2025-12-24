import React, { useState } from "react";
import "../../assets/css/SupervisorDashboardContainer.css";


const messagesData = [
  {
    id: "MSG001",
    from: "Hawker",
    sender: "Ramesh Pawar",
    hawkerId: "HKR001",
    message: "Stock is running low for tomatoes.",
    time: "10:30 AM",
  },
  {
    id: "MSG002",
    from: "Admin",
    sender: "SPO Office",
    message: "Ensure all hawkers submit sales report by 8 PM.",
    time: "09:15 AM",
  },
];

const hawkersList = ["Ramesh Pawar", "Suresh Kale", "Mahesh Jadhav"];

export default function Messages() {
  const [messages, setMessages] = useState(messagesData);
  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [broadcastText, setBroadcastText] = useState("");

  const sendReply = (msg) => {
    if (!replyText.trim()) return;
    alert(`Reply sent to ${msg.sender}`);
    setReplyText("");
    setOpenReplyId(null);
  };

  const sendBroadcast = () => {
    if (!broadcastText.trim()) return;
    alert("Broadcast message sent to all assigned hawkers");
    setBroadcastText("");
  };

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      <p className="subtitle">Communication with Hawkers & Admin</p>

      {/* ===== Broadcast Panel ===== */}
      <div className="broadcast-panel">
        <h4>Broadcast Message</h4>
        <textarea
          placeholder="Send message to all assigned hawkers..."
          value={broadcastText}
          onChange={(e) => setBroadcastText(e.target.value)}
        />
        <button className="primary" onClick={sendBroadcast}>
          Send Broadcast
        </button>
      </div>

      {/* ===== Messages List ===== */}
      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message-card">
            <div className="message-header">
              <div>
                <strong>{msg.sender}</strong>
                <span className="from-tag">{msg.from}</span>
              </div>
              <span className="time">{msg.time}</span>
            </div>

            <p className="message-text">{msg.message}</p>

            {msg.from === "Hawker" && (
              <button
                className="reply-btn"
                onClick={() =>
                  setOpenReplyId(openReplyId === msg.id ? null : msg.id)
                }
              >
                Reply
              </button>
            )}

            {/* ===== Inline Reply Panel (OPENS DOWN) ===== */}
            {openReplyId === msg.id && (
              <div className="reply-panel">
                <textarea
                  placeholder={`Reply to ${msg.sender}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="reply-actions">
                  <button className="primary" onClick={() => sendReply(msg)}>
                    Send
                  </button>
                  <button
                    className="secondary"
                    onClick={() => setOpenReplyId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
