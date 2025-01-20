import {
  generateFeedContainerConfig,
  generateFeedConfig,
} from '../htmlConfigs/generateFeedConfig.js';
import {
  generatePostsContainerConfig,
  generatePostConfig,
} from '../htmlConfigs/generatePostConfig.js';
import getInstanceI18n from '../i18n/i18nConfig.js';
import HTMLBuilder from '../../builders/HTMLBuilder.js';

const renderContainer = (rootSelector, generateConfig) => {
  const root = document.querySelector(rootSelector);
  root.innerHTML = '';
  return getInstanceI18n()
    .then((i18n) => {
      const feedContainerConfig = generateConfig(i18n);
      return new Promise((resolve) => {
        new HTMLBuilder(feedContainerConfig).render(root);
        resolve();
      });
    })
    .catch((err) => {
      console.error('Error in renderContainer:', err);
    });
};

const renderContentPack = (contentPack) => {
  const {
    contentType,
    rootSelector,
    secondaryContainerSelector,
    configContainerFunc,
    configElementFunc,
    paramsToRender,
    needsI18n,
    eventhandler,
  } = contentPack;

  renderContainer(rootSelector, configContainerFunc)
    .then(() => {
      contentType.forEach((element) => {
        const root = document.querySelector(secondaryContainerSelector);
        const params = paramsToRender.map((param) => element[param]);
        if (needsI18n) {
          getInstanceI18n()
            .then((i18n) => {
              const newElConfig = configElementFunc(
                ...params,
                i18n,
                eventhandler,
              );
              new HTMLBuilder(newElConfig).render(root);
            })
            .catch((error) => {
              console.error('i18n Error', error);
            });
        } else {
          const newElConfig = configElementFunc(...params);
          new HTMLBuilder(newElConfig).render(root);
        }
      });
    })
    .catch((error) => {
      console.error('renderContainer Error', error);
    });
};

const renderRss = (state, eventHandler) => {
  const { feedList, postsList } = state.rssProcess;

  const feedPack = {
    contentType: feedList,
    rootSelector: '.feeds',
    secondaryContainerSelector: '.feed-list',
    configContainerFunc: generateFeedContainerConfig,
    configElementFunc: generateFeedConfig,
    paramsToRender: ['title', 'description'],
    needsI18n: false,
  };

  const postPack = {
    contentType: postsList,
    rootSelector: '.posts',
    secondaryContainerSelector: '.posts-list',
    configContainerFunc: generatePostsContainerConfig,
    configElementFunc: generatePostConfig,
    paramsToRender: ['id', 'title', 'url', 'isRead'],
    needsI18n: true,
    eventhandler: { event: 'click', handler: eventHandler },
  };

  renderContentPack(feedPack);
  renderContentPack(postPack);
};

export default renderRss;
