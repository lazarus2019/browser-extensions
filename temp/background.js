import './sw-omnibox.js';
import './sw-tips.js';

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('set badgeText');
//   chrome.action.setBadgeText({
//     text: 'Tắt',
//   });
// });

chrome.runtime.onInstalled.addListener(({ reason }) => {
  console.log({ reason });
  chrome.storage.local.set({
    apiSuggestions: ['tabs', 'storage', 'scripting'],
  });
  if (reason === 'install') {
    chrome.storage.local.set({
      apiSuggestions: ['tabs', 'storage', 'scripting'],
    });
  }

  const promiseStorage = chrome.storage.local.get(['apiSuggestions']);
  promiseStorage.then((storage) => {
    console.log({ storage });
  });
});

const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

function changeBackgroundColor() {
  document.body.style.backgroundColor = 'red';
}

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'Bật' ? 'Tắt' : 'Bật';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === 'Bật') {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id },
      });
    } else if (nextState === 'Tắt') {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id },
      });
    }

    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ['script.js'],
        // func: changeBackgroundColor,
      })
      .then(() => console.log('script injected'));
  }
});
