import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  station: { Ori: [], Mut: [], searchText: null },
  stationModify: { Ori: [], Mut: [] },
  device: { Ori: [], Mut: [] },
  deviceModify: { Ori: [], Mut: [] },
  isLoading: false
}

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    stationGetEnd: ({ station }, { payload }) => {
      station.Ori = station.Mut = payload.result
    },
    stationSearchKeyword: ({ station }, { payload }) => {
      const regex = new RegExp(payload, 'gi')

      if (payload === '') {
        station.Mut = station.Ori
        station.searchText = null
      } else {
        station.Mut = station.Ori.filter(
          ({ name, id, location }) =>
            name.match(regex) || id.match(regex) || location.match(regex)
        )
        station.searchText = payload
      }
    },
    postStationStart: (state) => {
      state.isLoading = true
    },
    postStationEnd: (state, { payload }) => {
      state.isLoading = false
    }
  }
})

export const {
  stationGetEnd,
  stationSearchKeyword,
  postStationStart,
  postStationEnd
} = stationSlice.actions
export const selectLoading = (state) => state.station.isLoading
export const selectStation = (state) => state.station.station
export const selectStationModify = (state) => state.station.stationModify
export const selectDevice = (state) => state.station.device
export const selectDeviceModify = (state) => state.station.deviceModify

export default stationSlice.reducer
