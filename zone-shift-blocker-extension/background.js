let blockedSites = [];

// Listen for sync messages from the web app
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SYNC_BLOCKED_SITES") {
    blockedSites = message.sites || [];
    chrome.storage.local.set({ blockedSites });
    updateBlockRules(blockedSites);
    sendResponse({ success: true });
    return true;
  }
});

// Load blocked sites from storage on startup
chrome.storage.local.get(["blockedSites"], (result) => {
  blockedSites = result.blockedSites || [];
  updateBlockRules(blockedSites);
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
    updateBlockRules(blockedSites);
  }
});

function updateBlockRules(sites) {
  // Remove all previous dynamic rules
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({length: 5000}, (_, i) => i + 1), // Remove up to 5000 rules
    addRules: sites.map((site, idx) => ({
      id: idx + 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: site.replace(/^https?:\/\//, ""),
        resourceTypes: ["main_frame"]
      }
    }))
  });
}
