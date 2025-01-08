import _ from 'lodash';

export class PageBuilder {
  constructor(elementsConfig) {
    this.elements = {};
    this.elementsConfig = elementsConfig;
  }

  #createElement(tag, classes = [], attributes = {}, textContent = '') {
    const container = document.createElement(tag);
    container.classList.add(...classes);
    Object.entries(attributes).forEach(([attrName, attrValue]) =>
      container.setAttribute(attrName, attrValue),
    );
    container.textContent = textContent;
    return container;
  }

  #addElement(
    key,
    tag,
    classes = [],
    attributes = {},
    textContent = '',
    children = {},
  ) {
    this.elements[key] = this.#createElement(
      tag,
      classes,
      attributes,
      textContent,
      children,
    );
    const parentElement = this.elements[key];

    if (!_.isEmpty(children)) {
      Object.entries(children).forEach(([childName, childValue]) => {
        const {
          tag,
          classes = [],
          attributes = {},
          textContent = '',
          children = {},
        } = childValue;

        this.#addElement(
          childName,
          tag,
          classes,
          attributes,
          textContent,
          children,
        );

        parentElement.append(this.elements[childName]);
      });
    }
  }

  render(container) {
    const { root } = this.elementsConfig;

    const {
      tag,
      classes = [],
      attributes = {},
      textContent = '',
      children = {},
    } = root;

    this.#addElement('root', tag, classes, attributes, textContent, children);
    //TO-DO
    // пусть элемент разбирается в this.#addElement

    if (this.elements.root) {
      container.append(this.elements.root);
    }
  }
}
