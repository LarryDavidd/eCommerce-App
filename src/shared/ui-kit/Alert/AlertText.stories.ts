import type { Meta, StoryObj } from '@storybook/vue3';

import AlertText from './AlertText.vue';

const meta: Meta<typeof AlertText> = {
  title: 'UI-KIT/Data-Display/AlertText',
  component: AlertText,

  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['success', 'warning', 'error', 'info'] }
  }
};

export default meta;

export const Alert: StoryObj<typeof meta> = {
  // render: (args) => <AlertText {...args} />,
  args: { status: 'warning', message: 'Olololo Kek Bolde Info!' },
  parameters: {
    /* ... */
  }
};
