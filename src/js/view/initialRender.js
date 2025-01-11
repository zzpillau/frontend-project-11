import { PageBuilder } from '../components/PageBuilder.js';
import { generateInitialConfig } from '../htmlConfigs/generateInitialConfig.js';

export const initialRender = (rootContainer, i18n) => {
  // конфигурация для начальной отрисовки элементов
  const initConfig = generateInitialConfig(i18n);

  Object.keys(initConfig).forEach((config) => {
    new PageBuilder(initConfig[config]).render(rootContainer);
  });
};
