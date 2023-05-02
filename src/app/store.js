import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import accountSlice from './slices/accountSlice'
import identitySlice from './slices/identitySlice'
import { accountApi } from './services/accountApi'

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    identitySlice,
    accountSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountApi.middleware)
})

setupListeners(store.dispatch)
