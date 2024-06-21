import type { Meta, StoryObj } from '@storybook/vue3';

import PagesLoading from './PagesLoading.vue';

const meta: Meta<typeof PagesLoading> = {
  title: 'UI-KIT/Loading/PagesLoading',
  component: PagesLoading,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
