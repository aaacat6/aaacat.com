import React from "react";
import Link from "next/link";
import {Header} from "@/components/header";
import {Frijole} from "next/font/google";

const frijole = Frijole({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
})

const FEATURES = [
    {
        title: "监控用户名",
        description: "追踪指定的 X 用户名，实时捕获其公开发布的推文和动态。",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        ),
    },
    {
        title: "监控关键词",
        description: "设置自定义关键词，在 X 上过滤并收集包含相关内容的推文。",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
            </svg>
        ),
    },
    {
        title: "每日总结",
        description: "每天收到一份 AI 生成的摘要，汇总所有监控活动中的关键信息和洞察。",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
        ),
    },
    {
        title: "Telegram 原生交互",
        description: "完全在 Telegram 内操作，无需额外应用或后台面板，聊天即用。",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path
                    d="M21.198 2.433a2.242 2.242.0 00-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15.0 01-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498l-.002.018s.281.028.555-.038a2.1 2.1.0 00.933-.517c.345-.324 1.28-1.244 1.811-1.764l3.999 2.952.032.018s.442.311 1.09.355c.324.022.75-.04 1.116-.308.37-.27.613-.702.728-1.196.342-1.492 2.61-12.285 2.997-14.072l-.01.042c.27-1.006.17-1.928-.455-2.474a1.654 1.654.0 00-1.034-.407z"/>
            </svg>
        ),
    },
];

export default function ArborXPage() {
    return (
        <div className="min-h-screen">
            <Header/>
            <div className="max-w-2xl mx-auto px-6 pb-20">
                {/* 返回链接 */}
                <div className="mb-12">
                    <Link href="/"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                        &larr; 返回
                    </Link>
                </div>

                {/* 标题 + 简介 + 按钮 */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h1 className={`${frijole.className} text-4xl md:text-5xl font-bold mb-4`}>
                        Arbor X
                    </h1>
                    <p className="text-base text-muted-foreground max-w-md leading-relaxed mb-6">
                        一个 Telegram 机器人，可监控 X 上的用户名和关键词，
                        并通过 AI 生成每日摘要推送给你，所有操作均在 Telegram 内完成。
                    </p>
                    <Link
                        href="https://t.me/arbor_x_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-border rounded-lg px-6 py-3 text-base font-medium hover:bg-accent/50 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path
                                d="M21.198 2.433a2.242 2.242.0 00-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15.0 01-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498l-.002.018s.281.028.555-.038a2.1 2.1.0 00.933-.517c.345-.324 1.28-1.244 1.811-1.764l3.999 2.952.032.018s.442.311 1.09.355c.324.022.75-.04 1.116-.308.37-.27.613-.702.728-1.196.342-1.492 2.61-12.285 2.997-14.072l-.01.042c.27-1.006.17-1.928-.455-2.474a1.654 1.654.0 00-1.034-.407z"/>
                        </svg>
                        打开 @arbor_x_bot
                    </Link>
                </div>

                {/* 功能特性 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.title}
                            className="border border-border rounded-lg p-5 hover:bg-accent/50 transition-colors duration-200"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="text-foreground">
                                    {feature.icon}
                                </div>
                                <h3 className="text-base font-semibold">{feature.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 使用流程 */}
                <div className="mb-16">
                    <h2 className="text-lg font-semibold mb-6 text-center">使用流程</h2>
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-4">
                            {[
                                {step: "01", text: "在 Telegram 中搜索并打开 @arbor_x_bot"},
                                {step: "02", text: "配置你想要监控的 X 用户名或关键词"},
                                {step: "03", text: "机器人会自动追踪 X 上的相关推文和动态"},
                                {step: "04", text: "每天收到一份包含关键要点和洞察的总结"},
                            ].map((item) => (
                                <div key={item.step} className="flex items-start gap-4">
                                    <span className="text-sm font-mono text-muted-foreground shrink-0 mt-0.5 w-6">
                                        {item.step}
                                    </span>
                                    <p className="text-base">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
