import {
  generateFeedContainerConfig,
  generateFeedConfig,
} from '../htmlConfigs/generateFeedConfig.js';
import {
  generatePostsContainerConfig,
  generatePostConfig,
} from '../htmlConfigs/generatePostConfig.js';
import { getInstanceI18n } from '../i18n/i18nConfig.js';
import { PageBuilder } from '../components/PageBuilder.js';
import { handlePostClick } from '../eventHandlers.js'
import { forEachRight } from 'lodash';

const renderContainer = (rootContainer, generateConfig) => {
  rootContainer.innerHTML = '';
  return getInstanceI18n()
    .then((i18n) => {
      const feedContainerConfig = generateConfig(i18n);
      return new Promise((resolve) => {
        new PageBuilder(feedContainerConfig).render(rootContainer);
        resolve();
      });
    })
    .catch((err) => {
      console.error('Error in renderFeedContainer:', err);
    });
};

export const renderContentPack = (contentPack) => {
  const {
    contentType,
    rootContainer,
    secondaryContainerSelector,
    configContainerFunc,
    configElementFunc,
    paramsToRender,
    needsI18n,
    eventhandler,
  } = contentPack;

  renderContainer(rootContainer, configContainerFunc)
    .then(() => {
      forEachRight(contentType, (element) => {
        const root = document.querySelector(secondaryContainerSelector);
        const params = paramsToRender.map((param) => element[param]);
        if (needsI18n) {
          getInstanceI18n()
            .then((i18n) => {
              const newElConfig = configElementFunc(...params, i18n, eventhandler);
              console.log('newElConfig with handler', newElConfig)
              return new PageBuilder(newElConfig).render(root);
            })
            .catch((error) => {
              console.error(`renderContainer Error: ${error}`);
            });
        } else {
          const newElConfig = configElementFunc(...params);
          console.log('newElConfig', newElConfig)
          return new PageBuilder(newElConfig).render(root);
          
        }
      });
    })
    .catch((error) => {
      console.error(`renderType Error: ${error}`);
    });
};

export const renderRss = (state) => {
  const { feedList, postsList } = state;

  const feedPack = {
    contentType: feedList,
    rootContainer: document.querySelector('.feeds') || null,
    secondaryContainerSelector: '.feed-list',
    configContainerFunc: generateFeedContainerConfig,
    configElementFunc: generateFeedConfig,
    paramsToRender: ['title', 'description'],
    needsI18n: false,
  };

  const postPack = {
    contentType: postsList,
    rootContainer: document.querySelector('.posts') || null,
    secondaryContainerSelector: '.posts-list',
    configContainerFunc: generatePostsContainerConfig,
    configElementFunc: generatePostConfig,
    paramsToRender: ['id', 'title', 'url'],
    needsI18n: true,
    eventhandler: {event: 'click', handler: handlePostClick},
  };

  renderContentPack(feedPack);
  renderContentPack(postPack);

};
