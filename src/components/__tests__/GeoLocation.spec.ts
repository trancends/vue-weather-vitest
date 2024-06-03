import { shallowMount } from '@vue/test-utils'
import { describe, vi } from 'vitest'
import GetLocation from '../GetLocation.vue'

const mockNavigator = {
  geolocation: {
    getCurrentPosition: (successCallback: Function, errorCallback: Function) => {}
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

  it('display when geolocation resolved successfully', async (): Promise<void> => {
    const mockGeolocation = vi.fn((successCallback: Function) => {
      const position = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278
        }
      }
      successCallback(position)
    })
    mockNavigator.geolocation.getCurrentPosition = mockGeolocation
    ;(global as any).navigator = mockNavigator
    const wrapper = shallowMount(GetLocation)
    // @ts-ignore
    expect(wrapper.vm.coords).toEqual({
      latitude: 51.5074,
      longitude: -0.1278
    })
  })

  it('displays a message when user denied access', async (): Promise<void> => {
    const mockGeoLocation = vi.fn((successCallback: Function, errorCallback: Function) => {
      const error = new Error('User denied geolocation access')
      errorCallback(error)
    })

    mockNavigator.geolocation.getCurrentPosition = mockGeoLocation

    const wrapper = await shallowMount(GetLocation)
    // @ts-ignore
    expect(wrapper.vm.geolocationBlockedByUser).toEqual(true)
    expect(wrapper.html()).toContain('User denied access')
  })
})
