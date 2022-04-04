import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@types'

import styles from './SidebarSearch.module.scss'

export const SidebarSearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map((movie) => (
					<Link key={movie._id} href={`/movie/${movie.slug}`}>
						<a>
							<Image
								src={movie.poster}
								width={50}
								height={50}
								objectFit="cover"
								objectPosition="top"
								draggable={false}
								alt={movie.title}
							/>
							<span>{movie.title}</span>
						</a>
					</Link>
				))
			) : (
				<div className={styles.message}>Movies not found</div>
			)}
		</div>
	)
}
