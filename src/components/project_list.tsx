import Link from "next/link";
import React from "react";

type Project = {
    href: string;
    title: string;
    description: string;
    icon: React.ReactNode;
};

const PROJECTS: Project[] = [
    {
        href: "/arbor-x",
        title: "Arbor X",
        description: "Telegram bot for monitoring usernames & keywords with daily AI summaries.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path
                    d="M21.198 2.433a2.242 2.242.0 00-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15.0 01-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498l-.002.018s.281.028.555-.038a2.1 2.1.0 00.933-.517c.345-.324 1.28-1.244 1.811-1.764l3.999 2.952.032.018s.442.311 1.09.355c.324.022.75-.04 1.116-.308.37-.27.613-.702.728-1.196.342-1.492 2.61-12.285 2.997-14.072l-.01.042c.27-1.006.17-1.928-.455-2.474a1.654 1.654.0 00-1.034-.407z"/>
            </svg>
        ),
    },
];

export function ProjectList() {
    return (
        <div className="w-full max-w-md px-6 mb-10">
            <h2 className="text-sm text-muted-foreground mb-4 text-center tracking-widest uppercase">Projects</h2>
            <div className="flex flex-col gap-3">
                {PROJECTS.map((project) => (
                    <Link
                        key={project.title}
                        href={project.href}
                        className="flex items-center gap-4 border border-border rounded-lg px-5 py-4 hover:bg-accent/50 transition-colors duration-200 group"
                    >
                        <div className="text-foreground shrink-0">
                            {project.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold">{project.title}</h3>
                            <p className="text-sm text-muted-foreground leading-snug">{project.description}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </Link>
                ))}
            </div>
        </div>
    );
}
