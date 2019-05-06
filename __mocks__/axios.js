import config from '../config'
import gbfs from '../__fixtures__/gbfs'
import stationInformation from '../__fixtures__/station_information'
import stationStatus from '../__fixtures__/station_status'
const feeds = gbfs.data.nb.feeds
const stationInformationEndpoint = feeds.find(feed => feed.name === 'station_information').url
const stationStatusEndpoint = feeds.find(feed => feed.name === 'station_status').url
const urlToResponseMap = new Map(
  [
    [config.apiAutoDiscoveryUrl, gbfs],
    [stationInformationEndpoint, stationInformation],
    [stationStatusEndpoint, stationStatus]
  ]
)
const axios = jest.genMockFromModule('axios')

const get = async (url) => {
  return { data: urlToResponseMap.get(url) }
}

axios.get = get

export default axios
