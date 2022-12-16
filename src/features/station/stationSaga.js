import { call, put, takeEvery } from 'redux-saga/effects'
import { postStationEnd } from './stationSlice'
import { modalToggle } from '../switch/switchSlice'
import { toArray, selectInput, setObject } from '../Utility'

function* stationPostStart({ payload: { formData, group } }) {
  try {
    group.forEach(({ name, id }) => ({ name, id }))
    const newData = { ...setObject(selectInput(toArray(formData))), group }
    const reqBody = {
      method: 'POST',
      body: JSON.stringify(newData)
    }
    const url = `/api/station`
    const result = yield call(() =>
      fetch(url, reqBody)
        .then((res) => res.json())
        .then((json) => json)
    )

    yield put(postStationEnd(result))
    yield put(modalToggle())
  } catch (e) {
    console.log('ERROR:', e)
  }
}

export default function* stationSaga() {
  yield takeEvery('station/postStationStart', stationPostStart)
}
