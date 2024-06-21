import type { Meta, StoryFn } from '@storybook/vue3';
import SliderComponent from './RangeSlider.vue'; // Путь к вашему компоненту

export default {
  title: 'UI-KIT/Inputs/Slider',
  component: SliderComponent,
  argTypes: {
    modelValue: {
      control: 'object',
      defaultValue: { min: 0, max: 500, title: '' }
    }
  }
} as Meta;

const Template: StoryFn = (args) => ({
  components: { SliderComponent },
  setup() {
    return { args };
  },
  template: `<div style="width: 200px;">
  <SliderComponent v-bind="args" />
    </div>`
});

export const Default = Template.bind({});
Default.args = {
  modelValue: { min: 0, max: 500, title: '' }
};

export const CustomRange = Template.bind({});
CustomRange.args = {
  modelValue: { min: 100, max: 400, title: 'Price Range' }
};
