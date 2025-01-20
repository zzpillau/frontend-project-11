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

const renderElement = (config, root, params, i18n) => {
  const newElConfig = config.needsI18n
    ? config.elementFunc(...params, i18n, config.eHandler)
    : config.elementFunc(...params);
  new HTMLBuilder(newElConfig).render(root);
};

const handleElementRendering = (config, element, root) => {
  const paramsValues = config.params.map((param) => element[param]);
  if (config.needsI18n) {
    return getInstanceI18n()
      .then((i18n) => renderElement(config, root, paramsValues, i18n));
  }
  renderElement(config, root, paramsValues);
  return Promise.resolve();
};

const renderContent = (config) => renderContainer(config.rootSelector, config.containerFunc)
  .then(() => {
    const root = document.querySelector(config.secondarySelector);
    const renderPromises = config.list
      .map((element) => handleElementRendering(config, element, root));

    return Promise.all(renderPromises);
  })
  .catch((error) => {
    console.error('renderContent Error', error);
  });

const createFeedConfig = (feedList) => ({
  list: feedList,
  rootSelector: '.feeds',
  secondarySelector: '.feed-list',
  containerFunc: generateFeedContainerConfig,
  elementFunc: generateFeedConfig,
  params: ['title', 'description'],
  needsI18n: false,
});

const createPostConfig = (postsList, eHandler) => ({
  list: postsList,
  rootSelector: '.posts',
  secondarySelector: '.posts-list',
  containerFunc: generatePostsContainerConfig,
  elementFunc: generatePostConfig,
  params: ['id', 'title', 'url', 'isRead'],
  needsI18n: true,
  eHandler: { event: 'click', handler: eHandler },
});

const renderRss = (state, eHandler) => {
  const { feedList, postsList } = state.rssProcess;

  return renderContent(createFeedConfig(feedList))
    .then(() => renderContent(createPostConfig(postsList, eHandler)))
    .catch((err) => {
      console.error('renderRss error:', err);
    });
};

export default renderRss;
