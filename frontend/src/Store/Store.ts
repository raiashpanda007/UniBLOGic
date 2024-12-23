import { configureStore } from '@reduxjs/toolkit'
import theme from './themeMode'
import loginStatus from './loginStatus'
import forgotPassword from './forgotPassword'
import communitiesList from './communitiesList'
export const store = configureStore({
  reducer: {
    theme,
    loginStatus,
    forgotPassword,
    communitiesList
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch