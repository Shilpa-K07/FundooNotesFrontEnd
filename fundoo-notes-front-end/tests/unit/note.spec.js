/*************************************************************************
* Purpose : to test note component
*
* @file : note.spec.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 01/02/2021
*
**************************************************************************/

import Note from '../../src/components/Note.vue';
import { createLocalVue, mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import Labels from '../../src/components/Labels';

describe('Note.vue', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
    wrapper = mount(Note, {
      localVue
    });
  });

  it('check if child Labels exists', () => {
    expect(wrapper.contains(Labels)).toBe(true);
  });

  it('Check emitted "removeLabelFromNote" event', () => {
    wrapper.vm.$emit('removeLabelFromNote');
    expect(wrapper.emitted().removeLabelFromNote).toBeTruthy();
  });
});
