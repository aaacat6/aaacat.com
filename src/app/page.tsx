import React from "react";
import {ButtonSocial} from "@/components/button_social";
import {PersonalInfo} from "@/components/personal_info";
import {Header} from  "@/components/header"

export default function Home() {
    return (
        <div className="min-h-screen">
                <Header/>
            <div className="flex flex-col items-center justify-center ">
                <PersonalInfo/>
                <ButtonSocial/>
            </div>
        </div>
    )
}
