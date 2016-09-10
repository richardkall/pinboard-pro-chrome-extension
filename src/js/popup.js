document.addEventListener('DOMContentLoaded', function () {
  var items = ['all', 'random', 'readLater', 'save', 'unread'];

  items.forEach(function (item) {
    document.querySelector('.js-' + item + ' a')
      .addEventListener('click', Pinboard[item]);
  });

  chrome.storage.sync.get({visibleItems: true}, function (options) {
    if (!options.visibleItems || typeof options.visibleItems !== 'object') return;
    items.forEach(function (item) {
      if (!options.visibleItems[item]) {
        document.querySelector('.js-' + item).remove();
      }
    });
  });
});
