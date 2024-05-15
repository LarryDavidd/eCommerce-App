import type { Meta, StoryObj } from '@storybook/vue3';
import Checkbox from './CheckBox.vue';

const meta: Meta<typeof Checkbox> = {
  title: 'UI-KIT/Inputs/Checkbox',
  component: Checkbox,
  argTypes: {
    modelValue: { control: 'boolean' },
    label: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
    modelValue: false
  }
};
