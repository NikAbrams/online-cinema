export interface IUser {
	_id: string
	email: string
	password: string
	createdAt: string
	isAdmin: boolean
}

export type IUserLocal = Pick<IUser, 'email' | 'isAdmin'> | null
