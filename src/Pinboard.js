const baseUrl = 'https://pinboard.in';

export const Pinboard = {
  openAllBookmarks() {
    chrome.tabs.create({ url: baseUrl });
  },
  openAllUnread() {
    chrome.tabs.create({ url: `${baseUrl}/toread/` });
  },
  openAllTabSets() {
    chrome.tabs.create({ url: `${baseUrl}/tabs/` });
  },
  openRandomUnread() {
    chrome.tabs.create({ url: `${baseUrl}/random/?type=unread` });
  },
  readLater() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      const url = `${baseUrl}/add?later=yes&noui=yes&jump=close&url=${encodeURIComponent(
        tab.url,
      )}&title=${encodeURIComponent(tab.title)}`;
      window.open(url, 'Pinboard', 'toolbar=no,scrollbars=no,width=1,height=1');
    });
  },
  saveBookmark() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      chrome.tabs.executeScript(
        tab.id,
        {
          code: 'window.getSelection().toString();',
        },
        selection => {
          const url = `${baseUrl}/add?showtags=yes&url=${encodeURIComponent(
            tab.url,
          )}&title=${encodeURIComponent(
            tab.title,
          )}&description=${encodeURIComponent(selection || '')}`;
          window.open(
            url,
            'Pinboard',
            'toolbar=no,scrollbars=no,width=700,height=550',
          );
        },
      );
    });
  },
  saveTabSet() {
    chrome.windows.getAll(
      { populate: true, windowTypes: ['normal'] },
      windows => {
        const postData = new FormData();
        const request = new XMLHttpRequest();
        const windowList = [];
        windows.forEach(window => {
          const tabList = [];
          window.tabs.forEach(({ title, url }) => {
            tabList.push({ title, url });
          });
          windowList.push(tabList);
        });
        postData.append(
          'data',
          JSON.stringify({ browser: 'chrome', windows: windowList }),
        );
        request.open('POST', `${baseUrl}/tabs/save/`, true);
        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            chrome.tabs.create({ url: `${baseUrl}/tabs/show/` });
          }
        };
        request.send(postData);
      },
    );
  },
};
