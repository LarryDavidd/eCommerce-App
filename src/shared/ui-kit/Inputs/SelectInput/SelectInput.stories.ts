import type { Meta, StoryObj } from '@storybook/vue3';
import SelectInput from './SelectInput.vue';

const meta: Meta<typeof SelectInput> = {
  title: 'UI-KIT/Inputs/SelectInput',
  component: SelectInput,
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: '',
    options: ['USA', 'Canada', 'UK', 'Australia']
  }
};
