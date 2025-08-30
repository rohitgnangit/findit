import React from 'react'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
 

export async function middleware(req) {
    const token = await getToken({req, secret:process.env.NEXTAUTH_SECRET})
    const {pathname} = req.nextUrl;

    console.log("Current Pathname", pathname)
    console.log("Token", token)

    const protectedRoutes = ["/Home","/ItemForm/FoundItem","/ItemForm/LostItem"]

    if(!token && protectedRoutes.includes(req.nextUrl.pathname)){
        return NextResponse.redirect(new URL("/Users/Login", req.nextUrl.origin));
    }
    return NextResponse.next();
}
 
export const config = {
  matcher: ["/Home","/ItemForm/FoundItem","/ItemForm/LostItem"]
}
