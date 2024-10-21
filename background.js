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
