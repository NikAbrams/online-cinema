import { configureStore } from '@reduxjs/toolkit'

import { authReducer, authActions } from './auth/auth.slice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	devTools: true,
})

export const actions = { ...authActions }

export type RootStateType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch
