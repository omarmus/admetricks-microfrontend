/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import { mount } from '@vue/test-utils'
import Chart from './Chart.vue'

test('Chart', async () => {
  const wrapper = mount(Chart)
  expect(wrapper.html()).toContain('Alcance y frecuencia por top Marcas')
})
