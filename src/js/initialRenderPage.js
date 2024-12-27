// import _ from 'lodash';
import { PageBuilder } from './PageBuilder.js';

// принято решение на 1 шаге хранить конфигурацию элементов для
// начальной отрисовки элементов непосредственно в модуле initialRender,
// где она используется

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
                      textContent: 'RSS агрегатор',
                    },
                    'p-1': {
                      tag: 'p',
                      classes: ['lead'],
                      attributes: {},
                      textContent:
                        'Начните читать RSS сегодня! Это легко, это красиво.',
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
                                        placeholder: 'ссылка RSS',
                                        autocomplete: 'off',
                                      },
                                    },
                                    label: {
                                      tag: 'label',
                                      attributes: {
                                        for: 'url-input',
                                      },
                                      textContent: 'Ссылка RSS',
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
                                  textContent: 'Добавить',
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    // WARNING: отсутствуют в начальной отрисовке
                    // 'p-2': {
                    //   tag: 'p',
                    //   classes: ['mt-2', 'mb-0', 'text-muted'],
                    //   textContent: 'Пример: https://lorem-rss.hexlet.app/feed',
                    // },
                    // 'p-3': {
                    //   tag: 'p',
                    //   classes: ['feedback', 'm-0', 'position-absolute', 'small', 'text-danger'],
                    // },
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
              textContent: 'created by',
              children: {
                a: {
                  tag: 'a',
                  attributes: {
                    href: 'https://ru.hexlet.io/professions/frontend/projects/11',
                    target: '_blank',
                  },
                  textContent: 'Hexlet',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const initialRender = () => {
  const rootContainer = document.body;
  rootContainer.classList.add('d-flex', 'flex-column', 'min-vh-100');

  Object.keys(initConfig).forEach((config) => {
    new PageBuilder(initConfig[config]).render(rootContainer);
  });
};
