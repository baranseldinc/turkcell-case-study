import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    cities: [],
    counties: [],
    institutions: []
  },
  reducers: {
    commitCities: (state, cities) => {
      state.cities = [...cities.payload]
    },
    commitCounties: (state, cities) => {
      state.counties = [...cities.payload]
    },
    commitInstitutions: (state, cities) => {
      state.institutions = [...cities.payload]
    }
  }
})

export const { commitCities, commitCounties, commitInstitutions } = accountSlice.actions
export default accountSlice.reducer
