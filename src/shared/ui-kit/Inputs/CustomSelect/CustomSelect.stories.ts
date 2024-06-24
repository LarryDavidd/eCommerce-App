import type { Meta, StoryObj } from '@storybook/vue3';
import CustomSelect from './CustomSelect.vue';

const meta: Meta<typeof CustomSelect> = {
  title: 'UI-KIT/Inputs/CustomSelect',
  component: CustomSelect,
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object' },
    icon: { control: 'object' },
    title: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: '',
    options: ['Option 1', 'Option 2', 'Option 3'],
    title: 'Select',
    iconColor: '#4e4d4d'
  }
};
