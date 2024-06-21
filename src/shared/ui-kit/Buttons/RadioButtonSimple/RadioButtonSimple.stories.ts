import type { Meta, StoryObj } from '@storybook/vue3';

import RadioButtonSimple from './RadioButtonSimple.vue';

const meta: Meta<typeof RadioButtonSimple> = {
  title: 'UI-KIT/Buttons/RadioButtonSimple',
  component: RadioButtonSimple,
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
    value: true
  }
};

export const WithName: Story = {
  args: {
    name: 'name'
  }
};
