import { FC } from 'react'

import { SearchField } from '@components/ui'

import { IMovie } from '@types'

import { MovieService } from '@services'

import { useSearch } from '@hooks'

import { SidebarSearchList } from './SidebarSearchList'

import styles from './SidebarSearch.module.scss'

export const SidebarSearch: FC = () => {
	const {
		data: movies,
		isSuccess,
		inputHandler,
		searchTerm,
	} = useSearch<IMovie[]>({
		key: 'movies',
		query: MovieService.getMovies,
	})

	return (
		<div className={styles.search}>
			<SearchField searchTerm={searchTerm} handleSearch={inputHandler} />
			{isSuccess && <SidebarSearchList movies={movies || []} />}
		</div>
	)
}
