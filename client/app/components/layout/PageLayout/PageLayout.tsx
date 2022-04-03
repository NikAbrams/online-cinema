import { FC } from 'react'

import { Navigation, Sidebar } from '@components/common'

import styles from './PageLayout.module.scss'

export const PageLayout: FC = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.content}>{children}</div>
			<Sidebar />
		</div>
	)
}
