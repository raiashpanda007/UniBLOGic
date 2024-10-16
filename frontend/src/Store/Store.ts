import { configureStore } from '@reduxjs/toolkit'
import theme from './themeMode'

export const store = configureStore({
  reducer: {
    theme,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch