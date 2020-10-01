import ACTIONS from './actions'

const initialState = {
  fetching: false,
  error: null,
  weather: null,
}

/**
 * Main weather reducer
 *
 * @param {Object} state
 * @param {Object} action
 *
 * @returns {Object}
 */
export function reducer(state = initialState, action)
{
  switch (action.type) {
    case ACTIONS.GET_WEATHER:
      return { ...state, fetching: true }

    case ACTIONS.GET_WEATHER_SUCCESS:
      return { ...initialState, weather: action.payload }

    case ACTIONS.GET_WEATHER_ERROR:
      return { ...initialState, error: action.payload }

    default:
      return { ...state }
  }
}
