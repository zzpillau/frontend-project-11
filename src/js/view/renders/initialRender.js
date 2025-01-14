import { HTMLBuilder } from '../../builders/HTMLBuilder.js';
import { generateInitialConfig } from '../htmlConfigs/generateInitialConfig.js';
import { generateModalContainerConfig } from '../htmlConfigs/generateModalConfig.js';

export const initialRender = (rootContainer, i18n) => {
  try {
  // конфигурации для начальной отрисовки элементов
  const initConfig = generateInitialConfig(i18n);
  const modalConfig = generateModalContainerConfig(i18n);

  Object.keys(initConfig).forEach((config) => {
    new HTMLBuilder(initConfig[config]).render(rootContainer);
  });

  new HTMLBuilder(modalConfig).render(rootContainer, { option: 'prepend' });
  } catch (error) {
    console.error('initialRender error:', error);
  }
};
