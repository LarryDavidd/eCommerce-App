import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { CheckBox } from '@shared/ui-kit/Inputs';

describe('BaseCheckbox tests', () => {
  it('should render', () => {
    const wrapper = mount(CheckBox, {
      props: {
        label: 'Option',
        modelValue: true
      }
    });
    expect(wrapper.find('div.checkbox-wrapper').exists()).toBeTruthy();
    expect(wrapper.find('input').exists()).toBeTruthy();
  });

  it('should emit update:modelValue on change', async () => {
    const wrapper = mount(CheckBox, {
      props: {
        label: 'Option',
        modelValue: true
      }
    });

    await wrapper.find('input').trigger('change');

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
  });
});
