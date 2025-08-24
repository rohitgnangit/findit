"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const ItemDetailsClient = ({ itemInfo }) => {
  const { data: session } = useSession();

  const isLostItem = itemInfo.role === "Lost";
  const ownerEmail = isLostItem ? itemInfo.seekerEmail : itemInfo.founderEmail;
  const ownerName = isLostItem ? itemInfo.seekerName : itemInfo.founderName;
  const currentUserEmail = session?.user?.email;

  // Correcting the separator from underscore to hyphen
  const chatId =
    currentUserEmail && ownerEmail
      ? [currentUserEmail, ownerEmail].sort().join("-")
      : null;

  return (
    <div className="details h-[83.5vh] flex justify-center items-center">

      <div className="p-4 h-[95%] border border-slate-400 bg-gray-300 rounded-lg shadow-lg flex flex-col justify-center items-center w-[90%] md:w-[50%]">
        <h2 className="text-2xl font-bold">{itemInfo.role}</h2>
        <p className="text-gray-600 font-semibold">{itemInfo.itemName}</p>
        <div className="image h-[95%] w-[80%] overflow-hidden mt-3">
        <Image src={itemInfo.image} alt={itemInfo.itemName} height={300} width={300} className="w-full h-full mx-auto rounded-lg" />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Posted by: <span className="font-semibold">{ownerName}</span>
        </p>
        <p className="mt-2 text-sm text-gray-500">Address : <span className="font-semibold">{itemInfo.address}</span></p>
        <p className="mt-2 text-sm text-gray-500">Pnone : <span className="font-semibold">{itemInfo.phoneNumber}</span></p>

        {currentUserEmail && currentUserEmail !== ownerEmail && chatId && (
          <Link href={`/conversations/${chatId}`}>
            <button className="my-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-800 cursor-pointer flex justify-between gap-5">
              <Image src={'/chat.png'} alt="chat" width={20} height={20} />
              Chat with {ownerName}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemDetailsClient;
