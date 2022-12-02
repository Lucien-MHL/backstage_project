import { all, call, put, takeEvery } from 'redux-saga/effects'
import { modalToggle } from '../switch/switchSlice'
import {
  postGroupRes,
  modifyGroupRes,
  UserPostEnd,
  userPutEnd,
  userPutWithAzureEnd
} from './groupSlice'
import { toArray, setObject, selectInput, setFileObj } from '../Utility'

const AzureFetch = (url, data) =>
  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'multipart/form-data' },
    body: data
  })
    .then((d) => d.json())
    .then((dj) => dj)

function* groupPost({ payload }) {
  try {
    const url = '/api/group'
    const AzureURL = '/api/Azure_Cloud/photos/photo'
    const formData = new FormData(payload)
    let Response

    if (formData.get('photo').size) {
      Response = yield call(() => AzureFetch(AzureURL, formData))
    }

    const result = yield call(() =>
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name: payload[0].value, photo: Response.photoURL })
      })
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(postGroupRes(result))
    yield put(modalToggle())
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* groupPut({ payload }) {
  try {
    const url = `/api/group/${payload.gid}`
    const AzureURL = '/api/Azure_Cloud/photos/photo'
    const data = new FormData(payload.formData)
    let Response = {}

    if (data.get('photo').size) {
      Response = yield call(() => AzureFetch(AzureURL, data))
    } else {
      Response.photoURL = payload.imgSrc
    }

    const result = yield call(() =>
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ name: data.get('name'), photo: Response.photoURL })
      })
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(modifyGroupRes(result))
    yield put(modalToggle())
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* userPost({ payload: { formData, gid } }) {
  try {
    const data = setObject(selectInput(toArray(formData)))
    const url = `/api/group/${gid}`
    const result = yield call(() =>
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(UserPostEnd(result))
    yield put(modalToggle())
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* userPut({ payload: { user, formData } }) {
  try {
    const url = `/api/group/${user.groupId}/${user.id}`
    const updateUser = (obj) => ({ ...user, ...obj })
    const newUser = updateUser(setObject(selectInput(toArray(formData))))

    const result = yield call(() =>
      fetch(url, { method: 'PUT', body: JSON.stringify(newUser) })
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(userPutEnd(result))
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* userPutWithAzure({ payload: { user, formData } }) {
  try {
    const fileObject = setFileObj(selectInput(toArray(formData)))
    const fileArr = toArray(fileObject)
    const data = new FormData(formData.current)

    // 不小心按到儲存時(空資料直接 return)
    if (!fileArr[0] && !fileArr[1]) return yield put(userPutWithAzureEnd())

    const azureUrl = '/api/Azure_Cloud/photos/'
    const url = `/api/group/${user.groupId}/${user.id}`
    yield all(
      Object.keys(fileObject).map((item) =>
        call(() => {
          if (!fileObject[item]) return
          return AzureFetch(azureUrl + item, data).then(
            (res) =>
              (user = {
                ...user,
                [item]: res.photoURL
              })
          )
        })
      )
    )

    const result = yield call(() =>
      fetch(url, { method: 'PUT', body: JSON.stringify(user) })
        .then((d) => d.json())
        .then((dj) => dj)
    )

    yield put(userPutWithAzureEnd(result))
  } catch (e) {
    console.log('ERROR:', e)
  }
}

function* groupSaga() {
  yield takeEvery('group/handleSubmit', groupPost)
  yield takeEvery('group/modifyGroupSubmit', groupPut)
  yield takeEvery('group/UserPostStart', userPost)
  yield takeEvery('group/userPutStart', userPut)
  yield takeEvery('group/userPutWithAzureStart', userPutWithAzure)
}

export default groupSaga
