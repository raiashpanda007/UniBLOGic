import { configureStore } from '@reduxjs/toolkit'
import theme from './themeMode'
import loginStatus from './loginStatus'
import forgotPassword from './forgotPassword'

export const store = configureStore({
  reducer: {
    theme,
    loginStatus,
    forgotPassword
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch