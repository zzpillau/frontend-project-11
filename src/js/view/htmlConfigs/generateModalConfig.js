export const generateModalContainerConfig = (i18n) => ({
  root: {
    tag: 'div',
    classes: ['modal', 'fade', 'show'],
    attributes: {
      id: 'modal',
      tabindex: '-1',
      'aria-labelledby': 'modal',
      style: 'display: block;',
      'aria-modal': 'true',
      role: 'dialog',
    },
    children: {
      'modal-dialog': {
        tag: 'div',
        classes: ['modal-dialog'],
        attributes: {
          role: 'document',
        },
        children: {
          'modal-content': {
            tag: 'div',
            classes: ['modal-content'],
            children: {
              'modal-header': {
                tag: 'div',
                classes: ['modal-header', 'text-break'],
                children: {
                  'modal-title': {
                    tag: 'h5',
                    classes: ['modal-title'],
                  },
                  'btn-close-modal': {
                    tag: 'button',
                    classes: ['btn-close', 'close'],
                    attributes: {
                      type: 'button',
                      'aria-label': 'Close',
                    },
                  },
                },
              },
              'modal-body': {
                tag: 'div',
                classes: ['modal-body'],
                attributes: {},
              },
              'modal-footer': {
                tag: 'div',
                classes: ['modal-footer'],
                children: {
                  'btn-full-article': {
                    tag: 'a',
                    classes: ['btn', 'btn-primary', 'full-article'],
                    attributes: {
                      href: '',
                      role: 'button',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    textContent: i18n.t('buttons.read'),
                  },
                  'btn-secondary-close': {
                    tag: 'button',
                    classes: ['btn', 'btn-secondary'],
                    attributes: {
                      type: 'button',
                    },
                    textContent: i18n.t('buttons.close'),
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

export const generateModalConfig = (title, description, url, i18n) => ({
  root: {
    tag: 'div',
    classes: ['modal-content'],
    children: {
      'modal-header': {
        tag: 'div',
        classes: ['modal-header', 'text-break'],
        children: {
          'modal-title': {
            tag: 'h5',
            classes: ['modal-title'],
            textContent: title,
          },
          'btn-close-modal': {
            tag: 'button',
            classes: ['btn-close', 'close'],
            attributes: {
              type: 'button',
              'data-bs-dismiss': 'modal',
              'aria-label': 'Close',
            },
          },
        },
      },
      'modal-body': {
        tag: 'div',
        classes: ['modal-body'],
        attributes: {},
        textContent: description,
      },
      'modal-footer': {
        tag: 'div',
        classes: ['modal-footer'],
        children: {
          'btn-full-article': {
            tag: 'a',
            classes: ['btn', 'btn-primary', 'full-article'],
            attributes: {
              href: url,
              role: 'button',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
            textContent: i18n.t('buttons.read'),
            children: {},
          },
          'btn-secondary-close': {
            tag: 'button',
            classes: ['btn', 'btn-secondary'],
            attributes: {
              type: 'button',
              'data-bs-dismiss': 'modal',
            },
            textContent: i18n.t('buttons.close'),
          },
        },
      },
    },
  },
});
