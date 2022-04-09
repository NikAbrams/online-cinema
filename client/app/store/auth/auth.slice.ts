import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@types'

import { login, logout, register } from './auth.actions'

interface IInitialState {
	user: Pick<IUser, 'email' | 'isAdmin'> | null
	isLoading: boolean
}

const initialState: IInitialState = {
	user: null,
	isLoading: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// REGISTER
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false
			})

			// LOGIN
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false
			})

			// LOGOUT
			.addCase(logout.pending, (state) => {
				state.isLoading = true
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.rejected, (state) => {
				state.isLoading = false
			})
	},
})

export const authReducer = authSlice.reducer
export const authActions = {
	...authSlice.actions,
	login,
	logout,
	register,
}
