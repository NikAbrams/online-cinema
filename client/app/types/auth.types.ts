import { NextPage } from 'next'

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

export type RolesType = {
	isAdmin?: boolean
	isUser?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & RolesType
