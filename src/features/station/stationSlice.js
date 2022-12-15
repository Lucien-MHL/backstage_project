import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  station: {
    Ori: [],
    Mut: [],
    groupList: null,
    placeholder: { area: null, group: null },
    isOpen: null
  },
  stationModify: {
    station: {},
    stationFile: [
      { key: 'id', name: 'Logger案場編碼' },
      { key: 'name', name: '案場名稱' },
      { key: 'country', name: '案場所在地(國家)' },
      { key: 'location', name: '案場所在地(縣市)' },
      { key: 'address', name: '案場所在地(地址)' },
      { key: 'lat', name: '案場所在地(緯度)' },
      { key: 'lon', name: '案場所在地(經度)' },
      { key: 'situation', name: '案場狀態' },
      { key: 'progress', name: '案場進程' },
      { key: 'releaseDate', name: '案場上線時間' },
      { key: 'notice', name: '案場事件通知' },
      { key: 'tuv', name: 'TUV案場編碼(進案)' },
      { key: 'wattage', name: '案場額定功率(KW)' },
      { key: 'dataSource', name: '資料來源' },
      { key: 'dataCode', name: '資料代碼' },
      { key: 'apply', name: '應用類型' },
      { key: 'rate', name: '躉售費率' },
      { key: 'currency', name: '躉售幣別' },
      { key: 'type', name: '案場類型' },
      { key: 'cod', name: '台電併網日' },
      { key: 'createdAt', name: '新增時間' },
      { key: 'creator', name: '新增人員' },
      { key: 'editedAt', name: '修改時間' },
      { key: 'editor', name: '修改人員' }
    ],
    stationArr: [],
    menu: ['案場資訊', '設備清單', '平面圖', '合約管理', '案場歷程'],
    active: 0
  },
  device: { Ori: [], Mut: [] },
  deviceModify: { Ori: [], Mut: [] },
  isLoading: false,
  taiwanArea: [
    '臺北市',
    '新北市',
    '桃園市',
    '臺中市',
    '臺南市',
    '基隆市',
    '新竹市',
    '嘉義市',
    '新竹縣',
    '苗栗縣',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義縣',
    '屏東縣',
    '宜蘭縣',
    '花蓮縣',
    '臺東縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
    '高雄市'
  ],
  test: null
}

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    // STATION REDUCERS
    stationGetEnd: ({ station }, { payload }) => {
      station.Ori = station.Mut = payload.result.stations
      station.groupList = payload.result.groups?.map((item) => ({
        ...item,
        isActive: false
      }))
    },
    stationSearchKeyword: ({ station }, { payload }) => {
      const regex = new RegExp(payload, 'gi')

      if (payload === '') {
        station.Mut = station.Ori
      } else {
        station.Mut = station.Ori.filter(
          ({ name, id, location }) =>
            name.match(regex) || id.match(regex) || location.match(regex)
        )
      }
    },
    dropMenuOpen: ({ station }, { payload }) => {
      station.isOpen = station.isOpen !== payload ? payload : null
    },
    selectAreaOpt: ({ station }, { payload }) => {
      station.placeholder.area = payload
    },
    selectGroupOpt: ({ station }, { payload }) => {
      station.groupList = station.groupList.map((item) => {
        if (!payload) return { ...item, isActive: payload }
        if (item.id !== payload) return item
        return { ...item, isActive: !item.isActive }
      })
      station.placeholder.group = station.groupList.filter(
        ({ isActive }) => isActive
      )
    },
    postStationStart: (state) => {
      state.isLoading = true
    },
    postStationEnd: (state, { payload }) => {
      state.isLoading = false
      state.station.Mut = [payload.result, ...state.station.Ori]
      state.station.Ori = [...state.station.Ori, payload.result]
    },
    // STATION >>> STATION MODIFY
    clickDetail: ({ stationModify }, { payload }) => {
      stationModify.station = payload
      // stationModify.stationArr = Object.(payload)
    },
    // STATION MODIFY REDUCERS
    stationModifyGetEnd: ({ stationModify }, { payload }) => {
      const update = (objA, objB) => ({ ...objA, ...objB })
      stationModify.station = update(stationModify.station, payload.result)
      stationModify.stationArr = stationModify.stationFile.map(({ key, name }) => ({
        key,
        name,
        value: payload.result[key] ?? ''
      }))
    },
    navBarClick: ({ stationModify }, { payload }) => {
      stationModify.active = payload
    }
  }
})

export const {
  stationGetEnd,
  stationSearchKeyword,
  postStationStart,
  postStationEnd,
  selectAreaOpt,
  selectGroupOpt,
  dropMenuOpen,
  clickDetail,
  stationModifyGetEnd,
  navBarClick
} = stationSlice.actions
export const selectLoading = (state) => state.station.isLoading
export const selectAreaList = (state) => state.station.taiwanArea
export const selectStation = (state) => state.station.station
export const selectStationModify = (state) => state.station.stationModify
export const selectDevice = (state) => state.station.device
export const selectDeviceModify = (state) => state.station.deviceModify

export default stationSlice.reducer
