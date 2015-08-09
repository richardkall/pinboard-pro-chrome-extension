document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  document.querySelector('#save').addEventListener('click', Pinboard.save);
  document.querySelector('#readLater').addEventListener('click', Pinboard.readLater);
  document.querySelector('#all').addEventListener('click', Pinboard.all);
  document.querySelector('#unread').addEventListener('click', Pinboard.unread);
  document.querySelector('#random').addEventListener('click', Pinboard.random);
});
