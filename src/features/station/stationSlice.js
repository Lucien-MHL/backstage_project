import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    getStationRes: (state, { payload }) => {
      console.log(payload)
    }
  }
})

export const { getStationRes } = stationSlice.actions

export default stationSlice.reducer
