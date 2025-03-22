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
  return getInstanceI18n()
    .then((i18n) => {
      const feedContainerConfig = generateConfig(i18n);
      return new Promise((resolve) => {
        new HTMLBuilder(feedContainerConfig).render(root, { option: 'prepend' });
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
  new HTMLBuilder(newElConfig).render(root, { option: 'prepend' });
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

const feedIsNotEmpty = (state) => state.rssProcess.feedList.length > 1;

const renderContent = (state) => (config) => {
  const promise = feedIsNotEmpty(state)
    ? Promise.resolve()
    : renderContainer(config.rootSelector, config.containerFunc);

  return promise
    .then(() => {
      const secondaryRoot = document.querySelector(config.secondarySelector);
      const renderPromises = config.list
        .reverse()
        .map((element) => handleElementRendering(config, element, secondaryRoot));

      return Promise.all(renderPromises);
    })
    .catch((error) => {
      console.error('renderContent Error', error);
    });
};

const createFeedConfig = (feedList) => ({
  list: [feedList[0]],
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

  const renderMePlease = renderContent(state);

  return renderMePlease(createFeedConfig(feedList))
    .then(() => renderMePlease(createPostConfig(postsList, eHandler)))
    .catch((err) => {
      console.error('renderRss error:', err);
    });
};

export default renderRss;
