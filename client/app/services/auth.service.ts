import Cookies from 'js-cookie'

import { IAuth, IAuthResponse } from '@types'

import { removeAuthLocally, saveAuthLocally } from '@utils/helpers'

import { axiosClient } from './axios.service'

export class AuthService {
	static async register(credentials: IAuth) {
		const { data } = await axiosClient.post<IAuthResponse>(
			'/auth/register',
			credentials,
		)

		if (data.accessToken) saveAuthLocally(data)

		return data
	}

	static async login(credentials: IAuth) {
		const { data } = await axiosClient.post<IAuthResponse>(
			'/auth/login',
			credentials,
		)

		if (data.accessToken) saveAuthLocally(data)

		return data
	}

	static logout() {
		removeAuthLocally()
	}

	static async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const { data } = await axiosClient.post<IAuthResponse>(
			'/auth/login/access-token',
			{
				refreshToken,
			},
		)

		if (data.accessToken) saveAuthLocally(data)

		return data
	}
}
