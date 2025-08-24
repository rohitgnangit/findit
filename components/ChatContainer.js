
"use client";

import React, { useEffect, useState, useRef } from "react";
import { db } from "@/firebase";
import Image from "next/image";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

const ChatContainer = ({ chatId, currentUserId, chatPartnerId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [partnerUsername, setPartnerUsername] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch partner username
  useEffect(() => {
    if (!chatPartnerId) return;
    const fetchUsername = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", chatPartnerId));
        setPartnerUsername(userDoc.exists() ? userDoc.data().username : chatPartnerId);
      } catch {
        setPartnerUsername(chatPartnerId);
      }
    };
    fetchUsername();
  }, [chatPartnerId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages
  useEffect(() => {
    if (!chatId) return;
    const q = query(
      collection(db, "conversations", chatId, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [chatId]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await setDoc(
        doc(db, "conversations", chatId),
        { participants: [currentUserId, chatPartnerId].sort(), lastMessage: newMessage, updatedAt: serverTimestamp() },
        { merge: true }
      );
      await addDoc(collection(db, "conversations", chatId, "messages"), {
        text: newMessage,
        sender: currentUserId,
        createdAt: serverTimestamp()
      });
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-center md:justify-between md:pr-70 items-center w-full  md:h-full bg-gradient-to-br from-slate-300 via-gray-700 to-slate-900">
      <div className="left">
        <div className="content mb-10 ml-13">
          <p className="text-4xl font-semibold text-gray-700 py-4">Make a conversation</p>
          <p className="text-4xl font-semibold text-gray-700">with seeker/founder to know about things</p>
        </div>
        <div className="conversation ml-10">
          <Image src="/conversation.png" alt="conversation" width={500} height={500} />
        </div>
      </div>
      <div className="w-[95%] md:w-[24%] md:h-[83.5vh] h-[80vh] bg-white border border-slate-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-slate-600 text-white px-4 pb-2 pt-6 text-lg rounded-t-2xl flex items-center shadow-md">
          <div className="w-8 h-8 bg-white text-cyan-600 rounded-full flex items-center justify-center mr-3 font-bold uppercase">
            {partnerUsername?.charAt(0)}
          </div>
          <p className="text-gray-300 text-sm">
            {partnerUsername}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-800 scrollbar-thin">
          {messages.length ? (
            messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === currentUserId ? "justify-end" : "justify-start"}`}
              >
                <div className={`relative max-w-[65%] p-3 rounded-2xl shadow-md
                  ${msg.sender === currentUserId ? "bg-cyan-500 text-white rounded-br-none" : "bg-slate-500 text-white rounded-bl-none"}
                  hover:scale-[1.02] transition-transform duration-150`}
                >
                
                  <p className="break-words">{msg.text}</p>
                  <p className="text-xs text-gray-200 mt-1 text-right">
                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-20">No messages yet. Say hi! 👋</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="flex px-2 pt-3 pb-6 border-t border-slate-800 bg-slate-600" onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-2xl px-4 py-1 focus:outline-none focus:ring-2 bg-slate-300 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="bg-cyan-600 text-white px-4 py-1 rounded-r-2xl hover:bg-cyan-700 transition-colors cursor-pointer"
          >
            
            Send
          </button>
        </form>

      </div>
    </div>
  );
};

export default ChatContainer;

