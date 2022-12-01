import { all } from 'redux-saga/effects'
import loginSaga from '../features/login/loginSaga'
import verifySaga from '../features/verify/verifySaga'
import managerSaga from '../features/manager/managerSaga'
import groupSaga from '../features/group/groupSaga'
import stationSaga from '../features/station/stationSaga'

export default function* rootSaga() {
  yield all([loginSaga(), verifySaga(), managerSaga(), groupSaga(), stationSaga()])
}
