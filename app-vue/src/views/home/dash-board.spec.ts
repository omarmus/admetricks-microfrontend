/**
 * @jest-environment jsdom
 */

import { expect, test, describe } from '@jest/globals';
import { mount } from '@vue/test-utils'
import Dashboard from './dash-board.vue'

describe('Test Dashboard', () => {
  test('Dashboard', async () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.html()).toContain('Estamos para ayudarte')
    expect(wrapper.html()).toContain('Agencias')
    expect(wrapper.html()).toContain('Medios')
    expect(wrapper.html()).toContain('Marcas')
  })
})
