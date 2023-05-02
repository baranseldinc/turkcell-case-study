import { createSlice } from '@reduxjs/toolkit'

const identitySlice = createSlice({
  name: 'identity',
  initialState: {
    token: null
  },
  reducers: {
    commitToken: (state, token) => {
      state.token = token.payload
    }
  }
})

export const { commitToken } = identitySlice.actions
export default identitySlice.reducer
