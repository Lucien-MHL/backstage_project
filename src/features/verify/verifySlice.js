import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  verifyResult: false,
  isLoading: false
}

export const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    verifyStart: (state) => {
      state.isLoading = true
    },
    verifyEnd: (state, { payload }) => {
      state.verifyResult = payload.success
      state.isLoading = false
    }
  }
})

export const { verifyStart, verifyEnd } = verifySlice.actions
export const selectVerifyLoading = (state) => state.verify.isLoading
export const selectVerifyResult = (state) => state.verify.verifyResult

export default verifySlice.reducer
