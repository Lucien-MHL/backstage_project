import { configureStore } from '@reduxjs/toolkit'
import rootSaga from './saga'
import createSagaMiddleware from 'redux-saga'
import switchReducer from '../features/switch/switchSlice'
import loginReducer from '../features/login/loginSlice'
import verifyReducer from '../features/verify/verifySlice'
import logoutReducer from '../features/logout/logoutSlice'
import managerReducer from '../features/manager/managerSlice'
import groupReducer from '../features/group/groupSlice'
import stationReducer from '../features/station/stationSlice'
import bulletinReducer from '../features/bulletin/bulletinSlice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    switch: switchReducer,
    login: loginReducer,
    logout: logoutReducer,
    verify: verifyReducer,
    manager: managerReducer,
    group: groupReducer,
    station: stationReducer,
    bulletin: bulletinReducer
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)
