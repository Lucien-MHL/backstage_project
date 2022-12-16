import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const bulletinSlice = createSlice({
  name: 'bulletin',
  initialState,
  reducers: {}
})

// export const {} = bulletinSlice.actions
// export const selectGroupList = (state) => state.group.groupPage.mutable

export default bulletinSlice.reducer
