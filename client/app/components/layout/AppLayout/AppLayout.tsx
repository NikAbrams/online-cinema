import { FC } from 'react'

import { Navigation, Sidebar } from '@components/common'

import styles from './AppLayout.module.scss'

export const AppLayout: FC = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.content}>{children}</div>
			<Sidebar />
		</div>
	)
}
