import { IGenre } from '@types'

import { axiosClient } from './axios.service'

export class GenreService {
	static async getAllGenres(searchTerm?: string) {
		return axiosClient.get<IGenre[]>('/genres', {
			params: searchTerm ? { searchTerm } : {},
		})
	}
}
