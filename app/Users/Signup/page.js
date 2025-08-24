"use client"
import connectDB from '@/db/connectDB'
import React from 'react'
import { useState } from 'react'
import { signUpAction } from '@/actions/signUpAction'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Signup = () => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const signUpHandle = async (e) => {
        e.preventDefault()
        const userDetails = { userName, email, password }
        const result = await signUpAction(userDetails)

        if (result.success) {
            toast('User added successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => {
                router.push("/Users/Login")
            },1000);
        }

        setUserName("")
        setEmail("")
        setPassword("")
        console.log(userDetails)
    }

    return (
        <>
           <div className="py-20 h-[83.5vh] bg-slate-200">
                <div className="shadow-2xl bg-white w-[90%] md:w-[40%] container mx-auto p-5 border border-slate-200 rounded-lg">
                    <h2 className="text-xl font-bold text-center">SignUp</h2>

                    {/* Sign Up Form */}
                    <form onSubmit={signUpHandle} className='flex flex-col justify-center items-cente gap-1.5'>
                        <label htmlFor="username">User Name :</label>
                        <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" name="username" placeholder="enter username" className='px-3 py-1 border border-slate-300 rounded-lg' required />
                        <label htmlFor="email">E mail :</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="email" placeholder="enter email" className='px-3 py-1 border border-slate-300 rounded-lg' required />
                        <label htmlFor="password">Password :</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="enter password" className='px-3 py-1 border border-slate-300 rounded-lg' required />
                        <button type="submit" className="text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1 py-2 text-center mt-6 mb-2 cursor-pointer">Sign Up</button>
                        <div className="bg-slate-400 h-0.5 my-1"></div>
                        <div className="googleBtn flex justify-center items-center">
                            <Link href={"/Users/Login"}>
                            <p className="text-blue-800 text-sm">Already signup? then login </p>
                            </Link>
                        </div>
                    </form>
                </div> <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            </div>
        </>
    )
}

export default Signup
