import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://167.71.77.240:5200/gateway/Account/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token') ?? ''}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getPagedSchoolList: builder.query({
      query: () => ({
        url: 'Schools/getPagedList',
        method: 'POST',
        body: {
          allRecords: true,
          recordStatus: true,
          institutionId: 0,
          cityId: 0,
          countyId: 0
        }
      }),
      transformResponse: (response) => {
        if (response?.success) {
          return {
            rows: response?.data?.items.map((row) => ({ ...row, key: row.id })),
            pagedProperty: response?.data?.pagedProperty
          }
        }
        return { rows: [] }
      }
    }),
    getCities: builder.query({
      query: () => {
        return {
          url: 'Citys/getList',
          method: 'POST',
          params: { PageNumber: 1, PageSize: 0 },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      },
      transformResponse: (response) =>
        response?.data?.items
          ?.filter((item) => item.recordStatus === 1)
          .map((item) => ({ id: item.id, value: item.name })) ?? []
    }),
    getCounties: builder.query({
      query: () => {
        return {
          url: 'Countys/getList',
          method: 'POST',
          params: { PageNumber: 1, PageSize: 0 },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      },
      transformResponse: (response) =>
        response?.data?.items
          ?.filter((item) => item.recordStatus === 1)
          .map((item) => ({ id: item.id, cityId: item.cityId, value: item.name })) ?? []
    }),
    getInstitutionTypes: builder.query({
      query: () => {
        return {
          url: 'InstitutionTypes/getList',
          method: 'POST',
          params: { PageNumber: 1, PageSize: 0 },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      },
      transformResponse: (response) =>
        response?.data?.items
          ?.filter((item) => item.recordStatus === 1)
          .map((item) => ({ id: item.id, value: item.name })) ?? []
    })
  })
})

export const {
  useGetPagedSchoolListQuery,
  useGetCitiesQuery,
  useGetCountiesQuery,
  useGetInstitutionTypesQuery
} = accountApi
