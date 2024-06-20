import type { Meta, StoryObj } from '@storybook/vue3';

import NotificationAlert from './NotificationAlert.vue';

const meta: Meta<typeof NotificationAlert> = {
  title: 'UI-KIT/Alert/NotificationAlert/NotificationAlert',
  component: NotificationAlert,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    notification: {
      message: 'This is a success notification',
      type: 'success',
      id: 1
    }
  }
};

export const Error: Story = {
  args: {
    notification: {
      message: 'This is a error notification',
      type: 'error',
      id: 1
    }
  }
};
