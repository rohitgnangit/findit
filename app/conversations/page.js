"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs
} from "firebase/firestore";
import Link from "next/link";

export default function InboxPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [userNames, setUserNames] = useState({});
  const currentUserEmail = session?.user?.email;

  // Function to fetch usernames from the 'users' collection
  const fetchUsernames = async (emails) => {

    if (emails.length === 0) return;

    // Create a query to find user documents by their email
    const usersQuery = query(collection(db, "users"), where("email", "in", emails));
    const snapshot = await getDocs(usersQuery);

  
    const names = {};
    snapshot.forEach((doc) => {
      const userData = doc.data();
      names[userData.email] = userData.username || userData.email; // Fallback to email if no username exists
    });
    setUserNames(prevNames => ({ ...prevNames, ...names }));
  };

  useEffect(() => {
    if (!currentUserEmail) return;

    // Listen for conversations involving the current user
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUserEmail),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const convos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setConversations(convos);

      // Collect all chat partner emails to fetch their usernames
      const partnerEmails = convos.map((conv) =>
        conv.participants.find((p) => p !== currentUserEmail)
      );

      // Filter out any undefined partners and fetch usernames in a batch
      const uniquePartnerEmails = [...new Set(partnerEmails.filter(Boolean))];
      await fetchUsernames(uniquePartnerEmails);
    });

    return () => unsubscribe();
  }, [currentUserEmail]);

  if (!currentUserEmail) {
    return <p className="text-center mt-10">Please log in to view your inbox.</p>;
  }

  return (
    <div className="inbox flex justify-center items-center">

      <div className="p-6 w-[90%] md:w-[40%] mx-auto bg-cyan-50">
        <h1 className="text-2xl font-bold mb-4">📥 Inbox</h1>

        {conversations.length === 0 ? (
          <p className="text-gray-500">No conversations yet.</p>
        ) : (
          <ul className="space-y-4">
            {conversations.map((conv) => {
              const chatPartnerEmail = conv.participants.find((p) => p !== currentUserEmail);
              // Use the fetched username, or fallback to email if it's not available yet
              const chatPartnerName = userNames[chatPartnerEmail] || chatPartnerEmail;

              return (
                <li key={conv.id} className="p-4 border border-slate-400 bg-gray-200 rounded-lg shadow-xl hover:bg-gray-100">
                  <Link href={`/conversations/${conv.id}`}>
                    <div>
                      <p className="font-semibold">{chatPartnerName}</p>
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

