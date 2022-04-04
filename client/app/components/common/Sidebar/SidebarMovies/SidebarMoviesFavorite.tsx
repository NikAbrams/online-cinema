import { FC } from 'react'

import styles from './SidebarMovies.module.scss'

export const SidebarMoviesFavorite: FC = () => {
	return false ? (
		<div>favorites</div>
	) : (
		<div className={styles.message}>
			For viewing favorites, please authorize.
		</div>
	)
}
