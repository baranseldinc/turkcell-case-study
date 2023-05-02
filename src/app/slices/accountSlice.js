import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    cities: [],
    counties: [],
    institutions: [],
    institutionTypes: []
  },
  reducers: {
    commitCities: (state, cities) => {
      state.cities = [...cities.payload]
    },
    commitCounties: (state, counties) => {
      state.counties = [...counties.payload]
    },
    commitInstitutions: (state, institutions) => {
      state.institutions = [...institutions.payload]
    },
    commitInstitutionTypes: (state, institutionTypes) => {
      state.institutionTypes = [...institutionTypes.payload]
    }
  }
})

export const { commitCities, commitCounties, commitInstitutions, commitInstitutionTypes } =
  accountSlice.actions
export default accountSlice.reducer
