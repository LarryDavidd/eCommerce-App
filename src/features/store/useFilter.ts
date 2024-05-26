import { defineStore } from 'pinia';

type CheckboxElement = {
  type: 'checkbox';
  title: string;
  elements: {
    valueCheckbox: boolean;
    label: string;
  }[];
};
type RadioElement = {
  type: 'radio';
  title: string;
  selected: string;
  elements: {
    value: string;
    label: string;
    name: string;
  }[];
};
type CategoryElement = {
  type: 'category';
  title: string;
  subcategories: (RadioElement | CheckboxElement)[];
};
export type CheckboxFilter = {
  label: string;
  value: boolean;
};

export type RangeFilter = {
  min: number;
  max: number;
  title: string;
};

export type FilterElement = CheckboxElement | RadioElement | CategoryElement;

interface FilterState {
  filtersAccordion: FilterElement[];
  checkboxFilters: CheckboxFilter[];
  rangeFilter: RangeFilter;
}

const initialFiltersAccordion: FilterElement[] = [
  {
    type: 'checkbox',
    title: 'brands',
    elements: [
      {
        valueCheckbox: false,
        label: 'dresses'
      },
      { valueCheckbox: false, label: 'pants' }
    ]
  },
  {
    type: 'radio',
    title: 'colors',
    selected: 'green',
    elements: [
      { value: 'red', label: 'red', name: 'color' },
      { value: 'green', label: 'green', name: 'color' }
    ]
  },
  {
    type: 'category',
    title: 'Categories',
    subcategories: [
      {
        type: 'checkbox',
        title: 'outerwear',
        elements: [
          { label: 'jacket', valueCheckbox: false },
          { label: 'coat', valueCheckbox: false }
        ]
      },
      {
        type: 'checkbox',
        title: 'hats',
        elements: [
          { label: 'cap', valueCheckbox: false },
          { label: 'hat', valueCheckbox: false }
        ]
      }
    ]
  }
];

const initialCheckboxFilters: CheckboxFilter[] = [
  {
    value: false,
    label: 'With a discount'
  }
];

const initialRangeFilter: RangeFilter = {
  title: 'price',
  min: 0,
  max: 5000
};

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => ({
    filtersAccordion: JSON.parse(JSON.stringify(initialFiltersAccordion)),
    checkboxFilters: JSON.parse(JSON.stringify(initialCheckboxFilters)),
    rangeFilter: { ...initialRangeFilter } // глубокое копирование начального состояния
  }),
  getters: {
    getFiltersAccordion(state): FilterElement[] {
      return state.filtersAccordion;
    },
    getCheckboxFilters(state): CheckboxFilter[] {
      return state.checkboxFilters;
    },
    getRangeFilter(state): RangeFilter {
      return state.rangeFilter;
    }
  },
  actions: {
    resetFilters() {
      this.filtersAccordion = JSON.parse(JSON.stringify(initialFiltersAccordion));
      this.checkboxFilters = JSON.parse(JSON.stringify(initialCheckboxFilters));
      this.rangeFilter = { ...initialRangeFilter };
    }
  }
});
