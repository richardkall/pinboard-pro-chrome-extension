document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#save').addEventListener('click', Pinboard.save);
  document.querySelector('#readLater').addEventListener('click', Pinboard.readLater);
  document.querySelector('#all').addEventListener('click', Pinboard.all);
  document.querySelector('#unread').addEventListener('click', Pinboard.unread);
  document.querySelector('#random').addEventListener('click', Pinboard.random);

  chrome.storage.sync.get({
    puSave: true,
    puReadLater: true,
    puAll: true,
    puUnread: true,
    puRandom: true
  }, function (items) {
    if (!items.puSave) document.getElementById('pu-save').remove();
    if (!items.puReadLater) document.getElementById('pu-readlater').remove();
    if (!items.puAll) document.getElementById('pu-all').remove();
    if (!items.puUnread) document.getElementById('pu-unread').remove();
    if (!items.puRandom) document.getElementById('pu-random').remove();
  });
});
