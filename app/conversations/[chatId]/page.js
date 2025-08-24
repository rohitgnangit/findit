"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ChatContainer from "@/components/ChatContainer";
import { usePathname } from "next/navigation";

export default function ConversationPage({ params }) {
  const pathname = usePathname();
  const chatId = pathname.split('/').pop();
  
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email;

  if (!currentUserEmail) {
    return <p className="text-center mt-10">Please log in to view this conversation.</p>;
  }

  // Ensure chatId is a string before splitting
  const participants = chatId ? chatId.split("-") : [];

  // Find the chat partner's email from the participants array
  const chatPartnerId = participants.find((p) => p !== currentUserEmail);

  if (!chatPartnerId) {
    return <p className="text-center mt-10 text-red-500">Could not find chat partner. Please check the URL.</p>;
  }

  return (
    <div className="h-full flex items-center justify-center">
      <ChatContainer
        chatId={chatId}
        currentUserId={currentUserEmail}
        chatPartnerId={chatPartnerId}
      />
    </div>
  );
}