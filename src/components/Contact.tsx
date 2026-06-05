import React, { useState } from "react";
import { motion } from "motion/react";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { countries } from "../lib/countries";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "name") {
      // Allow only letters, spaces, hyphens, and apostrophes for name input
      const cleanValue = value.replace(/[^a-zA-Z\s\-\']/g, "");
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      return;
    }

    if (name === "phone") {
      // Allow only digits, space, and a leading plus sign for phone input
      let cleanValue = value.replace(/[^\d\s\+]/g, "");
      if (cleanValue.includes("+")) {
        const startsWithPlus = cleanValue.startsWith("+");
        cleanValue = (startsWithPlus ? "+" : "") + cleanValue.replace(/\+/g, "");
      }
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      return;
    }

    if (name === "country") {
      const selectedCountry = countries.find(c => c.name === value);
      if (selectedCountry) {
        setFormData(prev => ({ 
          ...prev, 
          country: value,
          phone: selectedCountry.dialCode + " " 
        }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace", "Delete", "Tab", "Escape", "Enter",
      "ArrowLeft", "ArrowRight", "Home", "End"
    ];
    
    if (allowedKeys.includes(e.key)) {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) {
      return;
    }

    const isDigit = /[0-9]/.test(e.key);
    const isSpace = e.key === " ";
    const isPlus = e.key === "+";

    if (isPlus) {
      const input = e.currentTarget;
      const hasPlus = input.value.includes("+");
      if (input.selectionStart !== 0 || hasPlus) {
        e.preventDefault();
      }
      return;
    }

    if (!isDigit && !isSpace) {
      e.preventDefault();
    }
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace", "Delete", "Tab", "Escape", "Enter",
      "ArrowLeft", "ArrowRight", "Home", "End"
    ];
    
    if (allowedKeys.includes(e.key)) {
      return;
    }

    if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) {
      return;
    }

    const isLetter = /[a-zA-Z]/.test(e.key);
    const isAllowedChar = [" ", "-", "'"].includes(e.key);

    if (!isLetter && !isAllowedChar) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedCountry = formData.country;
    const trimmedMessage = formData.message.trim();

    // 1. Name validation
    if (trimmedName.length < 2) {
      setStatus("error");
      setErrorMessage("Please enter a valid Full Name (at least 2 letters).");
      return;
    }

    // 2. Email validation (strict regex pattern)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // 3. Phone validation
    const digitsOnly = trimmedPhone.replace(/\D/g, "");
    if (digitsOnly.length < 9 || digitsOnly.length > 15) {
      setStatus("error");
      setErrorMessage("Please enter a valid phone number (9 to 15 digits including dial code).");
      return;
    }

    // 4. Country validation
    if (!trimmedCountry) {
      setStatus("error");
      setErrorMessage("Please select your Country.");
      return;
    }

    // 5. Message validation
    if (trimmedMessage.length < 10) {
      setStatus("error");
      setErrorMessage("Please write a message with at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Save to Firebase Firestore database
      await addDoc(collection(db, "contact_inquiries"), {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        country: trimmedCountry,
        service: formData.service || "General Inquiry",
        message: trimmedMessage,
        createdAt: serverTimestamp()
      });
      
      // 2. Direct Sync to user's Google Sheet (via Google Form submission)
      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSckKk0DgA_zT1eerWoDg8dBPrmGHTcQeE8z8j06TuEcfOCIbg/formResponse";
      const formBody = new URLSearchParams();
      formBody.append("entry.1050828459", trimmedName);
      formBody.append("entry.829173877", trimmedEmail);
      formBody.append("entry.1621150490", trimmedPhone);
      formBody.append("entry.586442386", trimmedCountry);
      formBody.append("entry.1882487484", formData.service || "General Inquiry");
      formBody.append("entry.295901912", trimmedMessage);

      try {
        await fetch(formUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formBody.toString()
        });
      } catch (sheetsErr) {
        console.error("Failed to sync to Google Sheets:", sheetsErr);
      }

      // 3. Send email notifications to configured recipients in Firestore
      try {
        const configRef = doc(db, "contact_inquiries", "_config_notifications");
        const configSnap = await getDoc(configRef);
        if (configSnap.exists()) {
          const emailList = configSnap.data().emails || [];
          if (Array.isArray(emailList) && emailList.length > 0) {
            const emailPromises = emailList.map(async (email: string) => {
              try {
                await fetch(`https://formsubmit.co/ajax/${email}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify({
                    _subject: `🔥 New Lead Submission - ${trimmedName}`,
                    Name: trimmedName,
                    Email: trimmedEmail,
                    Phone: trimmedPhone,
                    Country: trimmedCountry,
                    "Requested Service": formData.service || "General Inquiry",
                    Message: trimmedMessage,
                    _template: "table"
                  })
                });
              } catch (mailErr) {
                console.error(`Failed to trigger email notification for ${email}:`, mailErr);
              }
            });
            await Promise.all(emailPromises);
          }
        }
      } catch (emailConfigErr) {
        console.error("Failed to load email configurations:", emailConfigErr);
      }
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", country: "", service: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      console.error("Error adding document: ", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-zinc-800 text-white md:text-xl lg:text-2xl px-0 py-4 focus:outline-none focus:border-[#dc2626] transition-colors duration-500 placeholder:text-zinc-800 font-display shadow-none rounded-none";
  const labelClasses = "text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 group-focus-within:text-[#dc2626] transition-colors duration-500";

  return (
    <section className="py-24 md:py-40 px-4 md:px-6 max-w-7xl mx-auto relative overflow-hidden" id="contact">
      {/* Premium Minimalist Layout */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Huge Typography Header */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
              Exclusive Access
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-8">
              Let's build
              <br />
              <span className="text-[#dc2626] italic">an empire.</span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-md leading-relaxed">
              We partner with brands ready to dominate their market. Submit your details below to initiate contact.
            </p>
          </motion.div>
        </div>

        {/* Right: VIP Consultation Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          {/* Glassmorphic Panel */}
          <motion.div 
            className="bg-[#030303]/60 backdrop-blur-3xl border-solid border-[1px] p-8 md:p-12 lg:p-16 rounded-[2.5rem] relative overflow-hidden"
            initial={{ borderColor: "rgba(220,38,38,0.1)", boxShadow: "0 0 60px -15px rgba(220,38,38,0.15)" }}
            animate={{ 
              boxShadow: [
                "0 0 60px -15px rgba(220,38,38,0.15), 0 0 10px 0px rgba(220,38,38,0.1)", 
                "0 0 60px -15px rgba(220,38,38,0.15), 0 0 20px 2px rgba(220,38,38,0.25)", 
                "0 0 60px -15px rgba(220,38,38,0.15), 0 0 10px 0px rgba(220,38,38,0.1)"
              ],
              borderColor: ["rgba(220,38,38,0.1)", "rgba(220,38,38,0.3)", "rgba(220,38,38,0.1)"]
            }}
            transition={{ 
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            
            {/* Subtle red ambient glow inside the terminal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#dc2626]/10 blur-[100px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-2">
                  <label htmlFor="name" className={labelClasses}>Full Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} onKeyDown={handleNameKeyDown} className={inputClasses} placeholder="Rahul Sharma" />
                </div>

                <div className="group space-y-2">
                  <label htmlFor="email" className={labelClasses}>Email Address</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClasses} placeholder="rahul@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-2">
                  <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} onKeyDown={handlePhoneKeyDown} className={inputClasses} placeholder="+91 98765 43210" />
                </div>
                
                <div className="group space-y-2 relative">
                  <label htmlFor="country" className={labelClasses}>Country</label>
                  <select id="country" name="country" required value={formData.country} onChange={handleChange} className={`${inputClasses} appearance-none cursor-pointer relative z-10`}>
                    <option value="" disabled className="bg-[#050505] text-zinc-500">Select country</option>
                    {countries.map(c => (
                      <option key={c.name} value={c.name} className="bg-[#050505] text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 bottom-4 text-zinc-600 pointer-events-none">▼</div>
                </div>
              </div>

              <div className="group space-y-2">
                <label htmlFor="message" className={labelClasses}>Message</label>
                <textarea id="message" name="message" required rows={2} value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Tell us how we can help your business grow..."></textarea>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-display font-bold text-lg tracking-wide overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-[#dc2626] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Transmitting...</>
                    ) : (
                      <>Initiate Growth <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </span>
                </button>

                {status === "success" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-green-400 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5" /> Request Confirmed.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[#dc2626] text-sm font-medium">
                    <AlertCircle className="w-5 h-5" /> {errorMessage}
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
