import type { Meta, StoryObj } from '@storybook/vue3';

import RadioButton from './RadioButton.vue';

const meta: Meta<typeof RadioButton> = {
  title: 'UI-KIT/Buttons/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithValue: Story = {
  args: {
    value: 'radio button'
  }
};
