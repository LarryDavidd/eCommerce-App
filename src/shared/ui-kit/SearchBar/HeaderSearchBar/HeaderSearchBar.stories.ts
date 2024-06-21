import type { Meta, StoryObj } from '@storybook/vue3';

import HeaderSearchBar from './HeaderSearchBar.vue';

const meta: Meta<typeof HeaderSearchBar> = {
  title: 'UI-KIT/SearchBar/HeaderSearchBar/HeaderSearchBar',
  component: HeaderSearchBar,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
