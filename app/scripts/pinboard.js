var BASE_URL = 'https://pinboard.in';

var Pinboard = {
  save: function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      var tab = tabs[0];

      chrome.tabs.executeScript(tab.id, {
        code: 'window.getSelection().toString();'
      }, function (selection) {
        var url = BASE_URL + '/add?showtags=yes&url=' + encodeURIComponent(tab.url) + '&title=' + encodeURIComponent(tab.title) + '&description=' + encodeURIComponent(selection);

        window.open(url, 'Pinboard', 'toolbar=no,scrollbars=no,width=700,height=550');
      });
    });
  },
  readLater: function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      var tab = tabs[0];
      var url = BASE_URL + '/add?later=yes&noui=yes&jump=close&url=' + encodeURIComponent(tab.url) + '&title=' + encodeURIComponent(tab.title);

      window.open(url, 'Pinboard', 'toolbar=no,scrollbars=no,width=50,height=50');
    });
  },
  all: function () {
    chrome.tabs.create({url: 'https://pinboard.in/'});
  },
  unread: function () {
    chrome.tabs.create({url: 'https://pinboard.in/toread/'});
  },
  random: function () {
    chrome.tabs.create({url: 'https://pinboard.in/random/?type=unread'});
  }
};
