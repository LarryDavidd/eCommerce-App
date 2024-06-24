import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ForthStep from '@pages/RegistrationPage/components/ForthStep/ForthStep.vue';
import CheckBox from '@shared/ui-kit/Inputs/CheckBox/CheckBox.vue';
import { createPinia, setActivePinia } from 'pinia';

const testData = {
  countryBilling: 'Russia',
  cityBilling: 'SPB',
  streetBilling: 'BBB',
  postalCodeBilling: '123456',
  isDefaultBilling: true,
  isSameAddresses: true
};

describe('Fourth Step', () => {
  it('correctly render component', () => {
    // Initialize Pinia
    const pinia = createPinia();
    setActivePinia(pinia);

    const wrapper = mount(ForthStep, {
      props: {
        data: testData,
        cb: () => console.log('next')
      }
    });
    const postalCode = wrapper.find('input[type="text"]').element as HTMLInputElement;
    const street = wrapper.find('input[type="text"]#Street').element as HTMLInputElement;
    const city = wrapper.find('input[type="text"]#City').element as HTMLInputElement;

    expect(wrapper.props('data')).toEqual(testData);
    expect(wrapper.find('span.title').exists()).toBeTruthy();
    expect(wrapper.find('button.prev-step').exists()).toBeTruthy();
    expect(wrapper.find('button.submit').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]#Street').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]#City').exists()).toBeTruthy();

    expect(street.value).toBe(testData.streetBilling);
    expect(city.value).toBe(testData.cityBilling);
    expect(postalCode.value).toBe(testData.postalCodeBilling);
  });

  it('correctly switching disabled at the submit button', async () => {
    // Initialize Pinia
    const pinia = createPinia();
    setActivePinia(pinia);

    const wrapper = mount(ForthStep, {
      props: {
        data: testData,
        cb: () => console.log('next')
      }
    });

    const prevBut = wrapper.find('button.prev-step');
    const submitBut = wrapper.find('button.submit');
    expect(prevBut.attributes('disabled')).toBeUndefined();
    expect(submitBut.attributes('disabled')).toBeUndefined();

    await wrapper.setProps({ data: { ...testData, cityBilling: '153' } });

    expect(submitBut.attributes('disabled')).not.toBeUndefined();
  });

  it('checkbox isSameAddresses', async () => {
    // Initialize Pinia
    const pinia = createPinia();
    setActivePinia(pinia);

    const wrapper = mount(ForthStep, {
      props: {
        data: testData,
        cb: () => console.log('next')
      }
    });

    expect(wrapper.props('data').isSameAddresses).toBeTruthy();
    const checkbox = wrapper.findComponent(CheckBox);
    const inputCheckBox = checkbox.find('input[type="checkbox"]');
    expect(inputCheckBox.exists()).toBeTruthy();
    expect(inputCheckBox.element.disabled).toBeFalsy();
  });
});
