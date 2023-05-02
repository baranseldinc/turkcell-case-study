import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://167.71.77.240:5200/gateway/Account/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('token') ?? ''}`)
      return headers
    }
  }),
  tagTypes: ['School'],
  endpoints: (builder) => ({
    getPagedSchoolList: builder.query({
      query: ({ pageNumber, pageSize, allRecords, recordStatus }) => ({
        url: 'Schools/getPagedList',
        method: 'POST',
        body: {
          allRecords,
          recordStatus,
          institutionId: 0,
          cityId: 0,
          countyId: 0
        },
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize
        }
      }),
      providesTags: ['School'],
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
        Array.isArray(response?.data?.items) ? response.data.items : []
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
        Array.isArray(response?.data?.items) ? response.data.items : []
    }),
    getInstitutions: builder.query({
      query: () => {
        return {
          url: 'Institutions/getList',
          method: 'POST',
          params: { PageNumber: 1, PageSize: 0 },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      },
      transformResponse: (response) => {
        return Array.isArray(response?.data?.items) ? response.data.items : []
      }
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
      transformResponse: (response) => {
        return Array.isArray(response?.data?.items) ? response.data.items : []
      }
    }),
    addSchool: builder.mutation({
      query: (payload) => {
        return {
          url: 'Schools',
          method: 'PUT',
          body: { entity: payload }
        }
      },
      invalidatesTags: ['School']
    }),
    updateSchool: builder.mutation({
      query: (payload) => {
        return {
          url: 'Schools',
          method: 'PUT',
          body: { entity: payload },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      },
      invalidatesTags: ['School']
    }),
    deleteSchool: builder.mutation({
      query: ({ schoolId }) => {
        return {
          url: 'Schools',
          method: 'DELETE',
          params: { id: schoolId }
        }
      },
      invalidatesTags: ['School']
    })
  })
})

export const {
  useGetPagedSchoolListQuery,
  useGetCitiesQuery,
  useGetCountiesQuery,
  useGetInstitutionsQuery,
  useGetInstitutionTypesQuery,
  useAddSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation
} = accountApi
