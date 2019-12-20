import { Pinboard } from './Pinboard';

function checkSystemDarkMode() {
  const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const color = darkMode ? 'white' : 'black';
  chrome.browserAction.setIcon({
    path: {
      '16': `icon-${color}16.png`,
      '24': `icon-${color}24.png`,
      '32': `icon-${color}32.png`,
      '48': `icon-${color}48.png`,
      '128': `icon-${color}128.png`,
    },
  });
  chrome.storage.local.set({ darkMode });
}

chrome.runtime.onInstalled.addListener(() => {
  checkSystemDarkMode();
});

chrome.tabs.onCreated.addListener(() => {
  checkSystemDarkMode();
});

chrome.commands.onCommand.addListener(command => {
  if (Pinboard[command]) {
    Pinboard[command]();
  }
});
