import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { IAuth, IAuthResponse } from '@types'

import { AuthService } from '@services'

import { errorNotification } from '@utils/helpers'

export const register = createAsyncThunk<IAuthResponse, IAuth>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const data = await AuthService.register({ email, password })

			toast.success('Fine! Registration completed successfully 🤗')

			return data
		} catch (error) {
			errorNotification(error as AxiosError)

			return thunkApi.rejectWithValue(error)
		}
	},
)

export const login = createAsyncThunk<IAuthResponse, IAuth>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const data = await AuthService.login({ email, password })

			toast.success('You are logged in 😎')

			return data
		} catch (error) {
			errorNotification(error as AxiosError)

			return thunkApi.rejectWithValue(error)
		}
	},
)

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout()
	toast.success('You are logged out 🙃')
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const data = await AuthService.getNewTokens()

			return data
		} catch (error) {
			if ((error as AxiosError).code === '401') {
				toast.error('Your session has expired 😅 \n Just log in again 😉')
			}

			return thunkApi.rejectWithValue(error)
		}
	},
)
