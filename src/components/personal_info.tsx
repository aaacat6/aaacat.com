import Image from "next/image";
import React from "react";
import {Frijole} from "next/font/google";

const frijole = Frijole({
    subsets: ['latin'],             // 字体子集
    weight: ['400'],  // 字重选项
    display: 'swap',                // 字体显示策略
})

export function PersonalInfo() {
    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="mb-6">
                <Image
                    src="/a.jpg"
                    alt="Logo"
                    width={200}
                    height={200}
                    className="logo-image rounded-full z-10"
                    priority
                />
            </div>
            <h1 className={`${frijole.className} text-5xl font-bold mb-8`}>AAACAT</h1>
        </div>)
}
