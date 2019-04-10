import axios from 'axios'
import config from '../config'

const getBikeshareData = async (endpoint) => {
  const headers = { headers: { 'client-name': config.clientName } }
  const response = await axios.get(endpoint, headers)
  return response.data.data
}

const getEndpoints = async () => {
  const autodiscoveryFile = await getBikeshareData(config.apiAutoDiscoveryUrl)
  const feeds = autodiscoveryFile.nb.feeds
  const stationInformationEndpoint = feeds.find(feed => feed.name === 'station_information').url
  const stationStatusEndpoint = feeds.find(feed => feed.name === 'station_status').url
  return {
    stationInformationEndpoint,
    stationStatusEndpoint
  }
}

const getStations = async () => {
  const { stationInformationEndpoint, stationStatusEndpoint } = await getEndpoints()
  const stationInformation = await getBikeshareData(stationInformationEndpoint)
  const stationNameMap = new Map(stationInformation.stations.map(station => [station.station_id, station.name]))
  const stationStatus = await getBikeshareData(stationStatusEndpoint)
  const stations = stationStatus.stations.map(station => {
    const stationName = stationNameMap.get(station.station_id)
    return {
      name: stationName,
      numBikes: station.num_bikes_available,
      numDocks: station.num_docks_available
    }
  })
  const sortedStations = stations.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (b.name < a.name) {
      return 1
    } else {
      return 0
    }
  })
  return sortedStations
}

export { getStations }
