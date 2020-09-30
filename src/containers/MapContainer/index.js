import React, { Component } from 'react'
import {
  Map,
  GoogleApiWrapper,
  Polygon,
} from 'google-maps-react'
import { constants } from '../../constants'

export class MapContainer extends Component
{
  state = {
    polygonCoords: [],
    zoom: 14
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    const { polygonCoords } = this.state
    console.log({ mapProps, map, clickEvent })

    if (polygonCoords.length < 4) {
      this.setState(prevState => ({
        polygonCoords: [
          ...prevState.polygonCoords,
          {
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng(),
          },
        ],
      }), () => {})
    }
  }

  getApiInfo = () => {
    const { polygonCoords, zoom } = this.state

    const lonLeft = 0;
    const lonRight = 0;
    const latTop = 0;
    const latBottom = 0;

    const API_URL = 'http://api.openweathermap.org/data/2.5/box/city' +
                    `?bbox=[${lonLeft},${latBottom},${lonRight},${latTop},${zoom}]` +
                    `&appid=${constants.weatherApiKey}`
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
