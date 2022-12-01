import { createSlice } from '@reduxjs/toolkit'

const switchPage = (state) => (state.isLoginPage = !state.isLoginPage)
const setErrorMessage = (state, payload) => (state.message = payload.message)
const cleanErrorMessage = (state) => (state.message = null)
const setInformation = (state, payload) => (state.info = payload.message)
const cleanInformation = (state) => (state.info = null)

const initialState = {
  isLoginPage: true,
  isLoading: false,
  message: null,
  info: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    switchPageButton: (state) => {
      switchPage(state)
      cleanErrorMessage(state)
    },
    loginPost: (state) => {
      state.isLoading = true
      cleanErrorMessage(state)
    },
    loginPostEnd: (state, { payload }) => {
      state.isLoading = false

      // While Success is False
      if (!payload.success) {
        setErrorMessage(state, payload)
        cleanInformation(state)
        return
      }

      // While Success is True
      if (state.isLoginPage) {
        // In Login Page
        setInformation(state, payload)
        cleanErrorMessage(state)
        window.location.replace('/')
        window.sessionStorage.setItem('token', JSON.stringify(payload.token))
      } else {
        // In forgetPassword Page
        setInformation(state, payload)
        cleanErrorMessage(state)
        state.isLoginPage = true
      }
    }
  }
})

export const { switchPageButton, loginPost, loginPostEnd } = loginSlice.actions
export const selectIsLoginPage = (state) => state.login.isLoginPage
export const selectIsLoading = (state) => state.login.isLoading
export const selectMessage = (state) => state.login.message
export const selectInfo = (state) => state.login.info

export default loginSlice.reducer
