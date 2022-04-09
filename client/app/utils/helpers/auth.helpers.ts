import Cookies from 'js-cookie'

import { IAuthResponse } from '@types'

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
