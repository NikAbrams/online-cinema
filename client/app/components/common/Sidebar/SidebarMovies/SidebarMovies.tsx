import { FC } from 'react'

import { SidebarMoviesFavorite } from './SidebarMoviesFavorite'
import { SidebarMoviesPopular } from './SidebarMoviesPopular'

import styles from './SidebarMovies.module.scss'

export const SidebarMovies: FC = () => {
	return (
		<div className={styles.movies}>
			<SidebarMoviesPopular />
			<SidebarMoviesFavorite />
		</div>
	)
}
