import React from 'react'

import { SidebarMovies } from './SidebarMovies/SidebarMovies'
import { SidebarSearch } from './SidebarSearch/SidebarSearch'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<SidebarSearch />
			<SidebarMovies />
		</div>
	)
}
