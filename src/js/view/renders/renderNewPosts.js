import {generatePostConfig} from '../htmlConfigs/generatePostConfig.js';
import getInstanceI18n from '../i18n/i18nConfig.js';
import HTMLBuilder from '../../builders/HTMLBuilder.js';

const renderNewPosts = (state, eventHandler) => {
  const rootContainer = document.querySelector('.posts-list');

  state.rssProcess.newPosts.forEach((post) => {
    getInstanceI18n()
      .then((i18n) => {
        const postConfig = generatePostConfig(
          post.id,
          post.title,
          post.url,
          i18n,
          {
            event: 'click',
            handler: eventHandler
          }
        );
        return new HTMLBuilder(postConfig).render(rootContainer, {
          option: 'prepend'
        });
      })
      .catch((e) => {
        console.error('Error initializing i18n:', e);
      });
  });
};

export default renderNewPosts;
