// // import _ from 'lodash';

// export class PageBuilder {
//   constructor(elementsConfig) {
//     this.elementsConfig = elementsConfig;
//   }

//   createNode(element, options = {}) {
//     const {
//       classes = [],
//       textContent = '',
//       attributes = {},
//       children = [],
//     } = options;

//     const node = document.createElement(element);
//     classes.length > 0 && node.classList.add(...classes);

//     if (textContent.trim() !== '') {
//       node.textContent = textContent;
//     }

//     Object.entries(attributes).forEach(([attr, value]) => {
//       node.setAttribute(attr, value);
//     });

//     if (children.length > 0) {
//       children.forEach(([child, options]) => {
//         // console.log('children', children)

//         const childNode = createNode(child, options);
//         // console.log('childNode', childNode)

//         node.append(childNode);
//       });
//     }

//     // console.log('node', node)
//     return node;
//   }

//   // createElement(tag, classes = [], attributes = {}, textContent = '') {
//   //   const container = document.createElement(tag);
//   //   container.classList.add(...classes);
//   //   Object.entries(attributes).forEach(([attrName, attrValue]) =>
//   //     container.setAttribute(attrName, attrValue),
//   //   );
//   //   container.textContent = textContent;
//   //   return container;
//   // }

//   // addElement(key, tag, classes = [], attributes = {}, textContent = '', children = {}) {
//   //   this.elements[key] = this.createElement(
//   //     tag,
//   //     classes,
//   //     attributes,
//   //     textContent,
//   //     );

//   //     Object.keys(children).forEach((child) => this.appendElement(this.elements[key], (this.addElement(child))))

//   // }

//   // appendElement(parentElement, childElement) {
//   //   if (this.elements[parentElement] && this.elements[childElement]) {
//   //     parentElement.append(childElement);
//   //   }
//   // }

//   // render(container) {
//   //   if (this.elements['root']) {
//   //     container.append(this.elements['root']);
//   //   }
//   // }
// }
