import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  // stories: ['../src/shared/stories/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', 'storybook-addon-vue-slots', 'storybook-addon-data-theme-switcher'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  core: {
    builder: '@storybook/builder-vite'
  }
} satisfies StorybookConfig;
export default config;
