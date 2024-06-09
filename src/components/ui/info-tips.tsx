"use client"

import { useState } from "react";
import Link from "next/link";

export default function InfoTips() {
    const [infoOpen, setInfoOpen] = useState<boolean>(true);

    function toggleInfo() {
        setInfoOpen(false);
    }

    return (
        <div className={infoOpen ? "relative bg-black text-white text-xs p-2.5 flex justify-center" : "hidden"}>
            <h1 className="text-xs md:text-sm">Sign up and get 20% off to your first order. <Link href={"/auth/login"} className="underline text-xs md:text-sm">Sign Up Now</Link></h1>
            <button className="absolute top-2 right-5" onClick={toggleInfo}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}
