import { FC } from 'react'

import { Logo } from '@components/ui'

import { NavigationBody } from './NavigationBody/NavigationBody'

import styles from './Navigation.module.scss'

export const Navigation: FC = () => {
	return (
		<div className={styles.navigation}>
			<Logo />
			<NavigationBody />
		</div>
	)
}
