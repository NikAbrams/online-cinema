import { FC } from 'react'

import styles from './FormMessage.module.scss'

export const FormMessage: FC = ({ children }) => {
	return <div className={styles.message}>{children}</div>
}
