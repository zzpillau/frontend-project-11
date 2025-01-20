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
      console.error('renderContainer error:', err);
    });
};

const renderContent = (config) => {
  renderContainer(config.rootSelector, config.containerFunc)
    .then(() => {
      config.list.forEach((element) => {
        const root = document.querySelector(config.secondarySelector);
        const paramsValues = config.params.map((param) => element[param]);

        const renderElement = (i18n) => {
          const newElConfig = config.needsI18n
            ? config.elementFunc(...paramsValues, i18n, config.eHandler)
            : config.elementFunc(...paramsValues);
          new HTMLBuilder(newElConfig).render(root);
        };

        if (config.needsI18n) {
          getInstanceI18n().then(renderElement);
        } else {
          renderElement();
        }
      });
    })
    .catch((error) => {
      console.error('renderContent Error', error);
    });
};

const renderRss = (state, eHandler) => {
  const { feedList, postsList } = state.rssProcess;

  const feedConfig = {
    list: feedList,
    rootSelector: '.feeds',
    secondarySelector: '.feed-list',
    containerFunc: generateFeedContainerConfig,
    elementFunc: generateFeedConfig,
    params: ['title', 'description'],
    needsI18n: false,
  };

  const postConfig = {
    list: postsList,
    rootSelector: '.posts',
    secondarySelector: '.posts-list',
    containerFunc: generatePostsContainerConfig,
    elementFunc: generatePostConfig,
    params: ['id', 'title', 'url', 'isRead'],
    needsI18n: true,
    eHandler: { event: 'click', handler: eHandler },
  };

  renderContent(feedConfig);
  renderContent(postConfig);
};

export default renderRss;
