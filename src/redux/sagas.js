import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'
import { constants } from '../constants'
import ACTIONS from './actions'

/**
 * Saga watcher
 *
 * @returns {Generator}
 */
export function* watcherSaga()
{
  yield all([
    takeLatest(ACTIONS.GET_WEATHER, getWeather),
  ])
}

/**
 * Main response saga
 *
 * @param payload
 *
 * @returns {Generator}
 */
function* getWeather({ payload })
{
  const { cities } = payload || {}

  if (!cities) {
    return yield put({
      type: ACTIONS.GET_WEATHER_SUCCESS,
      payload: [],
    })
  }

  try {
    const requests = cities.map(id => call(getWeatherById, id))
    const result = yield all(requests)

    yield put({
      type: ACTIONS.GET_WEATHER_SUCCESS,
      payload: result,
    })
  } catch (e) {
    yield put({
      type: ACTIONS.GET_WEATHER_ERROR,
      payload: e,
    })
  }
}

/**
 * Get weather response
 *
 * @param cityId
 *
 * @returns {Promise<Response>}
 */
const getWeatherById = cityId => {
  const { apiUrl, weatherApiKey } = constants

  const API_URL = `${apiUrl}?id=${cityId}&units=metric&appid=${weatherApiKey}`

  return fetch(API_URL).then(resp => resp.json())
}

