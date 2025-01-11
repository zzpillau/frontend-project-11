export const checkForDuplicateFeeds = (feeds, newFeed) => {
  return feeds.some((feed) => feed.feedUrl === newFeed.feedUrl);
};
