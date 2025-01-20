export const generatePostsContainerConfig = (i18n) => ({
  root: {
    tag: 'div',
    classes: ['card', 'border-0'],
    children: {
      'card-body': {
        tag: 'div',
        classes: ['card-body'],
        children: {
          'posts-header': {
            tag: 'h2',
            classes: ['card-title', 'h4'],
            textContent: i18n.t('headers.posts'),
          },
        },
      },
      ul: {
        tag: 'ul',
        classes: ['posts-list', 'list-group', 'border-0', 'rounded-0'],
      },
    },
  },
});

export const generatePostConfig = (id, title, url, isRead, i18n, eventhandler) => {
  console.log('i18n inside generatePostConfig:', i18n);
  return {
    root: {
      tag: 'li',
      classes: [
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-start',
        'border-0',
        'border-end-0',
      ],
      children: {
        'post-link': {
          tag: 'a',
          classes: !isRead ? ['fw-bold'] : ['fw-normal', 'link-secondary'],
          attributes: {
            href: url,
            'data-id': id,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          textContent: title,
        },
        button: {
          tag: 'button',
          classes: ['btn', 'btn-outline-primary', 'btn-sm'],
          attributes: {
            type: 'button',
            'data-id': id,
          },
          textContent: i18n.t('buttons.view'),
          eventhandler,
        },
      },
    },
  };
};
