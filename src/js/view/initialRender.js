import { PageBuilder } from '../components/PageBuilder.js';
import { generateInitialConfig } from '../htmlConfigs/generateInitialConfig.js';
import { generateModalContainerConfig } from '../htmlConfigs/generateModalConfig.js';

export const initialRender = (rootContainer, i18n) => {
  // конфигурация для начальной отрисовки элементов
  const initConfig = generateInitialConfig(i18n);
  const modalConfig = generateModalContainerConfig(i18n);

  Object.keys(initConfig).forEach((config) => {
    new PageBuilder(initConfig[config]).render(rootContainer);
  });

  new PageBuilder(modalConfig).render(rootContainer, { option: 'prepend' });
};
