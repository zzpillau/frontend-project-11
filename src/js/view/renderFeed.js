import {
  generateFeedContainerConfig,
  generateFeedConfig,
} from '../htmlConfigs/generateFeedConfig.js';
import { getInstanceI18n } from '../i18n/i18nConfig.js';
import { PageBuilder } from '../components/PageBuilder.js';

const renderFeedContainer = (rootContainer) => {
  console.log('renderFeedContainer starts***************************************')
  rootContainer.innerHTML = '';
  return getInstanceI18n()
    .then((i18n) => {
      const feedContainerConfig = generateFeedContainerConfig(i18n);
      return new Promise((resolve) => {
        new PageBuilder(feedContainerConfig).render(rootContainer);
        resolve();
      });
    })
    .catch((err) => {
      console.error('Error in renderFeedContainer:', err);
    });
};

export const renderFeed = (state) => {
  console.log('renderFeed starts!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

  const { feedList: feeds, postsList: posts } = state;

  const rootContainer = document.querySelector('.feeds');

  if (!rootContainer) {
    throw new Error('Root container not found');
  }

  renderFeedContainer(rootContainer)
    .then(() => {
      const feedList = document.querySelector('.feed-list');
      feeds.forEach((feed) => {
        const {
          feedTitle,
          feedDescription,
          feedId,
          feedUrl,
        } = feed;

        const newFeedElConfig = generateFeedConfig(feedTitle, feedDescription);
        return new PageBuilder(newFeedElConfig).render(feedList);

      })
    })
    .catch((err) => {
      console.error('Error in renderFeed:', err);
    });
};
