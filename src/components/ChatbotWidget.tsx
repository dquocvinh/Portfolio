import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles, MessageCircle, ArrowDown } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const AVATAR_SRC = `${BASE_URL}avatar_chatbot.png`;

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What's Vinh's tech stack?",
  "Tell me about his projects",
  "Is he available for hire?",
  "What is his education?",
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-coffee-300/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
    <span className="text-xs text-taupe-200 ml-2">Dx9029 is thinking...</span>
  </div>
);

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Detect scroll position for scroll-to-bottom button
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 80;
    setShowScrollBtn(!isNearBottom);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: "Sorry, I'm having trouble connecting to the server. Please try again later or contact Vinh directly at duongquocvinh9029@gmail.com 📧 or via Zalo: 0559149285 💬",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Floating Avatar Button ─────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 w-[60px] h-[60px] rounded-full shadow-lg shadow-gold-300/30 hover:shadow-gold-300/60 transition-shadow duration-300 cursor-pointer group"
            aria-label="Open Dx9029 AI Assistant"
            title="Chat with Dx9029 AI"
          >
            {/* Gold ring border */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-gold-300 via-yellow-400 to-gold-500 animate-pulse-slow" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-cream-50">
              <img
                src={AVATAR_SRC}
                alt="Dx9029 AI Assistant"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator dot */}
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
            </span>
            {/* Tooltip on hover (positioned to the left of the button) */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-espresso-100 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Ask Dx9029 about Vinh ✨
              <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-espresso-100" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-7.5rem)] flex flex-col rounded-2xl border border-sand-100/80 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(250,246,239,0.97) 0%, rgba(255,253,247,0.97) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* ── Header ───────────────────────────────────────── */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-sand-100/60 bg-gradient-to-r from-cream-100/80 to-cream-50/80 shrink-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-gold-300 to-gold-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cream-50">
                  <img src={AVATAR_SRC} alt="Dx9029" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-espresso-100 font-display flex items-center gap-1.5">
                  Dx9029
                  <Sparkles size={14} className="text-gold-300" />
                </h3>
                <p className="text-[11px] text-taupe-200 truncate">AI Portfolio Assistant • Powered by RAG</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-sand-100/80 text-taupe-200 hover:text-espresso-100 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Messages Area ────────────────────────────────── */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4C5A9 transparent' }}
            >
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center text-center pt-4 pb-2">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 relative">
                    <div className="absolute -inset-[2px] rounded-full bg-gradient-to-tr from-gold-300 to-gold-500" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cream-50">
                      <img src={AVATAR_SRC} alt="Dx9029" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-espresso-100 font-display mb-1">
                    Hi! I'm Dx9029 👋
                  </h4>
                  <p className="text-xs text-taupe-200 mb-5 max-w-[260px] leading-relaxed">
                    I'm Vinh's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!
                  </p>

                  {/* Suggested questions */}
                  <div className="w-full space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-taupe-200/70 font-semibold mb-1">
                      Suggested questions
                    </p>
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/80 border border-sand-100 hover:border-coffee-300/40 hover:bg-white text-xs text-espresso-100/80 hover:text-espresso-100 transition-all flex items-center gap-2 group"
                      >
                        <MessageCircle size={14} className="text-coffee-300/50 group-hover:text-coffee-300 transition-colors shrink-0" />
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5 relative">
                      <div className="absolute -inset-[1.5px] rounded-full bg-gradient-to-tr from-gold-300 to-gold-500" />
                      <div className="relative w-full h-full rounded-full overflow-hidden border-[1.5px] border-cream-50">
                        <img src={AVATAR_SRC} alt="Dx9029" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-coffee-300 to-coffee-400 text-white rounded-br-md shadow-md'
                        : 'bg-white border border-sand-100 text-espresso-100/90 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                    <div className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-white/50' : 'text-taupe-200/50'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 mr-2 mt-0.5 relative">
                    <div className="absolute -inset-[1.5px] rounded-full bg-gradient-to-tr from-gold-300 to-gold-500" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-[1.5px] border-cream-50">
                      <img src={AVATAR_SRC} alt="Dx9029" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="bg-white border border-sand-100 rounded-2xl rounded-bl-md shadow-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[72px] right-4 w-8 h-8 rounded-full bg-white border border-sand-100 shadow-md flex items-center justify-center text-taupe-200 hover:text-espresso-100 transition-colors z-10"
                >
                  <ArrowDown size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Input Area ───────────────────────────────────── */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-3 border-t border-sand-100/60 bg-cream-50/50 shrink-0"
            >
              <div className="flex items-center gap-2 bg-white rounded-xl border border-sand-100 focus-within:border-coffee-300/50 focus-within:shadow-sm transition-all px-3 py-1.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Vinh..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-espresso-100 placeholder:text-taupe-200/50 outline-none py-1.5 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-lg bg-gradient-to-br from-coffee-300 to-gold-400 text-white disabled:opacity-30 hover:shadow-md transition-all disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-taupe-200/40 text-center mt-1.5">
                Powered by RAG • Gemini 2.5 Flash • PineconeDB
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
