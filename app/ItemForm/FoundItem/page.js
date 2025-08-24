"use client"
import React from 'react'
import { itemFound } from '@/actions/foundAction'

const foundItem = () => {

    return (
        <>
            <div className="py-10 h-[83.5vh] bg-green-100  bg-[url('/itemDetails.png')] bg-cover">
                <h2 className="text-2xl font-bold text-center">Report Found Item</h2>
                <div className="shadow-2xl bg-white w-[90%] md:w-[50%] container mx-auto p-5 border border-slate-200 rounded-lg mt-10 opacity-90">

                    <form action={itemFound} className='flex flex-col justify-center items-cente gap-1.5'>
                        <label htmlFor="itemname">Item Name :</label>
                        <input type="text" name="itemname" placeholder="enter itemname" className='px-3 py-1 border border-slate-300 rounded-lg' required />
                        <label htmlFor="address">Address :</label>
                        <textarea name="address" id="" placeholder="enter address" className='px-3 py-1 h-30 border border-slate-300 rounded-lg'></textarea>
                        <label htmlFor="image" className="block font-medium text-gray-700 mb-1">Upload Image:</label>
                        <input type="file"
                               id="image"
                               accept="image/*"
                               name="image"
                               className="block w-50 text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-cyan-500  file:text-white"/>

                        <label htmlFor="phone">Your Phone No. :</label>
                        <input type="text" name="phone" placeholder="enter phone" className='px-3 py-1 border border-slate-300 rounded-lg' required />
                        <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center mt-6 mb-2 cursor-pointer">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default foundItem
