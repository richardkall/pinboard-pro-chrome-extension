import { actions, defaultValues } from './constants';

function showNotification(text) {
  const status = document.getElementById('status');
  status.textContent = text;
  setTimeout(() => {
    status.textContent = '';
  }, 1000);
}

function restoreOptions() {
  chrome.storage.local.get(defaultValues, (values) => {
    for (const key in values.visibleActions) {
      document.getElementById(key).checked = values.visibleActions[key];
    }
  });
}

function saveOptions() {
  const visibleActions = {};
  actions.forEach((action) => {
    visibleActions[action] = document.getElementById(action).checked;
  });
  chrome.storage.local.set({ visibleActions }, () => {
    showNotification('Saved!');
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save-button').addEventListener('click', saveOptions);
