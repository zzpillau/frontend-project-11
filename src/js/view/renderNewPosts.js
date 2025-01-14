import { generatePostConfig } from '../htmlConfigs/generatePostConfig.js';
import { getInstanceI18n } from '../i18n/i18nConfig.js';
import { PageBuilder } from '../components/PageBuilder.js';
import {handlePostClick} from '../eventHandlers.js'

export const renderNewPosts = (watchedState) => {
  console.log('i will render!!!!!!!!!!!!!!!!!!!!!!!!!!!', watchedState);

  const rootContainer = document.querySelector('.posts-list');

  console.log(rootContainer);

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
        }
      );
      console.log('postConfig with handler', postConfig)
      return new PageBuilder(postConfig).render(rootContainer, {
        option: 'prepend',
      });
    });
  });
};
