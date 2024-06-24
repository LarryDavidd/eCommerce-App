import type { Meta, StoryObj } from '@storybook/vue3';

import CrossButton from './CrossButton.vue';

const meta: Meta<typeof CrossButton> = {
  title: 'UI-KIT/Buttons/CrossButton',
  component: CrossButton,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
