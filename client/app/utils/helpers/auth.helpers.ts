import Cookies from 'js-cookie'

import { IAuthResponse } from '@types'

export const getUserLocally = () => {
	if (typeof localStorage === 'undefined') return

	const user = localStorage.getItem('user')

	return user ? JSON.parse(user) : null
}

export const saveAuthLocally = (data: IAuthResponse) => {
	localStorage.setItem('user', JSON.stringify(data.user))
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const removeAuthLocally = () => {
	localStorage.removeItem('user')
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}
