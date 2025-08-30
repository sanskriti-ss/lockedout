# Lockedout
All-in-one personal assistant.
Uses eeg data in order to help you meditate, do brain puzzles, and focus on your work.

**How to Run**

```sh

# Step 1: Install the necessary dependencies.
npm i

# Step 2: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### To install the web-blocking extension (optional)
1. Go to Chrome
2. Enable "Developer mode" (top right).
3. Click "Load unpacked" and select the zone-shift-blocker-extension folder in your project.
4. After loading, click "Details" on the extension and note the Extension ID (a long string).
5. In your ContentFilterConfig.tsx, replace "zone-shift-blocker-extension-id" in the chrome.runtime.sendMessage call with your actual Extension ID (as a string)
6. Go to the "Configure Blocked Websites" page in your app.
7. Add domains (e.g., facebook.com, twitter.com) and click "Add".
When your list is ready, click "Sync to Extension".
You should see a success alert if the extension is installed and running.
