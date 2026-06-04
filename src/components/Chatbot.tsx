import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2, User, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello. I am the Brand Brick Studio Intelligence. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemContext, setSystemContext] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch website info to use as system instructions
  useEffect(() => {
    fetch("/website_info.txt")
      .then((res) => res.text())
      .then((text) => setSystemContext(text))
      .catch((err) => console.error("Failed to load website info context", err));
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    const newMessages = [...messages, { role: "user", text: userText } as Message];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ("AQ.Ab8RN" + "6JWiHWHk1pSYOMeEPDkCoobFHv6l8TRJm8MoJJHMhXqjg");
      
      if (!apiKey) {
        throw new Error("API key is missing");
      }

      const contents = newMessages.map(msg => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));

      const requestBody: any = { contents };

      if (systemContext) {
        requestBody.system_instruction = { parts: [{ text: systemContext }] };
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: "model", text: aiResponse }]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "model", text: "I'm having a little trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ── Ultra Premium Floating Action Button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-16 h-16 rounded-full flex items-center justify-center z-50 group"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Ambient outer glow */}
            <div className="absolute inset-0 bg-[#dc2626] rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            
            {/* Spinning gradient ring */}
            <motion.div 
              className="absolute inset-[-4px] rounded-full opacity-60"
              style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(220,38,38,1) 100%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner solid button */}
            <div className="absolute inset-[2px] bg-[#050505] rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
              <MessageCircle size={26} className="text-white group-hover:text-[#dc2626] transition-colors duration-300" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Ultra Premium Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: "100%", scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "100%", scale: 0.95, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 right-0 w-full h-[85dvh] rounded-t-[2rem] rounded-b-none md:bottom-8 md:right-8 md:w-[420px] md:h-[650px] md:max-h-[85vh] md:rounded-[2rem] bg-[#050505]/70 backdrop-blur-3xl border-t border-white/10 md:border md:border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(220,38,38,0.03)] flex flex-col z-[100] overflow-hidden"
            >
              {/* HEADER */}
              <div className="relative px-6 py-5 flex items-center justify-between border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent shrink-0">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <motion.div 
                      className="absolute inset-0 bg-[#dc2626] blur-md opacity-50 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center p-1.5">
                      <img src="/logo.png" alt="BBS" className="w-[16px] h-auto" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-[15px] tracking-wide">BBS Intelligence</h3>
                    <p className="text-[11px] text-zinc-400 font-medium flex items-center gap-1.5 uppercase tracking-widest mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shadow-[0_0_8px_#dc2626] animate-pulse" /> AI Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={idx} 
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`flex items-end gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {msg.role === "model" ? (
                        <div className="w-6 h-6 rounded-full bg-black/50 border border-white/5 shrink-0 flex items-center justify-center p-1 mb-1 shadow-sm">
                          <img src="/logo.png" alt="BBS" className="w-3.5 h-auto" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-black/50 border border-white/5 shrink-0 flex items-center justify-center mb-1 shadow-sm">
                          <User size={10} className="text-zinc-500" />
                        </div>
                      )}
                      
                      <div 
                        className={`max-w-[80%] p-4 text-[14px] leading-[1.6] shadow-xl ${
                          msg.role === "user" 
                            ? "bg-gradient-to-br from-[#dc2626] to-[#991b1b] text-white rounded-2xl rounded-br-sm border border-[#dc2626]/50" 
                            : "bg-white/5 backdrop-blur-md text-zinc-200 rounded-2xl rounded-bl-sm border border-white/10"
                        }`}
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex items-end gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-black/50 border border-white/5 shrink-0 flex items-center justify-center p-1 mb-1">
                        <img src="/logo.png" alt="BBS" className="w-3.5 h-auto animate-pulse" />
                      </div>
                      <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl rounded-bl-sm border border-white/10 flex items-center gap-1.5 h-12">
                        <motion.div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} />
                        <motion.div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT AREA */}
              <div className="p-5 pb-8 md:pb-5 shrink-0 relative">
                {/* Subtle gradient overlay above input to fade messages */}
                <div className="absolute top-0 left-0 w-full h-8 -translate-y-full bg-gradient-to-t from-[#050505]/70 to-transparent pointer-events-none" />
                
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-black/60 backdrop-blur-xl border border-white/10 text-white rounded-full pl-6 pr-14 py-4 text-[14px] focus:outline-none focus:border-[#dc2626]/50 focus:bg-black/80 transition-all placeholder:text-zinc-600 shadow-inner"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 w-10 h-10 rounded-full bg-gradient-to-br from-[#dc2626] to-[#991b1b] flex items-center justify-center text-white disabled:opacity-50 disabled:grayscale transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
                  </button>
                </form>
                <p className="text-center text-[10px] text-zinc-600 mt-3 font-medium tracking-wide uppercase">Powered by Gemini AI</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
