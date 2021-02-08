/*************************************************************************
* Purpose : to test label component
*
* @file : label.spec.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since :01/02/2021
*
**************************************************************************/

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Labels from '../../src/components/Labels.vue';

import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';

describe('Logout.vue', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    localVue.use(Vuelidate);
    wrapper = shallowMount(Labels, {
      localVue
    });
  });

  it('Check emitted "getNotesByLabel" event', () => {
    wrapper.vm.$emit('getNotesByLabel');
    expect(wrapper.emitted().getNotesByLabel).toBeTruthy();
  });
});
