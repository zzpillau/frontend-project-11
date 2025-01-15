class Post {
  constructor(id, feedId, title, description, url, isRead = false) {
    this.id = id;
    this.feedId = feedId;
    this.title = title;
    this.description = description;
    this.url = url;
    this.isRead = isRead;
  }
}

export default Post;