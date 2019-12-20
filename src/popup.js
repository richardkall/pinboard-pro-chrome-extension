import { Pinboard } from './Pinboard';
import { actions, defaultValues } from './constants';

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(defaultValues, values => {
    const bodyEl = document.getElementById('body');
    if (values.darkMode) {
      bodyEl.classList.remove('light');
    } else {
      bodyEl.classList.add('light');
    }
    actions.forEach(action => {
      if (!values.visibleActions[action]) {
        document.getElementById(action).remove();
      }
    });
  });

  actions.forEach(action => {
    document.getElementById(action).addEventListener('click', Pinboard[action]);
  });
});
