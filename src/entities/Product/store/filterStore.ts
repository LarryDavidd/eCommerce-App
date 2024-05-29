import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

const NAME_SPACE = 'FilterStore';

type QueryArgs = {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
};

export const useFilterStore = defineStore(NAME_SPACE, () => {
  const queryArgs = reactive({
    categories: new Set<string>(new Set()),
    price: <{ min: number; max: null | number }>{},
    searchText: <string>''
  });
  // const categories = ref(new Set<string>());
  // const price = reactive<{ min: number; max: null | number }>({
  //   min: 0,
  //   max: null
  // });
  // const searchText = ref<string>('');

  const getQueryArgs = computed(() => queryArgs);

  const addCategory = (category: string) => queryArgs.categories.add(category);
  const removeCategory = (category: string) => queryArgs.categories.delete(category);

  const setMinPrice = (mixPrice: number) => (queryArgs.price.min = mixPrice);
  const setMaxPrice = (maxPrice: number) => (queryArgs.price.max = maxPrice);

  const setSearchText = (text: string) => (queryArgs.searchText = text);

  return { addCategory, removeCategory, setMaxPrice, setMinPrice, setSearchText, getQueryArgs };
});
