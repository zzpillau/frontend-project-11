export const generateFeedContainerConfig = (i18n) => ({
  root: {
    tag: 'div',
    classes: ['card', 'border-0'],
    children: {
      'div-10': {
        tag: 'div',
        classes: ['card-body'],
        children: {
          h2: {
            tag: 'h2',
            classes: ['card-title', 'h4'],
            textContent: i18n.t('headers.feeds'),
            children: {},
          },
        },
      },
      ul: {
        tag: 'ul',
        classes: ['feed-list', 'list-group', 'border-0', 'rounded-0'],
        children: {},
      },
    },
  },
});

export const generateFeedConfig = (feedTitle, feedDesc) => ({
  root: {
    tag: 'li',
    classes: ['list-group-item', 'border-0', 'border-end-0'],
    children: {
      h3: {
        tag: 'h3',
        classes: ['h6', 'm-0'],
        textContent: feedTitle,
      },
      p: {
        tag: 'p',
        classes: ['m-0', 'small', 'text-black-50'],
        textContent: feedDesc,
      },
    },
  },
});
