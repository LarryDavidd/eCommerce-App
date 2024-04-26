import type { Preview } from '@storybook/vue3';

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import '../src/app/styles/tailwind.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;

export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: 'Light', dataTheme: 'light', color: '#f2f4f7' },
        { name: 'Dark', dataTheme: 'dark', color: '#353536' }
      ]
    }
  }
};
