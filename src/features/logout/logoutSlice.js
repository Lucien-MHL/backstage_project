import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logout: () => {
      window.sessionStorage.clear()
      window.location.replace('/login')
    }
  }
})

export const { logout } = logoutSlice.actions

export default logoutSlice.reducer
