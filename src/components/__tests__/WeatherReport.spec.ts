import { shallowMount } from '@vue/test-utils'
import { describe, vi } from 'vitest'
import WeatherReport from '../WeatherReport.vue'

describe('WeatherReport', () => {
  it('should render the component without crashing', () => {
    global.fetch = vi.fn() as any
    const wrapper = shallowMount(WeatherReport, {
      props: {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278
        }
      }
    })
    expect(wrapper).toBeTruthy()
  })

  it('displays loading message when data is undefined', (): void => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve()
      })
    ) as any

    const wrapper = shallowMount(WeatherReport, {
      props: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      }
    })

    expect(wrapper.text()).toContain('Loading...')
  })
})
