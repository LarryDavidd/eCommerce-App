import AuthForm from '@features/ui/Forms/AuthForm/AuthForm.vue';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
// import { setActivePinia, createPinia } from 'pinia';
// const global = {
//   components: {
//     RouterLink: RouterLinkStub
//   }
// };

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
    const inputElement = wrapper.find('input[type="text"]'); // Находим элемент input по его типу
    inputElement.setValue('hello@world.com');
    expect(wrapper.vm.errorsEmail).toBeNull();
  });

  it('checking the processing of incorrect input', () => {
    const wrapper = mount(AuthForm);
    const inputElement = wrapper.find('input[type="text"]'); // Находим элемент input по его типу
    inputElement.setValue('helloworld.com');
    expect(wrapper.vm.errorsEmail).not.toBeNull();
    inputElement.setValue('');
    expect(wrapper.vm.errorsEmail).not.toBeNull();
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

describe('Password validation', () => {
  it('validates password value correctly', () => {
    const wrapper = mount(AuthForm);
    wrapper.vm.checkPassword('asdLj7d!3');
    expect(wrapper.vm.errorsPassword).toBeNull();

    wrapper.vm.checkPassword('assa78787');
    expect(wrapper.vm.errorsPassword).not.toBeNull();

    wrapper.vm.checkPassword('d5Idf78551');
    expect(wrapper.vm.errorsPassword).not.toBeNull();
  });
});

// describe('Show password method', () => {
//   it('It should change input type by click on the eye icon', async () => {
//     const wrapper = mount(AuthForm);
//     const passInput = wrapper.findComponent({ ref:  });
//     const eyeIcon = passInput.find('.input-icon');
//     await wrapper.vm.$nextTick();
//     passInput.trigger('click');
//     await wrapper.vm.$nextTick();
//     expect(wrapper.vm.hidePass).toBe('show');
//     expect(wrapper.vm.passInputType).toBe('password');
//     await wrapper.vm.$nextTick();
//     eyeIcon.trigger('click');
//     await wrapper.vm.$nextTick();
//     expect(wrapper.vm.hidePass).toBe('hide');
//     expect(wrapper.vm.passInputType).toBe('text');
//   });
// });
// describe('Sign-in function', () => {
//   it('should perform sign-in correctly', async () => {
//     const wrapper = mount(AuthForm);
//
//     const signInMock = wrapper.mock('login', jest.fn());
//     wrapper.setProps({ email: 'hello@world.com', password: 'asdLj7d3' });
//
//     await wrapper.trigger('submit');
//
//     expect(signInMock).toHaveBeenCalled();
//   });
// });
