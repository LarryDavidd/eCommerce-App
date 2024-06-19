import type { Meta, StoryObj } from '@storybook/vue3';

import BurgerButton from './BurgerButton.vue';

const meta: Meta<typeof BurgerButton> = {
  title: 'UI-KIT/Buttons/AddRemoveButton',
  component: BurgerButton,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false
  }
};
