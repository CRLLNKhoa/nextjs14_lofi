"use client";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useEffect, useRef } from "react";

interface ChatRoomProps {
  roomId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
  const messages = useChatMessages(roomId);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Mỗi khi messages thay đổi, cuộn đến cuối của danh sách
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 px-4 py-4 overflow-y-auto w-[420px] no-scrollbar">
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatRoom;
