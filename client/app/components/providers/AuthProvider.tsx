import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { RolesType } from '@types'

import { useAuth, useStoreDispatch } from '@hooks'

import { getUserLocally } from '@utils/helpers'

export const AuthProvider: FC<{ roles: RolesType }> = ({ children, roles }) => {
	const router = useRouter()
	const { user } = useAuth()
	const { setUser } = useStoreDispatch()

	useEffect(() => {
		const lsUser = user ? user : getUserLocally()
		if (lsUser) setUser(lsUser)
		if (roles.isAdmin && (!lsUser || !lsUser.isAdmin)) router.replace('/404')
		if (roles.isUser && !lsUser) router.replace('/auth')
	}, [user, roles])

	return <>{children}</>
}
