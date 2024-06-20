import type { Meta, StoryObj } from '@storybook/vue3';

import PaginationLayer from './PaginationLayer.vue';

const meta: Meta<typeof PaginationLayer> = {
  title: 'UI-KIT/Navigation/PaginationLayer',
  component: PaginationLayer,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 5,
    currentPage: 2
  }
};
