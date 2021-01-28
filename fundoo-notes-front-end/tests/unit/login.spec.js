import { shallowMount } from '@vue/test-utils'
import Login from '../../src/pages/Login.vue'
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';

Vue.use(Vuetify);
const localVue = createLocalVue();

const factory = (vuetify) => mount(Login, {
  localVue,
  vuetify,
});
//import sinon from 'sinon'

describe('Login.vue', () => {

  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('check for error when emailId is passed', async () => {

    const wrapper = factory(vuetify);
    const emailId = '';
    wrapper.setData({ emailId: 'shilpa07udupi@gmail.com' })
    await Vue.nextTick();
    expect(wrapper.vm.emailId).toBe(emailId);
  // const emailId = 'shilpa07udupi@gmail.com'
/*     const wrapper = shallowMount(Login)
    wrapper.setData({ emailId: 'shilpa07udupi@gmail.com' })
    expect(wrapper.find('.error').exists()).toBeFalsy()
 */
    //expect(wrapper.text()).toMatch(emailId)
  })

  /* it('Click on login button calls our method "login"', async () => {
    const spy = sinon.spy()
    const wrapper = shallowMount(Login, {
      propsData: {
        callMe: spy
      }
    })
    await wrapper.find('button.yes').trigger('click')
  
    spy.should.have.been.calledWith('yes')
  }) */
})
