import { call, put, takeEvery } from 'redux-saga/effects'
import { verifyEnd } from './verifySlice'
import { getManagerRes, getModifyRes } from '../manager/managerSlice'
import { getGroupRes, getUsersOfGroupRes, UserGetEnd } from '../group/groupSlice'
import { stationGetEnd, stationModifyGetEnd } from '../station/stationSlice'

function* verifyStart({ payload }) {
  try {
    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`
      }
    }
    const url = `/api${payload.pathname}`
    const result = yield call(() =>
      fetch(url, data)
        .then((res) => res.json())
        .then((json) => json)
    )

    switch (payload.pathname) {
      case '/managers':
        yield put(getManagerRes(result))
        break

      case `/managers/${payload.props.mid}`:
        yield put(getModifyRes(result))
        break

      case '/group':
        yield put(getGroupRes(result))
        break

      case `/group/${payload.props.gid}`:
        yield put(getUsersOfGroupRes(result))
        break

      case `/group/${payload.props.gid}/${payload.props.uid}`:
        yield put(UserGetEnd(result))
        break

      case '/station':
        yield put(stationGetEnd(result))
        break

      case `/station/${payload.props.sid}`:
        yield put(stationModifyGetEnd(result))
        break

      default:
        break
    }
    yield put(verifyEnd(result))
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* verifySaga() {
  yield takeEvery('verify/verifyStart', verifyStart)
}

export default verifySaga
