import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, Instagram, MapPin, User, Phone, MessageSquare, Check, AlertCircle } from "lucide-react";
import { LiquidButton } from "./ui/LiquidButton";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

const links = [
  { name: "Services", href: "/#services" },
  { name: "Process", href: "/#process" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Founder", href: "/#founder" },
  { name: "Contact", href: "/#contact" }
];

export function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setStatus("error");
      setErrorMessage("Please fill out both Name and Email.");
      return;
    }
    setStatus("submitting");
    try {
      // 1. Add to Admin Pipeline (Firestore database)
      await addDoc(collection(db, "contact_inquiries"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        country: "India", // default country
        service: "General Inquiry",
        createdAt: serverTimestamp(),
        status: "new"
      });

      // 2. Send email notification
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: "General Inquiry"
        })
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        // Even if email notification fails, we treat it as success since it's saved in the Firestore database
        console.warn("Email API notification failed, but lead saved in Firestore pipeline.");
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setStatus("error");
      setErrorMessage("Failed to submit enquiry. Please check your connection and try again.");
    }
  };

  return (
    <footer className="bg-transparent pt-12 md:pt-16 pb-8 px-4 md:px-6 border-t border-zinc-900 light:border-zinc-200 relative" id="contact">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Left Column - Information & Brand Strategy */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-brand text-xs font-bold tracking-widest uppercase mb-8 light:border-zinc-200 light:bg-white/50">
              Start Your Project
            </span>
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              className="text-5xl md:text-7xl font-display font-bold text-white light:text-zinc-900 mb-6 leading-tight max-w-lg"
            >
              {["Let’s", "build", "a", "brand", "people"].map((w, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { y: 30, opacity: 0, filter: "blur(6px)" },
                    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {w}
                </motion.span>
              ))}
              
              <span className="relative inline-block">
                <motion.span
                  variants={{
                    hidden: { y: 30, opacity: 0, scale: 0.95, filter: "blur(6px)" },
                    visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-[#dc2626] italic inline-block"
                >
                  remember
                </motion.span>
                
                {/* Underline swoosh drawing itself */}
                <motion.svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full h-3"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.8, ease: "easeOut" } }
                  }}
                >
                  <path
                    d="M2 8 C40 2, 80 2, 100 6 S160 12, 198 4"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-zinc-400 light:text-zinc-600 leading-relaxed max-w-md mb-10"
            >
              If your brand needs better content, stronger visuals, smarter digital execution, or a complete growth-ready system, Brand Brick Studio is ready to build with you.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <LiquidButton href="https://wa.me/917383386318" target="_blank" rel="noreferrer" variant="solid">
                Chat on WhatsApp
              </LiquidButton>
              <LiquidButton 
                href="mailto:brandbrickstudio@gmail.com" 
                variant="outline"
                className="inline-flex gap-2 items-center text-sm"
              >
                Email Our Team
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white light:group-hover:text-zinc-900 transition-colors duration-300" />
              </LiquidButton>
            </motion.div>

            {/* Quick Contact Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-col space-y-4 text-zinc-500 light:text-zinc-500 text-sm border-t border-zinc-900 pt-8 light:border-zinc-200 max-w-md"
            >
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-zinc-600 light:text-zinc-400" />
                <a href="mailto:brandbrickstudio@gmail.com" className="hover:underline hover:text-white light:hover:text-zinc-900">brandbrickstudio@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={16} className="text-zinc-600 light:text-zinc-400" />
                <a href="https://instagram.com/brandbrickstudio" target="_blank" rel="noreferrer" className="hover:underline hover:text-white light:hover:text-zinc-900">@brandbrickstudio</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-zinc-600 light:text-zinc-400" />
                <span>Silvassa, India</span>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Brand Logo and Enquiry Form */}
          <div className="flex flex-col lg:items-end gap-8">
            <div className="flex flex-col space-y-2 lg:items-end text-left lg:text-right w-full">
              <div className="flex items-center gap-3 lg:flex-row-reverse">
                <img src="/logo.png" alt="Brand Brick Logo" className="w-[34px] md:w-10 h-auto shrink-0" />
                <div className="flex flex-col lg:items-end">
                  <span className="font-sans font-medium text-3xl md:text-[32px] tracking-tight text-white light:text-zinc-900 flex items-center leading-none">
                    Brand<span className="font-bold text-brand ml-[2px]">Brick</span>
                  </span>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[0.35em] text-zinc-500 uppercase mt-1.5 ml-1 leading-none self-center lg:self-end text-center lg:text-right w-full lg:w-auto flex justify-center lg:justify-end font-display">
                    Studio
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Enquiry Form */}
            <div className="w-full max-w-lg lg:ml-auto rounded-[2.5rem] bg-zinc-950/40 backdrop-blur-md border border-zinc-800/40 p-8 md:p-10 shadow-lg light:bg-white/40 light:border-zinc-200 relative overflow-hidden">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mb-6 animate-pulse">
                    <Check size={28} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white light:text-zinc-900 mb-3">Enquiry Sent</h3>
                  <p className="text-zinc-400 light:text-zinc-600 text-sm leading-relaxed max-w-sm mb-8">
                    Thank you for reaching out! We've received your request and will contact you directly within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="text-xs font-mono font-bold uppercase tracking-widest text-[#dc2626] hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white light:text-zinc-900 mb-1">Tell Us About Your Project</h3>
                    <p className="text-xs text-zinc-500 light:text-zinc-400 mb-6">Fill out the details below and we will contact you directly.</p>
                  </div>

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-[#dc2626]/50 focus:bg-zinc-900 transition-all light:bg-zinc-50 light:border-zinc-200 light:text-zinc-900 light:placeholder:text-zinc-400 light:focus:bg-white"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-[#dc2626]/50 focus:bg-zinc-900 transition-all light:bg-zinc-50 light:border-zinc-200 light:text-zinc-900 light:placeholder:text-zinc-400 light:focus:bg-white"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-[#dc2626]/50 focus:bg-zinc-900 transition-all light:bg-zinc-50 light:border-zinc-200 light:text-zinc-900 light:placeholder:text-zinc-400 light:focus:bg-white"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-zinc-500 w-4 h-4" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you? Describe your requirements..."
                      rows={4}
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-[#dc2626]/50 focus:bg-zinc-900 transition-all light:bg-zinc-50 light:border-zinc-200 light:text-zinc-900 light:placeholder:text-zinc-400 light:focus:bg-white resize-none"
                    />
                  </div>

                  <LiquidButton 
                    type="submit" 
                    variant="solid" 
                    className="w-full cursor-pointer"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
                  </LiquidButton>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Footer Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-zinc-900 pt-8 light:border-zinc-200">
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-medium text-zinc-500 hover:text-white light:text-zinc-500 light:hover:text-zinc-900 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-zinc-500 font-medium">Proudly built in India.</p>
            <p className="text-sm text-zinc-500 font-medium mt-1">Built to <span className="text-zinc-400">stand out.</span> Created for <span className="text-zinc-400">growth.</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
