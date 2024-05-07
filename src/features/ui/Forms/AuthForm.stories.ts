import AuthForm from './AuthForm.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof AuthForm> = {
  title: 'Features/Forms/AuthForm',
  component: AuthForm,
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
