import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  groupPage: {
    original: [],
    mutable: [],
    photo: undefined
  },
  modifyPage: {
    group: {},
    usersOri: [],
    usersMut: [],
    formComponent: undefined
  },
  userPlus: {
    value: {},
    action: null,
    env: [
      {
        name: 'identity',
        placeholder: '使用者身份 (必填)',
        option: [
          { name: '一般使用者', value: 'member' },
          { name: '群組管理者', value: 'leader' },
          { name: '協力廠商(新增使用)', value: 'factory' }
        ]
      },
      {
        name: 'language',
        placeholder: '選擇語言',
        option: [
          { name: '中文', value: 'TW' },
          { name: '日文', value: 'JP' },
          { name: '英文', value: 'EN' }
        ]
      },
      {
        name: 'price',
        placeholder: '顯示金額',
        option: [
          { name: '顯示金額', value: 'true' },
          { name: '不顯示金額', value: 'false' }
        ]
      },
      {
        name: 'notice',
        placeholder: '信箱通知',
        option: [
          { name: '開啟通知 (ON)', value: 'true' },
          { name: '關閉通知 (OFF)', value: 'false' }
        ]
      }
    ]
  },
  userModify: {
    user: null,
    menu: ['個人資料', '基本設定', '重設密碼', '圖片設定'],
    // menu: ['個人資料', '基本設定', '重設密碼', '圖片設定', '歷史紀錄'],
    active: 0,
    isLoading: false,
    dropMenu: {},
    photos: [
      { name: '個人圖像', key: 'logo' },
      { name: '背景照片', key: 'bgImg' }
    ]
  },
  isLoading: false
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    getGroupRes: ({ groupPage }, { payload }) => {
      groupPage.original = groupPage.mutable = payload.result
    },
    handleClickModify: ({ modifyPage }, { payload }) => {
      modifyPage.group = { ...modifyPage.group, ...payload }
      modifyPage.usersOri = []
      modifyPage.usersMut = []
    },
    handleSearch: (state, { payload }) => {
      const regex = new RegExp(payload, 'i')
      if (payload === '') {
        state.groupPage.mutable = state.groupPage.original
      } else {
        state.groupPage.mutable = state.groupPage.original.filter(({ name }) =>
          name.match(regex)
        )
      }
    },
    handleChangePhoto: (state, { payload }) => {
      const UrlGenerator = (file) => URL.createObjectURL(file)
      if (payload.name === 'photo') {
        if (!payload.files[0]) return (state.groupPage.photo = undefined)
        state.groupPage.photo = UrlGenerator(payload.files[0])
      } else {
        state.userModify.photos.forEach((item) => {
          if (payload.name === item.key) {
            item.src = UrlGenerator(payload.files[0])
          }
          return
        })
      }
    },
    handleSubmit: (state) => {
      state.isLoading = true
    },
    postGroupRes: (state, { payload }) => {
      state.groupPage.photo = undefined
      state.isLoading = false
      state.groupPage.mutable = [payload.result, ...state.groupPage.original]
      state.groupPage.original = [...state.groupPage.original, payload.result]
    },
    getUsersOfGroupRes: (state, { payload }) => {
      state.modifyPage.group = payload.result.group
      state.modifyPage.usersOri = payload.result.users
      state.modifyPage.usersMut = payload.result.users
      state.groupPage.mutable = []
    },
    modifySearch: (state, { payload }) => {
      const regex = new RegExp(payload, 'i')
      if (payload === '') {
        state.modifyPage.usersMut = state.modifyPage.usersOri
      } else {
        state.modifyPage.usersMut = state.modifyPage.usersOri.filter(
          ({ name, account }) => name.match(regex) || account.match(regex)
        )
      }
    },
    formComponent: (state, { payload }) => {
      state.modifyPage.formComponent = payload
    },
    modifyGroupPhotoChange: (state, { payload }) => {
      state.modifyPage.group.photo = URL.createObjectURL(payload)
    },
    modifyGroupSubmit: (state) => {
      state.isLoading = true
    },
    modifyGroupRes: (state, { payload }) => {
      state.isLoading = false
      state.modifyPage.group = payload.result.group
      state.modifyPage.usersMut = payload.result.users
      state.modifyPage.formComponent = undefined
    },
    userFormMenuOpen: (state, { payload }) => {
      switch (state.userPlus.action) {
        case payload:
          state.userPlus.action = null
          break

        default:
          state.userPlus.action = payload
          break
      }
    },
    changeAddUserForm: (state, { payload }) => {
      state.userPlus.value = payload
        ? {
            ...state.userPlus.value,
            ...payload
          }
        : {}
    },
    UserPostStart: (state) => {
      state.isLoading = true
    },
    UserPostEnd: (state, { payload }) => {
      state.isLoading = false
      state.modifyPage.formComponent = undefined
      state.modifyPage.usersMut = [payload.result, ...state.modifyPage.usersOri]
      state.userPlus = { ...state.userPlus, action: null, value: {} }
    },
    clickUserDetail: ({ userModify }, { payload }) => {
      userModify.user = { ...userModify.user, ...payload }
      userModify.active = 0
    },
    UserGetEnd: ({ userModify, userPlus, modifyPage }, { payload }) => {
      modifyPage.group = !modifyPage.group.hasOwnProperty('name')
        ? payload.result.group
        : modifyPage.group
      userModify.user = !userModify.user ? payload.result.users : userModify.user
      if (userModify.user) {
        const { user, photos } = userModify
        const { env } = userPlus
        const findMatch = (arr, key) => arr.find((i) => i.value === user[key])
        env.forEach(
          (e) =>
            (userModify.dropMenu = {
              ...userModify.dropMenu,
              [e.name]: findMatch(e.option, e.name)
            })
        )
        photos.forEach((item) => (item.src = user[item.key]))
      }
    },
    switchUserModify: ({ userModify }, { payload }) => {
      userModify.active = payload
    },
    changeOption: ({ userModify }, { payload }) => {
      userModify.dropMenu = {
        ...userModify.dropMenu,
        ...payload
      }
    },
    userPutStart: ({ userModify }) => {
      userModify.isLoading = true
    },
    userPutWithAzureStart: ({ userModify }) => {
      userModify.isLoading = true
    },
    userPutEnd: ({ userModify }, { payload }) => {
      userModify.isLoading = false
      userModify.user = { ...userModify.user, ...payload.result }
    },
    userPutWithAzureEnd: ({ userModify }, { payload }) => {
      userModify.isLoading = false
      userModify.user = payload?.result ?? userModify.user
    }
  }
})

export const {
  getGroupRes,
  handleClickModify,
  handleSearch,
  handleChangePhoto,
  handleSubmit,
  postGroupRes,
  getUsersOfGroupRes,
  modifySearch,
  formComponent,
  modifyGroupSubmit,
  modifyGroupRes,
  modifyGroupPhotoChange,
  userFormMenuOpen,
  changeAddUserForm,
  UserPostStart,
  UserPostEnd,
  clickUserDetail,
  UserGetEnd,
  switchUserModify,
  changeOption,
  userPutStart,
  userPutEnd,
  userPutWithAzureStart,
  userPutWithAzureEnd
} = groupSlice.actions
export const selectGroupList = (state) => state.group.groupPage.mutable
export const selectGroup = (state) => state.group.modifyPage.group
export const selectPrevPhoto = (state) => state.group.groupPage.photo
export const selectIsLoading = (state) => state.group.isLoading
export const selectUsersList = (state) => state.group.modifyPage.usersMut
export const selectForm = (state) => state.group.modifyPage.formComponent
export const selectUserPlusState = (state) => state.group.userPlus
export const selectUserPageState = (state) => state.group.userModify

export default groupSlice.reducer
