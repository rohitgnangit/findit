"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();
  const findYourThings = () => {
    if (session) {
      router.push("/Home")
    } else {
      router.push("/Users/Login")
    }
  }


  return (
    <>
      <div className="hero mt-15">
        <div className="bg-[url('/lostandfound.png')] bg-cover h-[90vh] md:p-20 p-10 py-25">
          <div className="quote">
            <h1 className="text-4xl text-white py-3 font-bold">Lost Something in City ?</h1>
            <h2 className="text-2xl text-white pt-3 font-sans">FindiT helps you report and find lost items in city.</h2>
            <h2 className="text-2xl text-white font-sans"> Quick, easy, and effective</h2>
          </div>
          <div className="">
            <button onClick={findYourThings} className="relative inline-flex items-center justify-center p-0.5 mb-2 my-5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 cursor-pointer">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Find your things
              </span>
            </button>
          </div>
        </div>
        <div className="bottom flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold py-8">How it Works</h1>

          <div className="info flex md:flex-row flex-col justify-center items-center mb-12 gap-10 px-10">

            <div className="one bg-white flex flex-col justify-center items-center rounded-lg py-5 shadow-2xl border border-slate-200 px-5 w-[100%] md:w-[30%]">
              <div className="circle bg-cyan-200 rounded-full w-18 flex justify-center items-center p-5 my-3"><span className="text-2xl font-semibold">1</span></div>
              <h2 className="text-2xl font-semibold">Report an Item</h2>
              <p className="py-4 text-center font-light">Found something? Report it with details and photos. Lost something? Create a lost item report.</p>
            </div>

            <div className="one bg-white flex flex-col justify-center items-center rounded-lg py-5 shadow-2xl border border-slate-200 px-5 w-[100%] md:w-[30%]">
              <div className="circle bg-cyan-200 rounded-full w-18 flex justify-center items-center p-5 my-3"><span className="text-2xl font-semibold">2</span></div>
              <h2 className="text-2xl font-semibold">Browse & Search</h2>
              <p className="py-4 text-center font-light">Browse through recent findings or search for your lost item using filters and keywords</p>
            </div>

            <div className="one bg-white flex flex-col justify-center items-center rounded-lg py-5 shadow-2xl border border-slate-200 px-5 w-[100%] md:w-[30%]">
              <div className="circle bg-cyan-200 rounded-full w-18 flex justify-center items-center p-5 my-3"><span className="text-2xl font-semibold">3</span></div>
              <h2 className="text-2xl font-semibold">Claim & Retrieve</h2>
              <p className="py-4 text-center font-light">Found your item? Claim it through the platform and arrange a safe pickup in city.</p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
