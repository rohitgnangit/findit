"use client"
import React, { useState, useEffect } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession() // Use 'status' to check if the session is still loading

  //  useEffect will run after the component mounts and a session is loaded
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/Home')
    }
  }, [session, status, router])

  const loginHandle = async (e) => {
    e.preventDefault()
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (response?.ok) {
      // The useEffect will now handle the redirect, no need to do it here
    } else {
      toast.error("Invalid credentials")
    }
    setEmail("")
    setPassword("")
  }

  return (
    <>
      <div className="py-20 h-[83.5vh] bg-slate-200">
        <div className="shadow-2xl bg-white w-[90%] md:w-[40%] container mx-auto p-5 border border-slate-200 rounded-lg">
          <h2 className="text-xl font-bold text-center">Login</h2>

          {/* Login Form */}
          <form onSubmit={loginHandle} className='flex flex-col justify-center items-cente gap-1.5'>
            <label htmlFor="email">E mail :</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="email" placeholder="enter email" className='px-3 py-1 border border-slate-300 rounded-lg' required />
            <label htmlFor="password">Password :</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="enter password" className='px-3 py-1 border border-slate-300 rounded-lg' required />
            <button type="submit" className="text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-1 py-2 text-center mt-6 mb-2 cursor-pointer">Login</button>

            <div className="h-[1px] bg-slate-800 my-2"></div>

            <Link href={'/Users/Signup'}>
              <p className="text-blue-800 text-sm text-center">SignUp</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login