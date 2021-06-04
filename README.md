## Sticky Pinned Tab
Sticky Pinned Tab maintains a tab's _pinned_ property when moved between windows. This brings a feature found in Chromium-based browsers (Chrome, Edge, Opera, etc.) to Firefox users.

### Motivation

Moving a pinned tab between Firefox windows causes it to be unpinned. On researching possible solutions I found [bug 1505014](https://bugzilla.mozilla.org/show_bug.cgi?id=1505014) which won't be fixed. This extension fixes that bug.

### [Temporary Installation](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)
1. Clone the repository to a folder on your hard drive.
2. Open Firefox
3. Enter "about:debugging" in the URL bar
4. Click "This Firefox"
5. Click "Load Temporary Add-on"
6. Open the cloned repository folder and select any file inside the directory (e.g. [manifest.json](manifest.json)).
