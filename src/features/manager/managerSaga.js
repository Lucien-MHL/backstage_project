import { call, delay, put, takeEvery } from 'redux-saga/effects'
import {
  postManagerRes,
  modifyBasicInfoRes,
  modifyPasswordRes
} from './managerSlice'
import { modalToggle } from '../switch/switchSlice'

function template(method, obj) {
  const data = {}
  data[`${obj[0].name}`] = obj[0].value
  data[`${obj[1].name}`] = obj[1].value
  data[`${obj[2].name}`] = obj[2].value

  return {
    method,
    body: JSON.stringify(data)
  }
}

function* managerPost({ payload }) {
  try {
    const data = template('POST', payload)
    const url = '/api/managers'
    const result = yield call(() =>
      fetch(url, data)
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(postManagerRes(result))
    yield put(modalToggle())
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* managerBasicInfoPut({ payload: { formData, mid } }) {
  try {
    const body = template('PUT', formData)
    const url = `/api/managers/${mid}`
    const result = yield call(() =>
      fetch(url, body)
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(modifyBasicInfoRes(result))
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* managerPasswordPut({ payload: { passwordData, mid } }) {
  try {
    const data = {
      method: 'PUT',
      body: JSON.stringify({ password: passwordData[0].value })
    }

    const url = `/api/managers/${mid}`
    const result = yield call(() =>
      fetch(url, data)
        .then((d) => d.json())
        .then((dj) => dj)
    )

    if (result.success) {
      result.message = `${result.result.name} 的密碼重設完成 !!`
      yield put(modifyPasswordRes(result))
      yield delay(2000)
      result.message = ''
      yield put(modifyPasswordRes(result))
    }
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* managerSaga() {
  yield takeEvery('manager/handleSubmit', managerPost)
  yield takeEvery('manager/modifyBasicInfoSubmit', managerBasicInfoPut)
  yield takeEvery('manager/modifyPasswordSubmit', managerPasswordPut)
}

export default managerSaga
