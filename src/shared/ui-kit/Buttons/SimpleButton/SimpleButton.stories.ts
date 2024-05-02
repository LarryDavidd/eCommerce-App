import type { Meta, StoryObj } from '@storybook/vue3';

import SimpleButton from './SimpleButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof SimpleButton> = {
  title: 'UI-KIT/Buttons/SimpleButton',
  component: SimpleButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

export const Default: Story = {
  args: {
    name: 'Simple Button'
  }
};

export const Accent: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-accent' }
  }
};

export const Ghost: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-ghost' }
  }
};

export const Neutral: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-neutral' }
  }
};

export const Primary: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-primary' }
  }
};

export const Secondary: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-secondary' }
  }
};

export const Info: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-info' }
  }
};

export const Link: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-link' }
  }
};

export const Warning: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-warning' }
  }
};

export const Success: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-success' }
  }
};

export const Error: Story = {
  args: {
    name: 'Simple Button',
    options: { colorStyle: 'btn-error' }
  }
};
