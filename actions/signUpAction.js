"use server";

import connectDB from "@/db/connectDB";
import User from "@/models/User";

export async function signUpAction(userDetails) {
  const { userName, email, password } = userDetails;

  try {
    await connectDB();

  
    const user = await User.create({
      userName: userName,
      email,
      password, 
    });

    console.log("MongoDB User created:", user);
    return { success: true, message: "User registered successfully." };
  } catch (error) {
    console.error("Error during signup:", error);
    return { success: false, message: error.message };
  }
}

