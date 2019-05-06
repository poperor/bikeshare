import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getStations } from '../lib/bikesharelib'
import config from '../config'

export default class Availability extends Component {
  static async getInitialProps () {
    try {
      const stations = await getStations(config.apiAutoDiscoveryUrl)
      return { stations }
    } catch (e) {
      console.log(e)
      return { error: 'Beklager, det skjedde en feil i kommunikasjonen med Oslo kommunes servere.' }
    }
  }
  render () {
    const { error } = this.props
    if (!error) {
      return <div className='main'>
        <h1>Tilgjengelighet for bysykler</h1>
        {this.renderStations()}
        <style jsx>{`
        .main {
          width: 80%;
          margin: 0 auto;
        }
        `}</style>
      </div>
    } else {
      return <div>{error}</div>
    }
  }

  renderStations () {
    const { stations } = this.props
    return <div className='rTable'>
      <div className='rTableRow rTableHeader' key={'headrow'}>
        <div className='rTableHead' key={'head1'}>Stasjon</div>
        <div className='rTableHead' key={'head2'}>Antall sykler</div>
        <div className='rTableHead' key={'head3'}>Antall låser</div>
      </div>
      { stations.map(station => <div className='rTableRow' key={station.id}>
        <div className='rTableCell' key={`${station.id}_name`}>{station.name}</div>
        <div className='rTableCell' key={`${station.id}_numBikes`}>{station.numBikes}</div>
        <div className='rTableCell' key={`${station.id}_numDocks`}>{station.numDocks}</div>
      </div>) }
      <style jsx>{`
      .rTable { 
        display: table;
      }
      .rTableRow { 
        display: table-row; 
        padding: 10em;}
      .rTableCell, .rTableHead  { 
        display: table-cell; 
        padding: 0.5em;
        border: 1px solid #999999;
      }
      .rTableHead {
        font-weight: bold
      }
      .rTableHeader {
        background-color: #ddd;
      }
      `}</style>
    </div>
  }
}

Availability.propTypes = {
  stations: PropTypes.array,
  error: PropTypes.string
}
