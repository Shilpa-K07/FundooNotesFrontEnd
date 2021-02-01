import ForgotPassword from '../../src/pages/ForgotPassword.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import Title from '../../src/components/Title.vue';

describe('Login.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(Vuelidate)
    wrapper = shallowMount(ForgotPassword, {
      localVue,
    })
  })

  it('emailId should evaluate to true when correct pattern is passed', () => {
    wrapper.vm.emailId = 'shilpa07udupi@gmail.com'
    expect(wrapper.vm.$v.emailId.email).toBe(true)
  })

  it('emailId should evaluate to false when "@" is missed', () => {
    wrapper.vm.emailId = 'shilpa07udupigmail.com'
    expect(wrapper.vm.$v.emailId.email).toBe(false)
  })

  it('emailId should evaluate to false when it is empty', () => {
    wrapper.vm.emailId = ''
    expect(wrapper.vm.$v.emailId.required).toBe(false)
  })

  it('check if child Title exists', () => {
    expect(wrapper.contains(Title)).toBe(true)
  })

  it('Check emitted "sendResetPasswordLink" event', ()=>{
    wrapper.vm.$emit('sendResetPasswordLink')
    expect(wrapper.emitted().sendResetPasswordLink).toBeTruthy()
  })

})
