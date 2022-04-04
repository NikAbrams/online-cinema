import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Icon } from '@components/ui'

import { IMovie } from '@types'

import styles from './SidebarMovies.module.scss'

export interface IMoviesItemProps {
	movie: IMovie
}

export const SidebarMoviesItem: FC<IMoviesItemProps> = ({ movie }) => {
	const getGenreName = (idx: number, name: string) =>
		idx !== 0 ? `${name}, ` : name

	return (
		<li className={styles.item}>
			<Link href={`/movie/${movie.slug}`}>
				<a className={styles.image}>
					<Image
						src={movie.poster}
						width={65}
						height={97}
						alt={movie.title}
						draggable={false}
						priority
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<Link href={`/movie/${movie.slug}`}>
						<a className={styles.title}>{movie.title}</a>
					</Link>
					<div className={styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link key={genre._id} href={`/genre/${genre.slug}`}>
								<a>{getGenreName(idx, genre.name)}</a>
							</Link>
						))}
					</div>
				</div>

				<div className={styles.rating}>
					<Icon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</li>
	)
}
