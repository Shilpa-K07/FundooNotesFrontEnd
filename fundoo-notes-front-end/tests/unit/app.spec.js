/*************************************************************************
* Purpose : to test app component
*
* @file : app.spec.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 01/02/2021
*
**************************************************************************/

import Note from '../../src/components/Note.vue'
import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(Vuelidate)
    wrapper = mount(Note, {
      localVue
    })
  })

  it('mounts and renders', () => {
    expect(wrapper.html()).toBeTruthy()
  })
})
