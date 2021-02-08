/*************************************************************************
* Purpose : to test resetPassword component
*
* @file : resetPassword.spec.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 01/02/2021
*
**************************************************************************/

import ResetPassword from '../../src/pages/ResetPassword.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import Title from '../../src/components/Title.vue'

describe('ResetPassword.vue', () => {
    let wrapper

    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(Vuetify)
        localVue.use(Vuelidate)
        wrapper = shallowMount(ResetPassword, {
            localVue
        })
    })

    it('password should evaluate to true when correct pattern is passed', () => {
        wrapper.vm.password = 'Abcd@123'
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(true)
    })

    it('password should evaluate to false when special character is missed', () => {
        wrapper.vm.password = 'Abcd1234'
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(false)
    })

    it('password should evaluate to false when digit is missed', () => {
        wrapper.vm.password = 'Abcdse@we'
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(false)
    })

    it('password should evaluate to false when uppercase is missed', () => {
        wrapper.vm.password = 'abcd1234'
        expect(wrapper.vm.$v.password.isPasswordStrong).toBe(false)
    })

    it('password should evaluate to false when it is empty', () => {
        wrapper.vm.password = ''
        expect(wrapper.vm.$v.password.required).toBe(false)
    })

    it('confirm-password should evaluate to true when it is matching with password', () => {
        wrapper.vm.password = 'Abcd@123A'
        wrapper.vm.confirmPassword = 'Abcd@123A'
        expect(wrapper.vm.$v.confirmPassword.sameAsPassword).toBe(true)
    })

    it('confirm-password should evaluate to false when it is not matching with password', () => {
        wrapper.vm.password = 'Abcd@123A'
        wrapper.vm.confirmPassword = 'Abcd@123B'
        expect(wrapper.vm.$v.confirmPassword.sameAsPassword).toBe(false)
    })

    it('confirm-password should evaluate to false when it is empty', () => {
        wrapper.vm.confirmPassword = ''
        expect(wrapper.vm.$v.confirmPassword.required).toBe(false)
    })

    it('check if child Title exists', () => {
        expect(wrapper.contains(Title)).toBe(true)
    })

    it('Check emitted "resetPassword" event', () => {
        wrapper.vm.$emit('resetPassword')
        expect(wrapper.emitted().resetPassword).toBeTruthy()
    })
})
