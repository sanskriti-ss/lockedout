const LOCAL_STORAGE_KEY = "blockedSites";

function renderSites(sites) {
  const list = document.getElementById("site-list");
  list.innerHTML = "";
  if (!sites.length) {
    list.innerHTML = '<div style="color:#888">No sites blocked yet.</div>';
    return;
  }
  sites.forEach(site => {
    const div = document.createElement("div");
    div.className = "site-item";
    div.innerHTML = `<span>${site}</span><button class='remove-btn'>Remove</button>`;
    div.querySelector(".remove-btn").onclick = () => removeSite(site);
    list.appendChild(div);
  });
}

function loadSites() {
  chrome.storage.local.get([LOCAL_STORAGE_KEY], (result) => {
    renderSites(result[LOCAL_STORAGE_KEY] || []);
  });
}

function addSite() {
  const input = document.getElementById("site-input");
  const site = input.value.trim();
  if (!site) return;
  chrome.storage.local.get([LOCAL_STORAGE_KEY], (result) => {
    const sites = result[LOCAL_STORAGE_KEY] || [];
    if (!sites.includes(site)) {
      const updated = [...sites, site];
      chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: updated }, loadSites);
    }
    input.value = "";
  });
}

function removeSite(site) {
  chrome.storage.local.get([LOCAL_STORAGE_KEY], (result) => {
    const sites = (result[LOCAL_STORAGE_KEY] || []).filter(s => s !== site);
    chrome.storage.local.set({ [LOCAL_STORAGE_KEY]: sites }, loadSites);
  });
}

document.getElementById("add-btn").onclick = addSite;
document.getElementById("site-input").addEventListener("keydown", e => {
  if (e.key === "Enter") addSite();
});

document.addEventListener("DOMContentLoaded", loadSites);
