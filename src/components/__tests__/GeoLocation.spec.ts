import { shallowMount } from '@vue/test-utils'
import { describe } from 'vitest'
import GetLocation from '../GetLocation.vue'

const mockNavigator = {
  geolocation: {
    getCurrentPosition: () => {}
  }
}

describe('GetLocation', () => {
  it('should render the component without crashing', async (): Promise<void> => {
    ;(global as any).navigator = mockNavigator
    // global.navigator.geolocation = {
    //   getCurrentPosition: () => {},
    // }
    const wrapper = shallowMount(GetLocation)
    expect(wrapper).toBeTruthy()
  })
})
