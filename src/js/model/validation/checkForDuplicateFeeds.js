const checkForDuplicateFeeds = (feeds, newFeed) => feeds
  .some(feed => feed.url === newFeed.url)

export default checkForDuplicateFeeds
