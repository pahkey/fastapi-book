import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    page: 0,
    keyword: '',
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setPage, setKeyword } = pageSlice.actions
export default pageSlice.reducer
