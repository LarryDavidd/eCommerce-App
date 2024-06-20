import type { Meta, StoryObj } from '@storybook/vue3';

import BurgerButton from './BurgerButton.vue';

const meta: Meta<typeof BurgerButton> = {
  title: 'UI-KIT/Buttons/BurgerButton',
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

export const Opened: Story = {
  args: {
    modelValue: true
  }
};
