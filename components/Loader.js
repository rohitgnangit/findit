"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Loader = () => {
    const [loading, setLoading] = useState(false)
    const pathName = usePathname();

    useEffect(() => {
      setLoading(true)
      const timeOut = setTimeout(() => {
        setLoading(false)
      }, 500);
      return()=>clearTimeout(timeOut)
    }, [pathName])

    if(!loading) return null;

  return (
    <div className='fixed inset-0 flex flex-col justify-center items-center bg-white/70 z-50'>
      <div className="h-12 w-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm mt-3">Initializing...</p>
    </div>
  )
}

export default Loader
