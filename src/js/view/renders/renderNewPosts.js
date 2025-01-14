import { generatePostConfig } from '../htmlConfigs/generatePostConfig.js';
import { getInstanceI18n } from '../i18n/i18nConfig.js';
import { HTMLBuilder } from '../../builders/HTMLBuilder.js';
import { handlePostClick } from '../../controller/eventHandlers.js';

export const renderNewPosts = (watchedState) => {
  const rootContainer = document.querySelector('.posts-list');

  watchedState.rssProcess.newPosts.forEach((post) => {
    getInstanceI18n().then((i18n) => {
      const postConfig = generatePostConfig(
        post.id,
        post.title,
        post.url,
        i18n,
        {
          event: 'click',
          handler: handlePostClick,
        },
      );
      return new HTMLBuilder(postConfig).render(rootContainer, {
        option: 'prepend',
      });
    })
    .catch((e) => {
      console.error('Error initializing i18n:', e);
    });
  });
};
