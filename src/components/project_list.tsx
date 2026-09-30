import Link from "next/link";
import React from "react";

type Project = {
    href: string;
    title: string;
    description: string;
    type: "App" | "Web";
    icon: React.ReactNode;
};

const PROJECTS: Project[] = [
    {
        href: "https://echo.arborm.co/",
        title: "Echo 回响",
        description: "iOS 应用，把天气、城市与生活片刻化作诗意提醒。",
        type: "App",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 12h2"/>
                <path d="M7 8v8"/>
                <path d="M11 5v14"/>
                <path d="M15 8v8"/>
                <path d="M19 11v2"/>
            </svg>
        ),
    },
    {
        href: "https://lp.aaacat.com/",
        title: "PoolPal",
        description: "计算 Uniswap LP 仓位盈亏，当前仅支持 Robinhood Chain。",
        type: "Web",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 3v18h18"/>
                <path d="m7 16 4-5 4 3 5-7"/>
            </svg>
        ),
    },
];

export function ProjectList() {
    return (
        <div className="w-full max-w-5xl px-6 mb-10">
            <h2 className="mb-5 text-center text-2xl font-bold tracking-wider">项目</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
                {PROJECTS.map((project) => {
                    const isExternal = /^https?:\/\//.test(project.href);
                    return (
                        <section key={project.type} className="flex flex-col">
                            <h3 className="mb-3 text-xl font-semibold tracking-tight">
                                {project.type}
                            </h3>
                            <Link
                                href={project.href}
                                {...(isExternal ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                                className="flex flex-1 items-center gap-4 border border-border rounded-lg px-5 py-4 hover:bg-accent/50 transition-colors duration-200 group"
                            >
                                <div className="text-foreground shrink-0">
                                    {project.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-lg font-semibold">{project.title}</h4>
                                    <p className="text-base text-muted-foreground leading-relaxed">{project.description}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0">
                                    <polyline points="9 18 15 12 9 6"/>
                                </svg>
                            </Link>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
