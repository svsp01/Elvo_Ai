import { configureStore } from '@reduxjs/toolkit'
import clusterReducer from './clusterSlice'

export const store = configureStore({
  reducer: {
    cluster: clusterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch