import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

import { AuthService } from './auth.service'

const options = {
	baseURL: `${process.env.API_URL}/api`,
	headers: {
		'Content-Type': 'application/json',
	},
}

export const axiosClient = axios.create(options)

export const axiosAuthClient = axios.create(options)

axiosAuthClient.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosAuthClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const config = error.config

		if (error.response.status === 401 && config && !config._isRetry) {
			error.config._isRetry = true

			try {
				await AuthService.getNewTokens()
				return axiosAuthClient.request(config)
			} catch (error) {
				if ((error as AxiosError).code === '401') {
					AuthService.logout()
				}
			}
		}

		throw error
	},
)
