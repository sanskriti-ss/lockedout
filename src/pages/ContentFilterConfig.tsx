import React, { useState, useEffect } from "react";

// Add TypeScript declaration for chrome extension APIs
// @ts-ignore
// eslint-disable-next-line no-var
declare var chrome: any;

const LOCAL_STORAGE_KEY = "casualBrowsingBlockedSites";

const ContentFilterConfig = () => {
  const [sites, setSites] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setSites(JSON.parse(saved));
  }, []);

  const addSite = () => {
    if (input.trim() && !sites.includes(input.trim())) {
      const updated = [...sites, input.trim()];
      setSites(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      setInput("");
    }
  };

  const removeSite = (site: string) => {
    const updated = sites.filter(s => s !== site);
    setSites(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const syncToExtension = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(
        "ecfipcjbbeodfeogdgagbjmdiaoedgec", // Replace with your extension ID
        { type: "SYNC_BLOCKED_SITES", sites },
        (response: any) => {
          if (response && response.success) {
            alert("Synced to extension!");
          } else {
            alert("Failed to sync. Is the extension installed?");
          }
        }
      );
    } else {
      alert("Chrome extension API not available. Please use Chrome and install the extension.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Configure Blocked Websites</h2>
      <p className="mb-6 text-muted-foreground">Enter domains (e.g. facebook.com) to block during Casual Browsing mode.</p>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          type="text"
          placeholder="Enter website domain"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') addSite(); }}
        />
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={addSite}>Add</button>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={syncToExtension}>
        Sync to Extension
      </button>
      <ul className="space-y-2">
        {sites.length === 0 && <li className="text-muted-foreground">No sites blocked yet.</li>}
        {sites.map(site => (
          <li key={site} className="flex items-center justify-between bg-card px-4 py-2 rounded border">
            <span>{site}</span>
            <button className="text-red-500 hover:underline" onClick={() => removeSite(site)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentFilterConfig;
