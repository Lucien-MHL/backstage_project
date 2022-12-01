import { call, put, takeEvery } from 'redux-saga/effects'
import { loginPostEnd } from './loginSlice'
import { toArray, setObject, selectInput } from '../Utility'

function template(obj) {
  return {
    method: 'POST',
    body: setObject(selectInput(toArray(obj)))
  }
}

function* loginPost({ payload: { formData, isLogin } }) {
  try {
    const data = template(formData)
    const url = isLogin ? '/api/login' : '/api/forget'
    const result = yield call(() =>
      fetch(url, data)
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(loginPostEnd(result))
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* loginSaga() {
  yield takeEvery('login/loginPost', loginPost)
}

export default loginSaga
