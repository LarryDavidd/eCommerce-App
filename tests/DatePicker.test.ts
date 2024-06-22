import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DatePicker from '@shared/ui-kit/Inputs/DatePicker/DatePicker.vue';
import VueDatePicker from '@vuepic/vue-datepicker';

describe('DatePicker tests', () => {
  it('should render', () => {
    const wrapper = mount(DatePicker, {
      props: {
        placeholder: 'Select a date',
        modelValue: new Date('2023-01-01'),
        error: null
      }
    });
    expect(wrapper.findComponent(VueDatePicker).exists()).toBeTruthy();
    expect(wrapper.find('.date-picker').exists()).toBeTruthy();
  });

  it('should emit update:modelValue on date select', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        placeholder: 'Select a date',
        modelValue: new Date('2023-01-01'),
        error: null
      }
    });

    const vueDatePicker = wrapper.findComponent(VueDatePicker);

    const newDate = new Date('2024-05-17');

    await vueDatePicker.vm.$emit('update:model-value', newDate);
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([newDate]);
  });

  it('should show error message when error prop is set', () => {
    const errorMessage = 'This field is required';
    const wrapper = mount(DatePicker, {
      props: {
        placeholder: 'Select a date',
        modelValue: new Date('2023-01-01'),
        error: errorMessage
      }
    });

    expect(wrapper.find('.error-message').exists()).toBeTruthy();
    expect(wrapper.find('.error-message .error').text()).toBe(errorMessage);
  });
});
