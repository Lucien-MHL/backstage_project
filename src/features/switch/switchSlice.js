import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isOpen: false,
  isModalClick: false
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
    }
  }
})

export const { themeToggle, modalToggle, noticeEffect } = switchSlice.actions
export const selectIsDark = (state) => state.switch.isDark
export const selectIsOpen = (state) => state.switch.isOpen
export const selectIsClick = (state) => state.switch.isModalClick

export default switchSlice.reducer
