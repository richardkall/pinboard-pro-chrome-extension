var BASE_URL = 'https://pinboard.in';

var Pinboard = {
  save: function () {
    'use strict';

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      var tab = tabs[0];

      chrome.tabs.executeScript(tab.id, {
        code: 'window.getSelection().toString();'
      }, function (selection) {
        var url = BASE_URL + '/add?showtags=yes&url=' + encodeURIComponent(tab.url) + '&title=' + encodeURIComponent(tab.title) + '&description=' + encodeURIComponent(selection);

        window.open(url, 'Pinboard', 'toolbar=no,scrollbars=no,width=700,height=550');
        window.close();
      });
    });
  },
  readLater: function () {
    'use strict';

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      var tab = tabs[0];
      var url = BASE_URL + '/add?later=yes&noui=yes&jump=close&url=' + encodeURIComponent(tab.url) + '&title=' + encodeURIComponent(tab.title);

      window.open(url, 'Pinboard', 'toolbar=no,scrollbars=no,width=50,height=50');
      window.close();
    });
  },
  all: function () {
    'use strict';

    chrome.tabs.create({url: 'https://pinboard.in/'});
    window.close();
  },
  unread: function () {
    'use strict';

    chrome.tabs.create({url: 'https://pinboard.in/toread/'});
    window.close();
  },
  random: function () {
    'use strict';

    chrome.tabs.create({url: 'https://pinboard.in/random/?type=unread'});
    window.close();
  }
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  document.querySelector('#save').addEventListener('click', Pinboard.save);
  document.querySelector('#readLater').addEventListener('click', Pinboard.readLater);
  document.querySelector('#all').addEventListener('click', Pinboard.all);
  document.querySelector('#unread').addEventListener('click', Pinboard.unread);
  document.querySelector('#random').addEventListener('click', Pinboard.random);
});
