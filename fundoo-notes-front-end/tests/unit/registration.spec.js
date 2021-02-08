/*************************************************************************
* Purpose : to test registration component
*
* @file : registration.spec.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 31/01/2021
*
**************************************************************************/

import Registration from '../../src/pages/Registration.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import Title from '../../src/components/Title.vue';

describe('Registration.vue', () => {
    let wrapper;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);
        localVue.use(Vuelidate);
        wrapper = shallowMount(Registration, {
            localVue
        });
    });

    it('firstName should evaluate to true when correct pattern is passed', () => {
        wrapper.vm.firstName = 'shilpa';
        expect(wrapper.vm.$v.firstName.$invalid).toBe(false);
    });

    it('firstName should evaluate to false when it is empty', () => {
        wrapper.vm.firstName = '';
        expect(wrapper.vm.$v.firstName.required).toBe(false);
    });

    it('firstName should evaluate to false when it contains les than 2 characters', () => {
        wrapper.vm.firstName = 's';
        expect(wrapper.vm.$v.firstName.$invalid).toBe(true);
    });

    it('lastName should evaluate to true when correct pattern is passed', () => {
        wrapper.vm.lastName = 'k';
        expect(wrapper.vm.$v.lastName.$invalid).toBe(false);
    });

    it('lastName should evaluate to false when it is empty', () => {
        wrapper.vm.lastName = '';
        expect(wrapper.vm.$v.lastName.required).toBe(false);
    });

    it('emailId should evaluate to true when correct pattern is passed', () => {
        wrapper.vm.emailId = 'shilpa07udupi@gmail.com';
        expect(wrapper.vm.$v.emailId.email).toBe(true);
    });

    it('emailId should evaluate to false when "@" is missed', () => {
        wrapper.vm.emailId = 'shilpa07udupigmail.com';
        expect(wrapper.vm.$v.emailId.email).toBe(false);
    });

    it('emailId should evaluate to false when it is empty', () => {
        wrapper.vm.emailId = '';
        expect(wrapper.vm.$v.emailId.required).toBe(false);
    });

    it('password should evaluate to true when correct pattern is passed', () => {
        wrapper.vm.password = 'Abcd@123';
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(true);
    });

    it('password should evaluate to false when special character is missed', () => {
        wrapper.vm.password = 'Abcd1234';
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(false);
    });

    it('password should evaluate to false when digit is missed', () => {
        wrapper.vm.password = 'Abcdse@we';
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(false);
    });

    it('password should evaluate to false when uppercase is missed', () => {
        wrapper.vm.password = 'abcd1234';
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(false);
    });

    it('password should evaluate to false when it is empty', () => {
        wrapper.vm.password = '';
        expect(wrapper.vm.$v.password.required).toBe(false);
    });

    it('check if child Title exists', () => {
        expect(wrapper.contains(Title)).toBe(true);
    });

    it('Check emitted "register" event', () => {
        wrapper.vm.$emit('register');
        expect(wrapper.emitted().register).toBeTruthy();
    });
});
