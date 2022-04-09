import { FC } from 'react'

import { useAuth, useStoreDispatch } from '@hooks'

import { NavigationItem } from '../NavigationItem/NavigationItem'

export const NavigationGeneral: FC = () => {
	const { user } = useAuth()

	const { logout } = useStoreDispatch()

	return (
		<>
			{user ? (
				<>
					<NavigationItem
						item={{
							icon: 'MdSettings',
							link: '/profile',
							title: 'Profile',
						}}
					/>
					<NavigationItem
						item={{
							icon: 'MdLogout',
							action: () => logout(),
							title: 'Logout',
						}}
					/>
				</>
			) : (
				<NavigationItem
					item={{ icon: 'MdLogin', link: '/auth', title: 'Login' }}
				/>
			)}

			{user?.isAdmin && (
				<NavigationItem
					item={{
						icon: 'MdOutlineLock',
						link: '/manage',
						title: 'Admin panel',
					}}
				/>
			)}
		</>
	)
}
