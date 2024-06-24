import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import { useLocalStorage } from '@shared/lib/composables/useLocalStorage';

const NAME_SPACE = 'AppState';
const KEY_LOCAL_STORAGE = 'state';

export type LangType = 'ru' | 'en-US';

export type CurrencyCodeType = 'EUR' | 'USD' | 'RUB';

type StateType = {
  language: LangType;
  currencyCode: CurrencyCodeType;
};

export const useAppState = defineStore(NAME_SPACE, () => {
  const ls = useLocalStorage();
  const loadState = ls.load<StateType>(KEY_LOCAL_STORAGE);

  const state = reactive<StateType>(loadState || { language: 'en-US', currencyCode: 'USD' });

  const getCurrentLang = computed(() => state.language);
  const getCurrentCurrency = computed(() => state.currencyCode);

  const changeLanguage = (lang: LangType) => {
    state.language = lang;
    ls.set<StateType>(KEY_LOCAL_STORAGE, state);
  };

  const changeCurrencyCode = (code: CurrencyCodeType) => {
    state.currencyCode = code;
    ls.set<StateType>(KEY_LOCAL_STORAGE, state);
  };

  const getState = computed(() => {
    return state;
  });

  return { getState, changeLanguage, changeCurrencyCode, getCurrentLang, getCurrentCurrency };
});
