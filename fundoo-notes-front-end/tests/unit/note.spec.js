import { shallowMount } from '@vue/test-utils'
import Note from '../../src/components/Note.vue'
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import Dialogue from '../../src/components/Dialogue';
import Icons from '../../src/components/Icons';
import Labels from '../../src/components/Labels';

describe('Note.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(Vuelidate)
    wrapper = mount(Note, {
      localVue,
    })
  })

  it('check if child Labels exists', () => {
    expect(wrapper.contains(Labels)).toBe(true)
  })

  it('Check emitted "removeLabelFromNote" event', ()=>{
    wrapper.vm.$emit('removeLabelFromNote')
    expect(wrapper.emitted().removeLabelFromNote).toBeTruthy()
  })
})
