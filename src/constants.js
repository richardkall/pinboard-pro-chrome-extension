export const defaultValues = {
  darkMode: true,
  visibleActions: {
    readLater: true,
    saveBookmark: true,
    saveTabSet: true,
    openAllUnread: true,
    openAllBookmarks: true,
    openAllTabSets: true,
    openRandomUnread: true,
  },
};

export const actions = Object.keys(defaultValues.visibleActions);
