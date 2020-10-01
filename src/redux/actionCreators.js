import ACTIONS from './actions'

/**
 * Get city weather saga action
 *
 * @param {Array<Number>} cities
 *
 * @returns {{payload: {cities: *}, type: string}}
 */
export const getWeatherAction = (cities) => ({
  type: ACTIONS.GET_WEATHER,
  payload: { cities },
})
