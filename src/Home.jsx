import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState({})
    const location = useLocation();
    return (
        <div className='w-screen h-screen bg-magnolia flex flex-row items-center justify-center'>
            <div className='lg:w-[940px] lg:h-[600px] h-full w-full bg-magnolia lg:bg-white lg:rounded-xl lg:p-4 flex flex-col lg:flex-row gap-4 shadow-xl relative overflow-hidden'>
                <header className={`lg:bg-hero-pattern bg-hero-pattern-mobile bg-cover lg:h-full h-[10.75rem] pb-[4.75rem] flex-none lg:w-[17.11rem] lg:gap-7 gap-[1.1rem] lg:pb-0 bg-no-repeat flex flex-row lg:flex-col lg:justify-normal justify-center px-8 lg:pt-10 ${data.complete && "pointer-events-none"}`}>
                    <Link to={"/"} className='flex flex-row items-center gap-4' >
                        <figure className={`rounded-full w-8 h-fit aspect-square flex items-center justify-center ${location.pathname === "/" ? "bg-light-blue" : "border-white border text-white"} `}>
                            <p>1</p>
                        </figure>
                        <div className='hidden lg:block'>
                            <p className='text-xs text-gray-400'>STEP 1</p>
                            <p className='text-sm font-bold text-white tracking-widest'>YOUR INFO</p>
                        </div>
                    </Link>
                    <Link to={"select-plan"} className='flex flex-row items-center gap-4'>
                        <figure className={`rounded-full w-8 h-fit aspect-square flex items-center justify-center ${location.pathname === "/select-plan" ? "bg-light-blue" : "border-white border text-white"} `}>
                            <p>2</p>
                        </figure>
                        <div className='hidden lg:block'>
                            <p className='text-xs text-gray-400'>STEP 2</p>
                            <p className='text-sm font-bold text-white tracking-widest'>SELECT PLAN</p>
                        </div>
                    </Link>
                    <Link to={'add-ons'} className='flex flex-row items-center gap-4'>
                        <figure className={`rounded-full w-8 h-fit aspect-square flex items-center justify-center ${location.pathname === "/add-ons" ? "bg-light-blue" : "border-white border text-white"} `}>
                            <p>3</p>
                        </figure>
                        <div className='hidden lg:block'>
                            <p className='text-xs text-gray-400'>STEP 3</p>
                            <p className='text-sm font-bold text-white tracking-widest'>ADD-ONS</p>
                        </div>
                    </Link>
                    <Link to={"summary"} className='flex flex-row items-center gap-4'>
                        <figure className={`rounded-full w-8 h-fit aspect-square flex items-center justify-center ${location.pathname === "/summary" ? "bg-light-blue" : "border-white border text-white"} `}>
                            <p>4</p>
                        </figure>
                        <div className='hidden lg:block'>
                            <p className='text-xs text-gray-400'>STEP 4</p>
                            <p className='text-sm font-bold text-white tracking-widest'>SUMMARY</p>
                        </div>
                    </Link>
                </header>
                <main className='w-full lg:mx-[85px] absolute mt-[6.25rem] lg:mt-0 h-full lg:static'>
                    <Outlet context={[data, setData]} />
                </main>
            </div>
        </div>
    )
}
