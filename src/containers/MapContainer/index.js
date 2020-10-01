import React, { Component } from 'react'
import {
  Map,
  GoogleApiWrapper,
  Polygon,
} from 'google-maps-react'
import { constants } from '../../constants'
import { fetchResponse, getMax, getMin } from '../../helpers'

export class MapContainer extends Component
{
  state = {
    polygonCoords: [],
    zoom: 6,
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
    const { polygonCoords } = this.state

    if (
      prevState.polygonCoords
      && prevState.polygonCoords.length === 3
      && polygonCoords.length === 4
    ) {
      this.getApiInfo()
    }
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    const { polygonCoords } = this.state

    if (polygonCoords.length >= 4) {
      return
    }
    console.log({ mapProps, map, clickEvent })

    this.setState(prevState => ({
      polygonCoords: [
        ...prevState.polygonCoords,
        {
          lat: clickEvent.latLng.lat(),
          lng: clickEvent.latLng.lng(),
        },
      ],
    }))
  }

  getApiRequestCoordinates = () => {
    const { polygonCoords } = this.state

    const lonLeft = getMin(polygonCoords, 'lng')
    const lonRight = getMax(polygonCoords, 'lng')
    const latBottom = getMin(polygonCoords, 'lat')
    const latTop = getMax(polygonCoords, 'lat')

    return { lonLeft, lonRight, latBottom, latTop }
  }

  getApiInfo = async () => {
    const { zoom } = this.state
    const { lonLeft, lonRight, latBottom, latTop } = this.getApiRequestCoordinates()

    const API_URL = 'http://api.openweathermap.org/data/2.5/box/city' +
                    `?bbox=[${lonLeft},${latBottom},${lonRight},${latTop},${zoom}]` +
                    `&appid=${constants.weatherApiKey}`

    const response = await fetchResponse(API_URL)
    console.log({ response })
  }

  render()
  {
    const { google } = this.props
    const { polygonCoords, zoom } = this.state

    return (
      <Map
        google={google}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        initialCenter={{
          lat: 42.39,
          lng: -72.52,
        }}
        className="map"
        zoom={zoom}
        onClick={this.onMapClicked}
      >
        <Polygon
          paths={polygonCoords}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor="#0000FF"
          fillOpacity={0.35} />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (constants.googleApiKey),
})(MapContainer)
