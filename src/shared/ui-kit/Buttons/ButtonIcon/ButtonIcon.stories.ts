import type { Meta, StoryObj } from '@storybook/vue3';

import ButtonIcon from './ButtonIcon.vue';
import CartIcon from '@shared/ui-kit/Icons/CartIcon.vue';

const meta: Meta<typeof ButtonIcon> = {
  title: 'UI-KIT/Buttons/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  render: (args) => ({
    components: { ButtonIcon, CartIcon },
    setup() {
      return { args };
    },
    template: '<ButtonIcon v-bind="args"><template #icon><CartIcon /></template></ButtonIcon>'
  })
};
