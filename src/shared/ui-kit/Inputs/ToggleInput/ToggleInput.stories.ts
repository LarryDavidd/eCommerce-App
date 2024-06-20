import type { Meta, StoryObj } from '@storybook/vue3';
import ToggleSwitch from './ToggleInput.vue';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'UI-KIT/Inputs/ToggleInput',
  component: ToggleSwitch,
  argTypes: {
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    text: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    disabled: false,
    text: 'Disabled'
  }
};

export const Enabled: Story = {
  args: {
    ...Default.args,
    modelValue: true,
    text: 'Enabled'
  }
};
