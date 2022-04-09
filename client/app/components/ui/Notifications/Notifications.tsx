import React from 'react'
import { ToastContainer } from 'react-toastify'

import styles from './Notifications.module.scss'

export const Notifications = ({ ...rest }) => {
	return (
		<ToastContainer
			closeOnClick={false}
			autoClose={4000}
			pauseOnHover={false}
			pauseOnFocusLoss={false}
			draggable={false}
			limit={3}
			position="bottom-right"
			theme="dark"
			className={styles.notifications}
			toastClassName={styles.toast}
			bodyClassName={styles.body}
			{...rest}
		/>
	)
}
