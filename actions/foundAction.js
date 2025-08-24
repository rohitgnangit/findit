"use server"

import fs from 'fs/promises';
import path from 'path';
import { v4 as uuid } from 'uuid';
import Found from '@/models/Found';
import connectDB from '@/db/connectDB';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function itemFound(formData) {
  const session = await getServerSession(authOptions);
  await connectDB();

  const itemName = formData.get("itemname");
  const address = formData.get("address");
  const phoneNumber = formData.get("phone");
  const image = formData.get("image");

  
  if (!image || typeof image === 'string') {
    throw new Error("Invalid image upload");
  }

  // Convert image to buffer
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Store image in public/uploads
  const imageName = `${uuid()}-${image.name}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true }); // ensure folder exists
  await fs.writeFile(path.join(uploadDir, imageName), buffer);

  //  Save only image path in MongoDB
  const imagePath = `/uploads/${imageName}`;

  const foundItem = await Found.create({
    itemName,
    address,
    image: imagePath,
    phoneNumber,
    role:"Found",
    founderEmail:session.user.email,
    founderName:session.user.name,
  });
  return { success:true }

}
