"use client";
import { useState } from "react";
import Image from "next/image";
import ChatContainer from "./ChatContainer";

export default function ChatButton({ ownerName, currentUser }) {
  const [openChat, setOpenChat] = useState(false);

  if (!currentUser) return null;

  return (
    <div>
      <button
        type="button"
        className="bg-green-200 flex justify-between items-center text-cyan-700 hover:text-white border-2 border-cyan-700 hover:bg-cyan-800 focus:ring-2 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-1 text-center cursor-pointer"
        onClick={() => setOpenChat(true)}
      >
        <Image src="/chat.png" alt="chat" width={30} height={30} />
        Chat With {ownerName}
      </button>

      {openChat && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg">
          <ChatContainer
            ownerName={ownerName}
            currentUser={currentUser}
            chatPartner={ownerName}
            onClose={() => setOpenChat(false)}
          />
        </div>
      )}
    </div>
  );
}
