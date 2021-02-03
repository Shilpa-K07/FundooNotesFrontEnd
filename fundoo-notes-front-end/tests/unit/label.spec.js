import { shallowMount } from '@vue/test-utils'
import Labels from '../../src/components/Labels.vue'
import { createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

describe('Logout.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(Vuelidate)
    wrapper = shallowMount(Labels, {
      localVue,
    })
  })

  it('Check emitted "getNotesByLabel" event', ()=>{
    wrapper.vm.$emit('getNotesByLabel')
    expect(wrapper.emitted().getNotesByLabel).toBeTruthy()
  })
})
