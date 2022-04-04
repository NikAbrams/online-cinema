import { IMovie } from '@types'

import { axiosClient } from './axios.service'

export class MovieService {
	static async getMovies(searchTerm?: string) {
		const { data: movies } = await axiosClient.get<IMovie[]>('/movies', {
			params: searchTerm ? { searchTerm } : {},
		})

		return movies
	}

	static async getMostPopularMovies() {
		const { data: movies } = await axiosClient.get<IMovie[]>(
			'/movies/most-popular',
		)

		return movies
	}
}
