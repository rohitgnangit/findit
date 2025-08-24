
import connectDB from "@/db/connectDB";
import Image from "next/image";
import Found from "@/models/Found";
import Lost from "@/models/Lost";
import ItemDetailsClient from "@/components/ItemDetailsClient";

export default async function itemDetails({ params }) {
  const { id } = await params;
  await connectDB();
  const itemInfo = await Found.findById(id) || await Lost.findById(id);
  const ownerName = itemInfo.seekerName || itemInfo.founderName;

  return (
    <ItemDetailsClient itemInfo={JSON.parse(JSON.stringify(itemInfo))} ownerName={ownerName} />
  );
}
