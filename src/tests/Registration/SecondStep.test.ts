import SecondStep from '@pages/RegistrationPage/components/SecondStep/SecondStep.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ClosedEye from '@shared/ui-kit/Icons/ClosedEye.vue';
import OpenedEye from '@shared/ui-kit/Icons/OpenedEye.vue';

const testData = {
  email: 'test@example.com',
  password: 'passwordQ!1'
};

const wrapper = mount(SecondStep, {
  props: {
    data: testData,
    cb: () => console.log('next')
  }
});

describe('Login form tests', () => {
  it('should render form', () => {
    expect(wrapper.find('span.title').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
    expect(wrapper.find('input[type="password"]').exists()).toBeTruthy();
    expect(wrapper.find('button.prev-step').exists()).toBeTruthy();
    expect(wrapper.find('button.next-step').exists()).toBeTruthy();
    const inputEmail = wrapper.find('input[type="text"]').element as HTMLInputElement;
    expect(inputEmail.value).toBe(testData.email);
    const inputPassword = wrapper.find('input[type="password"]').element as HTMLInputElement;
    expect(inputPassword.value).toBe(testData.password);
  });
});

describe('Email and password validation and button functionality', () => {
  it('validation email', async () => {
    const nextBut = wrapper.find('button.next-step');
    expect(nextBut.attributes('disabled')).toBeUndefined();
    expect(wrapper.vm.errorsEmail).toBeNull();

    await wrapper.setProps({ data: { ...testData, email: 'InvalidEmail' } });
    expect(nextBut.attributes('disabled')).not.toBeUndefined();
    expect(wrapper.vm.errorsEmail).not.toBeNull();

    await wrapper.setProps({ data: { ...testData, email: 'SS@d.r' } });
    expect(wrapper.vm.errorsEmail).toBeNull();
  });

  it('validation password', async () => {
    expect(wrapper.vm.errorsPassword).toBeNull();

    await wrapper.setProps({ data: { ...testData, password: 'InvalidPassword' } });
    expect(wrapper.vm.errorsPassword).not.toBeNull();

    await wrapper.setProps({ data: { ...testData, password: 'Ssas2qwq1!' } });
    expect(wrapper.vm.errorsPassword).toBeNull();
  });
});

describe('Switching visibility', () => {
  it('should toggle password visibility when eye icon is clicked', async () => {
    const password = wrapper.find('input[type="password"]');
    expect(password.exists()).toBe(true);

    const closedIcon = wrapper.findComponent(ClosedEye);
    expect(closedIcon.exists()).toBe(true);

    await closedIcon.trigger('click');
    await wrapper.vm.$nextTick();

    const visiblePassword = wrapper.find('input[type="text"]');
    expect(visiblePassword.exists()).toBe(true);

    const openedEye = wrapper.findComponent(OpenedEye);
    expect(openedEye.exists()).toBe(true);

    await openedEye.trigger('click');
    await wrapper.vm.$nextTick();

    const hiddenPassword = wrapper.find('input[type="password"]');
    expect(hiddenPassword.exists()).toBe(true);
  });
});
