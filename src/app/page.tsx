import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container text-center max-w-3xl mx-auto px-4">
      <Image
        src="https://aaacat-com.oss-cn-hangzhou.aliyuncs.com/202406140348679.jpg"
        alt="Logo"
        width={150}
        height={150}
        className="rounded-lg mb-4 mx-auto transition-transform duration-300 ease-in-out 
                   animate-[logoPulse_2s_ease-in-out_infinite] 
                   hover:scale-110 hover:rotate-[-5deg]"
      />
      <h1 className="animate-[slideIn_1s_ease-out] 
                     bg-gradient-to-r from-[#ff00cc] via-[#3333ff] to-[#00ffcc]
                     bg-clip-text text-transparent 
                     bg-[length:200%_auto] animate-[textGradient_5s_ease-in-out_infinite]">
        AAACAT
      </h1>
      
      <div className="entry-header mt-4 mb-8">
        <div className="social-icons flex justify-center gap-4">
          <Link 
            href="https://x.com/aaacat666" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon x-icon"
            title="X"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </Link>
          <Link 
            href="https://t.me/aaacat666/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon tg-icon"
            title="Telegram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M21.198 2.433a2.242 2.242.0 00-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15.0 01-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.472.509 1.793.997 3.592 1.48 5.388.16.36.506.494.864.498l-.002.018s.281.028.555-.038a2.1 2.1.0 00.933-.517c.345-.324 1.28-1.244 1.811-1.764l3.999 2.952.032.018s.442.311 1.09.355c.324.022.75-.04 1.116-.308.37-.27.613-.702.728-1.196.342-1.492 2.61-12.285 2.997-14.072l-.01.042c.27-1.006.17-1.928-.455-2.474a1.654 1.654.0 00-1.034-.407z"/>
            </svg>
          </Link>
          <Link 
            href="mailto:aaacat666@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon email-icon"
            title="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M4 4h16c1.1.0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1.0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </Link>
        </div>
      </div>

      <nav className="bot-links mt-8">
        <div className="flex flex-col gap-6 items-center">
          <Link
            href="https://t.me/arbor_chat_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bot-card chat-bot w-full max-w-sm"
          >
            <span className="bot-icon">🤖</span>
            <div>
              <span className="bot-name">Arbor Chat</span>
              <span className="bot-desc">AI Chat Assistant</span>
            </div>
          </Link>
          <Link
            href="https://t.me/arbor_monitor_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bot-card monitor-bot w-full max-w-sm"
          >
            <span className="bot-icon">📊</span>
            <div>
              <span className="bot-name">Arbor Monitor</span>
              <span className="bot-desc">Blockchain Metrics Monitor</span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
