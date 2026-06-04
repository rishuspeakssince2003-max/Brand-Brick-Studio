import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Lock, Unlock, Search, Calendar, User, Phone, Mail, MessageSquare, Loader2, Trash2, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Admin() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState("");
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [isSavingEmails, setIsSavingEmails] = useState(false);

  const fetchNotificationEmails = async () => {
    try {
      const docRef = doc(db, "contact_inquiries", "_config_notifications");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.emails && Array.isArray(data.emails)) {
          setEmails(data.emails);
        }
        if (data.googleSheetsUrl) {
          setGoogleSheetsUrl(data.googleSheetsUrl);
        }
        if (data.spreadsheetUrl) {
          setSpreadsheetUrl(data.spreadsheetUrl);
        }
      }
    } catch (err) {
      console.error("Error fetching notification settings:", err);
    }
  };

  const handleSaveEmails = async () => {
    setIsSavingEmails(true);
    try {
      const docRef = doc(db, "contact_inquiries", "_config_notifications");
      await setDoc(docRef, { 
        emails: emails,
        googleSheetsUrl: googleSheetsUrl.trim(),
        spreadsheetUrl: spreadsheetUrl.trim()
      }, { merge: true });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving notification settings:", err);
      alert("Failed to save settings.");
    } finally {
      setIsSavingEmails(false);
    }
  };

  const handleAddEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const emailToAdd = newEmail.trim().toLowerCase();
    if (!emailToAdd) return;
    if (!emailToAdd.includes("@") || !emailToAdd.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }
    if (emails.includes(emailToAdd)) {
      alert("This email is already in the list.");
      return;
    }
    setEmails(prev => [...prev, emailToAdd]);
    setNewEmail("");
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(prev => prev.filter(email => email !== emailToRemove));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "396230") {
      setIsAuthenticated(true);
      fetchInquiries();
      fetchNotificationEmails();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000);
      setPasscode("");
    }
  };

  const fetchInquiries = async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      // 1. Fetch list of deleted IDs from config document
      const configRef = doc(db, "contact_inquiries", "_config_notifications");
      const configSnap = await getDoc(configRef);
      const deletedIdsList: string[] = configSnap.exists() ? (configSnap.data().deletedIds || []) : [];

      // 2. Fetch all inquiries
      const q = query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs
        .filter(doc => doc.id !== "_config_notifications")
        .map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            ...d,
            // Convert Firestore timestamp to readable date
            createdAt: d.createdAt ? new Date(d.createdAt.seconds * 1000).toLocaleString() : "Unknown Date"
          };
        })
        .filter((inquiry: any) => 
          !inquiry.deleted && 
          inquiry.status !== "deleted" && 
          !deletedIdsList.includes(inquiry.id)
        );
      setInquiries(data);
    } catch (err: any) {
      console.error("Error fetching inquiries:", err);
      if (err.message.includes("Missing or insufficient permissions")) {
        setFetchError("Permission Denied: You need to update your Firebase Rules to allow read access.");
      } else {
        setFetchError("Failed to fetch data from Firebase.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string, email: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    
    let dbDeleted = false;
    
    try {
      // 1. Try to delete document from Firestore
      await deleteDoc(doc(db, "contact_inquiries", id));
      dbDeleted = true;
    } catch (err: any) {
      console.warn("Hard delete failed, trying soft delete fallback via configuration:", err);
      try {
        // Fallback: Since document updates/deletions are locked, append this ID to a list of deleted IDs inside the open _config_notifications doc
        const configRef = doc(db, "contact_inquiries", "_config_notifications");
        const configSnap = await getDoc(configRef);
        let deletedIdsList: string[] = [];
        if (configSnap.exists()) {
          deletedIdsList = configSnap.data().deletedIds || [];
        }
        if (!deletedIdsList.includes(id)) {
          deletedIdsList.push(id);
        }
        await setDoc(configRef, { deletedIds: deletedIdsList }, { merge: true });
        dbDeleted = true;
      } catch (softErr: any) {
        console.error("Soft delete fallback failed:", softErr);
      }
    }

    if (dbDeleted) {
      // Update UI state
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      
      // 2. Delete from Google Sheet if URL is configured
      if (googleSheetsUrl) {
        try {
          await fetch(googleSheetsUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              action: "delete",
              name: name,
              email: email
            })
          });
        } catch (sheetsErr) {
          console.error("Failed to delete row from Google Sheet:", sheetsErr);
        }
      }
    } else {
      alert("Failed to delete entry. Please check your Firestore rules or internet connection.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-brand selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-black/50 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50" />
          
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Lock className="text-brand" size={28} />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white tracking-tight mb-2">Admin Vault</h1>
            <p className="text-zinc-500 text-sm">Enter the authorization code to proceed</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <motion.input
                animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••"
                className={`w-full bg-zinc-900/50 border ${isError ? 'border-red-500' : 'border-zinc-800'} text-white text-center text-2xl tracking-[0.5em] rounded-xl px-5 py-4 focus:outline-none focus:border-brand/50 transition-colors`}
                autoFocus
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-brand text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Unlock size={16} /> Unlock Vault
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-brand">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-brand animate-pulse" />
              Command Center
            </h1>
            <p className="text-zinc-400">Viewing all active leads and contact submissions.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 self-end md:self-auto">
            {spreadsheetUrl && (
              <a 
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer"
              >
                📊 Open Google Sheet
              </a>
            )}
            
            <button 
              onClick={fetchInquiries}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 px-6 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              Refresh Data
            </button>
          </div>
        </header>

        {/* Sync & Notifications Settings */}
        <div className="bg-zinc-900/30 border border-zinc-800/80 p-6 md:p-8 rounded-3xl mb-8">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            ⚙️ Notification & Google Sheet Sync
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            Configure email alerts and Google Sheets integration settings. Note: If you want sheet rows to delete when deleted here, add your Apps Script Web App URL below.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                📬 Email Recipients
              </label>
              
              {/* Chips container */}
              <div className="flex flex-wrap gap-2 min-h-[50px] bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3.5 items-center">
                {emails.length === 0 ? (
                  <span className="text-zinc-500 text-xs px-1">No recipients configured. Add an email below.</span>
                ) : (
                  emails.map(email => (
                    <div 
                      key={email}
                      className="flex items-center gap-2 bg-zinc-900 border border-zinc-850 hover:border-red-500/30 hover:bg-red-500/5 px-3 py-1.5 rounded-full text-xs text-zinc-300 transition-all select-none"
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="text-zinc-500 hover:text-red-400 hover:bg-zinc-850 p-0.5 rounded-full transition-colors cursor-pointer animate-fade-in"
                        title={`Remove ${email}`}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add recipient row */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="e.g. partner@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddEmail();
                    }
                  }}
                  className="flex-1 bg-zinc-950/60 border border-zinc-800 focus:border-brand/40 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleAddEmail()}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                  📊 Direct Google Sheet Link (for quick dashboard shortcut)
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://docs.google.com/spreadsheets/d/.../edit"
                  value={spreadsheetUrl}
                  onChange={(e) => setSpreadsheetUrl(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-zinc-800 focus:border-brand/40 text-white rounded-xl px-4 py-3 text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-zinc-850 pt-4">
            <button
              onClick={handleSaveEmails}
              disabled={isSavingEmails}
              className="bg-brand hover:shadow-[0_0_15px_rgba(220,38,38,0.25)] text-white text-xs font-bold px-8 py-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              {isSavingEmails ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>

        {fetchError && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-2xl mb-8 flex items-start gap-4">
            <Lock className="shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold mb-1">Access Denied by Firebase</h3>
              <p className="text-sm">{fetchError}</p>
              <p className="text-sm mt-2 font-mono bg-black/50 p-3 rounded-lg border border-red-500/20 text-zinc-300">
                allow read: if true; // Update this in Firebase Rules
              </p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 gap-4">
            <Loader2 size={32} className="animate-spin text-brand" />
            <p>Decrypting records...</p>
          </div>
        ) : inquiries.length === 0 && !fetchError ? (
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-16 text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
              <MessageSquare className="text-zinc-500" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">No transmissions received</h3>
            <p className="text-zinc-500">Your inbox is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {inquiries.map((inquiry, idx) => (
                <motion.div 
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 p-6 md:p-8 rounded-[2rem] transition-colors relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-zinc-800/50 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand shrink-0">
                        <User size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{inquiry.name}</h2>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand px-2 py-1 bg-brand/10 rounded-md mt-1 inline-block">
                          {inquiry.service || "General Inquiry"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                      <div className="flex items-center gap-2 text-zinc-500 text-sm bg-black/40 px-4 py-2 rounded-full border border-zinc-800">
                        <Calendar size={14} />
                        {inquiry.createdAt}
                      </div>
                      <button
                        onClick={() => handleDelete(inquiry.id, inquiry.name, inquiry.email)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-full transition-colors cursor-pointer shrink-0"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="text-zinc-500 shrink-0 mt-0.5" size={16} />
                        <div>
                          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Email</p>
                          <a href={`mailto:${inquiry.email}`} className="text-zinc-300 hover:text-white transition-colors">{inquiry.email}</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="text-zinc-500 shrink-0 mt-0.5" size={16} />
                        <div>
                          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">Phone</p>
                          <a href={`tel:${inquiry.phone}`} className="text-zinc-300 hover:text-white transition-colors">{inquiry.phone}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/40 rounded-2xl p-6 border border-zinc-800/50 relative">
                    <MessageSquare className="absolute top-6 right-6 text-zinc-800" size={24} />
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-3">Project Details</p>
                    <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap relative z-10">{inquiry.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
