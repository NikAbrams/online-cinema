import { FC, useEffect } from 'react'

import { useStoreDispatch } from '@hooks'

export const AuthProvider: FC = ({ children }) => {
	const { setUser } = useStoreDispatch()

	useEffect(() => {
		if (typeof localStorage === 'undefined') return
		const user = localStorage.getItem('user')
		if (user) setUser(JSON.parse(user))
	}, [])

	return <>{children}</>
}
