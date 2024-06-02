import { useAppState } from '@/shared/Store/AppStore';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const NAME_SPACE = 'FilterStore';

export const useFilterStore = defineStore(NAME_SPACE, () => {
  const queryArgs = reactive({
    offset: 0,
    limit: 10,
    categories: new Set<string>(new Set()),
    price: <{ min: number; max: null | number }>{},
    searchText: <string>'',
    sort: { priceCondition: 'none', nameCondition: 'none' }
  });

  const appState = useAppState();

  const getQueryArgs = computed(() => queryArgs);

  const setOffset = (offset: number) => (queryArgs.offset = offset);

  const addRemoveCategory = (category: string) => (queryArgs.categories.has(category) ? queryArgs.categories.delete(category) : queryArgs.categories.add(category));

  const changeSortByPrice = (newCondition: string) => (queryArgs.sort.priceCondition = newCondition === 'none' ? 'none' : 'price' + ' ' + newCondition);
  const changeSortByName = (newCondition: string) => (queryArgs.sort.nameCondition = newCondition === 'none' ? 'none' : 'name.' + appState.getCurrentLang + ' ' + newCondition);

  const setMinPrice = (mixPrice: number) => (queryArgs.price.min = mixPrice);
  const setMaxPrice = (maxPrice: number) => (queryArgs.price.max = maxPrice);

  const setSearchText = (text: string) => (queryArgs.searchText = text);

  return { addRemoveCategory, setMaxPrice, setMinPrice, setSearchText, changeSortByPrice, changeSortByName, getQueryArgs };
});
