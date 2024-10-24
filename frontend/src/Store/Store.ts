import { configureStore } from '@reduxjs/toolkit'
import theme from './themeMode'
import loginStatus from './loginStatus'

export const store = configureStore({
  reducer: {
    theme,
    loginStatus
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch