import ThemeToggle from "@/components/theme-toggle";
import React from "react";

export function Header() {
    return (
        <header className="flex justify-end p-4">
            <ThemeToggle/>
        </header>
    )
}