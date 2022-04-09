import { IUser } from './user.types'

export interface IAuth {
	email: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}
