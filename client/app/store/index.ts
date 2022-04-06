import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {},
	devTools: true,
})

export const actions = {}

export type RootStateType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch
