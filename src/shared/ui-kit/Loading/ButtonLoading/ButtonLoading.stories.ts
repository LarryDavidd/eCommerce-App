import type { Meta, StoryObj } from '@storybook/vue3';

import ButtonLoading from './ButtonLoading.vue';

const meta: Meta<typeof ButtonLoading> = {
  title: 'UI-KIT/Loading/ButtonLoading',
  component: ButtonLoading,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
