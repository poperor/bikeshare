import { getStations } from '../lib/bikesharelib'
import config from '../config'

jest.mock('axios')

describe('Fetching of data from api', () => {
  test('correct data returned', async () => {
    const stations = await getStations(config.apiAutoDiscoveryUrl)
    const expectedResult = [
      { id: '611', name: 'Bankplassen', numBikes: 12, numDocks: 27 },
      { id: '579', name: 'Bogstadveien', numBikes: 0, numDocks: 17 },
      { id: '404', name: 'Oslo Handelsgymnasium', numBikes: 8, numDocks: 19 }
    ]
    expect(stations).toEqual(expectedResult)
  })

  test('exception is thrown when url is wrong', async () => {
    await expect(getStations('https://lkjskljfflsdkj.com')).rejects.toThrow()
  })
})
