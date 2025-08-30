# Zone Shift Blocker Extension

This Chrome extension blocks websites you configure in your Zone Shift Hub app during Casual Browsing mode.

## How it works
- The extension listens for a sync message from your app (via the "Sync to Extension" button).
- It stores the list of blocked sites and blocks any navigation to those domains.

## Setup
1. Go to `chrome://extensions` and enable Developer Mode.
2. Click "Load unpacked" and select this `zone-shift-blocker-extension` folder.
3. In your app, configure your blocked sites and click "Sync to Extension".
4. The extension will immediately block those sites in all tabs.

## Notes
- You may need to reload tabs for changes to take effect.
- Replace the placeholder icons with your own if desired.
- The extension ID must match the one used in your app's `chrome.runtime.sendMessage` call.
