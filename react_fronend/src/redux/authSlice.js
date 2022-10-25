import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    username: '',
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLogin, setAccessToken, setUsername } = authSlice.actions
export default authSlice.reducer
