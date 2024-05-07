import type { Meta, StoryObj } from '@storybook/vue3';
import SimpleInput from './SimpleInput.vue';

const meta: Meta<typeof SimpleInput> = {
  title: 'UI-KIT/Inputs/SimpleInput',
  component: SimpleInput,
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select', options: ['text', 'password', 'phone', 'email', 'number'] }
    },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    maxWidth: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Simple input',
    modelValue: '',
    placeholder: 'Enter text',
    type: 'text',
    error: null,
    required: true,
    disabled: false,
    maxWidth: '300px'
  }
};

export const WithError: Story = {
  args: {
    ...Default.args,
    modelValue: '',
    error: ['Something went wrong']
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    placeholder: 'Disabled'
  }
};

export const AsEmail: Story = {
  args: {
    ...Default.args,
    type: 'email',
    placeholder: 'Enter your email'
  }
};

export const AsNumber: Story = {
  args: {
    ...Default.args,
    type: 'number',
    placeholder: 'Enter a number'
  }
};
export const AsPassword: Story = {
  args: {
    ...Default.args,
    type: 'password',
    placeholder: 'Password'
  }
};
export const CustomWidth: Story = {
  args: {
    ...Default.args,
    maxWidth: '500px'
  }
};
