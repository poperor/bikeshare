import { shallow } from 'enzyme'
import React from 'react'
import Availability from '../pages/availability.js'

jest.mock('axios')

describe('Rendering of availability page', () => {
  test('Render header', async () => {
    const props = await Availability.getInitialProps()
    const app = shallow(<Availability {...props} />)
    expect(app.find('h1').text()).toEqual('Tilgjengelighet for bysykler')
  })

  test('Render header row + 3 station rows', async () => {
    const props = await Availability.getInitialProps()
    const app = shallow(<Availability {...props} />)
    expect(app.find('.rTableRow').length).toBe(4)
  })

  test('Specific table cell for station name Bankplassen is rendered', async () => {
    const props = await Availability.getInitialProps()
    const app = shallow(<Availability {...props} />)
    const firstStation = app.find('.rTableRow').at(1)
    expect(firstStation.find('.rTableCell').at(0).text()).toEqual('Bankplassen')
  })

  test('Render error message when given errors in props', () => {
    const props = { error: 'Beklager, det skjedde en feil i kommunikasjonen med Oslo kommunes servere.' }
    const app = shallow(<Availability {...props} />)
    expect(app.find('div').text()).toEqual('Beklager, det skjedde en feil i kommunikasjonen med Oslo kommunes servere.')
  })
})
