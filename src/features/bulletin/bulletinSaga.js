import { all, call, put, takeEvery } from 'redux-saga/effects'

// function* groupPost({ payload }) {
//   try {
//     const url = '/api/group'
//     const AzureURL = '/api/Azure_Cloud/photos/photo'
//     const formData = new FormData(payload)
//     let Response

//     if (formData.get('photo').size) {
//       Response = yield call(() => AzureFetch(AzureURL, formData))
//     }

//     const result = yield call(() =>
//       fetch(url, {
//         method: 'POST',
//         body: JSON.stringify({ name: payload[0].value, photo: Response.photoURL })
//       })
//         .then((d) => d.json())
//         .then((dj) => dj)
//     )

//     yield put(postGroupRes(result))
//     yield put(modalToggle())
//   } catch (e) {
//     console.log('ERROR:', e)
//   }
// }

// function* groupPut({ payload }) {
//   try {
//     const url = `/api/group/${payload.gid}`
//     const AzureURL = '/api/Azure_Cloud/photos/photo'
//     const data = new FormData(payload.formData)
//     let Response = {}

//     if (data.get('photo').size) {
//       Response = yield call(() => AzureFetch(AzureURL, data))
//     } else {
//       Response.photoURL = payload.imgSrc
//     }

//     const result = yield call(() =>
//       fetch(url, {
//         method: 'PUT',
//         body: JSON.stringify({ name: data.get('name'), photo: Response.photoURL })
//       })
//         .then((d) => d.json())
//         .then((dj) => dj)
//     )

//     yield put(modifyGroupRes(result))
//     yield put(modalToggle())
//   } catch (e) {
//     console.log('ERROR:', e)
//   }
// }

function* bulletinSaga() {
  // yield takeEvery('group/handleSubmit', groupPost)
  // yield takeEvery('group/modifyGroupSubmit', groupPut)
}

export default bulletinSaga
