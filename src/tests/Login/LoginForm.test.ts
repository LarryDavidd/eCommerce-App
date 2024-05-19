import AuthForm from '@pages/LoginPage/components/AuthForm/AuthForm.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import OpenedEye from '@shared/ui-kit/Icons/OpenedEye.vue';
import ClosedEye from '@shared/ui-kit/Icons/ClosedEye.vue';

describe('Login form tests', () => {
  it('should render form', () => {
    const wrapper = mount(AuthForm);
    expect(wrapper.find('h1').exists()).toBeTruthy();
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
    expect(wrapper.find('input[type="password"]').exists()).toBeTruthy();
    expect(wrapper.find('p').exists()).toBeTruthy();
    expect(wrapper.find('.link').exists()).toBeTruthy();
    expect(wrapper.find('.sign-in').exists()).toBeTruthy();
  });
});

describe('Email validation', () => {
  it('operability of the validation function', () => {
    const wrapper = mount(AuthForm);
    wrapper.vm.checkEmail('hello@world.com');
    expect(wrapper.vm.errorsEmail).toBeNull();
    wrapper.vm.checkEmail('hello@world@test.com');
    expect(wrapper.vm.errorsEmail).not.toBeNull();
    wrapper.vm.checkEmail('hello@test%#@%.c$&#om');
    expect(wrapper.vm.errorsEmail).not.toBeNull();
  });

  it('checking the processing of correct input', () => {
    const wrapper = mount(AuthForm);
    const inputElement = wrapper.find('input[type="text"]');
    inputElement.setValue('hello@world.com');
    expect(wrapper.vm.errorsEmail).toBeNull();
  });

  it('checking the processing of incorrect input', () => {
    const wrapper = mount(AuthForm);
    const inputElement = wrapper.find('input[type="text"]');
    inputElement.setValue('helloworld.com');
    expect(wrapper.vm.errorsEmail).not.toBeNull();
    inputElement.setValue('');
    expect(wrapper.vm.errorsEmail).not.toBeNull();
  });
});

describe('Password validation', () => {
  it('operability of the validation function', () => {
    const wrapper = mount(AuthForm);
    wrapper.vm.checkPassword('asdLj7d!3');
    expect(wrapper.vm.errorsPassword).toBeNull();
    wrapper.vm.checkPassword('assa78787');
    expect(wrapper.vm.errorsPassword).not.toBeNull();
    wrapper.vm.checkPassword('d5Idf78551');
    expect(wrapper.vm.errorsPassword).not.toBeNull();
  });

  it('checking the processing of correct input', () => {
    const wrapper = mount(AuthForm);
    const inputElement = wrapper.find('input[type="password"]');
    inputElement.setValue('123!Wetfhgh');
    expect(wrapper.vm.errorsPassword).toBeNull();
  });

  it('checking the processing of incorrect input', () => {
    const wrapper = mount(AuthForm);
    const inputElement = wrapper.find('input[type="password"]');
    inputElement.setValue('12345678Ty');
    expect(wrapper.vm.errorsPassword).not.toBeNull();
    inputElement.setValue('');
    expect(wrapper.vm.errorsPassword).not.toBeNull();
  });
});

describe('The operability of the submit button', () => {
  it('enables the login button when you enter your email address and password correctly and turns it off otherwise', async () => {
    const wrapper = mount(AuthForm);
    const emailInputElement = wrapper.find('input[type="text"]');
    const passwordInputElement = wrapper.find('input[type="password"]');
    const signInButtonElement = wrapper.find('.sign-in');

    await emailInputElement.setValue('hello@world.com');
    await passwordInputElement.setValue('strongPassword123!'); //correct password
    expect(signInButtonElement.attributes('disabled')).toBeFalsy();

    await emailInputElement.setValue('hello@world.com');
    await passwordInputElement.setValue('strongPassword123'); //incorrect password
    expect(signInButtonElement.element.disabled).toBeTruthy();
  });
});

describe('Password field', () => {
  it('should toggle password visibility when eye icon is clicked', async () => {
    const wrapper = mount(AuthForm);

    const passwordInput = wrapper.find('input[type="password"]');
    expect(passwordInput.exists()).toBe(true);

    const closedEyeIcon = wrapper.findComponent(ClosedEye);
    expect(closedEyeIcon.exists()).toBe(true);

    await closedEyeIcon.trigger('click');
    await wrapper.vm.$nextTick();

    const visiblePasswordInput = wrapper.find('input[type="text"]');
    expect(visiblePasswordInput.exists()).toBe(true);

    const openedEyeIcon = wrapper.findComponent(OpenedEye);
    expect(openedEyeIcon.exists()).toBe(true);

    await openedEyeIcon.trigger('click');
    await wrapper.vm.$nextTick();

    const hiddenPasswordInput = wrapper.find('input[type="password"]');
    expect(hiddenPasswordInput.exists()).toBe(true);
  });
});
