const pinnedTabs = new Map();
const getPinnedTabs = () => browser.tabs.query({ pinned: true });

getPinnedTabs().then(
    tabs => tabs.forEach(
        tab => pinnedTabs.set(tab.id, { windowId: tab.windowId, pinned: true })
    )
);

const onPinned = (tabId, changeInfo, tab) => {
    // the tab has been unpinned
    if (pinnedTabs.has(tabId) &&
        pinnedTabs.get(tabId).windowId === tab.windowId &&
        !changeInfo.pinned) {
        pinnedTabs.delete(tabId);
    } else {
        pinnedTabs.set(tabId, { windowId: tab.windowId, pinned: changeInfo.pinned });
    }
}

browser.tabs.onUpdated.addListener(onPinned, { properties: ["pinned"] })

const onAttached = (tabId) => {
    // we have moved to a new window, so re-apply the pin
    if (pinnedTabs.has(tabId)) {
        browser.tabs.update(tabId, { pinned: true })
            .then(
                tab => console.log(`Updated tab: ${tab.id}`),
                error => console.log(`Error: ${error}`)
            );
    }
}

browser.tabs.onAttached.addListener(onAttached);
