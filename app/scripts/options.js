var restoreOptions = function () {
  'use strict';

  chrome.storage.sync.get({
    puSave: true,
    puReadLater: true,
    puAll: true,
    puUnread: true,
    puRandom: true
  }, function (items) {
    document.getElementById('pu-save').checked = items.puSave;
    document.getElementById('pu-readlater').checked = items.puReadLater;
    document.getElementById('pu-all').checked = items.puAll;
    document.getElementById('pu-unread').checked = items.puUnread;
    document.getElementById('pu-random').checked = items.puRandom;
  });
};

var updateStatus = function () {
  'use strict';

  var status = document.getElementById('status');

  status.textContent = 'Options saved.';

  setTimeout(function () {
    status.textContent = '';
  }, 750);
};

var saveOptions = function () {
  'use strict';

  var puSave = document.getElementById('pu-save').checked;
  var puReadLater = document.getElementById('pu-readlater').checked;
  var puAll = document.getElementById('pu-all').checked;
  var puUnread = document.getElementById('pu-unread').checked;
  var puRandom = document.getElementById('pu-random').checked;

  chrome.storage.sync.set({
    puSave: puSave,
    puReadLater: puReadLater,
    puAll: puAll,
    puUnread: puUnread,
    puRandom: puRandom
  }, updateStatus());
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
