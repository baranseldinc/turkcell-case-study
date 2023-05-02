import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cities: [],
  counties: [],
  institutions: [],
  institutionTypes: [],
  selectedSchoolRow: null,
  openModal: false
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    reset: () => initialState,
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
    },
    commitSelectedSchoolRow: (state, schoolRow) => {
      state.selectedSchoolRow = { ...schoolRow.payload }
    },
    commitOpenModal: (state, isOpen) => {
      state.openModal = isOpen.payload
    }
  }
})

export const {
  reset,
  commitCities,
  commitCounties,
  commitInstitutions,
  commitInstitutionTypes,
  commitSelectedSchoolRow,
  commitOpenModal
} = accountSlice.actions
export default accountSlice.reducer
