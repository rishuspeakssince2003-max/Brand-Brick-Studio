import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Lock, Unlock, Search, Calendar, User, Phone, Mail, MessageSquare, Loader2, Trash2, Settings, FileSpreadsheet, Copy, Check, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Admin() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "396230") {
      setIsAuthenticated(true);
      fetchInquiries();
      fetchSettings();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000);
      setPasscode("");
    }
  };

  const fetchSettings = async () => {
    try {
      const docSnap = await getDoc(doc(db, "settings", "google_sheets"));
      if (docSnap.exists()) {
        setGoogleSheetsUrl(docSnap.data().webhookUrl || "");
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      await setDoc(doc(db, "settings", "google_sheets"), {
        webhookUrl: googleSheetsUrl
      });
      alert("Google Sheets URL saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to save settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleSyncAll = async () => {
    if (!googleSheetsUrl) {
      alert("Please configure a Google Sheets Webhook URL first.");
      return;
    }
    if (!window.confirm(`Are you sure you want to sync all ${inquiries.length} inquiries to your Google Sheet?`)) return;
    
    setIsSyncingAll(true);
    let successCount = 0;
    try {
      for (const inquiry of inquiries) {
        try {
          await fetch(googleSheetsUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: inquiry.name,
              email: inquiry.email,
              phone: inquiry.phone,
              country: inquiry.country,
              service: inquiry.service,
              message: inquiry.message,
              createdAt: inquiry.createdAt
            })
          });
          successCount++;
        } catch (e) {
          console.error("Error syncing inquiry:", inquiry.id, e);
        }
      }
      alert(`Synced ${successCount} out of ${inquiries.length} inquiries successfully!`);
    } catch (err) {
      console.error("Error running sync:", err);
      alert("Failed to complete sync process.");
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ["ID", "Date", "Name", "Email", "Phone", "Country", "Service", "Message"];
    const rows = inquiries.map(inq => [
      inq.id,
      inq.createdAt,
      `"${inq.name.replace(/"/g, '""')}"`,
      inq.email,
      `"${inq.phone}"`,
      inq.country,
      `"${inq.service || 'General Inquiry'}"`,
      `"${inq.message.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `brand_brick_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchInquiries = async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const q = query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to readable date
        createdAt: doc.data().createdAt ? new Date(doc.data().createdAt.seconds * 1000).toLocaleString() : "Unknown Date"
      }));
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

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, "contact_inquiries", id));
      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
    } catch (err: any) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete entry.");
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
          
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handleExportCSV}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet size={16} className="text-emerald-500" />
              Export CSV
            </button>
            <button 
              onClick={fetchInquiries}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-750 px-6 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
              Refresh Data
            </button>
          </div>
        </header>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Inquiries List */}
          <div className="lg:col-span-2 space-y-6">
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
                            onClick={() => handleDelete(inquiry.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-full transition-colors cursor-pointer shrink-0 animate-none hover:scale-105"
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
                        <div>
                          <div className="flex items-start gap-3">
                            <span className="text-zinc-500 text-sm font-semibold shrink-0 uppercase tracking-wider">Country:</span>
                            <span className="text-zinc-300 font-medium">{inquiry.country || "Not specified"}</span>
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

          {/* Right Column: Google Sheets Integration Panel */}
          <div className="space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-6 md:p-8 rounded-[2rem] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FileSpreadsheet size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Google Sheets Sync</h3>
                  <p className="text-xs text-zinc-500">Sync contact inquiries in real-time</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                    Webhook App URL
                  </label>
                  <input
                    type="url"
                    value={googleSheetsUrl}
                    onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full bg-zinc-950/60 border border-zinc-850 focus:border-brand/40 text-white rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveSettings}
                    disabled={isSavingSettings}
                    className="flex-1 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-50 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSavingSettings ? <Loader2 size={12} className="animate-spin" /> : <Settings size={12} />}
                    Save Config
                  </button>

                  <button
                    onClick={handleSyncAll}
                    disabled={isSyncingAll || !googleSheetsUrl}
                    className="flex-1 bg-brand hover:shadow-[0_0_15px_rgba(220,38,38,0.25)] disabled:opacity-50 disabled:hover:shadow-none text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSyncingAll ? <Loader2 size={12} className="animate-spin" /> : <ExternalLink size={12} />}
                    Sync All ({inquiries.length})
                  </button>
                </div>

                <div className="border-t border-zinc-850/80 pt-4 mt-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Setup Guide
                  </h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed mb-3">
                    Connect your sheet directly using Google Apps Script. Click below to copy the script code, then paste it in your sheet's <strong>Extensions &gt; Apps Script</strong> and deploy as a Web App (set Access to 'Anyone').
                  </p>
                  
                  <button
                    onClick={() => {
                      const script = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone", "Country", "Service", "Message"]);
    }
    sheet.appendRow([
      data.createdAt || new Date().toLocaleString(),
      data.name,
      data.email,
      data.phone,
      data.country,
      data.service,
      data.message
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
                      navigator.clipboard.writeText(script);
                      setCopiedScript(true);
                      setTimeout(() => setCopiedScript(false), 2000);
                    }}
                    className="w-full bg-zinc-950/60 border border-zinc-850 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedScript ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copiedScript ? "Script Copied!" : "Copy Apps Script Code"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
