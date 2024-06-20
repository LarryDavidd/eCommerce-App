import type { Meta, StoryFn } from '@storybook/vue3';
import DatePickerComponent from './DatePicker.vue';

export default {
  title: 'UI-KIT/Inputs/DatePicker',
  component: DatePickerComponent,
  argTypes: {
    name: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    modelValue: { control: 'date' }
  }
} as Meta;

const Template: StoryFn = (args) => ({
  components: { DatePickerComponent },
  setup() {
    return { args };
  },
  template: `
    <div style="width: 200px;">
      <DatePickerComponent v-bind="args" />
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  name: 'Date Picker',
  placeholder: 'Select a date',
  error: null,
  disabled: false,
  modelValue: null
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'Date Picker',
  placeholder: 'Select a date',
  error: 'This field is required',
  disabled: false,
  modelValue: null
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'Date Picker',
  placeholder: 'Select a date',
  error: null,
  disabled: true,
  modelValue: null
};
