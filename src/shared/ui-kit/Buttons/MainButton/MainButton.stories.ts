import type { Meta, StoryObj } from '@storybook/vue3';

import { MainButton } from './MainButton.vue';

const meta: Meta<typeof MainButton> = {
  title: 'UI-KIT/Buttons/MainButton',
  component: MainButton,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LightGreyFontLight: Story = {
  args: {
    name: 'Сбросить',
    options: { buttonStyle: 'light-grey--font-light' }
  }
};

export const DarkGrey: Story = {
  args: {
    name: 'Подписаться',
    options: { buttonStyle: 'dark-grey' }
  }
};

export const LightGreyFontBold: Story = {
  args: {
    name: 'Выбрать размер',
    options: { buttonStyle: 'light-grey--font-bold' }
  }
};

export const LightGreyBorderBold: Story = {
  args: {
    name: 'Продолжить покупки',
    options: { buttonStyle: 'light-grey--border-bold' }
  }
};

export const Small: Story = {
  args: {
    name: 'X',
    options: { buttonStyle: 'small' }
  }
};
