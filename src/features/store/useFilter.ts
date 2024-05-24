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

type CheckboxFilter = {
  label: string;
  value: boolean;
};

type RangeFilter = {
  min: number;
  max: number;
};

type FilterElement = CheckboxElement | RadioElement;

interface FilterState {
  filtersAccordion: FilterElement[];
  checkboxFilters: CheckboxFilter[];
  rangeFilter: RangeFilter;
}

const initialFiltersAccordion: FilterElement[] = [
  {
    type: 'checkbox',
    title: 'categories',
    elements: [
      {
        valueCheckbox: false,
        label: 'dresses'
        // subcategories: {
        //   type: 'checkbox',
        //   title: 'categories',
        //   elements: [
        //     { valueCheckbox: false, label: 'short' },
        //     { valueCheckbox: false, label: 'long' }
        //   ]
        // }
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
  }
];

const initialCheckboxFilters: CheckboxFilter[] = [
  {
    value: false,
    label: 'With a discount'
  }
];

const initialRangeFilter: RangeFilter = {
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
    },
    updateFilterData(title: string, elementData: { valueCheckbox: boolean; label: string }) {
      const filterIdx = this.filtersAccordion.findIndex((f) => f.title === title);
      if (filterIdx !== -1) {
        const idxElem = this.filtersAccordion[filterIdx].elements.findIndex((f) => f.label === elementData.label);
        if (idxElem !== -1) {
          this.filtersAccordion[filterIdx].elements[idxElem] = elementData;
        }
      }
    }
  }
});
