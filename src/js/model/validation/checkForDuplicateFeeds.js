export const checkForDuplicateFeeds = (feeds, newFeed) => {
  return feeds.some((feed) => feed.url === newFeed.url);
};
