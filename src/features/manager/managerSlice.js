import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  managerList: {
    original: [],
    mutable: []
  },
  loading: false,
  modifyPage: {
    manager: null,
    menu: ['個人資料', '重設密碼'],
    active: 0,
    loading: false,
    message: ''
  }
}

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    getManagerRes: (state, { payload }) => {
      state.managerList.original = [...payload]
      state.managerList.mutable = [...payload]
    },
    handleSubmit: (state) => {
      state.loading = true
    },
    postManagerRes: (state, { payload }) => {
      state.loading = false
      state.managerList.original = [...state.managerList.original, payload.result]
      state.managerList.mutable = [payload.result, ...state.managerList.original]
    },
    searchFilter: ({ managerList }, { payload }) => {
      const regex = new RegExp(payload, 'i')

      if (payload === '') {
        managerList.mutable = managerList.original
      } else {
        managerList.mutable = managerList.original.filter(
          ({ name, account, email }) =>
            name.match(regex) || account.match(regex) || email.match(regex)
        )
      }
    },
    handleClickModify: ({ modifyPage }, { payload }) => {
      modifyPage.manager = payload
    },
    getModifyRes: ({ modifyPage }, { payload }) => {
      modifyPage.manager = !modifyPage.manager ? payload.result : modifyPage.manager
    },
    switchModifyPage: ({ modifyPage }, { payload }) => {
      modifyPage.active = payload
    },
    modifyBasicInfoSubmit: ({ modifyPage }) => {
      modifyPage.loading = true
    },
    modifyBasicInfoRes: ({ modifyPage }, { payload }) => {
      modifyPage.loading = false
      modifyPage.manager = payload.result
      window.sessionStorage.setItem('token', JSON.stringify(payload.result.token))
    },
    modifyPasswordSubmit: ({ modifyPage }) => {
      modifyPage.loading = true
    },
    modifyPasswordRes: ({ modifyPage }, { payload }) => {
      modifyPage.loading = false
      modifyPage.manager = payload.result
      modifyPage.message = payload.message
    }
  }
})

export const {
  getManagerRes,
  handleSubmit,
  postManagerRes,
  searchFilter,
  handleClickModify,
  getModifyRes,
  switchModifyPage,
  modifyBasicInfoSubmit,
  modifyBasicInfoRes,
  modifyPasswordSubmit,
  modifyPasswordRes
} = managerSlice.actions
export const selectList = (state) => state.manager.managerList.mutable
export const selectIsLoading = (state) => state.manager.loading
export const selectModify = (state) => state.manager.modifyPage
export const selectModifyData = (state) => state.manager.modifyPage.manager
export const selectMenuList = (state) => state.manager.modifyPage.menu
export const selectActive = (state) => state.manager.modifyPage.active
export const selectLoading = (state) => state.manager.modifyPage.loading
export const selectMessage = (state) => state.manager.modifyPage.message

export default managerSlice.reducer
