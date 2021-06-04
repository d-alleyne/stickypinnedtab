const pinnedTabs = new Set();
const getPinnedTabs = () => browser.tabs.query({ pinned: true });

getPinnedTabs().then((tabs) =>
  tabs.forEach((tab) =>
    pinnedTabs.add(tab.id)
  )
);

const onPinned = (tabId, changeInfo) => {
  // the tab has been unpinned
  if (pinnedTabs.has(tabId) && !changeInfo.pinned) {
    pinnedTabs.delete(tabId);
  } else {
    pinnedTabs.add(tabId);
  }
};

browser.tabs.onUpdated.addListener(onPinned, { properties: ["pinned"] });

const onAttached = (tabId) => {
  // we have moved to a new window, so re-apply the pin
  if (pinnedTabs.has(tabId)) {
    browser.tabs.update(tabId, { pinned: true }).then(
      (tab) => console.log(`Updated tab: ${tab.id}`),
      (error) => console.log(`Error: ${error}`)
    );
  }
};

browser.tabs.onAttached.addListener(onAttached);

// memory cleanup
browser.tabs.onRemoved.addListener(
  (tabId) => pinnedTabs.has(tabId) && pinnedTabs.delete(tabId)
);
