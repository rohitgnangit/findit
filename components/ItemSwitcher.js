"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Home = ({ foundItems, lostItems }) => {

    const [itemList, setItemList] = useState(true);
    const [search, setSearch] = useState("")
    const fitems = foundItems;
    const litems = lostItems;

    const lostHandler = () => {
        setItemList(false)
    }
    const foundHandler = () => {
        setItemList(true)
    }

    const searchItem = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    return (
        <>
            <div className="py-10 px-5 md:px-20 bg-gradient-to-br from-slate-200 via-gray-200 to-slate-300">
                <div className="top">
                    <h1 className="text-3xl font-semiboldbold mb-5">Browse Lost and Found items in City</h1>

                    <div className=" flex flex-col md:flex-row justify-between items-center">
                        <div className="search flex items-center w-full md:w-[50%] rounded-lg">
                            <input onChange={searchItem} name="search" value={search} className='w-[90%] px-3 py-2 rounded-l-lg border border-slate-600' type="text" placeholder='search for item' />
                            <button type="button" className="text-gray-900 border border-gray-800 hover:bg-gray-900 font-medium rounded-r-lg text-sm px-3 py-2 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 cursor-pointer"><Image src="/search.png" alt="search" width={25} height={25} /></button>
                        </div>
                        <div className="btns flex justify-between items-center w-[85%] mt-7 md:mt-0 md:w-[25%]">
                            <Link href={"/ItemForm/FoundItem"}>
                                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  font-medium rounded-sm text-sm px-5 py-2 text-center cursor-pointer border-2 border-slate-400">Report Found item</button>
                            </Link>
                            <Link href={"/ItemForm/LostItem"}>
                                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-sm text-sm px-5 py-2 text-center cursor-pointer border-2 border-slate-400">Report Lost item</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Buttons for Lost & Found Switch*/}
                <div className="slide mt-15">
                    <button type="button" onClick={foundHandler} className={`${(itemList) ? "bg-gray-700 text-white border-2 border-b-cyan-400 text-sm font-semibold border-gray-800 py-1.5 px-5" : "bg-white text-gray-700 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium text-sm px-5 py-1.5 text-center dark:border-gray-900 dark:text-gray-700 dark:hover:text-white dark:hover:bg-gray-500 dark:focus:ring-gray-800 cursor-pointer"}`}>Found</button>

                    <button type="button" onClick={lostHandler} className={`${!(itemList) ? "bg-gray-700 text-white border-2 border-b-cyan-400 text-sm font-semibold border-gray-800 py-1.5 px-5" : "bg-white text-gray-700 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium text-sm px-5 py-1.5 text-center dark:border-gray-900 dark:text-gray-700 dark:hover:text-white dark:hover:bg-gray-500 dark:focus:ring-gray-800 cursor-pointer"}`}>Lost</button>
                </div>

                <div className="line shadow-2xl border border-slate-200"></div>

                {/* Bottom Section */}

                {/* Found Items Container */}
                {(itemList) &&
                    <div className="bottom border-slate-300 bg-gradient-to-br from-green-200 via-green-300 to-green-500 py-10">
                        {(fitems == 0) && <p className='text-red-600 text-center'>There are no items to Display</p>}
                        <h1 className="text-2xl text-center font-bold">Recently Found items</h1>
                        <div className="crads flex flex-col md:flex-row justify-evenly items-center flex-wrap">
                            {fitems.filter(item => item.itemName.toLowerCase().includes(search.toLowerCase()))
                                .map((fitem) => (
                                    <div className=" my-8 h-[40vh] md:h-[60vh] w-[90%] md:w-[30%] bg-white border border-slate-300 rounded-lg shadow-xl transition transform hover:scale-101" key={fitem._id}>
                                        <Link href={`/ItemDetails/${fitem._id}`}>
                                            <div key={fitem._id} className="item flex flex-col justify-center items-center h-full w-full rounded-lg shadow-xl">
                                                <div className="image h-[80%] w-[95%] my-3 rounded-lg overflow-hidden relative">
                                                    <Image className=" h-full w-full mx-auto border border-slate-300 rounded-lg" src={fitem.image} alt="wallet" width="1000" height="1000" priority /><span className="absolute top-4 right-4 text-white bg-green-600 bg-opacity-50 px-2 py-1 rounded">
                                                        {fitem.role}
                                                    </span>
                                                </div>
                                                <div className="info w-[95%] border border-slate-300  rounded-lg py-5 px-1 mb-3">
                                                    <h2 className="text-xl font-semibold pb-2">{fitem.itemName}</h2>
                                                    <p className="itemName text-sm"><span className='text-l font-semibold'>item Name : </span>{fitem.itemName}</p>
                                                    <p className="address text-sm"><span className='text-l font-semibold'>Address :   </span>{fitem.address}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }

                {/* Lost Items Container */}
                {!(itemList) &&
                    <div className="bottom border border-slate-300 bg-gradient-to-br from-red-200 via-red-300 to-red-500 py-10">
                        {(litems == 0) && <p className='text-red-600 text-center'>There are no items to Display</p>}
                        <h1 className="text-2xl text-center font-bold">Recently Lost items</h1>
                        <div className="crads flex flex-col md:flex-row justify-evenly items-center flex-wrap">
                            {litems.filter(item => item.itemName.toLowerCase().includes(search.toLowerCase()))
                                .map((litem) => (
                                    <div className=" my-8 h-[40vh] md:h-[60vh] w-[90%] md:w-[30%] bg-white border border-slate-300 rounded-lg shadow-xl transition transform hover:scale-101" key={litem._id}>
                                        <Link href={`/ItemDetails/${litem._id}`}>
                                            <div key={litem._id} className="item flex flex-col justify-center items-center h-full w-full rounded-lg shadow-xl">
                                                <div className="image h-[80%] w-[95%] my-3 rounded-lg overflow-hidden relative">
                                                    <Image className="h-full w-full mx-auto border border-slate-300 rounded-lg" src={litem.image} alt="wallet" width="1000" height="1000" priority /><span className="absolute top-4 right-4 text-white bg-red-600 bg-opacity-50 px-2 py-1 rounded">
                                                        {litem.role}
                                                    </span>
                                                </div>
                                                <div className="info w-[95%] border border-slate-300  rounded-lg py-5 px-1 mb-3">
                                                    <h2 className="text-xl font-semibold pb-2">{litem.itemName}</h2>
                                                    <p className="itemName text-sm"><span className='text-l font-semibold'>item Name : </span>{litem.itemName}</p>
                                                    <p className="address text-sm"><span className='text-l font-semibold'>Address :   </span>{litem.address}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Home
