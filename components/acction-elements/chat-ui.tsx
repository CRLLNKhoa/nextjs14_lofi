"use client";
import { sendMessage } from "@/actions/firebase";
import { useState, FormEvent } from "react";
import { IoMdSend } from "react-icons/io";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

interface MessageFormProps {
  roomId: string;
}

function removeGmailDomain(email: string): string {
  // Kiểm tra xem email có đuôi @gmail.com hay không
  if (email.endsWith("@gmail.com")) {
    // Tách phần tên người dùng trước @gmail.com
    return email.split("@gmail.com")[0];
  } else {
    // Trường hợp email không có đuôi @gmail.com, trả về nguyên email
    return email;
  }
}

const MessageForm: React.FC<MessageFormProps> = ({ roomId }) => {
  const [message, setMessage] = useState<string>("");
  const { isLoaded, isSignedIn, user } = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!isSignedIn){
      toast.error("Vui lòng đăng nhập để chat !");
      return
    }
    if(message.length > 240){
      toast.error("Vui lòng nhập tin nhắn nhỏ hơn 240 ký tự !");
      return  
    }
    if (message.trim()) {
      await sendMessage(
        roomId,
        message,
        removeGmailDomain(user?.emailAddresses[0]?.emailAddress!)
      );
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-4 px-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 mr-4 outline-none px-2 py-1 rounded-lg text-black"
      />
      <button type="submit" className="">
        <IoMdSend />
      </button>
    </form>
  );
};

export default MessageForm;
