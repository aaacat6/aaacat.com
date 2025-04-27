import {Button} from "@/components/ui/button"
import Link from "next/link";

export function ButtonTelegramBot() {
    return (
        <nav className="flex flex-col space-y-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/5 max-w-xs mx-auto">
            <Button
                variant="outline"
                className="rounded-3xl h-auto p-0 border-2 border-gray-300 transition duration-300 hover:scale-110 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-white"
            >
                <Link
                    href="https://t.me/arbor_chat_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 w-full p-4 "
                >
                    <span className="text-2xl">🤖</span>
                    <div className="flex flex-col items-center w-full overflow-hidden">
                        <span className="text-2xl font-bold truncate w-full text-center">Arbor Chat</span>
                        <span className="text-2xl text-sm truncate w-full text-center">AI Chat Assistant</span>
                    </div>
                </Link>
            </Button>
            <Button
                variant="outline"
                className="rounded-3xl h-auto p-0 border-2 border-gray-300 transition duration-300 hover:scale-110 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-white"
            >
                <Link
                    href="https://t.me/arbor_monitor_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 w-full p-4 "
                >
                    <span className="text-2xl">📊</span>
                    <div className="flex flex-col items-center w-full overflow-hidden">
                        <span className="text-2xl font-bold truncate w-full text-center">Arbor Monitor</span>
                        <span className="text-2xl text-sm truncate w-full text-center">Blockchain Metrics Monitor</span>
                    </div>
                </Link>
            </Button>
        </nav>


    )
}
