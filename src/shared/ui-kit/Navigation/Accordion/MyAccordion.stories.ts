import type { Meta, StoryObj } from '@storybook/vue3';
import MyAccordion from './MyAccordion.vue';
import { RadioButtonSimple } from '@/shared/ui-kit/Buttons';
import { ref } from 'vue';

const meta: Meta<typeof MyAccordion> = {
  title: 'UI-KIT/Accordion',
  component: MyAccordion,
  argTypes: {
    title: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'By Price'
  },
  render(args) {
    return {
      components: { MyAccordion, RadioButtonSimple },
      setup() {
        const priceCondition = ref('none');

        const changeSortByPrice = (condition: string) => {
          priceCondition.value = condition;
        };

        return {
          args,
          priceCondition,
          changeSortByPrice
        };
      },
      template: `
        <div style="max-width: 200px">
          <MyAccordion :title="args.title">
            <RadioButtonSimple
              group="sort-by-price"
              name="asc"
              :value="priceCondition === 'asc'"
              @update:model-value="changeSortByPrice('asc')"
            />
            <RadioButtonSimple
              group="sort-by-price"
              name="desc"
              :value="priceCondition === 'desc'"
              @update:model-value="changeSortByPrice('desc')"
            />
            <RadioButtonSimple
              group="sort-by-price"
              name="none"
              :value="priceCondition === 'none'"
              @update:model-value="changeSortByPrice('none')"
            />
          </MyAccordion>
        </div>
      `
    };
  }
};
