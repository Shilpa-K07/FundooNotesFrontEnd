/*************************************************************************
* Purpose : to test icons component
*
* @file : icons.spec.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 08/02/2021
*
**************************************************************************/

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Icons from '../../src/components/Icons.vue';

import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

describe('Icons.vue', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
    wrapper = shallowMount(Icons, {
      localVue
    });
  });

  it('Check emitted "onDelete" event', () => {
    wrapper.vm.$emit('onDelete');
    expect(wrapper.emitted().onDelete).toBeTruthy();
  });

  it('Check emitted "restoreNote" event', () => {
    wrapper.vm.$emit('restoreNote');
    expect(wrapper.emitted().restoreNote).toBeTruthy();
  });
});
