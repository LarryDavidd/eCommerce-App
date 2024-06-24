import type { Meta, StoryObj } from '@storybook/vue3';
import Counter from './ProductCounter.vue';

const meta: Meta<typeof Counter> = {
  title: 'UI-KIT/Counter',
  component: Counter,
  argTypes: {
    count: { control: 'number' },
    isInProcess: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 0,
    isInProcess: false
  }
};
