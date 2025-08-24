import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white h-15 flex justify-center items-center">
      <div className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} FindiT. All rights reserved.
      </div>
    </footer>

  )
}

export default Footer
