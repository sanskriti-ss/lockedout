let blockedSites = [];

// Listen for sync messages from the web app
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SYNC_BLOCKED_SITES") {
    blockedSites = message.sites || [];
    chrome.storage.local.set({ blockedSites });
    sendResponse({ success: true });
    return true;
  }
});

// Load blocked sites from storage on startup
chrome.storage.local.get(["blockedSites"], (result) => {
  blockedSites = result.blockedSites || [];
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
  }
});

// Block requests to harmful sites
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (!blockedSites.length) return { cancel: false };
    const url = details.url;
    return { cancel: blockedSites.some(site => url.includes(site)) };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
