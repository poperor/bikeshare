import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getStations } from '../lib/bikesharelib'

export default class Stationinfo extends Component {
  static async getInitialProps ({ context, store, isServer, res, asPath }) {
    try {
      const stations = await getStations()
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
    return <div className='rTable' id={'table'}>
      <div className='rTableRow rTableHeader' id={'headrow'}>
        <div className='rTableHead' id={'head1'}>Stasjon</div>
        <div className='rTableHead' id={'head2'}>Antall sykler</div>
        <div className='rTableHead' id={'head3'}>Antall låser</div>
      </div>
      { stations.map(station => <div className='rTableRow' id={station.id}>
        <div className='rTableCell' id={`${station.id}_name`}>{station.name}</div>
        <div className='rTableCell' id={`${station.id}_numBikes`}>{station.numBikes}</div>
        <div className='rTableCell' id={`${station.id}_numDocks`}>{station.numDocks}</div>
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

Stationinfo.propTypes = {
  stations: PropTypes.array,
  error: PropTypes.string
}
