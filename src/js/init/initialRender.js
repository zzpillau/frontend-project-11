import { PageBuilder } from '../components/PageBuilder.js';

// продолжаем хранить конфигурацию элементов для
// начальной отрисовки элементов непосредственно в initialRender,
// где она используется, для применения i18n

export const initialRender = (rootContainer, i18n) => {
  // конфигурация для начальной отрисовки элементов
  const initConfig = {
    mainConfig: {
      root: {
        tag: 'main',
        classes: ['flex-grow-1'],
        children: {
          'section-1': {
            tag: 'section',
            classes: ['container-fluid', 'bg-dark', 'p-5'],
            children: {
              'div-1': {
                tag: 'div',
                classes: ['row'],
                children: {
                  'div-2': {
                    tag: 'div',
                    classes: ['col-md-10', 'col-lg-8', 'mx-auto', 'text-white'],
                    children: {
                      h1: {
                        tag: 'h1',
                        classes: ['display-3', 'mb-0'],
                        attributes: {},
                        textContent: i18n.t('rssAggregatorTitle'),
                      },
                      'p-1': {
                        tag: 'p',
                        classes: ['lead'],
                        attributes: {},
                        textContent: i18n.t('rssAggregatorDescription'),
                      },
                      form: {
                        tag: 'form',
                        classes: ['rss-form', 'text-body'],
                        attributes: {
                          action: 'action',
                        },
                        children: {
                          'div-6': {
                            tag: 'div',
                            classes: ['row'],
                            children: {
                              'div-3': {
                                tag: 'div',
                                classes: ['col'],
                                children: {
                                  'div-4': {
                                    tag: 'div',
                                    classes: ['form-floating'],
                                    children: {
                                      input: {
                                        tag: 'input',
                                        classes: ['form-control', 'w-100'],
                                        attributes: {
                                          id: 'url-input',
                                          autofocus: 'autofocus',
                                          required: 'required',
                                          name: 'url',
                                          'aria-label': 'url',
                                          placeholder:
                                            i18n.t('rssLinkPlaceholder'),
                                          autocomplete: 'off',
                                        },
                                      },
                                      label: {
                                        tag: 'label',
                                        attributes: {
                                          for: 'url-input',
                                        },
                                        textContent: i18n.t('rssLinkLabel'),
                                      },
                                    },
                                  },
                                },
                              },
                              'div-5': {
                                tag: 'div',
                                classes: ['col-auto'],
                                children: {
                                  button: {
                                    tag: 'button',
                                    classes: [
                                      'h-100',
                                      'btn',
                                      'btn-lg',
                                      'btn-primary',
                                      'px-sm-5',
                                    ],
                                    attributes: {
                                      type: 'submit',
                                      'aria-label': 'add',
                                    },
                                    textContent: i18n.t('buttons.add'),
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      // WARNING: p-2 p-3 не видны в начальной отрисовке
                      'p-2': {
                        tag: 'p',
                        classes: ['mt-2', 'mb-0', 'text-muted'],
                        textContent: i18n.t('exampleLink'),
                      },
                      'p-3': {
                        tag: 'p',
                        classes: [
                          'feedback',
                          'm-0',
                          'position-absolute',
                          'small',
                        ], // text-danger || text-success
                      },
                    },
                  },
                },
              },
            },
          },
          'section-2': {
            tag: 'section',
            classes: ['container-fluid', 'container-xxl', 'p-5'],
          },
        },
      },
    },
    footerConfig: {
      root: {
        tag: 'footer',
        classes: ['footer', 'border-top', 'py-3', 'mt-5', 'bg-light'],
        children: {
          div: {
            tag: 'div',
            classes: ['container-xl'],
            children: {
              div: {
                tag: 'div',
                classes: ['text-center'],
                textContent: i18n.t('createdBy') + ' ',
                children: {
                  a: {
                    tag: 'a',
                    attributes: {
                      href: i18n.t('hexletLink'),
                      target: '_blank',
                    },
                    textContent: i18n.t('hexlet'),
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  Object.keys(initConfig).forEach((config) => {
    new PageBuilder(initConfig[config]).render(rootContainer);
  });
};
