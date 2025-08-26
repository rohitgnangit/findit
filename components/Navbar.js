"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    // Session to access username and email
    const { data: session } = useSession()
    const [showDropdown, setShowDropdown] = useState(false)
    const pathName = usePathname();

    return (
        <nav className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
            <div className="flex justify-between items-center bg-slate-700 h-15 md:px-20 px-5">
                <Link href={"/"}>
                    <h1 className="text-2xl font-extrabold text-white"><Image src="/lflogo.png" alt="logo" width={90} height={90}/></h1>
                </Link>
                <div className="list flex justify-between items-center gap-3 md:gap-10 h-full">
                    <Link href={'/home'} className={`${pathName === '/Home'? "text-white font-bold  py-4 h-full border-b-4 border-cyan-400":"text-slate-200 font-semibold"}`}>
                        <p className="">Home</p>
                    </Link>
                    {/* If LoggedIn display Dropdown*/}
                    {session ? <div className="dropdown relative">
                        <button onClick={() => { setShowDropdown(!showDropdown) }} onBlur={() => {
                            setTimeout(() => {
                                setShowDropdown(false)
                            }, 300);
                        }} id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white cursor-pointer" type="button">
                            <span className="sr-only">Open user menu</span>
                            <Image className="w-6 h-6 me-2 rounded-full" src="/avathar.png" alt="user photo" width="10" height="10" />
                            {session.user.name}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <div id="dropdownAvatarName" className={`${showDropdown ? "block" : "hidden"} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-10 -right-3`}>
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div className="font-medium "></div>
                                <div className="truncate">{session.user.email}</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                                <li>
                                    <a href={'/conversations'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Chats</a>
                                </li>
                            </ul>
                            <div className="py-2">
                                <button onClick={() => signOut({ callbackUrl: "/" })} className="block w-full text-left pl-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">Sign out</button>
                            </div>
                        </div>
                    </div> :
                        // if not LoggedIn diplay SignUp and Login buttons
                        <div className="flex justify-center items-center gap-2">
                            <Link href={'/Users/Signup'}>
                                <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 cursor-pointer">
                                    <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                        Signup
                                    </span>
                                </button>
                            </Link>
                            <Link href={'/Users/Login'}>
                                <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 cursor-pointer">
                                    <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                        Login
                                    </span>
                                </button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
