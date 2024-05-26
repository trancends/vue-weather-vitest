import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GetLocation from '@/components/GetLocation.vue'
import App from '@/App.vue'

describe('App', () => {
  it('renders the GetLocation component', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.findComponent(GetLocation).exists()).toBe(true)
  })
})
