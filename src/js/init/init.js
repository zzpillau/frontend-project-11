import i18next from 'i18next';
import onChange from 'on-change';
import { initialRender } from "./initialRender.js";
import { resources } from '../texts/index.js';
import { initState } from './initState.js'; 


// initial render Принимает initState!
// И может быть контейнер!


const createI18nInstance = async () => {

  const i18nInstance = i18next.createInstance();
  await i18nInstance.init({
    lng: 'ru',
    fallbackLng: 'en',
    debug: true,
    resources,
  });

  return i18nInstance;
};

export const initApp = async () => {
  const i18n = await createI18nInstance();

const headerText = i18n.t('rssAggregatorTitle');
console.log('headerText', headerText)



  const rootContainer = document.body;
  rootContainer.classList.add('d-flex', 'flex-column', 'min-vh-100');

  const wathedState = onChange(initState, (path, value) => {

  })
  
  initialRender(rootContainer, wathedState, i18n)

}

