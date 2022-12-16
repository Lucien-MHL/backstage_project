import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isOpen: false,
  isModalClick: false,
  date: new Date(),
  isDateOpen: true
}

export const switchSlice = createSlice({
  name: 'switch',
  initialState,
  reducers: {
    themeToggle: (state) => {
      state.isDark = !state.isDark
    },
    modalToggle: (state) => {
      state.isOpen = !state.isOpen
    },
    noticeEffect: (state) => {
      state.isModalClick = !state.isModalClick
    },
    // For Date Picker Reducers
    setSelected: (state, { payload }) => {
      state.date = payload
    },
    toggleDatePicker: (state, { payload }) => {
      state.isDateOpen = payload
    }
  }
})

export const {
  themeToggle,
  modalToggle,
  noticeEffect,
  setSelected,
  toggleDatePicker
} = switchSlice.actions
export const selectIsDark = (state) => state.switch.isDark
export const selectIsOpen = (state) => state.switch.isOpen
export const selectIsClick = (state) => state.switch.isModalClick
export const selectDate = (state) => state.switch.date
export const selectDPisOpen = (state) => state.switch.isDateOpen

export default switchSlice.reducer
