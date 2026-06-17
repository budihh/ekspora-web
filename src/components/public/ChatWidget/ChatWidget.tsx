'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

function ShadowDomWrapper({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    if (hostRef.current && !shadowRoot) {
      const shadow = hostRef.current.attachShadow({ mode: 'open' });
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach((styleSheet) => {
        shadow.appendChild(styleSheet.cloneNode(true));
      });
      setShadowRoot(shadow);
    }
  }, [shadowRoot]);

  return <div ref={hostRef}>{shadowRoot && createPortal(children, shadowRoot)}</div>;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Halo! Saya Ekspora AI. Tanyakan apapun tentang produk, komoditas, atau layanan ekspor kami.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { id: Date.now(), sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulasi delay sedikit lebih lama agar natural (1.5 detik)
    setTimeout(() => {
      setIsTyping(false);
      const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: 'Terima kasih atas pertanyaannya! Tim spesialis ekspor kami akan menindaklanjuti ini segera. Ada hal lain yang bisa saya bantu?' };
      setMessages((prev) => [...prev, newAiMsg]);
    }, 1500);
  };

  return (
    <ShadowDomWrapper>
      <style>{`
        .typing-dot {
          animation: typing 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
      
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface border border-border-hairline rounded-2xl overflow-hidden shadow-2xl flex flex-col origin-bottom-right mb-4"
              style={{ width: '380px', height: '560px' }}
            >
              {/* Header */}
              <div className="bg-surface-2 border-b border-border-hairline p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-text-primary font-semibold text-body tracking-tight">Ekspora AI</h3>
                  <p className="text-text-secondary text-xs mt-0.5">Tanya tentang produk & layanan kami</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none p-1.5 rounded-lg hover:bg-surface"
                  aria-label="Tutup Chat"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body Area Pesan */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-surface">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`max-w-[85%] px-4 py-3 text-small leading-relaxed shadow-sm ${
                        msg.sender === 'ai' 
                          ? 'self-start bg-surface-2 border border-border-hairline rounded-2xl rounded-tl-sm text-text-primary' 
                          : 'self-end bg-accent text-white rounded-2xl rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="self-start max-w-[85%] bg-surface-2 border border-border-hairline rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1 shadow-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted typing-dot"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted typing-dot"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-text-muted typing-dot"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Footer Input Area */}
              <div className="p-4 bg-surface-2 border-t border-border-hairline">
                <form className="flex gap-2" onSubmit={handleSend}>
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tanya tentang produk Ekspora..."
                    className="flex-1 bg-surface border border-border-hairline rounded-lg px-4 py-2.5 text-small text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-accent hover:brightness-110 disabled:opacity-50 text-white rounded-lg px-4 py-2.5 flex items-center justify-center transition-all focus:outline-none shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-accent hover:brightness-110 text-white rounded-full flex items-center justify-center shadow-xl focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </ShadowDomWrapper>
  );
}
