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
    eventhandler = {},
  ) {
    this.elements[key] = this.#createElement(
      tag,
      classes,
      attributes,
      textContent,
      children,
    );
    const parentElement = this.elements[key];
    console.log(parentElement)
    console.log('eventhandler', eventhandler)

    if (eventhandler && eventhandler.event && eventhandler.handler) {
      console.log(`Adding event listener: ${eventhandler.event}`);
      parentElement.addEventListener(eventhandler.event, eventhandler.handler)
    }

    if (!_.isEmpty(children)) {
      Object.entries(children).forEach(([childName, childValue]) => {
        const {
          tag,
          classes = [],
          attributes = {},
          textContent = '',
          children = {},
          eventhandler = {}
        } = childValue;

        this.#addElement(
          childName,
          tag,
          classes,
          attributes,
          textContent,
          children,
          eventhandler,
        );

        parentElement.append(this.elements[childName]);
      });
    }
  }

  render(container, { option = 'append' } = {}) {
    const { root } = this.elementsConfig;

    const {
      tag,
      classes = [],
      attributes = {},
      textContent = '',
      children = {},
      eventhandler = {},
    } = root;

    this.#addElement('root', tag, classes, attributes, textContent, children, eventhandler);
    //TO-DO
    // пусть элемент разбирается в this.#addElement

    if (this.elements.root) {
      if (option === 'append') {
        container.append(this.elements.root);
      }
      if (option === 'prepend') {
        container.prepend(this.elements.root);
      }

      return this.elements[root];
    }
  }
}
