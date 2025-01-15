import { isEmpty } from 'lodash';

class HTMLBuilder {
  constructor(elementsConfig) {
    this.elements = {};
    this.elementsConfig = elementsConfig;
  }

  static createNewElement(config) {
    const {
      tag,
      classes = [],
      attributes = {},
      textContent = '',
    } = config;
    const container = document.createElement(tag);
    container.classList.add(...classes);
    Object
      .entries(attributes)
      .forEach(([attrName, attrValue]) => container
        .setAttribute(attrName, attrValue));
    container.textContent = textContent;
    return container;
  }

  #addElement(key, config) {
    this.elements[key] = HTMLBuilder.createNewElement(config);
    const parentElement = this.elements[key];

    const { eventhandler = {} } = config;

    if (eventhandler && eventhandler.event && eventhandler.handler) {
      parentElement.addEventListener(eventhandler.event, eventhandler.handler);
    }

    const { children = {} } = config;

    if (!isEmpty(children)) {
      Object.entries(children).forEach(([childKey, childConfig]) => {
        this.#addElement(childKey, childConfig);
        parentElement.append(this.elements[childKey]);
      });
    }
  }

  render(container, { option = 'append' } = {}) {
    const { root } = this.elementsConfig;

    this.#addElement('root', root);

    if (this.elements.root) {
      if (option === 'append') {
        container.append(this.elements.root);
      }
      if (option === 'prepend') {
        container.prepend(this.elements.root);
      }
    }
    return this.elements[root];
  }
}

export default HTMLBuilder;
