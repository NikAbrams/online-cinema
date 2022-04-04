import { FC } from 'react'
import { useQuery } from 'react-query'

import { SkeletonLoader } from '@components/ui'

import { MovieService } from '@services'

import { SidebarMoviesSection } from './SidebarMoviesSection'

export const SidebarMoviesPopular: FC = () => {
	const { data: movies, isLoading } = useQuery('sidebar-popular-movies', () =>
		MovieService.getMostPopularMovies(),
	)

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<SidebarMoviesSection
			title="Popular movies"
			link="/trending"
			movies={movies || []}
		/>
	)
}
