import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@types'

import { SidebarMoviesItem } from './SidebarMoviesItem'

import styles from './SidebarMovies.module.scss'

export interface IMoviesListProps {
	title: string
	link: string
	movies: IMovie[]
}

export const SidebarMoviesSection: FC<IMoviesListProps> = ({
	title,
	link,
	movies,
}) => {
	return (
		<div className={styles.section}>
			<div className={styles.title}>{title}</div>
			<ul className={styles.list}>
				{movies.map((movie) => (
					<SidebarMoviesItem key={movie._id} movie={movie} />
				))}
			</ul>
			<Link href={link}>
				<a className={styles.button}>See More</a>
			</Link>
		</div>
	)
}
