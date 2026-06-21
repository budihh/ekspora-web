"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, Loader2, MessageCircle, X, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showWidget, setShowWidget] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowWidget(window.scrollY > window.innerHeight * 0.7);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 ease-in-out ${showWidget ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 relative w-[360px] h-[550px] max-h-[75vh] bg-[#0e0e0e]/95 backdrop-blur-xl border border-[#424754]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <header className="sticky top-0 z-50 flex justify-between items-center px-5 py-4 w-full bg-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="font-semibold text-white text-base">Ask Ekspora</h1>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#adc6ff] rounded-full animate-pulse"></span>
                    <span className="text-xs text-[#c2c6d6]">AI Assistant Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-[#353534]/50 transition-colors group">
                <X className="text-[#c2c6d6] group-hover:text-[#e5e2e1] transition-colors" size={20} />
              </button>
            </header>

            <section ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-2 flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0">
                    <Bot className="w-8 h-8 p-1.5 rounded-full bg-white/10 border border-white/5 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-[#201f1f] border border-[#424754]/20 px-4 py-3 rounded-2xl rounded-tl-none">
                      <p className="text-sm text-[#e5e2e1] leading-relaxed">
                        Hello! Ask anything about products or exports here. I can help you with customs regulations, shipping costs, or finding suppliers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const isUser = message.role === "user";
                return isUser ? (
                  <div key={message.id} className="flex flex-row-reverse gap-3 max-w-[85%] self-end">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4d8eff] border border-[#adc6ff] flex items-center justify-center overflow-hidden">
                       <div className="w-full h-full bg-[#adc6ff]/20 flex items-center justify-center">
                         <User className="text-white w-5 h-5" />
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="bg-[#adc6ff]/20 border border-[#adc6ff]/30 px-4 py-3 rounded-2xl rounded-tr-none text-left">
                        <div className="text-sm text-[#e5e2e1]">
                          {message.parts.map((part, i) => part.type === "text" ? <span key={i}>{part.text}</span> : null)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex gap-3 max-w-[85%]">
                    <div className="flex-shrink-0">
                      <Bot className="w-8 h-8 p-1.5 rounded-full bg-white/10 border border-white/5 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="bg-[#201f1f] border border-[#424754]/20 px-4 py-3 rounded-2xl rounded-tl-none">
                        <div className="text-sm text-[#e5e2e1] leading-relaxed">
                          {message.parts.map((part, i) => part.type === "text" ? <span key={i}>{part.text}</span> : null)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {status === "submitted" && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0">
                    <Bot className="w-8 h-8 p-1.5 rounded-full bg-white/10 border border-white/5 text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-[#201f1f] border border-[#424754]/20 px-4 py-3 rounded-2xl rounded-tl-none">
                      <p className="text-sm text-[#e5e2e1]/50 leading-relaxed">
                        Typing...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-400 text-center mt-2">
                  Error connecting to the server. Please try again.
                </p>
              )}
            </section>

            <footer className="px-5 pb-5 pt-2 bg-transparent">
              <form onSubmit={onSubmit} className="flex flex-row items-end gap-3 w-full">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl focus:border-[#adc6ff]/50 focus:ring-1 focus:ring-[#adc6ff]/50 text-sm text-[#e5e2e1] py-3 px-4 resize-none max-h-32 placeholder:text-[#c2c6d6]/50 outline-none transition-all shadow-inner"
                  placeholder="Type your message..."
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSubmit(e as any);
                    }
                  }}
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 flex-shrink-0 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-[#adc6ff] rounded-2xl transition-all shadow-lg active:scale-95 disabled:opacity-40"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/5 text-white transition-colors shadow-lg"
      >
        <Bot size={28} />
      </button>
    </div>
  );
}
