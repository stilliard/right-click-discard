// Create a context menu that applies to all pages / tabs
chrome.contextMenus.create({
    id: "discardTab",
    title: "Discard Tab",
    contexts: ["all"] // Make this menu available everywhere
}, () => {
    // Check for errors if the item already exists
    if (chrome.runtime.lastError) {
        console.log("[Right-click discard tab] Context menu item already exists:", chrome.runtime.lastError.message);
    }
});

// Add a listener to handle clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // Check if a tab was clicked
    if (info.menuItemId === "discardTab" && tab && tab.id) {
        // Discard the clicked tab
        chrome.tabs.discard(tab.id);
    }
});

// Add listener for keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
    if (command === "discard-tab") {
        // Get the current active tab and discard it
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0] && tabs[0].id) {
                chrome.tabs.discard(tabs[0].id);
            }
        });
    }
});
