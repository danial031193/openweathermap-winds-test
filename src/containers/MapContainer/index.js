import React, { Component } from 'react'
import {
  Map,
  GoogleApiWrapper,
  Marker,
} from 'google-maps-react'
import { constants } from '../../constants'
import { connect } from 'react-redux'
import { getWeatherAction } from '../../redux/actionCreators'

const cities = Object.keys(constants.cities)

export class MapContainerPure extends Component
{
  state = {}

  /**
   * Set action on map ready
   */
  onMapReady = () => {
    // first request
    this.fetchCities()

    // repeat request
    setInterval(this.fetchCities, 5000)
  }

  /**
   * Fetch cities weather
   */
  fetchCities = () => {
    const { getWeather } = this.props
    getWeather(cities)
  }

  render()
  {
    const { google, markers } = this.props
    const zoom = 6

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
        zoom={zoom}
        onReady={this.onMapReady}
      >
        {markers && markers.map(({ coord: { lat, lon: lng }, wind: { deg: rotation } }, i) => {
          return (
            <Marker
              key={i}
              position={{ lat, lng, rotation }}
              options={{
                icon: {
                  rotation,
                  scale: zoom,
                  path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  strokeWeight: 1,
                  fillOpacity: 1,
                  strokeColor: '#4bef05',
                },
              }}
            />
          )
        })}
      </Map>
    )
  }
}

const MapContainerWithGoogle = GoogleApiWrapper({
  apiKey: (constants.googleApiKey),
})(MapContainerPure)

const mapStateToProps = state => ({
  markers: state.weather,
})

const mapDispatchToProps = {
  getWeather: (ids) => getWeatherAction(ids),
}

const MapContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapContainerWithGoogle)

export default MapContainer
