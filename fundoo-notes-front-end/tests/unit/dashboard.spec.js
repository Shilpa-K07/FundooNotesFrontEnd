import { shallowMount } from '@vue/test-utils'
import Dashboard from '../../src/components/Dashboard.vue'
import { createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

describe('Dashboard.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(Vuelidate)
    wrapper=shallowMount(Dashboard, {
      localVue
    })
  })

  it('title should evaluate to true when value is passed', () => {
    wrapper.vm.noteTitle = '1st note'
    expect(wrapper.vm.noteTitle).toBe('1st note')
  })

  it('title should evaluate to false when it is empty', () => {
    wrapper.vm.noteTitle = ''
    expect(wrapper.vm.noteTitle).toBe('')
  })

  it('description should evaluate to true when value is passed', () => {
    wrapper.vm.noteDescription = 'My first note'
    expect(wrapper.vm.noteDescription).toBe('My first note')
  })

  it('description should evaluate to true when value is passed', () => {
    wrapper.vm.noteDescription = ''
    expect(wrapper.vm.noteDescription).toBe('')
  })
  it('Check emitted "createNewNote" event', ()=>{
    wrapper.vm.$emit('createNewNote')
    expect(wrapper.emitted().createNewNote).toBeTruthy()
  })

  it('Check emitted "onClickLabel" event', ()=>{
    wrapper.vm.$emit('onClickLabel')
    expect(wrapper.emitted().onClickLabel).toBeTruthy()
  })
})

